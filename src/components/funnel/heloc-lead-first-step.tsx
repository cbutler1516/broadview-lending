"use client";

import { useMemo, useState } from "react";
import { FunnelCreditCards, FunnelCurrencySlider } from "@/components/funnel/funnel-inputs";
import { cn } from "@/lib/utils/cn";

type HelocLeadFirstStepProps = {
  phaseLabel: string;
  onAddress: (value: string) => void;
  onCredit: (value: string) => void;
  onCashNeeded: (value: string) => void;
};

type LeadFirstStep = "address" | "confirming" | "credit" | "cash";

type AddressSuggestion = {
  street: string;
  city: string;
  state: string;
};

const addressSuggestions: AddressSuggestion[] = [
  { street: "1248 Lakeview Ave", city: "Seattle", state: "WA" },
  { street: "3816 Magnolia Blvd W", city: "Seattle", state: "WA" },
  { street: "905 110th Ave NE", city: "Bellevue", state: "WA" },
  { street: "720 N I St", city: "Tacoma", state: "WA" },
  { street: "1422 S Grand Blvd", city: "Spokane", state: "WA" },
];

const creditOptions = [
  { value: "740+", label: "Excellent" },
  { value: "700-739", label: "Good" },
  { value: "660-699", label: "Fair" },
  { value: "580-659", label: "Working on it" },
  { value: "unsure", label: "Not Sure" },
];

export function HelocLeadFirstStep({
  phaseLabel,
  onAddress,
  onCredit,
  onCashNeeded,
}: HelocLeadFirstStepProps) {
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCredit, setSelectedCredit] = useState("");
  const [step, setStep] = useState<LeadFirstStep>("address");

  const filtered = useMemo(() => {
    const query = address.trim().toLowerCase();
    if (!query) return addressSuggestions.slice(0, 3);
    return addressSuggestions
      .filter((item) =>
        `${item.street} ${item.city} ${item.state}`.toLowerCase().includes(query),
      )
      .slice(0, 4);
  }, [address]);

  function selectAddress(value: string) {
    setAddress(value);
    setSelectedAddress(value);
    onAddress(value);
    setStep("confirming");
    window.setTimeout(() => setStep("credit"), 520);
  }

  function handleCredit(value: string) {
    setSelectedCredit(value);
    onCredit(value);
    window.setTimeout(() => setStep("cash"), 160);
  }

  function handleAddressKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const value = address.trim();
    if (value) {
      selectAddress(value);
      return;
    }
    const firstSuggestion = filtered[0];
    if (firstSuggestion) {
      selectAddress(
        `${firstSuggestion.street}, ${firstSuggestion.city}, ${firstSuggestion.state}`,
      );
    }
  }

  function goBack() {
    if (step === "cash") {
      setStep("credit");
      return;
    }
    if (step === "credit" || step === "confirming") {
      setStep("address");
    }
  }

  if (step === "confirming") {
    return (
      <LeadFirstShell
        phaseLabel="Finding Your Property"
        title="Found it."
        onBack={goBack}
      >
        <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-light px-5 py-5">
          <p className="text-sm font-semibold text-brand">{selectedAddress}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This helps your advisor review the right property.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
            Reviewing the property context
          </div>
        </div>
      </LeadFirstShell>
    );
  }

  if (step === "credit") {
    return (
      <LeadFirstShell
        activeStep={step}
        phaseLabel="A Little Context"
        title="How would you describe your credit today?"
        onBack={goBack}
      >
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This helps shape realistic strategy options.
        </p>
        <div className="mt-7 sm:mt-8">
          <FunnelCreditCards options={creditOptions} onSelect={handleCredit} />
          {selectedCredit && (
            <p className="sr-only" aria-live="polite">
              Previous selection saved.
            </p>
          )}
        </div>
      </LeadFirstShell>
    );
  }

  if (step === "cash") {
    return (
      <LeadFirstShell
        activeStep={step}
        phaseLabel="Preparing Your Strategy"
        title="About how much cash would be useful?"
        onBack={goBack}
      >
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This helps compare practical equity ranges.
        </p>
        <div className="mt-7 sm:mt-8">
          <FunnelCurrencySlider
            value="$100,000"
            onChange={() => {}}
            onContinue={onCashNeeded}
            min={25000}
            max={750000}
            step={25000}
            label="Cash Needed"
          />
        </div>
      </LeadFirstShell>
    );
  }

  return (
    <LeadFirstShell activeStep={step} phaseLabel={phaseLabel} title="Which property should we look at?">
      <p className="mt-3 text-sm leading-relaxed text-muted">
        This helps your advisor review the right property.
      </p>

      <div className="mt-7 sm:mt-8">
        <label className="sr-only" htmlFor="property-address">
          Property address
        </label>
        <input
          id="property-address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          onKeyDown={handleAddressKeyDown}
          placeholder="Start typing your address"
          autoComplete="street-address"
          enterKeyHint="next"
          className="input-field min-h-14 rounded-2xl text-base sm:text-lg"
        />

        <div
          className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]"
          role="listbox"
          aria-label="Address suggestions"
        >
          {filtered.map((item) => {
            const value = `${item.street}, ${item.city}, ${item.state}`;
            return (
              <button
                key={value}
                type="button"
                onClick={() => selectAddress(value)}
                className="block w-full px-4 py-3.5 text-left transition hover:bg-brand-light focus:bg-brand-light focus:outline-none"
                role="option"
                aria-selected={selectedAddress === value}
              >
                <span className="block text-sm font-semibold text-foreground">
                  {item.street}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {item.city}, {item.state}
                </span>
              </button>
            );
          })}
          {address.trim() && !filtered.some((item) => `${item.street}, ${item.city}, ${item.state}` === address) && (
            <button
              type="button"
              onClick={() => selectAddress(address)}
              className="block w-full border-t border-border px-4 py-3.5 text-left text-sm font-semibold text-brand transition hover:bg-brand-light"
            >
              Use “{address}”
            </button>
          )}
        </div>
      </div>

      {selectedAddress && (
        <div className="funnel-panel-fill mt-5 rounded-2xl border border-brand/20 bg-brand-light px-5 py-4">
          <p className="text-sm font-semibold text-brand">Property found.</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Your advisor now has a useful starting point.
          </p>
        </div>
      )}
    </LeadFirstShell>
  );
}

function LeadFirstShell({
  activeStep,
  phaseLabel,
  title,
  onBack,
  children,
}: {
  activeStep?: LeadFirstStep;
  phaseLabel: string;
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-xl animate-[funnel-step-in_260ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <LeadFirstProgress activeStep={activeStep ?? "confirming"} />
      <div className="flex min-h-9 items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand sm:text-sm">
          {phaseLabel}
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="min-h-9 rounded-full px-3 text-sm font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            Back
          </button>
        )}
      </div>
      <div
        className={cn(
          "mt-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]",
          "sm:mt-6 sm:p-7 md:p-8",
        )}
      >
        <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-muted sm:gap-x-4">
        <span>No credit pull</span>
        <span>Advisor reviewed</span>
        <span>No obligation</span>
      </div>
    </div>
  );
}

function LeadFirstProgress({ activeStep }: { activeStep: LeadFirstStep }) {
  const steps: { id: LeadFirstStep; label: string }[] = [
    { id: "address", label: "Property" },
    { id: "credit", label: "Credit" },
    { id: "cash", label: "Cash" },
  ];
  const index = steps.findIndex((item) => item.id === activeStep);
  const currentIndex = activeStep === "confirming" ? 0 : Math.max(index, 0);

  return (
    <div className="mb-5 flex items-center gap-2 sm:mb-6" aria-label="HELOC lead progress">
      {steps.map((item, itemIndex) => {
        const active = itemIndex === currentIndex;
        const complete = itemIndex < currentIndex || activeStep === "confirming";
        return (
          <div key={item.id} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                complete || active ? "bg-brand" : "bg-border",
              )}
            />
            <span
              className={cn(
                "hidden text-[11px] font-semibold uppercase tracking-[0.1em] sm:inline",
                active ? "text-brand" : "text-muted",
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

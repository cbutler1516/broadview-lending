"use client";

import Link from "next/link";
import { brand, complianceLinks } from "@/lib/brand/config";
import { tcpaConsentText } from "@/lib/compliance/tcpa";

type LeadCaptureFormProps = {
  title: string;
  subtitle: string;
  onSubmit: (formData: FormData) => void;
  isPending?: boolean;
  error?: string;
  variant?: "default" | "strategy";
  onBack?: () => void;
  submitLabel?: string;
};

export function LeadCaptureForm({
  title,
  subtitle,
  onSubmit,
  isPending,
  error,
  variant = "default",
  onBack,
  submitLabel = "Send My Strategy",
}: LeadCaptureFormProps) {
  const isStrategy = variant === "strategy";
  const eyebrow = isStrategy ? "Where Should We Send It?" : "Personal Guidance";
  const helperCopy = isStrategy
    ? "This lets us send your prepared strategy."
    : brand.trust.leadCapture;

  return (
    <div className="mx-auto w-full max-w-xl animate-[funnel-step-in_260ms_cubic-bezier(0.22,1,0.36,1)_both]">
      <div className="flex min-h-9 items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand sm:text-sm">
          {eyebrow}
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
      <div className="mt-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:mt-6 sm:p-7 md:p-8">
        <h2 className="text-[1.55rem] font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {isStrategy ? helperCopy : subtitle}
        </p>
        {isStrategy && (
          <p className="mt-4 rounded-2xl border border-brand/10 bg-brand-light/60 px-4 py-3 text-sm leading-relaxed text-foreground">
            A Broadview advisor will review it personally.
          </p>
        )}
        {!isStrategy && (
          <p className="mt-3 text-sm font-medium text-foreground">
            {brand.trust.leadCapture}
          </p>
        )}

        <form action={onSubmit} className="mt-7 space-y-3.5 sm:mt-8 sm:space-y-4">
          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            <input
              name="firstName"
              aria-label="First name"
              required
              placeholder="First name"
              className="input-field min-h-14"
              autoComplete="given-name"
              enterKeyHint="next"
            />
            <input
              name="lastName"
              aria-label="Last name"
              required
              placeholder="Last name"
              className="input-field min-h-14"
              autoComplete="family-name"
              enterKeyHint="next"
            />
          </div>
          <input
            name="email"
            aria-label="Email address"
            type="email"
            required
            placeholder="Email address"
            className="input-field min-h-14"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
          />
          <input
            name="phone"
            aria-label="Mobile phone"
            type="tel"
            required
            placeholder="Mobile phone"
            className="input-field min-h-14"
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="done"
          />

          <label className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted p-4 text-sm leading-relaxed sm:p-5">
            <input
              name="tcpaConsent"
              type="checkbox"
              value="true"
              required
              className="mt-1 h-5 w-5 shrink-0 rounded border-border text-brand focus:ring-brand"
            />
            <span className="text-muted">
              {isStrategy ? (
                <>
                  I agree to be contacted about my home equity strategy.{" "}
                  {tcpaConsentText}{" "}
                </>
              ) : (
                <>{tcpaConsentText} </>
              )}
              <Link href={complianceLinks.privacy} className="text-brand underline">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link href={complianceLinks.terms} className="text-brand underline">
                Terms of Use
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary min-h-14 w-full py-3.5"
          >
            {isPending ? "Sending your request…" : submitLabel}
          </button>

          <p className="text-center text-xs leading-relaxed text-muted">
            {brand.disclaimers.short} Guidance is educational and not a
            commitment to lend.
          </p>
        </form>
      </div>
    </div>
  );
}

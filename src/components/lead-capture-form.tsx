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
};

export function LeadCaptureForm({
  title,
  subtitle,
  onSubmit,
  isPending,
  error,
  variant = "default",
}: LeadCaptureFormProps) {
  const isStrategy = variant === "strategy";
  const eyebrow = isStrategy ? "Where Should We Send It?" : "Final Details";
  const helperCopy = isStrategy
    ? "Your advisor has enough to begin preparing. Share the best way to reach you, and we’ll send the strategy there too."
    : brand.trust.leadCapture;

  return (
    <div className="funnel-step-enter mx-auto w-full max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand sm:text-sm">
        {eyebrow}
      </p>
      <div className="mt-5 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:mt-6 sm:p-6 md:p-8">
        <h2 className="text-[1.55rem] font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {isStrategy ? helperCopy : subtitle}
        </p>
        {isStrategy && (
          <p className="mt-4 rounded-2xl border border-brand/10 bg-brand-light/60 px-4 py-3 text-sm leading-relaxed text-foreground">
            No pressure and no obligation. This simply lets a Broadview advisor
            follow up with useful recommendations.
          </p>
        )}
        {!isStrategy && (
          <p className="mt-3 text-sm font-medium text-foreground">
            {brand.trust.leadCapture}
          </p>
        )}

        <form action={onSubmit} className="mt-7 space-y-3.5 sm:mt-8 sm:space-y-4">
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            <input
              name="firstName"
              required
              placeholder="First name"
              className="input-field"
              autoComplete="given-name"
            />
            <input
              name="lastName"
              required
              placeholder="Last name"
              className="input-field"
              autoComplete="family-name"
            />
          </div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="input-field"
            autoComplete="email"
          />
          <input
            name="phone"
            type="tel"
            required
            placeholder="Mobile phone"
            className="input-field"
            autoComplete="tel"
          />

          <label className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted p-4 text-sm leading-relaxed">
            <input
              name="tcpaConsent"
              type="checkbox"
              value="true"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-brand focus:ring-brand"
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
            className="btn-primary w-full py-3.5"
          >
            {isPending ? "Preparing your strategy…" : "Send My Strategy"}
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

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

  return (
    <div className="funnel-step-enter mx-auto w-full max-w-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
        Final Details
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8 shadow-[var(--shadow-soft)]">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-muted">{subtitle}</p>
        {isStrategy && (
          <p className="mt-4 rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm leading-relaxed text-foreground">
            We&apos;ll use your phone number only to discuss the strategy
            you&apos;re requesting. No pressure. No obligation. Just a
            conversation.
          </p>
        )}
        {!isStrategy && (
          <p className="mt-3 text-sm font-medium text-foreground">
            {brand.trust.leadCapture}
          </p>
        )}

        <form action={onSubmit} className="mt-8 space-y-4">
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
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

          <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted p-4 text-sm leading-relaxed">
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
                  I agree to be contacted about the strategy I requested.{" "}
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
            {isPending ? "Sending your strategy…" : "Send My Strategy"}
          </button>

          <p className="text-center text-xs leading-relaxed text-muted">
            {brand.disclaimers.short} Results are educational — not a loan
            approval.
          </p>
        </form>
      </div>
    </div>
  );
}

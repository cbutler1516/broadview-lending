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
};

export function LeadCaptureForm({
  title,
  subtitle,
  onSubmit,
  isPending,
  error,
}: LeadCaptureFormProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="card-elevated p-5 sm:p-6 md:p-8">
        <p className="text-sm font-medium text-brand">Almost there</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-muted">{subtitle}</p>
        <p className="mt-3 text-sm font-medium text-foreground">
          {brand.trust.leadCapture}
        </p>

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

          <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted p-4 text-sm leading-relaxed text-muted">
            <input
              name="tcpaConsent"
              type="checkbox"
              value="true"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-border text-brand focus:ring-brand"
            />
            <span>
              {tcpaConsentText}{" "}
              <Link href={complianceLinks.privacy} className="text-brand underline">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link href={complianceLinks.terms} className="text-brand underline">
                Terms of Use
              </Link>
            </span>
          </label>

          <button type="submit" disabled={isPending} className="btn-primary w-full py-3.5">
            {isPending ? "Building your strategy..." : brand.ctas.seeStrategy}
          </button>

          <p className="text-center text-xs leading-relaxed text-muted">
            {brand.disclaimers.short} Results are educational — not a loan approval.
          </p>
        </form>
      </div>
    </div>
  );
}

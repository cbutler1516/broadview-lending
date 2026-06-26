"use client";

import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { trackConversionEvent } from "@/lib/analytics/events";

export type CalculatorStat = { label: string; value: string };

type CalculatorResultProps = {
  recommendation: string;
  stats: CalculatorStat[];
  questions: string[];
  funnelHref: string;
  funnelLabel: string;
  toolSlug: string;
};

/**
 * Shared result panel for decision tools: strategy summary, recommendations,
 * questions to discuss with an advisor, and a handoff into the existing funnel /
 * booking lead engine.
 */
export function CalculatorResult({
  recommendation,
  stats,
  questions,
  funnelHref,
  funnelLabel,
  toolSlug,
}: CalculatorResultProps) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface-muted p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
        Your strategy snapshot
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card-elevated p-5">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-brand/20 bg-brand-light/60 p-5">
        <p className="text-sm font-semibold text-brand">Our initial recommendation</p>
        <p className="mt-2 leading-relaxed text-foreground">{recommendation}</p>
      </div>

      {questions.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold">Questions to discuss with your advisor</p>
          <ul className="mt-3 space-y-2">
            {questions.map((q) => (
              <li key={q} className="flex items-start gap-3 text-sm text-muted">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href={funnelHref}
          onClick={() =>
            trackConversionEvent("tool_cta_clicked", {
              tool: toolSlug,
              destination: funnelHref,
            })
          }
          className="btn-primary"
        >
          {funnelLabel}
        </Link>
        <BookingLink location={`tool_${toolSlug}`} className="btn-secondary">
          Talk With A Mortgage Advisor
        </BookingLink>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Estimates are for education only and are not a loan approval, commitment to
        lend, or guarantee of terms. A Broadview advisor will review your details.
      </p>
    </div>
  );
}

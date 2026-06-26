"use client";

import Link from "next/link";
import type { FunnelResult, RealtorReferralChoice } from "@/lib/funnels/types";
import type { StrategySnapshot } from "@/lib/content/types";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { BookingLink } from "@/components/booking-link";
import { WhatHappensNext } from "@/components/what-happens-next";
import { brand } from "@/lib/brand/config";
import { homeEquityCopy } from "@/lib/heloc/content";
import { cn } from "@/lib/utils/cn";

type FunnelStrategyResultsProps = {
  result: FunnelResult;
  snapshot: StrategySnapshot;
  goalLine?: string;
  preview?: boolean;
  submitted?: boolean;
  onRequestReview?: () => void;
  realtorReferral?: RealtorReferralChoice;
};

export function FunnelStrategyResults({
  result,
  snapshot,
  goalLine,
  preview = false,
  submitted = false,
  onRequestReview,
  realtorReferral,
}: FunnelStrategyResultsProps) {
  const blocks = [
    { title: "What we learned", items: snapshot.whatWeLearned },
    { title: "Strategies worth discussing", items: snapshot.strategies },
    { title: "Questions we'd ask together", items: snapshot.questions },
    { title: "Things we'd verify", items: snapshot.thingsToVerify },
    { title: "Helpful context", items: snapshot.commonMistakes },
  ].filter((b) => b.items.length > 0);

  return (
    <div className="funnel-step-enter mx-auto w-full max-w-3xl">
      {submitted && (
        <div className="mb-6 rounded-2xl border border-brand/20 bg-brand-light px-5 py-4 text-sm font-medium text-foreground">
          Your strategy is on its way. A Broadview advisor will personally review
          your information.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="border-b border-border bg-surface-muted px-6 py-8 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            Your Strategy Snapshot
          </p>
          {goalLine && (
            <p className="mt-2 text-sm font-medium text-muted">Goal · {goalLine}</p>
          )}
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {preview
              ? "Here's what we'd discuss together"
              : "Prepared for your advisor conversation"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Educational guidance only — not a loan approval, qualification, or
            commitment to lend.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-6 px-6 py-6 md:grid-cols-2 md:px-8 md:py-8">
          {blocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                {block.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-5 border-t border-border bg-surface-muted px-6 py-6 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Recommended next step
            </p>
            <p className="mt-2 leading-relaxed text-foreground">
              {snapshot.nextStep}
            </p>
          </div>

          <div className="rounded-xl border border-brand/20 bg-brand-light/80 p-5">
            <p className="text-sm font-semibold text-brand">Advisor review</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              A licensed Broadview advisor personally reviews every strategy before
              any recommendation.
            </p>
          </div>

          {realtorReferral && (
            <p className="rounded-xl bg-surface p-4 text-sm text-muted">
              Realtor preference recorded.
            </p>
          )}

          {result.funnelType === "heloc" && (
            <p className="text-sm leading-relaxed text-muted">
              {homeEquityCopy.compliance}
            </p>
          )}

          <ComplianceDisclaimer />

          {preview && onRequestReview ? (
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onRequestReview}
                className="btn-primary w-full"
              >
                Have an advisor review my strategy
              </button>
              <p className="text-center text-xs text-muted">
                Your personalized strategy is almost ready. We&apos;ll ask where to
                send it next.
              </p>
            </div>
          ) : (
            <>
              <WhatHappensNext
                compact
                className="-mx-6 border-y border-border bg-surface px-0 py-8 md:-mx-8"
              />
              <BookingLink
                location="funnel_results"
                funnelType={result.funnelType}
                className="btn-primary w-full text-center"
              >
                {brand.ctas.bookConsultation}
              </BookingLink>
            </>
          )}

          <Link
            href="/#start"
            className={cn("btn-secondary block w-full text-center")}
          >
            Explore Another Goal
          </Link>
        </div>
      </div>
    </div>
  );
}

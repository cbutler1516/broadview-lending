import Link from "next/link";
import type { FunnelResult, RealtorReferralChoice } from "@/lib/funnels/types";
import {
  formatProgramLabel,
  getResultCopy,
  getScoreInterpretation,
} from "@/lib/funnels/result-copy";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { BookingLink } from "@/components/booking-link";
import { WhatHappensNext } from "@/components/what-happens-next";
import { brand } from "@/lib/brand/config";
import { homeEquityCopy } from "@/lib/heloc/content";

type FunnelResultsProps = {
  result: FunnelResult;
  realtorReferral?: RealtorReferralChoice;
};

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

export function FunnelResults({ result, realtorReferral }: FunnelResultsProps) {
  const copy = getResultCopy(result);
  const scoreNote = getScoreInterpretation(result.funnelType, result);
  const isHeloc = result.funnelType === "heloc" && result.equityStrategy;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="card-elevated overflow-hidden">
        <div className="bg-brand-light px-6 py-8 md:px-8">
          <p className="text-sm font-medium text-brand">
            Your Personalized Strategy
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {copy.headline}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{copy.interpretation}</p>
        </div>

        {isHeloc && (
          <div className="space-y-4 p-6 md:p-8">
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Your Goal
              </h3>
              <p className="mt-2 text-lg font-semibold">
                {result.equityStrategy?.goal}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Our Initial Recommendation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {result.equityStrategy?.initialRecommendation}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Why It Fits
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {result.equityStrategy?.whyItFits}
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-4 border-t border-border p-6 md:grid-cols-2 md:p-8">
          {(isHeloc
            ? [
                {
                  label: "Planning Snapshot",
                  value: result.equityStrategy?.equityAccessScore ?? result.leadQualityScore,
                },
                {
                  label: "Estimated Available Equity",
                  value: formatCurrency(
                    result.equityStrategy?.estimatedAvailableEquity ?? 0,
                  ),
                },
                { label: "Timeline Fit", value: result.urgencyScore },
                { label: "Profile Grade", value: result.leadGrade },
              ]
            : [
                { label: "Strategy Score", value: result.leadQualityScore },
                { label: "Readiness", value: result.readinessScore },
                { label: "Timeline Fit", value: result.urgencyScore },
                { label: "Profile Grade", value: result.leadGrade },
              ]
          ).map((score) => (
            <div
              key={score.label}
              className="rounded-xl border border-border bg-surface-muted p-4"
            >
              <p className="text-xs uppercase tracking-wider text-muted">
                {score.label}
              </p>
              <p className="mt-1 text-2xl font-semibold">{score.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 border-t border-border px-6 py-8 md:px-8">
          <p className="text-sm leading-relaxed text-muted">{scoreNote}</p>

          {isHeloc ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Potential Home Equity Path
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {result.equityStrategy?.potentialHelocPath}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Alternative: Cash-Out Refinance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {result.equityStrategy?.cashOutAlternative}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Why Keeping Your Current First Mortgage May Matter
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {result.equityStrategy?.keepCurrentMortgageNote}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Other Options Worth Discussing
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  {result.equityStrategy?.otherOptionsWorthDiscussing.map((option) => (
                    <li key={option}>• {option}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Estimated Next Steps
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  {result.equityStrategy?.estimatedNextSteps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Questions To Ask Your Advisor
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  {result.equityStrategy?.questionsToAskAdvisor.map((question) => (
                    <li key={question}>• {question}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Strategy Paths Worth Discussing
              </h3>
              <p className="mt-2 text-sm text-muted">{copy.pathsIntro}:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.recommendedPrograms.map((program) => (
                  <span
                    key={program}
                    className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand"
                  >
                    {formatProgramLabel(program)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Key Considerations
              </h3>
              <ul className="mt-3 space-y-2">
                {result.highlights.map((highlight) => (
                  <li key={highlight} className="text-sm leading-relaxed text-muted">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {realtorReferral && (
            <p className="rounded-xl bg-surface-muted p-4 text-sm text-muted">
              Realtor referral preference:{" "}
              <span className="font-medium text-foreground">
                {realtorReferral === "yes"
                  ? "Yes, connect me"
                  : realtorReferral === "already-working"
                    ? "Already working with someone"
                    : "No thanks"}
              </span>
            </p>
          )}

          <div className="rounded-xl border border-brand/20 bg-brand-light p-5">
            <p className="text-sm font-medium text-brand">Recommended Next Step</p>
            <p className="mt-1 text-foreground">
              {isHeloc
                ? result.equityStrategy?.recommendedNextStep
                : copy.nextStep}
            </p>
          </div>

          {isHeloc && (
            <p className="rounded-xl border border-border bg-surface-muted p-4 text-sm leading-relaxed text-muted">
              {homeEquityCopy.resultsPromise}
            </p>
          )}

          <ComplianceDisclaimer />

          <WhatHappensNext compact className="-mx-6 border-y border-border bg-surface-muted px-0 py-8 md:-mx-8" />

          <BookingLink
            location="funnel_results"
            funnelType={result.funnelType}
            className="btn-primary w-full text-center"
          >
            {brand.ctas.bookConsultation}
          </BookingLink>
          <Link href="/#funnels" className="btn-secondary w-full text-center">
            Explore Another Goal
          </Link>
        </div>
      </div>
    </div>
  );
}

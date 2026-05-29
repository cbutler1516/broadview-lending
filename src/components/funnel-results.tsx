import Link from "next/link";
import type { FunnelResult, RealtorReferralChoice } from "@/lib/funnels/types";
import {
  formatProgramLabel,
  getResultCopy,
  getScoreInterpretation,
} from "@/lib/funnels/result-copy";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { BookingLink } from "@/components/booking-link";
import { brand } from "@/lib/brand/config";

type FunnelResultsProps = {
  result: FunnelResult;
  realtorReferral?: RealtorReferralChoice;
};

export function FunnelResults({ result, realtorReferral }: FunnelResultsProps) {
  const copy = getResultCopy(result);
  const scoreNote = getScoreInterpretation(result.funnelType, result);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="card-elevated overflow-hidden">
        <div className="bg-brand-light px-6 py-8 md:px-8">
          <p className="text-sm font-medium text-brand">Your Personalized Strategy</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {copy.headline}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{copy.interpretation}</p>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
          {[
            { label: "Strategy Score", value: result.leadQualityScore },
            { label: "Readiness", value: result.readinessScore },
            { label: "Timeline Fit", value: result.urgencyScore },
            { label: "Profile Grade", value: result.leadGrade },
          ].map((score) => (
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

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Suggested Loan Paths
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
            <p className="mt-1 text-foreground">{copy.nextStep}</p>
          </div>

          <ComplianceDisclaimer />

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

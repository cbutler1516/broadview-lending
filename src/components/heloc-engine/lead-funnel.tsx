"use client";

import { FunnelConfirmation } from "@/components/heloc-engine/funnel-confirmation";
import { FunnelAddressStep } from "@/components/heloc-engine/funnel-address-step";
import { FunnelContactStep } from "@/components/heloc-engine/funnel-contact-step";
import { FunnelCreditScoreStep } from "@/components/heloc-engine/funnel-credit-score-step";
import { FunnelPropertyOccupancyStep } from "@/components/heloc-engine/funnel-property-occupancy-step";
import { FunnelRequestedFundsStep } from "@/components/heloc-engine/funnel-requested-funds-step";
import { FunnelProgress } from "@/components/heloc-engine/funnel-progress";
import { FunnelStepHeader } from "@/components/heloc-engine/funnel-step-header";
import {
  trackContactStepViewed,
  trackLeadStepCompleted,
  trackLeadSubmittedWithRouting,
} from "@/lib/heloc-engine/analytics";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/heloc-engine/constants";
import {
  FUNNEL_QUESTION_COUNT,
  FUNNEL_STEP_COUNT,
  FUNNEL_VERSION,
  getFunnelStepId,
  getFunnelStepTitle,
  DEFAULT_FUNNEL_DATA,
} from "@/lib/heloc-engine/funnel-config";
import { getStepEncouragement } from "@/lib/heloc-engine/funnel-encouragement";
import { applyRangeSelection } from "@/lib/heloc-engine/parse-prefill";
import { submitHelocLead } from "@/lib/heloc-engine/submit-lead";
import { scrollToPostSubmitTop } from "@/lib/heloc-engine/scroll-to-post-submit-top";
import { usePartialLeadSave } from "@/lib/heloc-engine/use-partial-lead-save";
import { cn } from "@/lib/utils/cn";
import type { LeadFunnelData, RoutingTier } from "@/lib/heloc-engine/types";
import { mapOccupancyToEquityStrategy } from "@/lib/heloc-engine/property-occupancy";
import { createSubmissionId, getOrCreateSessionId } from "@/lib/analytics/events";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type LeadFunnelProps = {
  campaignPage?: string;
  equityGoal?: string;
  onSubmittedChange?: (submitted: boolean) => void;
};

export function LeadFunnel({ campaignPage, equityGoal, onSubmittedChange }: LeadFunnelProps) {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadFunnelData>(() => ({ ...DEFAULT_FUNNEL_DATA }));
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [routingTier, setRoutingTier] = useState<RoutingTier | undefined>(undefined);
  const [submittedAt, setSubmittedAt] = useState<string>("");
  const [tcpaConsentAt, setTcpaConsentAt] = useState<string>("");

  const [submissionId] = useState(() => createSubmissionId());
  const [sessionId] = useState(() => getOrCreateSessionId());

  const journey = "sfr";

  const equityStrategy = useMemo(
    () => mapOccupancyToEquityStrategy(data.propertyOccupancy),
    [data.propertyOccupancy],
  );

  const isConfirmationView = submitted || step === FUNNEL_STEP_COUNT;

  useEffect(() => {
    onSubmittedChange?.(isConfirmationView);
  }, [isConfirmationView, onSubmittedChange]);

  useEffect(() => {
    if (!submitted) return;
    scrollToPostSubmitTop();
    const timer = window.setTimeout(scrollToPostSubmitTop, 0);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  useEffect(() => {
    if (step === 5) {
      trackContactStepViewed({ journey, funnelVersion: FUNNEL_VERSION });
    }
  }, [step]);

  useEffect(() => {
    document.documentElement.setAttribute("data-funnel-active", "true");
    return () => {
      document.documentElement.removeAttribute("data-funnel-active");
    };
  }, []);

  usePartialLeadSave({
    data,
    step,
    journey,
    equityStrategy: equityStrategy ?? "rental_property",
    submitted,
  });

  const patch = useCallback((partial: Partial<LeadFunnelData>) => {
    setSubmitError(null);
    setData((prev) => applyRangeSelection(prev, partial));
  }, []);

  function goNext(fromStep: number) {
    const stepId = getFunnelStepId(fromStep);
    trackLeadStepCompleted(fromStep, stepId, { journey, funnelVersion: FUNNEL_VERSION });
    const nextStep = Math.min(fromStep + 1, FUNNEL_STEP_COUNT);
    setData((prev) => ({ ...prev, funnelStepCompleted: fromStep }));
    setStep(nextStep);
  }

  function goBack() {
    setStep((current) => (current <= 1 ? current : current - 1));
  }

  async function handleSubmit() {
    if (!data.propertyOccupancy) {
      setSubmitError("Select how you use this property.");
      return;
    }
    if (!data.creditScoreRange) {
      setSubmitError("Select your estimated credit score.");
      return;
    }
    if (!data.equityAccessRange) {
      setSubmitError("Select how much capital you'd like to access.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const consentAt = tcpaConsentAt || new Date().toISOString();
    setTcpaConsentAt(consentAt);

    const result = await submitHelocLead({
      data: { ...data, funnelStepCompleted: 5 },
      submissionId,
      sessionId,
      campaignPage,
      equityGoal,
    });

    setSubmitting(false);

    if (result.success) {
      trackLeadSubmittedWithRouting(result.routingTier, {
        journey,
        leadId: result.id ?? "",
        funnelVersion: FUNNEL_VERSION,
        equityAccessRange: data.equityAccessRange || "",
      });
      setLeadId(result.id);
      setRoutingTier(result.routingTier);
      setSubmittedAt(consentAt);
      setSubmitted(true);
      setStep(FUNNEL_STEP_COUNT);
    } else {
      setSubmitError(result.error ?? SUBMIT_ERROR_MESSAGE);
    }
  }

  if (isConfirmationView) {
    return (
      <div id="post-submit-start" className="mx-auto w-full max-w-7xl scroll-mt-20">
        <FunnelConfirmation
          propertyType={data.propertyType}
          propertyOccupancy={data.propertyOccupancy}
          leadId={leadId}
          routingTier={routingTier}
          propertyStreet={data.propertyStreet}
          propertyCity={data.propertyCity}
          propertyState={data.propertyState}
          propertyZip={data.propertyZip}
          equityAccessRange={data.equityAccessRange}
          submittedAt={submittedAt || new Date().toISOString()}
        />
      </div>
    );
  }

  const stepId = getFunnelStepId(step);
  const encouragement = getStepEncouragement(stepId, {
    equityAccessRange: data.equityAccessRange,
    creditScoreRange: data.creditScoreRange,
  });

  return (
    <div className="funnel-container mx-auto w-full">
      <div className="funnel-app-shell overflow-x-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)] lg:rounded-3xl lg:shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-100 bg-white/95 px-3 py-2.5 backdrop-blur-sm sm:gap-3 sm:px-5 sm:py-3 lg:px-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Go back"
            >
              ←
            </button>
          ) : (
            <div className="w-10 shrink-0" aria-hidden />
          )}
          <FunnelProgress currentStep={step} totalSteps={FUNNEL_QUESTION_COUNT} compact />
        </div>

        <div className={cn("px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6", step === 5 && "max-md:pb-28")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-md:funnel-mobile-flat space-y-4 sm:space-y-5"
            >
              <FunnelStepHeader title={getStepTitle(step)} encouragement={encouragement} />

              <div className="funnel-step-body">
                {step === 1 ? (
                  <FunnelAddressStep data={data} onChange={patch} onContinue={() => goNext(1)} />
                ) : null}

                {step === 2 ? (
                  <FunnelPropertyOccupancyStep
                    data={data}
                    onChange={patch}
                    onContinue={() => goNext(2)}
                    funnelStep={2}
                  />
                ) : null}

                {step === 3 ? (
                  <FunnelCreditScoreStep data={data} onChange={patch} onContinue={() => goNext(3)} />
                ) : null}

                {step === 4 ? (
                  <FunnelRequestedFundsStep data={data} onChange={patch} onContinue={() => goNext(4)} />
                ) : null}

                {step === 5 ? (
                  <FunnelContactStep
                    data={data}
                    onChange={patch}
                    submitting={submitting}
                    submitError={submitError}
                    onSubmit={handleSubmit}
                  />
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Which property should we review?";
    case 2:
      return "How do you use this property?";
    case 3:
      return "What's your estimated credit score?";
    case 4:
      return "How much capital would you like to access?";
    case 5:
      return "Where should we send your strategy?";
    default:
      return getFunnelStepTitle(step);
  }
}

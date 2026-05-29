"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { getActiveQuestions } from "@/lib/funnels/config";
import type { FunnelDefinition, FunnelResult } from "@/lib/funnels/types";
import { submitLead, saveRealtorReferral } from "@/actions/submit-lead";
import {
  trackEvent,
  getOrCreateSessionId,
  createSubmissionId,
} from "@/lib/analytics/events";
import { appendAttributionToFormData } from "@/lib/analytics/attribution";
import { LeadCaptureForm } from "./lead-capture-form";
import { FunnelResults } from "./funnel-results";
import { RealtorReferralPrompt } from "./realtor-referral-prompt";
import { cn } from "@/lib/utils/cn";

type FunnelWizardProps = {
  definition: FunnelDefinition;
};

type WizardPhase = "questions" | "lead-capture" | "realtor" | "results";

function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return `$${Number(digits).toLocaleString()}`;
}

export function FunnelWizard({ definition }: FunnelWizardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<WizardPhase>("questions");
  const [result, setResult] = useState<FunnelResult | null>(null);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [realtorChoice, setRealtorChoice] = useState<
    "yes" | "no" | "already-working" | undefined
  >();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [submissionId] = useState(() => createSubmissionId());
  const [sessionId] = useState(() => getOrCreateSessionId());
  const hasSubmittedRef = useRef(false);
  const hasTrackedLeadCaptureRef = useRef(false);

  const activeQuestions = useMemo(
    () => getActiveQuestions(definition, answers),
    [definition, answers],
  );

  const currentQuestion = activeQuestions[stepIndex];
  const progress = ((stepIndex + 1) / activeQuestions.length) * 100;

  useEffect(() => {
    trackEvent({
      event: "funnel_started",
      funnelType: definition.type,
      sessionId,
    });
  }, [definition.type, sessionId]);

  useEffect(() => {
    if (phase === "lead-capture" && !hasTrackedLeadCaptureRef.current) {
      hasTrackedLeadCaptureRef.current = true;
      trackEvent({
        event: "lead_capture_viewed",
        funnelType: definition.type,
        sessionId,
      });
    }
  }, [phase, definition.type, sessionId]);

  useEffect(() => {
    if (phase === "results" && result) {
      trackEvent({
        event: "results_viewed",
        funnelType: definition.type,
        leadId,
        sessionId,
        metadata: { leadGrade: result.leadGrade },
      });
    }
  }, [phase, result, definition.type, leadId, sessionId]);

  function handleAnswer(value: string) {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: currentQuestion.id,
      metadata: { value },
    });

    const nextQuestions = getActiveQuestions(definition, nextAnswers);
    if (stepIndex >= nextQuestions.length - 1) {
      setPhase("lead-capture");
      return;
    }

    setStepIndex((i) => i + 1);
  }

  function handleLeadSubmit(formData: FormData) {
    if (hasSubmittedRef.current || isPending) return;

    formData.set("funnelType", definition.type);
    formData.set("answers", JSON.stringify(answers));
    formData.set("submissionId", submissionId);
    formData.set("sessionId", sessionId);
    appendAttributionToFormData(formData);

    startTransition(async () => {
      const response = await submitLead({ success: false }, formData);
      if (response.success && response.result) {
        hasSubmittedRef.current = true;
        setSubmitError(undefined);
        setLeadId(response.leadId);
        setResult(response.result);

        if (
          definition.type === "purchase" &&
          (answers.workingWithRealtor === "no" ||
            answers.workingWithRealtor === "looking")
        ) {
          setPhase("realtor");
        } else {
          setPhase("results");
        }
      } else {
        setSubmitError(response.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  function handleRealtorChoice(choice: "yes" | "no" | "already-working") {
    setRealtorChoice(choice);

    if (leadId) {
      void saveRealtorReferral({
        leadId,
        realtorReferral: choice,
        sessionId,
      });
    } else {
      trackEvent({
        event: "realtor_referral_requested",
        funnelType: definition.type,
        sessionId,
        metadata: { choice },
      });
    }

    setPhase("results");
  }

  if (phase === "results" && result) {
    return <FunnelResults result={result} realtorReferral={realtorChoice} />;
  }

  if (phase === "realtor") {
    return <RealtorReferralPrompt onSelect={handleRealtorChoice} />;
  }

  if (phase === "lead-capture") {
    return (
      <LeadCaptureForm
        onSubmit={handleLeadSubmit}
        isPending={isPending}
        error={submitError}
        title="See Your Personalized Mortgage Strategy"
        subtitle="Your answers are ready. Enter your details to unlock program recommendations tailored to your goal."
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm text-muted">
          <span>
            Step {stepIndex + 1} of {activeQuestions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="card-elevated p-5 sm:p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          {currentQuestion.label}
        </h2>
        {currentQuestion.description && (
          <p className="mt-2 text-muted">{currentQuestion.description}</p>
        )}

        <div className="mt-8">
          {currentQuestion.type === "single-select" && currentQuestion.options && (
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(option.value)}
                  className={cn(
                    "rounded-xl border border-border px-4 py-4 text-left text-sm font-medium transition-colors hover:border-brand hover:bg-brand-light",
                    answers[currentQuestion.id] === option.value &&
                      "border-brand bg-brand-light",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {(currentQuestion.type === "currency" ||
            currentQuestion.type === "percentage") && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("value") as HTMLInputElement;
                if (input.value.trim()) handleAnswer(input.value);
              }}
            >
              <input
                name="value"
                type="text"
                inputMode="decimal"
                placeholder={
                  currentQuestion.type === "currency" ? "$350,000" : "6.5%"
                }
                className="input-field"
                onChange={(e) => {
                  if (currentQuestion.type === "currency") {
                    e.target.value = formatCurrencyInput(e.target.value);
                  }
                }}
              />
              <button type="submit" className="btn-primary mt-4 w-full">
                Continue
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

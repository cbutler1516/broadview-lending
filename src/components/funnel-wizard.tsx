"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { getActiveQuestions } from "@/lib/funnels/config";
import type { FunnelDefinition, FunnelResult } from "@/lib/funnels/types";
import { resolveGoalEntry, labelForGoalValue } from "@/lib/funnels/goal-entry";
import {
  computeBuilderSections,
  computeEstimatedEquity,
  formatTimeline,
  getConversationTopics,
  getPhaseLabel,
  getQuestionSection,
} from "@/lib/funnels/strategy-builder";
import { funnelResultToSnapshot, snapshotGoalLine } from "@/lib/funnels/result-snapshot";
import { generateFunnelResult } from "@/lib/scoring/engine";
import { formatProgramLabel } from "@/lib/funnels/result-copy";
import { submitLead, saveRealtorReferral } from "@/actions/submit-lead";
import {
  trackEvent,
  getOrCreateSessionId,
  createSubmissionId,
} from "@/lib/analytics/events";
import { appendAttributionToFormData } from "@/lib/analytics/attribution";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RealtorReferralPrompt } from "@/components/realtor-referral-prompt";
import { FunnelLayout } from "@/components/funnel/funnel-layout";
import { HelocLeadFirstStep } from "@/components/funnel/heloc-lead-first-step";
import {
  FunnelGoalStep,
  FunnelQuestionStep,
  FunnelRewardPulse,
} from "@/components/funnel/funnel-question-step";
import { FunnelStrategyResults } from "@/components/funnel/funnel-strategy-results";
import { homeEquityCopy } from "@/lib/heloc/content";

type FunnelWizardProps = {
  definition: FunnelDefinition;
  campaignPage?: string;
};

type WizardPhase =
  | "goal"
  | "building"
  | "results"
  | "lead-capture"
  | "realtor"
  | "confirmed";

const purchaseGoalOptions = [
  { value: "first-home", label: "Buying my first home" },
  { value: "move-up", label: "Moving to a bigger home" },
  { value: "investment", label: "Buying an investment property" },
  { value: "exploring", label: "Still exploring" },
];

export function FunnelWizard({ definition, campaignPage }: FunnelWizardProps) {
  const goalContext = useMemo(
    () => resolveGoalEntry(definition.type, campaignPage),
    [definition.type, campaignPage],
  );

  const [answers, setAnswers] = useState<Record<string, string>>(
    () => goalContext.prefilledAnswers,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<WizardPhase>(
    definition.type === "heloc" || goalContext.showGoalStep ? "goal" : "building",
  );
  const [result, setResult] = useState<FunnelResult | null>(null);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [realtorChoice, setRealtorChoice] = useState<
    "yes" | "no" | "already-working" | undefined
  >();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [rewardKey, setRewardKey] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submissionId] = useState(() => createSubmissionId());
  const [sessionId] = useState(() => getOrCreateSessionId());
  const hasSubmittedRef = useRef(false);
  const hasTrackedLeadCaptureRef = useRef(false);
  const hasTrackedPreviewRef = useRef(false);

  const activeQuestions = useMemo(
    () => getActiveQuestions(definition, answers),
    [definition, answers],
  );

  const pendingQuestions = useMemo(
    () =>
      activeQuestions.filter((q) => {
        if (q.id === "equityGoal" && answers.equityGoal) return false;
        if (q.id === "refinanceGoal" && answers.refinanceGoal) return false;
        return !answers[q.id]?.trim();
      }),
    [activeQuestions, answers],
  );

  const currentQuestion = pendingQuestions[stepIndex];
  const hasResult = Boolean(result) && (phase === "results" || phase === "confirmed");

  const builderSections = useMemo(
    () =>
      computeBuilderSections(
        definition,
        answers,
        currentQuestion?.id,
        hasResult,
      ),
    [definition, answers, currentQuestion?.id, hasResult],
  );

  const currentSection = currentQuestion
    ? getQuestionSection(currentQuestion.id)
    : hasResult
      ? "strategy"
      : null;

  const phaseLabel = getPhaseLabel(currentSection, hasResult);
  const displayedPhaseLabel =
    definition.type === "heloc" && phase === "goal"
      ? "Finding Your Property"
      : definition.type === "heloc" && phase === "lead-capture"
        ? "Preparing Your Strategy"
        : definition.type === "heloc" && contactCaptured
          ? "Personalizing Your Review"
          : phaseLabel;

  const estimatedEquity = computeEstimatedEquity(answers);
  const goalLine =
    answers.equityGoal || answers.refinanceGoal
      ? labelForGoalValue(answers.equityGoal ?? answers.refinanceGoal!)
      : goalContext.goalLabel;

  const timelineLabel = formatTimeline(answers.timeline);

  const panelOptions = result
    ? result.recommendedPrograms.map(formatProgramLabel)
    : [];

  const advisorNotes =
    definition.type === "heloc"
      ? [homeEquityCopy.advisorReview]
      : ["Technology prepares the conversation. A real advisor helps you decide."];

  const conversationTopics = getConversationTopics(definition, answers);

  const goalStepOptions = useMemo(() => {
    if (definition.type === "heloc") {
      return (
        definition.questions.find((q) => q.id === "equityGoal")?.options ?? []
      );
    }
    if (definition.type === "refinance") {
      return (
        definition.questions.find((q) => q.id === "refinanceGoal")?.options ?? []
      );
    }
    return purchaseGoalOptions;
  }, [definition]);

  useEffect(() => {
    trackEvent({
      event: "funnel_started",
      funnelType: definition.type,
      sessionId,
      metadata: { campaignPage: campaignPage ?? "" },
    });
  }, [definition.type, sessionId, campaignPage]);

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
    if (phase === "results" && result && !hasTrackedPreviewRef.current) {
      hasTrackedPreviewRef.current = true;
      trackEvent({
        event: "results_viewed",
        funnelType: definition.type,
        sessionId,
        metadata: { preview: true, leadGrade: result.leadGrade },
      });
    }
  }, [phase, result, definition.type, sessionId]);

  useEffect(() => {
    if (phase === "confirmed" && result && leadId) {
      trackEvent({
        event: "results_viewed",
        funnelType: definition.type,
        leadId,
        sessionId,
        metadata: { leadGrade: result.leadGrade, submitted: true },
      });
    }
  }, [phase, result, leadId, definition.type, sessionId]);

  function triggerReward() {
    setShowReward(true);
    setRewardKey((k) => k + 1);
    window.setTimeout(() => setShowReward(false), 650);
  }

  function finishBuilding(nextAnswers: Record<string, string>) {
    const computed = generateFunnelResult(definition.type, nextAnswers);
    setResult(computed);
    setPhase(definition.type === "heloc" && contactCaptured ? "confirmed" : "results");
  }

  function handleGoalSelect(value: string) {
    triggerReward();
    const patch: Record<string, string> = { ...answers };
    if (definition.type === "heloc") patch.equityGoal = value;
    else if (definition.type === "refinance") patch.refinanceGoal = value;
    else if (value === "first-home") patch.firstTimeHomebuyer = "yes";
    else if (value === "exploring") patch.timeline = "exploring";
    setAnswers(patch);
    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: "goal-step",
      metadata: { value },
    });
    setPhase("building");
    setStepIndex(0);
  }

  function handleHelocAddress(value: string) {
    triggerReward();
    setAnswers((current) => ({ ...current, propertyAddress: value }));
    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: "propertyAddress",
      metadata: { value },
    });
  }

  function handleHelocCredit(value: string) {
    triggerReward();
    setAnswers((current) => ({ ...current, creditScore: value }));
    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: "creditScore",
      metadata: { value },
    });
  }

  function handleHelocCashNeeded(value: string) {
    triggerReward();
    const nextAnswers = { ...answers, desiredEquityAmount: value };
    setAnswers(nextAnswers);
    setResult(generateFunnelResult(definition.type, nextAnswers));
    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: "desiredEquityAmount",
      metadata: { value },
    });
    setPhase("lead-capture");
  }

  function handleAnswer(value: string) {
    if (!currentQuestion) return;

    triggerReward();
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    trackEvent({
      event: "question_answered",
      funnelType: definition.type,
      sessionId,
      step: currentQuestion.id,
      metadata: { value },
    });

    const nextPending = getActiveQuestions(definition, nextAnswers).filter(
      (q) => {
        if (q.id === "equityGoal" && nextAnswers.equityGoal) return false;
        if (q.id === "refinanceGoal" && nextAnswers.refinanceGoal) return false;
        return !nextAnswers[q.id]?.trim();
      },
    );

    if (stepIndex >= nextPending.length - 1) {
      finishBuilding(nextAnswers);
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
    if (campaignPage) formData.set("campaignPage", campaignPage);
    appendAttributionToFormData(formData);

    startTransition(async () => {
      const response = await submitLead({ success: false }, formData);
      if (response.success && response.result) {
        hasSubmittedRef.current = true;
        setContactCaptured(true);
        setSubmitError(undefined);
        setLeadId(response.leadId);
        setResult(response.result);

        if (definition.type === "heloc") {
          setPhase("building");
          setStepIndex(0);
        } else if (
          definition.type === "purchase" &&
          (answers.workingWithRealtor === "no" ||
            answers.workingWithRealtor === "looking")
        ) {
          setPhase("realtor");
        } else {
          setPhase("confirmed");
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
    }
    setPhase("confirmed");
  }

  const panelProps = {
    sections: builderSections,
    goal: goalLine,
    propertyAddress: answers.propertyAddress,
    estimatedEquity: estimatedEquity || undefined,
    timeline: timelineLabel,
    options: panelOptions,
    advisorNotes,
    conversationTopics,
    phaseLabel: displayedPhaseLabel,
  };

  function frame(node: ReactNode) {
    if (definition.type !== "heloc") return node;
    return <div className="section-container py-10 md:py-14">{node}</div>;
  }

  const snapshot = result ? funnelResultToSnapshot(result) : null;

  if ((phase === "results" || phase === "confirmed") && result && snapshot) {
    return frame(
      <FunnelLayout panel={panelProps}>
        <FunnelStrategyResults
          result={result}
          snapshot={snapshot}
          goalLine={snapshotGoalLine(result, answers)}
          preview={phase === "results"}
          submitted={phase === "confirmed"}
          onRequestReview={
            phase === "results" ? () => setPhase("lead-capture") : undefined
          }
          realtorReferral={realtorChoice}
        />
      </FunnelLayout>,
    );
  }

  if (phase === "realtor") {
    return frame(
      <FunnelLayout panel={panelProps}>
        <RealtorReferralPrompt onSelect={handleRealtorChoice} />
      </FunnelLayout>,
    );
  }

  if (phase === "lead-capture") {
    return frame(
      <FunnelLayout panel={panelProps}>
        <LeadCaptureForm
          variant="strategy"
          onSubmit={handleLeadSubmit}
          isPending={isPending}
          error={submitError}
          title={definition.type === "heloc" ? "Great news. Where should we send it?" : "Where should we send your strategy?"}
          subtitle={
            definition.type === "heloc"
              ? "Great news. We have enough information to begin preparing your personalized home equity strategy."
              : "Your personalized strategy is almost ready. A Broadview advisor personally reviews every recommendation."
          }
        />
      </FunnelLayout>,
    );
  }

  const mainContent =
    phase === "goal" && definition.type === "heloc" ? (
      <HelocLeadFirstStep
        phaseLabel={displayedPhaseLabel}
        onAddress={handleHelocAddress}
        onCredit={handleHelocCredit}
        onCashNeeded={handleHelocCashNeeded}
      />
    ) : phase === "goal" ? (
      <FunnelGoalStep
        prompt={goalContext.goalPrompt}
        options={goalStepOptions}
        phaseLabel={displayedPhaseLabel}
        onSelect={handleGoalSelect}
      />
    ) : currentQuestion ? (
      <FunnelQuestionStep
        question={currentQuestion}
        phaseLabel={displayedPhaseLabel}
        onAnswer={handleAnswer}
        rewardKey={rewardKey}
        contextOverride={
          definition.type === "heloc" && contactCaptured
            ? "This helps your advisor personalize your strategy before the conversation."
            : undefined
        }
      />
    ) : null;

  if (phase === "goal" && definition.type === "heloc") {
    return (
      <>
        <FunnelRewardPulse show={showReward} />
        {mainContent}
      </>
    );
  }

  return (
    <>
      <FunnelRewardPulse show={showReward} />
      {frame(<FunnelLayout panel={panelProps}>{mainContent}</FunnelLayout>)}
    </>
  );
}

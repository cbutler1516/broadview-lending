"use client";

import { useState } from "react";
import type { FunnelQuestion } from "@/lib/funnels/types";
import { FunnelSelectCards } from "@/components/funnel/funnel-select-cards";
import {
  FunnelCreditCards,
  FunnelCurrencySlider,
  FunnelPercentSlider,
} from "@/components/funnel/funnel-inputs";
import { cn } from "@/lib/utils/cn";

type FunnelQuestionStepProps = {
  question: FunnelQuestion;
  phaseLabel: string;
  onAnswer: (value: string) => void;
  onBack?: () => void;
  onSkip?: () => void;
  rewardKey?: number;
  contextOverride?: string;
  introTitle?: string;
};

const currencyRanges: Record<string, { min: number; max: number }> = {
  purchasePrice: { min: 150000, max: 2500000 },
  downPayment: { min: 0, max: 500000 },
  estimatedPropertyValue: { min: 150000, max: 3000000 },
  mortgageBalance: { min: 0, max: 2000000 },
  desiredEquityAmount: { min: 10000, max: 750000 },
  homeValue: { min: 150000, max: 3000000 },
  currentBalance: { min: 0, max: 2000000 },
};

export function FunnelQuestionStep({
  question,
  phaseLabel,
  onAnswer,
  onBack,
  onSkip,
  rewardKey = 0,
  contextOverride,
  introTitle,
}: FunnelQuestionStepProps) {
  const [textValue, setTextValue] = useState("");
  const isCredit = question.id === "creditScore";
  const isGoal =
    question.id === "equityGoal" ||
    question.id === "refinanceGoal" ||
    question.id === "goalDetail";
  const useSlider =
    question.type === "currency" && currencyRanges[question.id];
  const context =
    contextOverride ??
    question.description ??
    defaultContextForQuestion(question.id);
  const visibleContext = introTitle
    ? "Skip anything you are unsure about."
    : shortContextForQuestion(question.id, context);

  return (
    <div
      key={`${question.id}-${rewardKey}`}
      className="mx-auto w-full max-w-xl animate-[funnel-step-in_260ms_cubic-bezier(0.22,1,0.36,1)_both]"
    >
      <div className="flex min-h-9 items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand sm:text-sm">
          {phaseLabel}
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="min-h-9 rounded-full px-3 text-sm font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            Back
          </button>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:mt-6 sm:p-7 md:p-8">
        {introTitle && (
          <div className="mb-6 rounded-2xl border border-brand/10 bg-brand-light/60 px-4 py-4 sm:mb-7">
            <p className="text-sm font-semibold text-brand">{introTitle}</p>
          </div>
        )}
        <h2 className="text-[1.55rem] font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl">
          {question.label}
        </h2>
        {visibleContext && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{visibleContext}</p>
        )}

        <div className="mt-7 sm:mt-8">
          {question.type === "single-select" && question.options && (
            <>
              {isCredit ? (
                <FunnelCreditCards
                  options={question.options}
                  onSelect={onAnswer}
                />
              ) : (
                <FunnelSelectCards
                  options={question.options}
                  onSelect={onAnswer}
                  columns={isGoal ? 1 : 2}
                  large={isGoal}
                />
              )}
            </>
          )}

          {question.type === "currency" && useSlider && (
            <FunnelCurrencySlider
              value=""
              onChange={() => {}}
              onContinue={onAnswer}
              min={currencyRanges[question.id]!.min}
              max={currencyRanges[question.id]!.max}
              label={question.label}
            />
          )}

          {question.type === "percentage" && (
            <FunnelPercentSlider value="6.5%" onContinue={onAnswer} />
          )}

          {question.type === "text" && (
            <div className="space-y-4">
              <textarea
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                placeholder="A short note is perfect."
                rows={5}
                enterKeyHint="done"
                className="input-field min-h-36 resize-none rounded-2xl leading-relaxed"
              />
              <button
                type="button"
                onClick={() => onAnswer(textValue.trim())}
                disabled={!textValue.trim()}
                className="btn-primary min-h-14 w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="mt-5 w-full rounded-full px-4 py-3 text-sm font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  );
}

function shortContextForQuestion(
  id: string,
  fallback?: string,
): string | undefined {
  const contexts: Record<string, string> = {
    equityGoal: "This helps focus your advisor's recommendations.",
    goalDetail: "This helps make the conversation more useful.",
    estimatedPropertyValue: "Your best estimate is enough.",
    mortgageBalance: "This helps estimate the equity picture.",
    desiredEquityAmount: "This gives your advisor a practical range.",
    creditScore: "No credit pull here.",
    occupancy: "This helps compare relevant equity options.",
    propertyType: "This helps match options to the property.",
    timeline: "This helps prioritize the next step.",
    advisorNotes: "This helps your advisor prepare personally.",
  };
  return contexts[id] ?? fallback;
}

function defaultContextForQuestion(id: string): string | undefined {
  const contexts: Record<string, string> = {
    purchasePrice:
      "This helps us understand how much flexibility your budget may provide.",
    downPayment:
      "A rough number is fine. This helps your advisor understand payment comfort.",
    estimatedPropertyValue:
      "Your best estimate is enough. Your advisor can review the details later.",
    mortgageBalance:
      "A ballpark balance helps us understand the equity picture.",
    desiredEquityAmount:
      "This gives your advisor a practical range to plan around.",
    homeValue:
      "This helps estimate equity and whether refinancing may be worth exploring.",
    currentBalance:
      "Your current balance helps us model payment and equity scenarios.",
    currentRate:
      "Your current rate helps compare whether a new structure makes sense.",
    creditScore:
      "No credit pull here. This helps prepare a more realistic conversation.",
    timeline:
      "Your ideal timing helps your advisor prioritize what to discuss first.",
    propertyType:
      "This helps your advisor focus on options that match the property.",
    occupancy:
      "How you use the home can shape the strategies worth comparing.",
    workingWithRealtor:
      "This helps us prepare the right purchase timeline conversation.",
  };
  return contexts[id];
}

export function FunnelGoalStep({
  prompt,
  options,
  phaseLabel,
  onSelect,
}: {
  prompt: string;
  options: { value: string; label: string }[];
  phaseLabel: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="funnel-step-enter mx-auto w-full max-w-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
        {phaseLabel}
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          {prompt}
        </h2>
        <p className="mt-3 text-sm text-muted">
          Choose what fits best. You can refine as your strategy builds.
        </p>
        <div className="mt-8">
          <FunnelSelectCards
            options={options}
            onSelect={onSelect}
            columns={1}
            large
          />
        </div>
      </div>
    </div>
  );
}

export function FunnelRewardPulse({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-50 flex items-center justify-center",
        "animate-[funnel-reward_600ms_ease-out_forwards]",
      )}
    >
      <div className="h-24 w-24 rounded-full bg-brand/10 blur-2xl" />
    </div>
  );
}

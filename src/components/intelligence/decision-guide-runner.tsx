"use client";

import { useRef, useState } from "react";
import { StrategySnapshot } from "@/components/intelligence/strategy-snapshot";
import { trackConversionEvent } from "@/lib/analytics/events";
import {
  evaluateGuide,
  type DecisionGuide,
} from "@/lib/content/decision-guides";

type DecisionGuideRunnerProps = {
  guide: DecisionGuide;
};

export function DecisionGuideRunner({ guide }: DecisionGuideRunnerProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const started = useRef(false);

  const total = guide.questions.length;
  const current = guide.questions[step];

  function choose(optionIndex: number) {
    if (!started.current) {
      started.current = true;
      trackConversionEvent("decision_guide_started", { guide: guide.slug });
    }
    const nextAnswers = { ...answers, [current.id]: optionIndex };
    setAnswers(nextAnswers);

    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      const tier = evaluateGuide(guide, nextAnswers);
      setCompleted(true);
      trackConversionEvent("decision_guide_completed", {
        guide: guide.slug,
        tier,
      });
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setCompleted(false);
  }

  if (completed) {
    const tier = evaluateGuide(guide, answers);
    const result = guide.guidance[tier];
    return (
      <div>
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            Educational guidance
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {result.headline}
          </h2>
          <p className="mt-3 leading-relaxed text-muted">{result.summary}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-5 text-sm font-semibold text-brand hover:underline"
          >
            Start over
          </button>
        </div>

        <StrategySnapshot
          snapshot={result.snapshot}
          sourceId={`guide_${guide.slug}`}
          className="mt-8 px-0"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <span>
          Question {step + 1} of {total}
        </span>
        <span>{Math.round(((step + 1) / total) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          {current.prompt}
        </h2>
        {current.helper && (
          <p className="mt-2 text-sm text-muted">{current.helper}</p>
        )}
        <div className="mt-6 grid gap-3">
          {current.options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              onClick={() => choose(index)}
              className="card-elevated flex items-center justify-between gap-4 p-4 text-left transition-colors hover:border-brand"
            >
              <span className="font-medium">{option.label}</span>
              <span aria-hidden className="text-muted">
                →
              </span>
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="mt-6 text-sm font-medium text-muted hover:text-foreground"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

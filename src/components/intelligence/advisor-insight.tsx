"use client";

import { useState } from "react";
import { trackConversionEvent } from "@/lib/analytics/events";
import type { AdvisorInsight as AdvisorInsightData } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

type AdvisorInsightProps = {
  insight: AdvisorInsightData;
  sourceId: string;
  className?: string;
};

/**
 * Reusable, conversational advisor note. Warm and helpful, never sales-focused.
 * Expanding the longer note reports engagement.
 */
export function AdvisorInsight({
  insight,
  sourceId,
  className,
}: AdvisorInsightProps) {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      trackConversionEvent("advisor_insight_expanded", { source: sourceId });
    }
  }

  return (
    <section className={cn("section-container", className)}>
      <div className="rounded-2xl border border-brand/20 bg-brand-light/50 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            BL
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            Advisor Insight
          </p>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          &ldquo;{insight.body}&rdquo;
        </p>
        {insight.more && (
          <>
            {expanded && (
              <p className="mt-3 leading-relaxed text-muted">{insight.more}</p>
            )}
            <button
              type="button"
              onClick={toggle}
              className="mt-4 text-sm font-semibold text-brand hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}

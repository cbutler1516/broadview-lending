"use client";

import { cn } from "@/lib/utils/cn";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";
import { StrategyBuilderProgress } from "@/components/funnel/strategy-builder-progress";

type LiveStrategyPanelProps = {
  sections: BuilderSectionState[];
  goal?: string;
  estimatedEquity?: string;
  timeline?: string;
  options?: string[];
  advisorNotes?: string[];
  conversationTopics?: string[];
  phaseLabel: string;
  className?: string;
  compact?: boolean;
};

export function LiveStrategyPanel({
  sections,
  goal,
  estimatedEquity,
  timeline,
  options = [],
  advisorNotes = [],
  conversationTopics = [],
  phaseLabel,
  className,
  compact,
}: LiveStrategyPanelProps) {
  return (
    <aside
      className={cn(
        "funnel-strategy-panel overflow-hidden rounded-2xl border border-white/30 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="border-b border-white/20 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Your Strategy
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{phaseLabel}</p>
      </div>

      <div className={cn("px-5 py-4", compact ? "max-h-[50vh] overflow-y-auto" : "")}>
        <StrategyBuilderProgress sections={sections} />

        <div className="mt-6 space-y-4 border-t border-white/20 pt-4">
          {goal && (
            <PanelRow label="Goal" value={goal} animate />
          )}
          {estimatedEquity && (
            <PanelRow label="Estimated Equity" value={estimatedEquity} animate />
          )}
          {timeline && <PanelRow label="Timeline" value={timeline} />}
          {options.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Potential Options
              </p>
              <ul className="mt-2 space-y-1.5">
                {options.map((opt) => (
                  <li
                    key={opt}
                    className="funnel-panel-fill rounded-lg bg-brand-light/60 px-3 py-2 text-sm font-medium text-foreground"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {advisorNotes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Advisor Notes
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {advisorNotes.map((note) => (
                  <li key={note} className="leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {conversationTopics.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Conversation Topics
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {conversationTopics.map((topic) => (
                  <li key={topic}>· {topic}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function PanelRow({
  label,
  value,
  animate,
}: {
  label: string;
  value: string;
  animate?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-medium text-foreground",
          animate && "funnel-panel-fill",
        )}
      >
        {value}
      </p>
    </div>
  );
}

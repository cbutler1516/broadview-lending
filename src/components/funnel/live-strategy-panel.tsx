"use client";

import { cn } from "@/lib/utils/cn";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";

type LiveStrategyPanelProps = {
  sections: BuilderSectionState[];
  goal?: string;
  propertyAddress?: string;
  estimatedEquity?: string;
  timeline?: string;
  options?: string[];
  advisorNotes?: string[];
  conversationTopics?: string[];
  phaseLabel: string;
  className?: string;
  compact?: boolean;
  creditProfileCaptured?: boolean;
  cashTargetCaptured?: boolean;
  contactCaptured?: boolean;
};

export function LiveStrategyPanel({
  goal,
  propertyAddress,
  estimatedEquity,
  timeline,
  options = [],
  advisorNotes = [],
  conversationTopics = [],
  phaseLabel,
  className,
  compact,
  creditProfileCaptured,
  cashTargetCaptured,
  contactCaptured,
}: LiveStrategyPanelProps) {
  let equityPreparation = "We'll note the equity range that would be most useful.";
  if (estimatedEquity) {
    equityPreparation = "Available equity range is ready for review.";
  } else if (cashTargetCaptured) {
    equityPreparation = "Equity target recorded.";
  }

  const propertyItems = [
    propertyAddress
      ? "Property located for advisor review."
      : "We'll start by confirming the property.",
    equityPreparation,
  ];

  const learnedItems = [
    goal ? "Your primary goal is noted." : "We'll learn what you want to accomplish.",
    creditProfileCaptured
      ? "Credit profile received for planning."
      : "Credit context helps shape realistic options.",
    timeline ? "Preferred timing noted." : "Timing can stay flexible for now.",
  ];

  const topicItems =
    conversationTopics.length > 0
      ? conversationTopics
      : [
          "We'll review available financing strategies.",
          "We'll discuss payment flexibility.",
          "We'll compare available equity options.",
        ];

  const preparationItems = [
    contactCaptured
      ? "Your advisor has enough information to begin review."
      : "Your advisor review begins after contact details are shared.",
    options.length > 0
      ? "Recommendations are being organized for comparison."
      : "Recommendations will be prepared around your goals.",
    ...advisorNotes,
  ].slice(0, 4);

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
        <div className="space-y-5">
          <PanelSection title="Your Property" items={propertyItems} />
          <PanelSection title="What We've Learned" items={learnedItems} />
          <PanelSection title="Topics We'll Discuss" items={topicItems} />
          <PanelSection title="Advisor Preparation" items={preparationItems} />
        </div>
      </div>
    </aside>
  );
}

function PanelSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={`${title}-${item}`}
            className="funnel-panel-fill rounded-xl bg-white/55 px-3 py-2 text-sm leading-relaxed text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

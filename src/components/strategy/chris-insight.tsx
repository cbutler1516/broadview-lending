"use client";

import { useStrategy } from "@/components/strategy/strategy-provider";
import { pickChrisInsight } from "@/lib/strategy/chris-insights";
import { cn } from "@/lib/utils/cn";

type ChrisInsightProps = {
  className?: string;
  seed?: string;
};

export function ChrisInsight({ className, seed }: ChrisInsightProps) {
  const { workspace } = useStrategy();
  const journey = workspace.goal?.journey ?? workspace.ecosystemsVisited.at(-1);
  const insight = pickChrisInsight({
    journey: journey !== "unknown" ? journey : undefined,
    seed: seed ?? workspace.lastPath,
  });

  return (
    <aside
      className={cn(
        "rounded-2xl border border-border/80 bg-surface/80 p-5 backdrop-blur-sm scroll-reveal",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        Chris&apos;s Perspective
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{insight.body}</p>
    </aside>
  );
}

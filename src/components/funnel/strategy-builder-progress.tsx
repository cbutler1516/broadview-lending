"use client";

import { cn } from "@/lib/utils/cn";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";

type StrategyBuilderProgressProps = {
  sections: BuilderSectionState[];
  className?: string;
};

export function StrategyBuilderProgress({
  sections,
  className,
}: StrategyBuilderProgressProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={cn(
            "funnel-section-row flex items-start gap-4 py-3 transition-all duration-300",
            section.status === "active" && "funnel-section-active",
            section.status === "complete" && "opacity-100",
          )}
        >
          <div className="flex w-5 shrink-0 flex-col items-center pt-0.5">
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300",
                section.status === "complete" &&
                  "bg-brand text-white scale-100",
                section.status === "active" &&
                  "border-2 border-brand bg-brand-light text-brand",
                section.status === "preparing" &&
                  "border border-brand/40 bg-brand-light/50 text-brand animate-pulse",
                section.status === "waiting" &&
                  "border border-border bg-surface-muted text-muted",
              )}
            >
              {section.status === "complete" ? "✓" : ""}
            </span>
            {index < sections.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mt-1 h-6 w-px transition-colors duration-500",
                  section.status === "complete" ? "bg-brand/40" : "bg-border",
                )}
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {section.label}
            </p>
            <p
              className={cn(
                "mt-0.5 text-sm font-medium transition-colors duration-300",
                section.status === "waiting"
                  ? "text-muted/70"
                  : "text-foreground",
              )}
            >
              {section.detail ??
                (section.status === "waiting" ? "Waiting" : "In progress…")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

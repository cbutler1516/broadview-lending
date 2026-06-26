import { cn } from "@/lib/utils/cn";

const phases = [
  "Goal",
  "Understand",
  "Discuss",
  "Strategy",
  "Advisor",
];

type DecisionPathProps = {
  active?: number;
  className?: string;
};

/** Compact visual of the goal-first path — not a progress bar, a guide. */
export function DecisionPath({ active = 0, className }: DecisionPathProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="list"
      aria-label="Decision path"
    >
      {phases.map((phase, i) => (
        <span key={phase} role="listitem" className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              i <= active
                ? "bg-brand-light text-brand"
                : "bg-surface-muted text-muted",
            )}
          >
            {phase}
          </span>
          {i < phases.length - 1 && (
            <span aria-hidden className="text-muted">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

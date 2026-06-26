import { cn } from "@/lib/utils/cn";

type AdvisorPromiseProps = {
  className?: string;
  compact?: boolean;
};

/**
 * Reusable human-first promise strip used across ecosystems.
 */
export function AdvisorPromise({ className, compact }: AdvisorPromiseProps) {
  return (
    <section
      className={cn(
        "border-y border-border bg-surface-muted",
        compact ? "py-10 md:py-12" : "py-14 md:py-16",
        className,
      )}
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          {!compact && (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              The Broadview promise
            </p>
          )}
          <p
            className={cn(
              "font-semibold tracking-tight text-foreground",
              compact ? "text-xl md:text-2xl" : "mt-3 text-2xl md:text-3xl",
            )}
          >
            Technology helps us prepare. A real advisor helps you decide.
          </p>
          {!compact && (
            <p className="mt-4 text-muted">
              Every strategy gets a human review before any recommendation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

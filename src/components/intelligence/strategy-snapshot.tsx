import { BookingLink } from "@/components/booking-link";
import { InViewTracker } from "@/components/analytics/in-view-tracker";
import type { StrategySnapshot as StrategySnapshotData } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

type StrategySnapshotProps = {
  snapshot: StrategySnapshotData;
  /** Identifier for analytics (page slug/path). */
  sourceId: string;
  heading?: string;
  className?: string;
};

type Block = { title: string; items: string[] };

/**
 * The signature output of the Broadview Intelligence Layer. Educational guidance
 * only — never implies qualification or approval.
 */
export function StrategySnapshot({
  snapshot,
  sourceId,
  heading = "Your Strategy Snapshot",
  className,
}: StrategySnapshotProps) {
  const blocks: Block[] = [
    { title: "What we learned", items: snapshot.whatWeLearned },
    { title: "Strategies worth discussing", items: snapshot.strategies },
    { title: "Questions we'd ask together", items: snapshot.questions },
    { title: "Things we'd verify", items: snapshot.thingsToVerify },
    { title: "Common mistakes to avoid", items: snapshot.commonMistakes },
  ].filter((b) => b.items.length > 0);

  return (
    <section className={cn("section-container", className)}>
      <InViewTracker
        event="strategy_snapshot_viewed"
        metadata={{ source: sourceId }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="border-b border-border bg-surface-muted px-6 py-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            Broadview Intelligence
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-6 px-6 py-6 md:grid-cols-2 md:px-8 md:py-8">
          {blocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                {block.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border bg-surface-muted px-6 py-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            Recommended next step
          </p>
          <p className="mt-2 leading-relaxed text-foreground">{snapshot.nextStep}</p>
          <BookingLink
            location={`strategy_snapshot_${sourceId}`}
            className="btn-primary mt-5"
          >
            Talk Through My Strategy
          </BookingLink>
        </div>
      </div>
    </section>
  );
}

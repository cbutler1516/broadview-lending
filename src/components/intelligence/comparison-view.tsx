import { InViewTracker } from "@/components/analytics/in-view-tracker";
import type { ComparisonSide } from "@/lib/content/comparisons";
import { cn } from "@/lib/utils/cn";

type ComparisonViewProps = {
  slug: string;
  a: ComparisonSide;
  b: ComparisonSide;
  questionsToDiscuss: string[];
  thingsToConsider: string[];
  className?: string;
};

function SideCard({ side }: { side: ComparisonSide }) {
  const groups: { title: string; items: string[]; tone?: string }[] = [
    { title: "Best for", items: side.bestFor },
    { title: "Advantages", items: side.advantages },
    { title: "Tradeoffs", items: side.tradeoffs, tone: "muted" },
  ];
  return (
    <div className="card-elevated flex flex-col p-6 md:p-7">
      <h3 className="text-xl font-semibold tracking-tight">{side.name}</h3>
      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              {group.title}
            </p>
            <ul className="mt-2 space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      group.tone === "muted" ? "bg-muted" : "bg-brand",
                    )}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonView({
  slug,
  a,
  b,
  questionsToDiscuss,
  thingsToConsider,
  className,
}: ComparisonViewProps) {
  return (
    <section className={cn("section-container", className)}>
      <InViewTracker event="comparison_viewed" metadata={{ comparison: slug }} />
      <div className="grid gap-5 md:grid-cols-2">
        <SideCard side={a} />
        <SideCard side={b} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-muted p-6">
          <h3 className="text-lg font-semibold">Questions we&apos;d discuss</h3>
          <ul className="mt-3 space-y-2">
            {questionsToDiscuss.map((q) => (
              <li key={q} className="flex items-start gap-2.5 text-sm text-muted">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface-muted p-6">
          <h3 className="text-lg font-semibold">Things to consider</h3>
          <ul className="mt-3 space-y-2">
            {thingsToConsider.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-muted">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStrategy } from "@/components/strategy/strategy-provider";
import { recommend, hasRecommendations } from "@/lib/intelligence/recommend";
import { workspaceToRecommendContext } from "@/lib/strategy/recommend-context";
import { getProgressPhase } from "@/lib/strategy/progress";
import { getEvolvingCta } from "@/lib/strategy/cta";
import { cn } from "@/lib/utils/cn";

function StatRow({
  label,
  value,
  done,
}: {
  label: string;
  value?: string | number;
  done?: boolean;
}) {
  if (value === undefined || value === "" || value === 0) return null;
  return (
    <div className="flex items-start justify-between gap-3 py-2 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-foreground">
        {done && <span className="mr-1 text-brand">✓</span>}
        {value}
      </span>
    </div>
  );
}

function ProgressBar({ percent, label }: { percent: number; label: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = requestAnimationFrame(() => setWidth(percent));
    return () => cancelAnimationFrame(t);
  }, [percent]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="tabular-nums text-muted">{percent}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/40">
        <div
          className="strategy-progress-bar h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function PanelContent({ onNavigate }: { onNavigate?: () => void }) {
  const { workspace } = useStrategy();
  const pathname = usePathname();
  const phase = getProgressPhase(workspace);
  const cta = getEvolvingCta(workspace);

  const recs = useMemo(
    () => recommend(workspaceToRecommendContext(workspace, pathname ?? undefined), 2),
    [workspace, pathname],
  );

  const hasSignal =
    workspace.goal ||
    workspace.progress > 0 ||
    workspace.articlesRead.length > 0 ||
    workspace.visits > 1;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/20 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          My Strategy
        </p>
        {!hasSignal ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Explore, read, and run tools — your plan builds as you go.
          </p>
        ) : (
          <ProgressBar percent={phase.percent} label={phase.label} />
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="divide-y divide-white/15">
          <StatRow label="Goal" value={workspace.goal?.title} done={Boolean(workspace.goal)} />
          <StatRow label="Timeline" value={workspace.timeline} />
          <StatRow label="Location" value={workspace.location} />
          <StatRow label="Estimated Budget" value={workspace.estimatedBudget} />
          <StatRow label="Down Payment" value={workspace.downPayment} />
          <StatRow label="Questions Saved" value={workspace.questionsSaved || undefined} />
          <StatRow label="Articles Read" value={workspace.articlesRead.length || undefined} />
          <StatRow
            label="Calculators Completed"
            value={workspace.calculatorsCompleted.length || undefined}
          />
          <StatRow label="Confidence" value={workspace.confidence ? `${workspace.confidence}%` : undefined} />
          <StatRow label="Advisor Status" value={workspace.advisorStatus} />
        </div>

        {hasRecommendations(recs) && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Next for you
            </p>
            <ul className="mt-3 space-y-2">
              {[
                ...recs.guides,
                ...recs.calculators,
                ...recs.comparisons,
                ...recs.articles,
                ...recs.landings,
              ]
                .slice(0, 3)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-xl border border-white/20 bg-white/30 px-3 py-2.5 text-sm font-medium transition hover:border-brand/30 hover:bg-white/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/20 p-4">
        <Link
          href={cta.href}
          onClick={onNavigate}
          className="btn-primary w-full text-center"
        >
          {cta.primary}
        </Link>
      </div>
    </div>
  );
}

export function StrategyWorkspace() {
  const { open, setOpen, toggle, workspace } = useStrategy();
  const hasActivity = workspace.progress > 0 || workspace.goal || workspace.visits > 1;

  return (
    <>
      {/* Desktop floating panel */}
      <div className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden md:block">
        <div
          className={cn(
            "pointer-events-auto absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end gap-2 pr-3",
            open && "pr-0",
          )}
        >
          {!open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "strategy-tab flex items-center gap-2 rounded-l-2xl border border-r-0 border-white/30 bg-white/70 px-4 py-3 text-sm font-semibold text-foreground shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-xl transition hover:bg-white/85",
                hasActivity && "border-brand/25",
              )}
              aria-expanded={open}
              aria-label="Open My Strategy"
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  hasActivity ? "bg-brand animate-pulse" : "bg-muted/60",
                )}
              />
              My Strategy
            </button>
          )}

          <div
            className={cn(
              "strategy-panel w-[min(100vw-1.5rem,22rem)] overflow-hidden rounded-l-2xl border border-white/30 bg-white/75 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-2xl transition-all duration-500 ease-out",
              open
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-full opacity-0",
            )}
            aria-hidden={!open}
          >
            <div className="flex items-center justify-between border-b border-white/20 px-5 py-3">
              <span className="text-sm font-semibold">Workspace</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-muted transition hover:bg-white/50 hover:text-foreground"
                aria-label="Close My Strategy"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[min(70vh,560px)]">
              <PanelContent onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        {!open && (
          <button
            type="button"
            onClick={toggle}
            className="mx-auto mb-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-5 py-2.5 text-sm font-semibold shadow-lg backdrop-blur-xl"
            aria-expanded={open}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                hasActivity ? "bg-brand" : "bg-muted/60",
              )}
            />
            My Strategy
            {workspace.progress > 0 && (
              <span className="tabular-nums text-muted">{workspace.progress}%</span>
            )}
          </button>
        )}

        <div
          className={cn(
            "strategy-sheet rounded-t-[1.75rem] border border-b-0 border-white/30 bg-white/85 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-transform duration-500 ease-out",
            open ? "translate-y-0" : "translate-y-full",
          )}
          aria-hidden={!open}
        >
          <div className="flex justify-center pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-1 w-10 rounded-full bg-border"
              aria-label="Close My Strategy"
            />
          </div>
          <div className="max-h-[75vh]">
            <PanelContent onNavigate={() => setOpen(false)} />
          </div>
        </div>

        {open && (
          <button
            type="button"
            aria-label="Dismiss"
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </>
  );
}

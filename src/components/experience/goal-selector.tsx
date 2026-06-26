"use client";

import Link from "next/link";
import { useState } from "react";
import { GoalIcon } from "@/components/experience/goal-icon";
import { cn } from "@/lib/utils/cn";

type GoalItem = {
  id: string;
  title: string;
  hint?: string;
  href: string;
  icon: string;
  discuss?: string[];
  strategyPreview?: string;
};

type GoalSelectorProps = {
  goals: GoalItem[];
  onSelect?: (goal: GoalItem | null) => void;
  context?: string;
  className?: string;
  columns?: 2 | 3;
};

export function isExperienceGoal(
  g: GoalItem,
): g is GoalItem & { discuss?: string[]; strategyPreview?: string } {
  return Boolean(g.discuss?.length || g.strategyPreview);
}

/**
 * Premium Apple-style goal selection. Minimal copy, strong icons, generous space.
 */
export function GoalSelector({
  goals,
  onSelect,
  className,
  columns = 3,
}: GoalSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(goal: GoalItem) {
    const next = selectedId === goal.id ? null : goal.id;
    setSelectedId(next);
    onSelect?.(next ? goal : null);
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {goals.map((goal) => {
        const selected = selectedId === goal.id;
        return (
          <Link
            key={goal.id}
            href={goal.href}
            onClick={() => handleSelect(goal)}
            className={cn(
              "group relative flex flex-col rounded-2xl border bg-surface p-6 transition-all duration-200",
              "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-card)]",
              selected ? "border-brand ring-2 ring-brand/20" : "border-border",
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                selected
                  ? "bg-brand text-white"
                  : "bg-brand-light text-brand group-hover:bg-brand group-hover:text-white",
              )}
            >
              <GoalIcon name={goal.icon} />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{goal.title}</h3>
            {goal.hint && (
              <p className="mt-1.5 text-sm text-muted">{goal.hint}</p>
            )}
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
              Continue
              <span aria-hidden>→</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

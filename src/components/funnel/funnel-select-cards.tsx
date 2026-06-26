"use client";

import { cn } from "@/lib/utils/cn";

type FunnelSelectCardsProps = {
  options: { value: string; label: string }[];
  value?: string;
  onSelect: (value: string) => void;
  columns?: 1 | 2;
  large?: boolean;
};

export function FunnelSelectCards({
  options,
  value,
  onSelect,
  columns = 1,
  large,
}: FunnelSelectCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2",
      )}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "funnel-card-select group rounded-2xl border text-left transition-all duration-200",
              large ? "px-5 py-5" : "px-4 py-4",
              selected
                ? "border-brand bg-brand-light ring-2 ring-brand/20 scale-[1.01]"
                : "border-border bg-surface hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-card)]",
            )}
          >
            <span
              className={cn(
                "block font-semibold tracking-tight",
                large ? "text-base" : "text-sm",
                selected ? "text-brand" : "text-foreground",
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

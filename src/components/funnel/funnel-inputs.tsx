"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type FunnelCurrencySliderProps = {
  value: string;
  onChange: (value: string) => void;
  onContinue: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};

function formatCurrency(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

function parseCurrency(value: string): number {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

export function FunnelCurrencySlider({
  value,
  onChange,
  onContinue,
  min = 50000,
  max = 2000000,
  step = 10000,
  label = "Amount",
}: FunnelCurrencySliderProps) {
  const initial = parseCurrency(value) || min;
  const [display, setDisplay] = useState(initial);

  function handleSlide(v: number) {
    setDisplay(v);
    onChange(formatCurrency(v));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface-muted px-5 py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </p>
        <p className="funnel-value-display mt-2 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
          {formatCurrency(display)}
        </p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={display}
        onChange={(e) => handleSlide(Number(e.target.value))}
        className="funnel-slider w-full"
        aria-label={label}
      />

      <div className="flex justify-between text-xs text-muted">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}+</span>
      </div>

      <button
        type="button"
        onClick={() => onContinue(formatCurrency(display))}
        className="btn-primary w-full"
      >
        Continue
      </button>
    </div>
  );
}

type FunnelPercentSliderProps = {
  value: string;
  onContinue: (value: string) => void;
};

export function FunnelPercentSlider({ value, onContinue }: FunnelPercentSliderProps) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 6.5;
  const [display, setDisplay] = useState(numeric);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface-muted px-5 py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Interest Rate
        </p>
        <p className="funnel-value-display mt-2 text-4xl font-semibold tracking-tight tabular-nums">
          {display.toFixed(2)}%
        </p>
      </div>
      <input
        type="range"
        min={2}
        max={12}
        step={0.125}
        value={display}
        onChange={(e) => setDisplay(Number(e.target.value))}
        className="funnel-slider w-full"
        aria-label="Interest rate"
      />
      <button
        type="button"
        onClick={() => onContinue(`${display}%`)}
        className="btn-primary w-full"
      >
        Continue
      </button>
    </div>
  );
}

export function FunnelCreditCards({
  options,
  onSelect,
}: {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={cn(
            "funnel-card-select rounded-2xl border border-border bg-surface px-4 py-4 text-left transition-all duration-200",
            "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-card)]",
          )}
        >
          <span className="text-sm font-semibold">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

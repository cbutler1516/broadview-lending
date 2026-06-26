"use client";

import { useRef, useState } from "react";
import { CalculatorResult } from "@/components/tools/calculator-result";
import { trackConversionEvent } from "@/lib/analytics/events";
import { recordCalculator } from "@/lib/strategy/workspace";

const TOOL_SLUG = "cash-out-vs-heloc";

type Field = {
  key: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

const fields: Field[] = [
  { key: "value", label: "Estimated home value", prefix: "$" },
  { key: "balance", label: "Current mortgage balance", prefix: "$" },
  { key: "currentRate", label: "Current first-mortgage rate", suffix: "%" },
  { key: "cashNeeded", label: "Cash you'd like to access", prefix: "$" },
  { key: "newRate", label: "Estimated cash-out refi rate", suffix: "%" },
];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CashOutVsHelocCalculator() {
  const [values, setValues] = useState<Record<string, string>>({
    value: "650000",
    balance: "300000",
    currentRate: "3.25",
    cashNeeded: "75000",
    newRate: "6.75",
  });
  const [result, setResult] = useState<{
    availableEquity: number;
    fits: boolean;
    favorHeloc: boolean;
    rateGap: number;
  } | null>(null);
  const started = useRef(false);

  function update(key: string, value: string) {
    if (!started.current) {
      started.current = true;
      trackConversionEvent("calculator_started", { tool: TOOL_SLUG });
    }
    setValues((v) => ({ ...v, [key]: value }));
  }

  function calculate() {
    const value = Number(values.value) || 0;
    const balance = Number(values.balance) || 0;
    const currentRate = Number(values.currentRate) || 0;
    const cashNeeded = Number(values.cashNeeded) || 0;
    const newRate = Number(values.newRate) || 0;

    const maxTotal = value * 0.8;
    const availableEquity = Math.max(0, maxTotal - balance);
    const fits = cashNeeded <= availableEquity;
    const rateGap = newRate - currentRate;
    const favorHeloc = rateGap >= 0.5; // preserving a meaningfully lower rate

    setResult({ availableEquity, fits, favorHeloc, rateGap });
    trackConversionEvent("calculator_completed", {
      tool: TOOL_SLUG,
      favorHeloc,
      fits,
    });
    recordCalculator(TOOL_SLUG);
  }

  const recommendation = result
    ? !result.fits
      ? `At roughly 80% of value, your estimated available equity is ${usd.format(
          result.availableEquity,
        )}, which is below the cash you'd like to access. An advisor can review higher-CLTV programs or alternative structures with you.`
      : result.favorHeloc
        ? `Because your current rate is meaningfully lower than today's cash-out rate, a HELOC likely lets you access roughly ${usd.format(
            Number(values.cashNeeded) || 0,
          )} while preserving your ${values.currentRate}% first mortgage. A cash-out refinance would reset that rate.`
        : `Your current rate and today's cash-out rate are close, so a cash-out refinance consolidating into one payment may be reasonable. A HELOC remains worth comparing for flexibility.`
    : "";

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="card-elevated p-6 md:p-7">
        <div className="space-y-4">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="text-sm font-medium">{field.label}</span>
              <div className="mt-1.5 flex items-center">
                {field.prefix && (
                  <span className="mr-1 text-muted">{field.prefix}</span>
                )}
                <input
                  type="number"
                  inputMode="decimal"
                  value={values[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="input-field"
                />
                {field.suffix && (
                  <span className="ml-1 text-muted">{field.suffix}</span>
                )}
              </div>
            </label>
          ))}
          <button type="button" onClick={calculate} className="btn-primary w-full">
            Compare My Options
          </button>
        </div>
      </div>

      <div>
        {result ? (
          <CalculatorResult
            toolSlug={TOOL_SLUG}
            stats={[
              {
                label: "Est. available equity (80% CLTV)",
                value: usd.format(result.availableEquity),
              },
              {
                label: "Cash requested fits?",
                value: result.fits ? "Likely yes" : "May exceed",
              },
              {
                label: "Rate gap (refi − current)",
                value: `${result.rateGap.toFixed(2)}%`,
              },
            ]}
            recommendation={recommendation}
            questions={[
              "Is preserving my current first-mortgage rate worth it?",
              "Do I prefer one fixed payment or flexible draws?",
              "How long will I carry this balance?",
            ]}
            funnelHref="/heloc"
            funnelLabel="Build My Home Equity Strategy"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center">
            <p className="max-w-sm text-sm text-muted">
              Enter your details and compare to see your estimated available equity
              and whether a HELOC or cash-out refinance may fit your goal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

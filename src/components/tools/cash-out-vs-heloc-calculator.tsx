"use client";

import { useRef, useState } from "react";
import { CalculatorResult } from "@/components/tools/calculator-result";
import { trackConversionEvent } from "@/lib/analytics/events";
import { recordCalculator } from "@/lib/strategy/workspace";
import { SampleScenarioControls } from "./sample-scenario-controls";
import { useSampleScenario } from "@/lib/tools/use-sample-scenario";
import { EQUITY_SAMPLE } from "@/lib/tools/sample-scenarios";

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
    value: "",
    balance: "",
    currentRate: "",
    cashNeeded: "",
    newRate: "",
  });
  const [result, setResult] = useState<{
    availableEquity: number;
    fits: boolean;
    favorHeloc: boolean;
    rateGap: number;
  } | null>(null);
  const started = useRef(false);
  const sample = useSampleScenario<{ values: Record<string, string>; result: typeof result }>();
  const valid = fields.every(({ key }) => values[key].trim() !== "" && Number.isFinite(Number(values[key])) && Number(values[key]) >= 0) && Number(values.value) > 0;

  function clear() {
    setValues({ value: "", balance: "", currentRate: "", cashNeeded: "", newRate: "" });
    setResult(null); sample.clear();
  }

  function update(key: string, value: string) {
    if (!sample.isSample && !started.current) {
      started.current = true;
      trackConversionEvent("calculator_started", { tool: TOOL_SLUG });
    }
    setValues((v) => ({ ...v, [key]: value }));
    setResult(null);
  }

  function calculate(inputs = values, isSample = sample.isSample) {
    const value = Number(inputs.value) || 0;
    const balance = Number(inputs.balance) || 0;
    const currentRate = Number(inputs.currentRate) || 0;
    const cashNeeded = Number(inputs.cashNeeded) || 0;
    const newRate = Number(inputs.newRate) || 0;

    const maxTotal = value * 0.8;
    const availableEquity = Math.max(0, maxTotal - balance);
    const fits = cashNeeded <= availableEquity;
    const rateGap = newRate - currentRate;
    const favorHeloc = rateGap >= 0.5; // preserving a meaningfully lower rate

    setResult({ availableEquity, fits, favorHeloc, rateGap });
    if (isSample) return;
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
        ? `Because the entered first-mortgage rate is meaningfully lower than the entered cash-out rate, compare a HELOC for the ${usd.format(
            Number(values.cashNeeded) || 0,
          )} cash goal while keeping the ${values.currentRate}% first mortgage. A cash-out refinance would replace that loan. Actual availability, HELOC pricing, payments and costs need separate review.`
        : `The entered first-mortgage and cash-out rates are close, so compare a cash-out refinance consolidating into one payment with a HELOC for flexibility. These assumptions are not current rate quotes.`
    : "";

  return (
    <div className="space-y-6">
      <SampleScenarioControls active={sample.isSample}
        description="See a fictional homeowner compare accessing equity while keeping a first mortgage versus replacing it."
        onLoad={() => { sample.load({ values, result }); setValues({ ...EQUITY_SAMPLE }); calculate(EQUITY_SAMPLE, true); }}
        onClear={clear}
        onRestore={sample.canRestore ? () => sample.restore((previous) => { setValues(previous.values); setResult(previous.result); }) : undefined} />
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
          <button type="button" disabled={!valid} onClick={() => calculate()} className="btn-primary w-full disabled:opacity-40">
            {sample.isSample ? "Recalculate Sample" : "Compare My Options"}
          </button>
        </div>
      </div>

      <div>
        {result ? (
          <CalculatorResult
            isSample={sample.isSample}
            toolSlug={TOOL_SLUG}
            stats={[
              {
                label: "Est. available equity (80% CLTV)",
                value: usd.format(result.availableEquity),
              },
              {
                label: "Within modeled 80% limit?",
                value: result.fits ? "Within assumption" : "Exceeds assumption",
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
    </div>
  );
}

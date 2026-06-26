"use client";

import { useRef, useState } from "react";
import { CalculatorResult } from "@/components/tools/calculator-result";
import { trackConversionEvent } from "@/lib/analytics/events";
import { recordCalcSnapshot, recordCalculator } from "@/lib/strategy/workspace";

const TOOL_SLUG = "affordability-planner";

type Field = {
  key: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

const fields: Field[] = [
  { key: "payment", label: "Comfortable monthly payment", prefix: "$" },
  { key: "down", label: "Down payment available", prefix: "$" },
  { key: "rate", label: "Estimated interest rate", suffix: "%" },
  { key: "taxIns", label: "Annual taxes + insurance", suffix: "%" },
];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function AffordabilityCalculator() {
  const [values, setValues] = useState<Record<string, string>>({
    payment: "3000",
    down: "40000",
    rate: "6.5",
    taxIns: "1.4",
  });
  const [result, setResult] = useState<{
    price: number;
    loan: number;
    pi: number;
    ti: number;
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
    const payment = Number(values.payment) || 0;
    const down = Number(values.down) || 0;
    const annualRate = (Number(values.rate) || 0) / 100;
    const tIns = (Number(values.taxIns) || 0) / 100;
    const n = 360;
    const r = annualRate / 12;

    // Monthly P&I per $1 of loan
    const piFactor = r > 0 ? r / (1 - Math.pow(1 + r, -n)) : 1 / n;

    // payment = loan*piFactor + (loan+down)*tIns/12  =>  solve for loan
    const monthlyTi = tIns / 12;
    const loan = Math.max(
      0,
      (payment - down * monthlyTi) / (piFactor + monthlyTi),
    );
    const price = loan + down;
    const pi = loan * piFactor;
    const ti = price * monthlyTi;

    setResult({ price, loan, pi, ti });
    trackConversionEvent("calculator_completed", {
      tool: TOOL_SLUG,
      price: Math.round(price),
    });
    recordCalculator(TOOL_SLUG);
    recordCalcSnapshot({
      budget: usd.format(price),
      downPayment: down > 0 ? `${Math.round((down / price) * 100)}%` : undefined,
    });
  }

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
            Calculate My Range
          </button>
        </div>
      </div>

      <div>
        {result ? (
          <CalculatorResult
            toolSlug={TOOL_SLUG}
            stats={[
              { label: "Estimated home price", value: usd.format(result.price) },
              { label: "Estimated loan amount", value: usd.format(result.loan) },
              {
                label: "Monthly P&I / taxes+ins",
                value: `${usd.format(result.pi)} / ${usd.format(result.ti)}`,
              },
            ]}
            recommendation={`Based on a comfortable payment of ${usd.format(
              Number(values.payment) || 0,
            )}, a home around ${usd.format(
              result.price,
            )} may fit. The smartest next step is confirming your real budget with a pre-approval — including reserves, not just the maximum you qualify for.`}
            questions={[
              "Should I optimize for a lower payment or a larger purchase price?",
              "How much should I keep in reserves after closing?",
              "Which loan program gives me the best total cost?",
            ]}
            funnelHref="/funnel/purchase"
            funnelLabel="Build My Buying Strategy"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted p-10 text-center">
            <p className="max-w-sm text-sm text-muted">
              Enter your numbers and calculate to see an estimated home price range
              and a personalized strategy snapshot.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

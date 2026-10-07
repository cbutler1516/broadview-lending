"use client";

import { useState } from "react";
import Link from "next/link";
import { SampleScenarioControls } from "./sample-scenario-controls";
import { useSampleScenario } from "@/lib/tools/use-sample-scenario";
import { OFFER_SAMPLE_A, OFFER_SAMPLE_B } from "@/lib/tools/sample-scenarios";
import { compareOffers, emptyOffer, evaluateOffer, offerFields, type OfferInputs } from "@/lib/tools/offer-comparison";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
function OfferCard({ label, value, onChange }: { label: string; value: OfferInputs; onChange: (value: OfferInputs) => void }) {
  const evaluation = evaluateOffer(value);
  const started = value.price !== "" || value.rate !== "" || value.downPercent !== "";
  return <fieldset className="min-w-0 rounded-2xl border border-border bg-white p-5 sm:p-7">
    <legend className="px-2 text-xl font-semibold">{label}</legend>
    <div className="grid gap-4 sm:grid-cols-2">{offerFields.map((field) => <label key={field.key} className="text-sm font-medium text-slate-700">
      {field.label}{"required" in field ? " *" : ""}
      <input aria-label={`${label}: ${field.label}`} type="number" min="0" step="any" inputMode="decimal" value={value[field.key]} onChange={(e) => onChange({ ...value, [field.key]: e.target.value })} className="input-field mt-2 min-h-12 w-full" />
    </label>)}</div>
    {evaluation.result ? <dl className="mt-6 grid gap-4 border-t border-border pt-6">
      {[
        ["Loan amount", evaluation.result.loanAmount], ["Down payment", evaluation.result.downPayment],
        ["Principal & interest / month", evaluation.result.principalAndInterest],
        ["Payment including entered monthly costs", evaluation.result.enteredMonthlyCosts],
        ["Estimated cash needed before deposits already paid", evaluation.result.acquisitionCash],
      ].map(([name, amount]) => <div key={name} className="flex items-start justify-between gap-4"><dt className="max-w-[65%] text-sm text-muted">{name}</dt><dd className="font-semibold tabular-nums">{currency.format(amount as number)}</dd></div>)}
      {evaluation.result.omittedCosts.length > 0 && <div className="rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-900"><dt className="font-semibold">Not entered; treated as $0</dt><dd>{evaluation.result.omittedCosts.join("; ")}. Actual costs may be higher.</dd></div>}
    </dl> : <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-muted">{started ? <ul>{evaluation.errors.map((error) => <li key={error}>{error}</li>)}</ul> : "Enter the price, down payment percentage, and rate to begin. No property values or rates are supplied for you."}</div>}
  </fieldset>;
}

export function OfferComparison() {
  const [a, setA] = useState(emptyOffer);
  const [b, setB] = useState(emptyOffer);
  const sample = useSampleScenario<{ a: OfferInputs; b: OfferInputs }>();
  function clear() { setA(emptyOffer()); setB(emptyOffer()); sample.clear(); }
  const resultA = evaluateOffer(a).result;
  const resultB = evaluateOffer(b).result;
  const comparison = resultA && resultB ? compareOffers(resultA, resultB) : null;
  return <div className="space-y-8">
    <SampleScenarioControls active={sample.isSample}
      description="Try a lower-price offer beside an offer with an eligible seller credit. Both examples populate instantly."
      onLoad={() => { sample.load({ a, b }); setA({ ...OFFER_SAMPLE_A }); setB({ ...OFFER_SAMPLE_B }); }}
      onClear={clear}
      onRestore={sample.canRestore ? () => sample.restore((previous) => { setA(previous.a); setB(previous.b); }) : undefined} />
    <div className="max-w-3xl"><h2 className="text-2xl font-semibold">Two offers. One clear comparison.</h2><p className="mt-3 text-sm leading-relaxed text-muted">Use a price reduction, a seller credit, or two actual properties. Enter current quote assumptions—not a forecast. These are fixed-rate, fully amortizing estimates, not APR calculations or loan offers. Required inputs are marked *; blank optional costs are treated as $0.</p></div>
    <div className="flex flex-wrap gap-3"><button type="button" className="btn-secondary min-h-11" onClick={() => setB({ ...a })}>Copy Offer A into B</button><button type="button" className="min-h-11 rounded-lg px-4 text-sm font-semibold text-muted underline underline-offset-4" onClick={clear}>Clear both offers</button></div>
    <div className="grid gap-6 xl:grid-cols-2"><OfferCard label="Offer A" value={a} onChange={setA} /><OfferCard label="Offer B" value={b} onChange={setB} /></div>
    {comparison && <section className="rounded-2xl bg-navy-950 p-7 text-white"><h2 className="text-xl font-semibold">Offer B compared with Offer A</h2><dl className="mt-5 grid gap-6 sm:grid-cols-2"><div><dt className="text-sm text-white/70">Change in entered monthly costs</dt><dd className="mt-2 text-3xl font-semibold">{currency.format(comparison.monthlyDifference)}</dd></div><div><dt className="text-sm text-white/70">Change in estimated upfront cash</dt><dd className="mt-2 text-3xl font-semibold">{currency.format(comparison.cashDifference)}</dd></div></dl><p className="mt-5 text-xs leading-relaxed text-white/70">A negative amount means B is lower; a positive amount means B is higher. Neither result makes an offer automatically better.</p></section>}
    <div className="rounded-2xl border border-border p-6 text-sm leading-relaxed text-muted"><h2 className="font-semibold text-foreground">Before you rely on the numbers</h2><p className="mt-2">Seller credits are limited to eligible costs in this comparison, not validated against any loan program’s concession limits. Your lender must confirm eligibility. Include applicable prepaids and escrow funding in your entered closing costs. Estimates exclude unentered costs, repairs, moving costs, and reserves; existing deposits are not deducted. Paying points does not automatically set a lower rate—enter the quoted rate for each offer. No future refinance, appreciation, or investment return is assumed.</p><Link href="/contact" className="btn-primary mt-5">Review these assumptions with Broadview</Link></div>
  </div>;
}

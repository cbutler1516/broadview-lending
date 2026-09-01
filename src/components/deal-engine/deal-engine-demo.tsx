"use client";

import { useMemo, useState } from "react";
import { evaluateDeal } from "@/lib/deal-engine";
import type { DealEngineMode, DealScenario, PaymentType, PropertyType } from "@/lib/deal-engine";

const MODES: DealEngineMode[] = ["investor", "realtor", "consumer"];
const PROPERTY_TYPES: PropertyType[] = [
  "sfr",
  "condo",
  "townhome",
  "2-4",
  "multifamily",
  "mixed_use",
  "other",
];

function num(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function money(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function ratio(value: number | null, digits = 2): string {
  if (value === null) return "—";
  return value.toFixed(digits);
}

function percent(value: number | null): string {
  if (value === null) return "—";
  return `${value.toFixed(2)}%`;
}

type FormState = Record<string, string>;

const EMPTY: FormState = {
  mode: "investor",
  address: "",
  propertyType: "sfr",
  purchasePrice: "",
  estimatedValue: "",
  arv: "",
  units: "",
  loanAmount: "",
  downPayment: "",
  interestRatePercent: "",
  amortizationYears: "",
  loanTermYears: "",
  interestOnlyMonths: "",
  paymentType: "principal_and_interest",
  lenderCosts: "",
  monthlyRent: "",
  otherMonthlyIncome: "",
  vacancyPercent: "",
  taxesAnnual: "",
  insuranceAnnual: "",
  hoaMonthly: "",
  utilitiesMonthly: "",
  managementMonthly: "",
  maintenanceMonthly: "",
  otherMonthly: "",
  renovationBudget: "",
  renovationMonths: "",
  rehabFinanced: "",
  refinanceLoanAmount: "",
  refinanceLtvPercent: "",
};

function toScenario(form: FormState): DealScenario {
  return {
    mode: form.mode as DealEngineMode,
    property: {
      address: form.address.trim() || undefined,
      propertyType: form.propertyType as PropertyType,
      purchasePrice: num(form.purchasePrice),
      estimatedValue: num(form.estimatedValue),
      arv: num(form.arv),
      units: num(form.units),
    },
    financing: {
      loanAmount: num(form.loanAmount),
      downPayment: num(form.downPayment),
      interestRatePercent: num(form.interestRatePercent),
      amortizationYears: num(form.amortizationYears),
      loanTermYears: num(form.loanTermYears),
      interestOnlyMonths: num(form.interestOnlyMonths),
      paymentType: form.paymentType as PaymentType,
      lenderCosts: num(form.lenderCosts),
    },
    income: {
      monthlyRent: num(form.monthlyRent),
      otherMonthlyIncome: num(form.otherMonthlyIncome),
      vacancyPercent: num(form.vacancyPercent),
    },
    expenses: {
      taxesAnnual: num(form.taxesAnnual),
      insuranceAnnual: num(form.insuranceAnnual),
      hoaMonthly: num(form.hoaMonthly),
      utilitiesMonthly: num(form.utilitiesMonthly),
      managementMonthly: num(form.managementMonthly),
      maintenanceMonthly: num(form.maintenanceMonthly),
      otherMonthly: num(form.otherMonthly),
    },
    rehab: {
      renovationBudget: num(form.renovationBudget),
      estimatedArv: num(form.arv),
      renovationMonths: num(form.renovationMonths),
      financed: form.rehabFinanced === "yes",
    },
    refinance: {
      loanAmount: num(form.refinanceLoanAmount),
      ltvPercent: num(form.refinanceLtvPercent),
    },
  };
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "number",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="block mb-1">{label}</span>
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full border border-slate-300 px-2 py-1"
      />
    </label>
  );
}

export function DealEngineDemo() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const analysis = useMemo(() => evaluateDeal(toScenario(form)), [form]);

  function update(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  const { metrics, breakdown } = analysis;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
        <fieldset className="space-y-2">
          <legend className="font-semibold">Mode</legend>
          <select
            value={form.mode}
            onChange={(event) => update("mode", event.target.value)}
            className="border border-slate-300 px-2 py-1"
          >
            {MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="font-semibold mb-2">Property</legend>
          <Field label="Address" name="address" type="text" value={form.address} onChange={update} />
          <label className="block text-sm">
            <span className="block mb-1">Property type</span>
            <select
              value={form.propertyType}
              onChange={(event) => update("propertyType", event.target.value)}
              className="w-full border border-slate-300 px-2 py-1"
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <Field label="Purchase price" name="purchasePrice" value={form.purchasePrice} onChange={update} />
          <Field label="Estimated value" name="estimatedValue" value={form.estimatedValue} onChange={update} />
          <Field label="ARV" name="arv" value={form.arv} onChange={update} />
          <Field label="Units" name="units" value={form.units} onChange={update} />
        </fieldset>

        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="font-semibold mb-2">Financing</legend>
          <Field label="Loan amount" name="loanAmount" value={form.loanAmount} onChange={update} />
          <Field label="Down payment" name="downPayment" value={form.downPayment} onChange={update} />
          <Field
            label="Interest rate %"
            name="interestRatePercent"
            value={form.interestRatePercent}
            onChange={update}
          />
          <Field
            label="Amortization (years)"
            name="amortizationYears"
            value={form.amortizationYears}
            onChange={update}
          />
          <Field label="Loan term (years)" name="loanTermYears" value={form.loanTermYears} onChange={update} />
          <Field
            label="Interest-only months"
            name="interestOnlyMonths"
            value={form.interestOnlyMonths}
            onChange={update}
          />
          <Field label="Lender / origination costs" name="lenderCosts" value={form.lenderCosts} onChange={update} />
        </fieldset>

        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="font-semibold mb-2">Income</legend>
          <Field label="Monthly rent" name="monthlyRent" value={form.monthlyRent} onChange={update} />
          <Field
            label="Other monthly income"
            name="otherMonthlyIncome"
            value={form.otherMonthlyIncome}
            onChange={update}
          />
          <Field label="Vacancy %" name="vacancyPercent" value={form.vacancyPercent} onChange={update} />
        </fieldset>

        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="font-semibold mb-2">Expenses</legend>
          <Field label="Taxes (annual)" name="taxesAnnual" value={form.taxesAnnual} onChange={update} />
          <Field label="Insurance (annual)" name="insuranceAnnual" value={form.insuranceAnnual} onChange={update} />
          <Field label="HOA (monthly)" name="hoaMonthly" value={form.hoaMonthly} onChange={update} />
          <Field label="Utilities (monthly)" name="utilitiesMonthly" value={form.utilitiesMonthly} onChange={update} />
          <Field
            label="Management (monthly)"
            name="managementMonthly"
            value={form.managementMonthly}
            onChange={update}
          />
          <Field
            label="Maintenance (monthly)"
            name="maintenanceMonthly"
            value={form.maintenanceMonthly}
            onChange={update}
          />
          <Field label="Other (monthly)" name="otherMonthly" value={form.otherMonthly} onChange={update} />
        </fieldset>

        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="font-semibold mb-2">Rehab / takeout</legend>
          <Field
            label="Renovation budget"
            name="renovationBudget"
            value={form.renovationBudget}
            onChange={update}
          />
          <Field
            label="Renovation months"
            name="renovationMonths"
            value={form.renovationMonths}
            onChange={update}
          />
          <label className="block text-sm">
            <span className="block mb-1">Rehab financed</span>
            <select
              value={form.rehabFinanced}
              onChange={(event) => update("rehabFinanced", event.target.value)}
              className="w-full border border-slate-300 px-2 py-1"
            >
              <option value="">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <Field
            label="Refinance loan amount"
            name="refinanceLoanAmount"
            value={form.refinanceLoanAmount}
            onChange={update}
          />
          <Field
            label="Refinance LTV % of ARV"
            name="refinanceLtvPercent"
            value={form.refinanceLtvPercent}
            onChange={update}
          />
        </fieldset>
      </form>

      <div>
        <h2 className="font-semibold mb-3">Engine output</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt>Monthly P&amp;I</dt>
          <dd>{money(metrics.monthlyPrincipalAndInterest)}</dd>
          <dt>Monthly housing / debt</dt>
          <dd>{money(metrics.monthlyHousingPayment)}</dd>
          <dt>NOI</dt>
          <dd>{money(metrics.noi)}</dd>
          <dt>Cap rate</dt>
          <dd>{percent(metrics.capRatePercent)}</dd>
          <dt>DSCR (NOI)</dt>
          <dd>{ratio(metrics.dscr, 2)}</dd>
          <dt>DSCR (rent / PITIA)</dt>
          <dd>{ratio(metrics.dscrRentPitia, 2)}</dd>
          <dt>Monthly cash flow</dt>
          <dd>{money(metrics.monthlyCashFlow)}</dd>
          <dt>Annual cash flow</dt>
          <dd>{money(metrics.annualCashFlow)}</dd>
          <dt>Cash invested</dt>
          <dd>{money(metrics.cashInvested)}</dd>
          <dt>Cash-on-cash</dt>
          <dd>{percent(metrics.cashOnCashPercent)}</dd>
          <dt>LTV</dt>
          <dd>{percent(metrics.ltvPercent)}</dd>
          <dt>LTC</dt>
          <dd>{percent(metrics.ltcPercent)}</dd>
          <dt>Acquisition cash</dt>
          <dd>{money(metrics.acquisitionCashRequired)}</dd>
          <dt>Flip profit</dt>
          <dd>{money(metrics.projectedFlipProfit)}</dd>
          <dt>Flip ROI</dt>
          <dd>{percent(metrics.projectedFlipRoiPercent)}</dd>
          <dt>BRRRR cash remaining</dt>
          <dd>{money(metrics.brrrrCashRemaining)}</dd>
          <dt>Value basis</dt>
          <dd>{money(breakdown.valueBasis)}</dd>
          <dt>Project cost</dt>
          <dd>{money(breakdown.projectCost)}</dd>
          <dt>Mode</dt>
          <dd>{analysis.scenario.mode}</dd>
        </dl>
      </div>
    </div>
  );
}

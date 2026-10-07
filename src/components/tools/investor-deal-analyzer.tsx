"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { evaluateDeal } from "@/lib/deal-engine";
import {
  formatDealMoney,
  formatDealPercent,
  formatDealRatio,
} from "@/lib/deal-engine/format";
import { trackConversionEvent } from "@/lib/analytics/events";
import { recordCalculator } from "@/lib/strategy/workspace";
import { CTA_NAVY, CTA_PRIMARY, CTA_SECONDARY } from "@/lib/ui/styles";
import {
  ANALYZER_COPY,
  ANALYZER_SHAPES,
  CLIENT_ANALYSIS_PRESENTATION_PATH,
  DEAL_ANALYZER_SLUG,
  EMPTY_ANALYZER_AGENT,
  EMPTY_ANALYZER_FORM,
  FINANCING_REVIEW_HREF,
  PROPERTY_TYPE_OPTIONS,
  formToDealScenario,
  hasStartedAnalysis,
  showBrrrrFields,
  showRehabFields,
  syncLoanAndDown,
  type AnalyzerAgent,
  type AnalyzerAudience,
  type AnalyzerForm,
  type AnalyzerShape,
} from "@/lib/tools/investor-deal-analyzer";
import type { ClientAnalysisDraft } from "@/lib/tools/client-analysis";
import {
  clearClientAnalysisDraft,
  presentationFlags,
  saveClientAnalysisDraft,
} from "@/lib/tools/client-analysis";
import { useClientAnalysisDraft } from "@/lib/tools/use-client-analysis-draft";
import { SampleScenarioControls } from "./sample-scenario-controls";
import { useSampleScenario } from "@/lib/tools/use-sample-scenario";
import { createAnalyzerSample, SAMPLE_NOTICE } from "@/lib/tools/sample-scenarios";

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-11 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 ${
              active
                ? "bg-navy-900 text-white"
                : "bg-slate-100 text-navy-800 hover:bg-slate-200"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-medium text-navy-900 mb-1.5">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  inputMode = "decimal",
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputMode?: "decimal" | "numeric" | "text";
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type="text"
      inputMode={inputMode}
      autoComplete={autoComplete ?? "off"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="input-field"
    />
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "muted";
}) {
  const color =
    tone === "positive"
      ? "text-teal-700"
      : tone === "negative"
        ? "text-rose-700"
        : tone === "muted"
          ? "text-slate-400"
          : "text-navy-900";
  return (
    <div className="border-t border-slate-200/90 pt-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-xl sm:text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
    </div>
  );
}

function cashTone(value: number | null): "positive" | "negative" | undefined {
  if (value === null) return undefined;
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return undefined;
}

export function InvestorDealAnalyzer() {
  const draft = useClientAnalysisDraft();
  const restoreKey = draft === undefined ? "pending" : draft ? "restored" : "fresh";

  return (
    <InvestorDealAnalyzerForm key={restoreKey} initialDraft={draft ?? null} />
  );
}

function InvestorDealAnalyzerForm({
  initialDraft,
}: {
  initialDraft: ClientAnalysisDraft | null;
}) {
  const router = useRouter();
  const [audience, setAudience] = useState<AnalyzerAudience>(
    initialDraft?.audience ?? "investor",
  );
  const [shape, setShape] = useState<AnalyzerShape>(initialDraft?.shape ?? "hold");
  const [form, setForm] = useState<AnalyzerForm>(initialDraft?.form ?? EMPTY_ANALYZER_FORM);
  const [agent, setAgent] = useState<AnalyzerAgent>(
    initialDraft?.agent ?? EMPTY_ANALYZER_AGENT,
  );
  const started = useRef(false);
  const completed = useRef(false);
  const sample = useSampleScenario<{ form: AnalyzerForm; shape: AnalyzerShape }>(initialDraft?.isSample ?? false);
  const isSample = sample.isSample;
  const copy = ANALYZER_COPY[audience];

  const analysis = useMemo(
    () => evaluateDeal(formToDealScenario(form, audience, shape, agent)),
    [form, audience, shape, agent],
  );
  const startedAnalysis = hasStartedAnalysis(form);
  const { metrics } = analysis;
  const includeRehab = showRehabFields(shape);
  const includeBrrrr = showBrrrrFields(shape);
  const { showLtc, showFlip, showBrrrr } = presentationFlags(shape, metrics);

  function markStarted() {
    if (isSample || started.current) return;
    started.current = true;
    trackConversionEvent("calculator_started", { tool: DEAL_ANALYZER_SLUG });
  }

  function update<K extends keyof AnalyzerForm>(key: K, value: AnalyzerForm[K]) {
    markStarted();
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "purchasePrice" || key === "downPayment" || key === "loanAmount") {
        return syncLoanAndDown(next, key);
      }
      return next;
    });
  }

  useEffect(() => {
    if (isSample || !startedAnalysis || completed.current) return;
    completed.current = true;
    trackConversionEvent("calculator_completed", {
      tool: DEAL_ANALYZER_SLUG,
      mode: audience,
      shape,
    });
    recordCalculator(DEAL_ANALYZER_SLUG);
  }, [startedAnalysis, audience, shape, isSample]);

  function updateAgent<K extends keyof AnalyzerAgent>(key: K, value: AnalyzerAgent[K]) {
    setAgent((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    sample.clear();
    setForm(EMPTY_ANALYZER_FORM);
    setAgent(EMPTY_ANALYZER_AGENT);
    completed.current = false;
    clearClientAnalysisDraft();
  }

  function createClientAnalysis() {
    saveClientAnalysisDraft({
      version: 1,
      audience,
      shape,
      form,
      agent,
      isSample,
    });
    trackConversionEvent("tool_cta_clicked", {
      tool: DEAL_ANALYZER_SLUG,
      destination: CLIENT_ANALYSIS_PRESENTATION_PATH,
    });
    router.push(CLIENT_ANALYSIS_PRESENTATION_PATH);
  }

  return (
    <div className="space-y-6">
      <SampleScenarioControls active={isSample}
        description="Load an example for the selected deal structure. In sample mode, switch between Hold / rental, Rehab / flip, and BRRRR to explore each one. Agent details remain yours."
        onLoad={() => { sample.load({ form, shape }); setForm(createAnalyzerSample(shape)); }}
        onClear={() => { setForm(EMPTY_ANALYZER_FORM); sample.clear(); clearClientAnalysisDraft(); }}
        onRestore={sample.canRestore ? () => sample.restore((previous) => { setForm(previous.form); setShape(previous.shape); }) : undefined} />
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <form className="lg:col-span-6 space-y-10" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Who is this for
          </p>
          <Segmented
            label="User mode"
            value={audience}
            onChange={setAudience}
            options={[
              { value: "investor", label: "Investor" },
              { value: "realtor", label: "Realtor / Agent" },
            ]}
          />
          <p className="text-sm text-slate-500 leading-relaxed">{copy.helper}</p>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Deal structure
          </p>
          <Segmented
            label="Deal structure"
            value={shape}
            onChange={(next) => { setShape(next); if (isSample) setForm(createAnalyzerSample(next)); }}
            options={ANALYZER_SHAPES}
          />
        </div>

        {audience === "realtor" ? (
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
              Your details
            </legend>
            <p className="text-xs text-slate-400">
              Optional. Shown on the client analysis as the presenting agent.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="agentName" label="Agent name">
                <TextInput
                  id="agentName"
                  value={agent.name}
                  onChange={(value) => updateAgent("name", value)}
                  inputMode="text"
                  autoComplete="name"
                />
              </Field>
              <Field id="agentBrokerage" label="Brokerage">
                <TextInput
                  id="agentBrokerage"
                  value={agent.brokerage}
                  onChange={(value) => updateAgent("brokerage", value)}
                  inputMode="text"
                  autoComplete="organization"
                />
              </Field>
              <Field id="agentEmail" label="Email">
                <TextInput
                  id="agentEmail"
                  value={agent.email}
                  onChange={(value) => updateAgent("email", value)}
                  inputMode="text"
                  autoComplete="email"
                />
              </Field>
              <Field id="agentPhone" label="Phone">
                <TextInput
                  id="agentPhone"
                  value={agent.phone}
                  onChange={(value) => updateAgent("phone", value)}
                  inputMode="text"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </fieldset>
        ) : null}

        <fieldset className="space-y-4">
          <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
            Property
          </legend>
          <Field id="address" label="Address (optional)">
            <TextInput
              id="address"
              value={form.address}
              onChange={(value) => update("address", value)}
              inputMode="text"
              autoComplete="street-address"
            />
          </Field>
          <Field id="propertyType" label="Property type">
            <select
              id="propertyType"
              value={form.propertyType}
              onChange={(event) =>
                update("propertyType", event.target.value as AnalyzerForm["propertyType"])
              }
              className="input-field"
            >
              {PROPERTY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="purchasePrice" label="Purchase price">
              <TextInput
                id="purchasePrice"
                value={form.purchasePrice}
                onChange={(value) => update("purchasePrice", value)}
              />
            </Field>
            <Field id="estimatedValue" label="Estimated value">
              <TextInput
                id="estimatedValue"
                value={form.estimatedValue}
                onChange={(value) => update("estimatedValue", value)}
              />
            </Field>
            <Field id="arv" label="ARV" hint="After-repair or after-completion value">
              <TextInput id="arv" value={form.arv} onChange={(value) => update("arv", value)} />
            </Field>
            <Field id="units" label="Units">
              <TextInput
                id="units"
                value={form.units}
                onChange={(value) => update("units", value)}
                inputMode="numeric"
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
            Financing
          </legend>
          <p className="text-xs text-slate-400">
            Enter down payment or loan amount — the other updates from purchase price.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="downPayment" label="Down payment">
              <TextInput
                id="downPayment"
                value={form.downPayment}
                onChange={(value) => update("downPayment", value)}
              />
            </Field>
            <Field id="loanAmount" label="Loan amount">
              <TextInput
                id="loanAmount"
                value={form.loanAmount}
                onChange={(value) => update("loanAmount", value)}
              />
            </Field>
            <Field id="interestRatePercent" label="Interest rate (%)">
              <TextInput
                id="interestRatePercent"
                value={form.interestRatePercent}
                onChange={(value) => update("interestRatePercent", value)}
              />
            </Field>
            <Field id="lenderCosts" label="Lender / origination costs">
              <TextInput
                id="lenderCosts"
                value={form.lenderCosts}
                onChange={(value) => update("lenderCosts", value)}
              />
            </Field>
            <Field id="amortizationYears" label="Amortization (years)">
              <TextInput
                id="amortizationYears"
                value={form.amortizationYears}
                onChange={(value) => update("amortizationYears", value)}
                inputMode="numeric"
              />
            </Field>
            <Field id="loanTermYears" label="Loan term (years)">
              <TextInput
                id="loanTermYears"
                value={form.loanTermYears}
                onChange={(value) => update("loanTermYears", value)}
                inputMode="numeric"
              />
            </Field>
          </div>
          <Segmented
            label="Payment type"
            value={form.paymentType}
            onChange={(value) => update("paymentType", value)}
            options={[
              { value: "principal_and_interest", label: "Principal & interest" },
              { value: "interest_only", label: "Interest-only" },
            ]}
          />
          {form.paymentType === "interest_only" ? (
            <Field id="interestOnlyMonths" label="Interest-only period (months)">
              <TextInput
                id="interestOnlyMonths"
                value={form.interestOnlyMonths}
                onChange={(value) => update("interestOnlyMonths", value)}
                inputMode="numeric"
              />
            </Field>
          ) : null}
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
            Income
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="monthlyRent" label="Monthly rent">
              <TextInput
                id="monthlyRent"
                value={form.monthlyRent}
                onChange={(value) => update("monthlyRent", value)}
              />
            </Field>
            <Field id="otherMonthlyIncome" label="Other monthly income">
              <TextInput
                id="otherMonthlyIncome"
                value={form.otherMonthlyIncome}
                onChange={(value) => update("otherMonthlyIncome", value)}
              />
            </Field>
            <Field id="vacancyPercent" label="Vacancy (%)">
              <TextInput
                id="vacancyPercent"
                value={form.vacancyPercent}
                onChange={(value) => update("vacancyPercent", value)}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
            Expenses
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="taxesAnnual" label="Taxes (annual)">
              <TextInput
                id="taxesAnnual"
                value={form.taxesAnnual}
                onChange={(value) => update("taxesAnnual", value)}
              />
            </Field>
            <Field id="insuranceAnnual" label="Insurance (annual)">
              <TextInput
                id="insuranceAnnual"
                value={form.insuranceAnnual}
                onChange={(value) => update("insuranceAnnual", value)}
              />
            </Field>
            <Field id="hoaMonthly" label="HOA (monthly)">
              <TextInput
                id="hoaMonthly"
                value={form.hoaMonthly}
                onChange={(value) => update("hoaMonthly", value)}
              />
            </Field>
            <Field id="utilitiesMonthly" label="Utilities (monthly)">
              <TextInput
                id="utilitiesMonthly"
                value={form.utilitiesMonthly}
                onChange={(value) => update("utilitiesMonthly", value)}
              />
            </Field>
            <Field id="managementMonthly" label="Management (monthly)">
              <TextInput
                id="managementMonthly"
                value={form.managementMonthly}
                onChange={(value) => update("managementMonthly", value)}
              />
            </Field>
            <Field id="maintenanceMonthly" label="Maintenance (monthly)">
              <TextInput
                id="maintenanceMonthly"
                value={form.maintenanceMonthly}
                onChange={(value) => update("maintenanceMonthly", value)}
              />
            </Field>
            <Field id="otherMonthly" label="Other operating (monthly)">
              <TextInput
                id="otherMonthly"
                value={form.otherMonthly}
                onChange={(value) => update("otherMonthly", value)}
              />
            </Field>
          </div>
        </fieldset>

        {includeRehab ? (
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
              Rehab
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="renovationBudget" label="Renovation budget">
                <TextInput
                  id="renovationBudget"
                  value={form.renovationBudget}
                  onChange={(value) => update("renovationBudget", value)}
                />
              </Field>
              <Field id="renovationMonths" label="Renovation period (months)">
                <TextInput
                  id="renovationMonths"
                  value={form.renovationMonths}
                  onChange={(value) => update("renovationMonths", value)}
                  inputMode="numeric"
                />
              </Field>
            </div>
          </fieldset>
        ) : null}

        {includeBrrrr ? (
          <fieldset className="space-y-4">
            <legend className="text-xl font-bold tracking-[-0.03em] text-navy-900 mb-1">
              Refinance takeout
            </legend>
            <p className="text-xs text-slate-400">
              Optional. Enter a refinance loan amount or an LTV on ARV — no default LTV is assumed.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="refinanceLoanAmount" label="Refinance loan amount">
                <TextInput
                  id="refinanceLoanAmount"
                  value={form.refinanceLoanAmount}
                  onChange={(value) => update("refinanceLoanAmount", value)}
                />
              </Field>
              <Field id="refinanceLtvPercent" label="Refinance LTV (% of ARV)">
                <TextInput
                  id="refinanceLtvPercent"
                  value={form.refinanceLtvPercent}
                  onChange={(value) => update("refinanceLtvPercent", value)}
                />
              </Field>
            </div>
          </fieldset>
        ) : null}
      </form>

      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-200/90 bg-slate-50 p-6 sm:p-8">
          {!startedAnalysis ? (
            <div className="py-10 sm:py-16 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
                {copy.resultsEyebrow}
              </p>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-sm mx-auto">
                {copy.empty}
              </p>
            </div>
          ) : (
            <>
              {isSample && <p className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed text-slate-600"><strong>Sample results. </strong>{SAMPLE_NOTICE}</p>}
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
                {copy.resultsEyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-navy-900 mb-2">
                {copy.resultsTitle}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{copy.resultsNote}</p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Metric
                  label="Monthly financing payment"
                  value={formatDealMoney(metrics.monthlyPrincipalAndInterest, true)}
                />
                <Metric
                  label="Monthly housing / debt"
                  value={formatDealMoney(metrics.monthlyHousingPayment, true)}
                />
                <Metric label="NOI" value={formatDealMoney(metrics.noi)} />
                <Metric label="Cap rate" value={formatDealPercent(metrics.capRatePercent)} />
                <Metric label="DSCR" value={formatDealRatio(metrics.dscr)} />
                <Metric
                  label="Monthly cash flow"
                  value={formatDealMoney(metrics.monthlyCashFlow)}
                  tone={cashTone(metrics.monthlyCashFlow)}
                />
                <Metric
                  label="Annual cash flow"
                  value={formatDealMoney(metrics.annualCashFlow)}
                  tone={cashTone(metrics.annualCashFlow)}
                />
                <Metric label="Cash invested" value={formatDealMoney(metrics.cashInvested)} />
                <Metric
                  label="Cash-on-cash"
                  value={formatDealPercent(metrics.cashOnCashPercent)}
                  tone={cashTone(metrics.cashOnCashPercent)}
                />
                <Metric label="LTV" value={formatDealPercent(metrics.ltvPercent)} />
                {showLtc ? (
                  <Metric label="LTC" value={formatDealPercent(metrics.ltcPercent)} />
                ) : null}
                <Metric
                  label="Acquisition cash required"
                  value={formatDealMoney(metrics.acquisitionCashRequired)}
                />
                {showFlip ? (
                  <>
                    <Metric
                      label="Projected flip profit"
                      value={formatDealMoney(metrics.projectedFlipProfit)}
                      tone={cashTone(metrics.projectedFlipProfit)}
                    />
                    <Metric
                      label="Projected flip ROI"
                      value={formatDealPercent(metrics.projectedFlipRoiPercent)}
                      tone={cashTone(metrics.projectedFlipRoiPercent)}
                    />
                  </>
                ) : null}
                {showBrrrr ? (
                  <Metric
                    label="Estimated cash remaining in deal"
                    value={formatDealMoney(metrics.brrrrCashRemaining)}
                    tone={cashTone(metrics.brrrrCashRemaining)}
                  />
                ) : null}
              </div>

              <p className="mt-8 text-xs text-slate-400 leading-relaxed">
                Estimates only, based on the assumptions you entered. Not an approval, commitment to
                lend, or guarantee of returns, terms, or financing.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {audience === "realtor" ? (
                  <button
                    type="button"
                    onClick={createClientAnalysis}
                    className={`${CTA_NAVY} w-full justify-center`}
                  >
                    <FileText className="w-4 h-4" />
                    Create Client Analysis
                  </button>
                ) : null}
                <Link
                  href={FINANCING_REVIEW_HREF}
                  onClick={() =>
                    trackConversionEvent("tool_cta_clicked", {
                      tool: DEAL_ANALYZER_SLUG,
                      destination: FINANCING_REVIEW_HREF,
                    })
                  }
                  className={`${audience === "realtor" ? CTA_SECONDARY : CTA_PRIMARY} w-full justify-center`}
                >
                  Review Financing Options
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className={`${CTA_SECONDARY} w-full justify-center`}
                >
                  Start Another Analysis
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

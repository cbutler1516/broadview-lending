"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Printer } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import {
  formatDealMoney,
  formatDealPercent,
  formatDealRatio,
} from "@/lib/deal-engine/format";
import { brand, companyLicensing, licensedStates } from "@/lib/brand/config";
import { trackConversionEvent } from "@/lib/analytics/events";
import {
  agentHasDetails,
  DEAL_ANALYZER_PATH,
  DEAL_ANALYZER_SLUG,
  FINANCING_REVIEW_HREF,
  propertyTypeLabel,
  shapeLabel,
} from "@/lib/tools/investor-deal-analyzer";
import type { ClientAnalysisView } from "@/lib/tools/client-analysis";
import { CTA_PRIMARY, CTA_SECONDARY } from "@/lib/ui/styles";

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative";
}) {
  const color =
    tone === "positive"
      ? "text-teal-700"
      : tone === "negative"
        ? "text-rose-700"
        : "text-navy-900";
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-slate-200/90 py-3 first:border-t-0 first:pt-0">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-base sm:text-lg font-semibold tracking-tight tabular-nums ${color}`}>
        {value}
      </p>
    </div>
  );
}

function cashTone(value: number | null): "positive" | "negative" | undefined {
  if (value === null) return undefined;
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return undefined;
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-navy-900 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ClientAnalysisPresentation({
  view,
  onStartAnother,
}: {
  view: ClientAnalysisView;
  onStartAnother: () => void;
}) {
  const { analysis, agent, shape, observations, showLtc, showFlip, showBrrrr } = view;
  const { scenario, metrics } = analysis;
  const property = scenario.property;
  const address = property.address?.trim();
  const presented = agentHasDetails(agent);
  const estimatedValue = property.estimatedValue > 0 ? property.estimatedValue : null;
  const arv = property.arv > 0 ? property.arv : null;
  const units = property.units > 0 ? property.units : null;
  const prepared = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <article className="client-analysis-sheet mx-auto max-w-4xl">
      <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white">
        <div className="h-1.5 bg-teal-600 print:bg-teal-600" />
        <div className="px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <BrandLogo className="lg:h-10" showParent={false} href={false} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Client analysis
            </p>
          </div>
          <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-navy-900">
            {address || "Investment property analysis"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            {shapeLabel(shape)}
            {property.propertyType ? ` · ${propertyTypeLabel(property.propertyType)}` : ""}
            {` · Prepared ${prepared}`}
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6">
        <Section eyebrow="Property" title="What was entered">
          <Row label="Address" value={address || "—"} />
          <Row
            label="Property type"
            value={property.propertyType ? propertyTypeLabel(property.propertyType) : "—"}
          />
          <Row label="Purchase price" value={formatDealMoney(property.purchasePrice || null)} />
          {estimatedValue !== null ? (
            <Row label="Estimated value" value={formatDealMoney(estimatedValue)} />
          ) : null}
          {arv !== null ? <Row label="ARV" value={formatDealMoney(arv)} /> : null}
          {units !== null ? <Row label="Units" value={String(units)} /> : null}
        </Section>

        <Section eyebrow="Financing" title="Modeled structure">
          <Row label="Loan amount" value={formatDealMoney(scenario.financing.loanAmount || null)} />
          <Row
            label="Down payment"
            value={formatDealMoney(scenario.financing.downPayment || null)}
          />
          <Row
            label="Estimated financing payment"
            value={formatDealMoney(metrics.monthlyPrincipalAndInterest, true)}
          />
          <Row label="LTV" value={formatDealPercent(metrics.ltvPercent)} />
          <Row
            label="Estimated acquisition cash required"
            value={formatDealMoney(metrics.acquisitionCashRequired)}
          />
          {showLtc ? <Row label="LTC" value={formatDealPercent(metrics.ltcPercent)} /> : null}
        </Section>

        <Section eyebrow="Investment performance" title="Based on these assumptions">
          <Row
            label="Monthly rent"
            value={formatDealMoney(scenario.income.monthlyRent || null)}
          />
          <Row label="NOI" value={formatDealMoney(metrics.noi)} />
          <Row label="Cap rate" value={formatDealPercent(metrics.capRatePercent)} />
          <Row label="DSCR" value={formatDealRatio(metrics.dscr)} />
          <Row
            label="Monthly cash flow"
            value={formatDealMoney(metrics.monthlyCashFlow)}
            tone={cashTone(metrics.monthlyCashFlow)}
          />
          <Row
            label="Annual cash flow"
            value={formatDealMoney(metrics.annualCashFlow)}
            tone={cashTone(metrics.annualCashFlow)}
          />
          <Row
            label="Cash-on-cash return"
            value={formatDealPercent(metrics.cashOnCashPercent)}
            tone={cashTone(metrics.cashOnCashPercent)}
          />
          {showFlip ? (
            <>
              <Row
                label="Projected flip profit"
                value={formatDealMoney(metrics.projectedFlipProfit)}
                tone={cashTone(metrics.projectedFlipProfit)}
              />
              <Row
                label="Projected flip ROI"
                value={formatDealPercent(metrics.projectedFlipRoiPercent)}
                tone={cashTone(metrics.projectedFlipRoiPercent)}
              />
            </>
          ) : null}
          {showBrrrr ? (
            <Row
              label="BRRRR cash remaining in deal"
              value={formatDealMoney(metrics.brrrrCashRemaining)}
              tone={cashTone(metrics.brrrrCashRemaining)}
            />
          ) : null}
        </Section>

        {observations.length > 0 ? (
          <Section eyebrow="Strategy summary" title="What these numbers suggest">
            <ul className="space-y-4">
              {observations.map((note) => (
                <li
                  key={note}
                  className="border-l-2 border-teal-600 pl-4 text-sm sm:text-base text-navy-800 leading-relaxed"
                >
                  {note}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="rounded-2xl border border-slate-200/90 bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
                Presented by
              </p>
              {presented ? (
                <div className="space-y-1 text-navy-900">
                  {agent.name.trim() ? (
                    <p className="text-lg font-semibold tracking-tight">{agent.name.trim()}</p>
                  ) : null}
                  {agent.brokerage.trim() ? (
                    <p className="text-sm text-slate-600">{agent.brokerage.trim()}</p>
                  ) : null}
                  {agent.email.trim() ? (
                    <p className="text-sm text-slate-600">{agent.email.trim()}</p>
                  ) : null}
                  {agent.phone.trim() ? (
                    <p className="text-sm text-slate-600">{agent.phone.trim()}</p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Real estate professional</p>
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
                Financing analysis powered by
              </p>
              <p className="text-lg font-semibold tracking-tight text-navy-900">
                {brand.companyName}
              </p>
              <p className="mt-1 text-sm text-slate-500">{companyLicensing.companyNmlsId}</p>
            </div>
          </div>
        </section>

        <div className="px-1 space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            {brand.disclaimers.educationalNotice} {brand.disclaimers.short}{" "}
            {companyLicensing.consumerNotice}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {companyLicensing.licensingSummary} Licensed states:{" "}
            {licensedStates.map((state) => state.abbreviation).join(", ")}.{" "}
            {companyLicensing.equalHousingText}.
          </p>
        </div>
      </div>

      <div className="client-analysis-actions mt-10 flex flex-col gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className={`${CTA_PRIMARY} w-full justify-center`}
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
        <Link
          href={`${DEAL_ANALYZER_PATH}#analyzer`}
          className={`${CTA_SECONDARY} w-full justify-center`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Analysis
        </Link>
        <Link
          href={FINANCING_REVIEW_HREF}
          onClick={() =>
            trackConversionEvent("tool_cta_clicked", {
              tool: DEAL_ANALYZER_SLUG,
              destination: FINANCING_REVIEW_HREF,
            })
          }
          className={`${CTA_SECONDARY} w-full justify-center`}
        >
          Review Financing Options
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={onStartAnother}
          className={`${CTA_SECONDARY} w-full justify-center`}
        >
          Start Another Analysis
        </button>
      </div>
    </article>
  );
}

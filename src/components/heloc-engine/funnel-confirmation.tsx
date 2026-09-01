"use client";

import { FunnelComplianceNote } from "@/components/heloc-engine/funnel-compliance-note";
import { FunnelOptionCard } from "@/components/heloc-engine/funnel-option-card";
import { Button } from "@/components/heloc-engine/ui/button";
import {
  calculateProfileStrength,
  getProfileStrengthLabel,
  getProfileStrengthSupportingCopy,
  isProfileComplete,
} from "@/lib/heloc-engine/gamification";
import {
  getEquityAccessLabel,
  isPriorityReviewFunds,
  MORTGAGE_BALANCE_RANGES,
  PROPERTY_VALUE_RANGES,
  type EquityAccessRangeId,
} from "@/lib/heloc-engine/funnel-ranges";
import { FUNNEL_PROPERTY_OPTIONS } from "@/lib/heloc-engine/funnel-config";
import { getPostSubmitReviewHeadline } from "@/lib/heloc-engine/property-occupancy";
import type {
  PropertyOccupancyId,
  PropertyTypeId,
  RoutingTier,
} from "@/lib/heloc-engine/types";
import { brand } from "@/lib/brand/config";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

type FunnelConfirmationProps = {
  propertyType: PropertyTypeId | "";
  propertyOccupancy: PropertyOccupancyId | "";
  leadId?: string;
  routingTier?: RoutingTier;
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  equityAccessRange: EquityAccessRangeId | "";
  submittedAt: string;
};

const FUNDING_TIMELINE_OPTIONS = [
  { id: "0-30-days", label: "As soon as possible" },
  { id: "1-3-months", label: "1–3 months" },
  { id: "3-6-months", label: "3–6 months" },
  { id: "exploring", label: "Just exploring" },
];

const FUNDING_GOAL_OPTIONS = [
  { id: "remodel-home", label: "Home improvement" },
  { id: "consolidate-debt", label: "Consolidate debt" },
  { id: "buy-another-home", label: "Buy another property" },
  { id: "increase-cash-flow", label: "Improve cash flow" },
  { id: "emergency-funds", label: "Build a safety net" },
  { id: "not-sure", label: "Still deciding" },
];

function formatPropertyAddress(
  street: string,
  city: string,
  state: string,
  zip: string,
): string {
  const line2 = [city, state].filter(Boolean).join(", ");
  const line3 = zip ? `${line2} ${zip}`.trim() : line2;
  return [street, line3].filter(Boolean).join(", ");
}

function formatSubmissionDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "Today";
  }
}

type EnrichmentField =
  | "propertyType"
  | "propertyValueRange"
  | "mortgageBalanceRange"
  | "fundingTimeline"
  | "fundingGoal";

export function FunnelConfirmation({
  propertyType,
  propertyOccupancy,
  propertyStreet,
  propertyCity,
  propertyState,
  propertyZip,
  equityAccessRange,
  submittedAt,
}: FunnelConfirmationProps) {
  const reduceMotion = useReducedMotion();
  const [enrichment, setEnrichment] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (propertyType) initial.propertyType = propertyType;
    return initial;
  });
  const [saved, setSaved] = useState(false);

  const address = formatPropertyAddress(propertyStreet, propertyCity, propertyState, propertyZip);
  const requestedFunds = getEquityAccessLabel(equityAccessRange);
  const showPriority = isPriorityReviewFunds(null, equityAccessRange);
  const submissionDateLabel = formatSubmissionDate(submittedAt);
  const postSubmitHeadline = getPostSubmitReviewHeadline(propertyOccupancy);

  const profileStrength = useMemo(() => calculateProfileStrength(enrichment), [enrichment]);
  const complete = isProfileComplete(profileStrength);

  function setField(field: EnrichmentField, value: string) {
    setEnrichment((prev) => ({ ...prev, [field]: value }));
  }

  if (saved) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm lg:rounded-3xl"
      >
        <div className="px-5 py-8 text-center sm:px-8 lg:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl">
            ✓
          </div>
          <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Your home equity strategy is ready for advisor review.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            A Broadview advisor will personally review your property and prepare recommendations
            for {address || "your property"}. We&apos;ll reach out shortly to walk through your options.
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4 text-left">
            <SummaryRow label="Property" value={address || "On file"} />
            <SummaryRow label="Capital of interest" value={requestedFunds} />
            <SummaryRow label="Strategy started" value={submissionDateLabel} />
            <SummaryRow label="Profile strength" value={`${profileStrength}%`} />
          </div>

          <a
            href={brand.contact.phoneHref}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3 text-base font-semibold text-white shadow-[0_2px_8px_rgba(26,86,219,0.35)] transition hover:brightness-110"
          >
            Talk with a Broadview advisor
          </a>
        </div>
        <ComplianceFooter />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm lg:rounded-3xl lg:shadow-[0_12px_48px_rgba(15,23,42,0.08)]"
    >
      <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-700">{postSubmitHeadline}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Help us personalize your recommendations
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            These optional questions help your advisor prepare an even more useful conversation. You
            can skip any of them.
          </p>
        </header>

        <div className="mt-5 lg:mt-6 lg:grid lg:grid-cols-10 lg:items-start lg:gap-6">
          <div className="min-w-0 space-y-6 lg:col-span-7">
            <EnrichmentGroup
              title="What type of property is it?"
              options={FUNNEL_PROPERTY_OPTIONS}
              value={enrichment.propertyType}
              onSelect={(value) => setField("propertyType", value)}
            />
            <EnrichmentGroup
              title="About what is the property worth?"
              options={PROPERTY_VALUE_RANGES.map((r) => ({ id: r.id, label: r.label }))}
              value={enrichment.propertyValueRange}
              onSelect={(value) => setField("propertyValueRange", value)}
            />
            <EnrichmentGroup
              title="About how much do you owe on it?"
              options={MORTGAGE_BALANCE_RANGES.map((r) => ({ id: r.id, label: r.label }))}
              value={enrichment.mortgageBalanceRange}
              onSelect={(value) => setField("mortgageBalanceRange", value)}
            />
            <EnrichmentGroup
              title="When would you like access to your equity?"
              options={FUNDING_TIMELINE_OPTIONS}
              value={enrichment.fundingTimeline}
              onSelect={(value) => setField("fundingTimeline", value)}
            />
            <EnrichmentGroup
              title="What are you hoping to accomplish?"
              options={FUNDING_GOAL_OPTIONS}
              value={enrichment.fundingGoal}
              onSelect={(value) => setField("fundingGoal", value)}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                size="lg"
                className="h-12 w-full text-base sm:w-auto sm:px-10"
                onClick={() => setSaved(true)}
              >
                {complete ? "Finish & send to my advisor" : "Save & send to my advisor"}
              </Button>
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="text-sm font-medium text-slate-500 underline-offset-2 transition hover:text-slate-700 hover:underline"
              >
                Skip for now
              </button>
            </div>
          </div>

          <aside className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Your strategy
              </p>
              <div className="mt-3 space-y-2.5">
                <SummaryRow label="Property" value={address || "On file"} />
                <SummaryRow label="Capital of interest" value={requestedFunds} />
                {showPriority ? (
                  <SummaryRow label="Status" value="Priority review" />
                ) : null}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">
                    {getProfileStrengthLabel(profileStrength)}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-teal-700">
                    {profileStrength}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-brand-progress"
                    initial={false}
                    animate={{ width: `${profileStrength}%` }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                  {getProfileStrengthSupportingCopy(profileStrength)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ComplianceFooter />
    </motion.div>
  );
}

function EnrichmentGroup({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: { id: string; label: string }[];
  value?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-[0.9375rem] font-semibold text-slate-800">{title}</h3>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <FunnelOptionCard
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}

function ComplianceFooter() {
  return (
    <div className="border-t border-slate-100 px-5 py-4 sm:px-6 lg:px-8">
      <FunnelComplianceNote />
      <p className="mt-3 text-center">
        <Link
          href="/"
          className="text-xs text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}

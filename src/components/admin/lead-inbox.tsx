"use client";

import { useMemo, useState } from "react";
import type { LeadRow } from "@/lib/supabase/server";
import { cn } from "@/lib/utils/cn";

type LeadInboxProps = {
  leads: LeadRow[];
  error?: string;
  configured: boolean;
};

const GRADES = ["A+", "A", "B", "C", "D"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTimeline(timeline: string | null) {
  if (!timeline) return "—";
  return timeline.replace(/-/g, " ");
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function LeadInbox({ leads, error, configured }: LeadInboxProps) {
  const [funnelFilter, setFunnelFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);

  const funnelTypes = useMemo(
    () => [...new Set(leads.map((l) => l.funnel_type))].sort(),
    [leads],
  );

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (funnelFilter !== "all" && lead.funnel_type !== funnelFilter) return false;
      if (gradeFilter !== "all" && lead.lead_grade !== gradeFilter) return false;
      if (agentFilter === "yes" && !lead.agent_needed) return false;
      if (agentFilter === "no" && lead.agent_needed) return false;
      return true;
    });
  }, [leads, funnelFilter, gradeFilter, agentFilter]);

  if (!configured) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        {error ?? "Supabase is not configured."}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Lead Inbox</h1>
          <p className="mt-2 text-sm text-muted">
            {filteredLeads.length} of {leads.length} leads shown
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={funnelFilter}
            onChange={(e) => setFunnelFilter(e.target.value)}
            className="input-field w-auto min-w-[160px] py-2 text-sm"
          >
            <option value="all">All funnels</option>
            {funnelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="input-field w-auto min-w-[140px] py-2 text-sm"
          >
            <option value="all">All grades</option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="input-field w-auto min-w-[160px] py-2 text-sm"
          >
            <option value="all">Agent needed: all</option>
            <option value="yes">Agent needed: yes</option>
            <option value="no">Agent needed: no</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-muted text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Funnel</th>
              <th className="px-4 py-3 font-medium">Grade</th>
              <th className="px-4 py-3 font-medium">Timeline</th>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Agent</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-muted">
                  No leads match the current filters.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="cursor-pointer border-b border-border/70 transition-colors hover:bg-surface-muted/70"
                >
                  <td className="px-4 py-3 font-medium">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="px-4 py-3">{formatPhone(lead.phone)}</td>
                  <td className="px-4 py-3 text-muted">{lead.email}</td>
                  <td className="px-4 py-3 capitalize">{lead.funnel_type}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand">
                      {lead.lead_grade ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {formatTimeline(lead.timeline)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {lead.recommended_program ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.agent_needed ? (
                      <span className="text-brand">Yes</span>
                    ) : (
                      <span className="text-muted">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </>
  );
}

function LeadDetailModal({
  lead,
  onClose,
}: {
  lead: LeadRow;
  onClose: () => void;
}) {
  const result = lead.result as {
    summary?: string;
    highlights?: string[];
    recommendedNextStep?: string;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 md:items-center">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold">
              {lead.first_name} {lead.last_name}
            </h2>
            <p className="text-sm text-muted">
              {lead.funnel_type} · Grade {lead.lead_grade}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted hover:bg-surface-muted"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Contact
            </h3>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="font-medium">{formatPhone(lead.phone)}</dd>
              </div>
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="font-medium">{lead.email}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Scoring Breakdown
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Opportunity", lead.mortgage_opportunity_score],
                ["Readiness", lead.readiness_score],
                ["Urgency", lead.urgency_score],
                ["Quality", lead.lead_quality_score],
                ["Agent Referral", lead.agent_referral_score],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="rounded-xl border border-border bg-surface-muted p-3"
                >
                  <p className="text-xs text-muted">{label as string}</p>
                  <p className="text-lg font-semibold">{value ?? "—"}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">{result.summary}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Funnel Answers
            </h3>
            <dl className="mt-3 space-y-2">
              {Object.entries(lead.answers ?? {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 rounded-lg border border-border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <dt className="capitalize text-muted">{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              TCPA Consent
            </h3>
            <div className="mt-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
              <p>
                <span className="text-muted">Consent:</span>{" "}
                {lead.tcpa_consent ? "Yes" : "No"}
              </p>
              <p className="mt-1">
                <span className="text-muted">Version:</span>{" "}
                {lead.tcpa_consent_version}
              </p>
              <p className="mt-1">
                <span className="text-muted">Timestamp:</span>{" "}
                {lead.tcpa_consent_at ? formatDate(lead.tcpa_consent_at) : "—"}
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                {lead.tcpa_consent_text ?? "—"}
              </p>
              <p className="mt-3 text-xs text-muted">
                IP: {lead.ip_address ?? "—"} · UA:{" "}
                {lead.user_agent ? lead.user_agent.slice(0, 80) : "—"}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              CRM Sync Status
            </h3>
            <div className="mt-3 space-y-2">
              {(lead.crm_sync_results ?? []).length === 0 ? (
                <p className="text-sm text-muted">No CRM sync records.</p>
              ) : (
                (lead.crm_sync_results ?? []).map((sync) => (
                  <div
                    key={sync.provider}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm",
                      sync.success
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-red-200 bg-red-50 text-red-900",
                    )}
                  >
                    <p className="font-medium capitalize">{sync.provider}</p>
                    <p>{sync.success ? "Synced" : sync.error ?? "Failed"}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Recommended Follow-Up
            </h3>
            <p className="mt-3 text-sm">{lead.recommended_follow_up ?? "—"}</p>
            {result.recommendedNextStep && (
              <p className="mt-2 text-sm text-muted">{result.recommendedNextStep}</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { AnalyticsSnapshot } from "@/lib/analytics/queries";
import { cn } from "@/lib/utils/cn";

type AnalyticsDashboardProps = AnalyticsSnapshot;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AnalyticsDashboard({
  configured,
  error,
  funnelStarts,
  leadSubmissions,
  resultsViewed,
  bookingClicks,
  funnelConversion,
  recentEvents,
}: AnalyticsDashboardProps) {
  if (!configured) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        {error ?? "Supabase is not configured."}
      </div>
    );
  }

  const overallConversion =
    funnelStarts > 0 ? Math.round((leadSubmissions / funnelStarts) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics Snapshot</h1>
        <p className="mt-2 text-sm text-muted">
          Lightweight conversion metrics from stored analytics events.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Funnel Starts", value: funnelStarts },
          { label: "Lead Submissions", value: leadSubmissions },
          { label: "Results Viewed", value: resultsViewed },
          { label: "Booking Clicks", value: bookingClicks },
          { label: "Overall Conversion", value: `${overallConversion}%` },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated p-5">
            <p className="text-xs uppercase tracking-wider text-muted">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold">Conversion by Funnel</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Funnel</th>
                <th className="px-4 py-3 font-medium">Starts</th>
                <th className="px-4 py-3 font-medium">Submissions</th>
                <th className="px-4 py-3 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {funnelConversion.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    No funnel events yet.
                  </td>
                </tr>
              ) : (
                funnelConversion.map((row) => (
                  <tr key={row.funnelType} className="border-t border-border/70">
                    <td className="px-4 py-3 capitalize">{row.funnelType}</td>
                    <td className="px-4 py-3">{row.starts}</td>
                    <td className="px-4 py-3">{row.submissions}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          row.conversionRate >= 20
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-surface-muted text-muted",
                        )}
                      >
                        {row.conversionRate}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold">Recent Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Funnel</th>
                <th className="px-4 py-3 font-medium">Session</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    No events recorded yet.
                  </td>
                </tr>
              ) : (
                recentEvents.map((event) => (
                  <tr key={event.id} className="border-t border-border/70">
                    <td className="px-4 py-3 text-muted">
                      {formatDate(event.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium">{event.event}</td>
                    <td className="px-4 py-3 capitalize text-muted">
                      {event.funnel_type ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {event.session_id?.slice(0, 8) ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

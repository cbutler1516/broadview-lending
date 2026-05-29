import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { AnalyticsEventRow } from "@/lib/supabase/server";

export type FunnelConversionStat = {
  funnelType: string;
  starts: number;
  submissions: number;
  conversionRate: number;
};

export type AnalyticsSnapshot = {
  configured: boolean;
  error?: string;
  funnelStarts: number;
  leadSubmissions: number;
  resultsViewed: number;
  bookingClicks: number;
  funnelConversion: FunnelConversionStat[];
  recentEvents: AnalyticsEventRow[];
};

export async function fetchAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  const empty: AnalyticsSnapshot = {
    configured: false,
    funnelStarts: 0,
    leadSubmissions: 0,
    resultsViewed: 0,
    bookingClicks: 0,
    funnelConversion: [],
    recentEvents: [],
  };

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return {
      ...empty,
      error: "Supabase is not configured. Add env vars to view analytics.",
    };
  }

  const { data: events, error } = await supabase
    .from("analytics_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return {
      ...empty,
      configured: true,
      error: "Unable to load analytics events.",
    };
  }

  const rows = (events ?? []) as AnalyticsEventRow[];

  const funnelStarts = rows.filter((e) => e.event === "funnel_started").length;
  const leadSubmissions = rows.filter((e) => e.event === "lead_submitted").length;
  const resultsViewed = rows.filter((e) => e.event === "results_viewed").length;
  const bookingClicks = rows.filter((e) => e.event === "booking_cta_clicked").length;

  const funnelTypes = [
    ...new Set(
      rows
        .map((e) => e.funnel_type)
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  const funnelConversion = funnelTypes.map((funnelType) => {
    const starts = rows.filter(
      (e) => e.event === "funnel_started" && e.funnel_type === funnelType,
    ).length;
    const submissions = rows.filter(
      (e) => e.event === "lead_submitted" && e.funnel_type === funnelType,
    ).length;
    const conversionRate = starts > 0 ? Math.round((submissions / starts) * 100) : 0;
    return { funnelType, starts, submissions, conversionRate };
  });

  return {
    configured: true,
    funnelStarts,
    leadSubmissions,
    resultsViewed,
    bookingClicks,
    funnelConversion,
    recentEvents: rows.slice(0, 50),
  };
}

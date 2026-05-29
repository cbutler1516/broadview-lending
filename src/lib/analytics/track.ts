import { headers } from "next/headers";
import {
  createSupabaseAdmin,
  getSupabaseConfigStatus,
  type AnalyticsEventRow,
} from "@/lib/supabase/server";
import type { AnalyticsEventInput } from "@/lib/leads/schema";

export type RequestContext = {
  ipAddress: string;
  userAgent: string;
};

export async function getRequestContext(): Promise<RequestContext> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";
  const userAgent = headerStore.get("user-agent") ?? "unknown";

  return { ipAddress, userAgent };
}

export async function persistAnalyticsEvent(
  input: AnalyticsEventInput,
  context?: RequestContext,
) {
  const supabase = createSupabaseAdmin();
  const ctx = context ?? (await getRequestContext());

  if (!supabase) {
    const status = getSupabaseConfigStatus();
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Supabase not configured:", status);
      console.log("[Analytics]", input);
    }
    return { persisted: false as const, reason: "supabase_unconfigured" as const };
  }

  const { error } = await supabase.from("analytics_events").insert({
    event: input.event,
    funnel_type: input.funnelType ?? null,
    lead_id: input.leadId ?? null,
    session_id: input.sessionId ?? null,
    ip_address: ctx.ipAddress,
    user_agent: ctx.userAgent,
    metadata: {
      ...(input.metadata ?? {}),
      ...(input.step ? { step: input.step } : {}),
    },
  });

  if (error) {
    console.error("[Analytics] Failed to persist event:", error.message);
    return { persisted: false as const, reason: "insert_failed" as const };
  }

  return { persisted: true as const };
}

export async function fetchLeadAnalytics(leadId: string) {
  const supabase = createSupabaseAdmin();
  if (!supabase) return [] as AnalyticsEventRow[];

  const { data, error } = await supabase
    .from("analytics_events")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Analytics] Failed to fetch lead events:", error.message);
    return [] as AnalyticsEventRow[];
  }

  return (data ?? []) as AnalyticsEventRow[];
}

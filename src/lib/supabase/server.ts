import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SupabaseConfigStatus =
  | { configured: true }
  | { configured: false; reason: "missing_url" | "missing_service_key" };

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) return { configured: false, reason: "missing_url" };
  if (!serviceKey) return { configured: false, reason: "missing_service_key" };
  return { configured: true };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfigStatus().configured;
}

let adminClient: SupabaseClient | null = null;

export function createSupabaseAdmin(): SupabaseClient | null {
  const status = getSupabaseConfigStatus();
  if (!status.configured) return null;

  if (!adminClient) {
    adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  return adminClient;
}

export function createSupabaseAnon(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type LeadRow = {
  id: string;
  created_at: string;
  submission_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tcpa_consent: boolean;
  tcpa_consent_version: string;
  tcpa_consent_at: string | null;
  tcpa_consent_text: string | null;
  ip_address: string | null;
  user_agent: string | null;
  funnel_type: string;
  answers: Record<string, string>;
  result: Record<string, unknown>;
  lead_grade: string | null;
  mortgage_opportunity_score: number | null;
  readiness_score: number | null;
  urgency_score: number | null;
  lead_quality_score: number | null;
  agent_referral_score: number | null;
  estimated_loan_amount: number | null;
  credit_tier: string | null;
  recommended_program: string | null;
  recommended_follow_up: string | null;
  realtor_referral: string | null;
  agent_needed: boolean | null;
  timeline: string | null;
  tags: string[] | null;
  lead_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  crm_synced: boolean | null;
  crm_sync_results: CrmSyncResultRow[] | null;
};

export type CrmSyncResultRow = {
  success: boolean;
  provider: string;
  externalId?: string;
  error?: string;
};

export type AnalyticsEventRow = {
  id: string;
  created_at: string;
  event: string;
  funnel_type: string | null;
  lead_id: string | null;
  session_id: string | null;
  metadata: Record<string, unknown> | null;
};

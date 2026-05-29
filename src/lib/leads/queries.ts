import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { LeadRow } from "@/lib/supabase/server";

export type LeadFilters = {
  funnelType?: string;
  grade?: string;
  agentNeeded?: boolean;
};

export async function fetchLeads(filters: LeadFilters = {}): Promise<{
  leads: LeadRow[];
  error?: string;
  configured: boolean;
}> {
  const supabase = createSupabaseAdmin();

  if (!supabase) {
    return {
      leads: [],
      configured: false,
      error: "Supabase is not configured. Add env vars to view leads.",
    };
  }

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (filters.funnelType) {
    query = query.eq("funnel_type", filters.funnelType);
  }

  if (filters.grade) {
    query = query.eq("lead_grade", filters.grade);
  }

  if (filters.agentNeeded !== undefined) {
    query = query.eq("agent_needed", filters.agentNeeded);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Admin] Failed to fetch leads:", error.message);
    return {
      leads: [],
      configured: true,
      error: "Unable to load leads from database.",
    };
  }

  return {
    leads: (data ?? []) as LeadRow[],
    configured: true,
  };
}

export async function fetchLeadById(id: string): Promise<LeadRow | null> {
  const supabase = createSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as LeadRow;
}

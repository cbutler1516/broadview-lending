import { tcpaConsentText, tcpaConsentVersion } from "@/lib/compliance/tcpa";
import { syncLeadToCrm, getActiveCrmProviders } from "@/lib/crm";
import type { SubmitLeadInput } from "@/lib/leads/schema";
import { persistAnalyticsEvent } from "@/lib/analytics/track";
import {
  createSupabaseAdmin,
  getSupabaseConfigStatus,
  type CrmSyncResultRow,
} from "@/lib/supabase/server";
import {
  generateFunnelResult,
  getRecommendedFollowUp,
} from "@/lib/scoring/engine";
import type { FunnelResult, LeadPayload } from "@/lib/funnels/types";
import { getRequestContext, type RequestContext } from "@/lib/analytics/track";

export type SubmitLeadResult = {
  success: boolean;
  error?: string;
  leadId?: string;
  duplicate?: boolean;
  result?: FunnelResult;
  storageWarning?: string;
  crmSynced?: boolean;
};

function extractTimeline(answers: Record<string, string>): string | null {
  return answers.timeline ?? null;
}

function deriveAgentNeeded(answers: Record<string, string>): boolean {
  return (
    answers.workingWithRealtor === "no" || answers.workingWithRealtor === "looking"
  );
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

async function findDuplicateLead(
  submissionId: string,
  email: string,
  phone: string,
  funnelType: string,
) {
  const supabase = createSupabaseAdmin();
  if (!supabase) return null;

  const { data: bySubmission } = await supabase
    .from("leads")
    .select("id, result")
    .eq("submission_id", submissionId)
    .maybeSingle();

  if (bySubmission) {
    return {
      id: bySubmission.id as string,
      result: bySubmission.result as FunnelResult,
      duplicate: true as const,
    };
  }

  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const normalizedPhone = normalizePhone(phone);

  const { data: recent } = await supabase
    .from("leads")
    .select("id, result")
    .eq("email", email.toLowerCase())
    .eq("phone", normalizedPhone)
    .eq("funnel_type", funnelType)
    .gte("created_at", twoMinutesAgo)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recent) {
    return {
      id: recent.id as string,
      result: recent.result as FunnelResult,
      duplicate: true as const,
    };
  }

  return null;
}

export async function submitLeadToPlatform(
  input: SubmitLeadInput,
  context?: RequestContext,
): Promise<SubmitLeadResult> {
  const ctx = context ?? (await getRequestContext());
  const result = generateFunnelResult(input.funnelType, input.answers);
  const now = new Date().toISOString();
  const normalizedPhone = normalizePhone(input.phone);

  const leadPayload: LeadPayload = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email.toLowerCase(),
    phone: normalizedPhone,
    tcpaConsent: true,
    tcpaConsentVersion,
    tcpaConsentText: tcpaConsentText,
    tcpaConsentAt: now,
    funnelType: input.funnelType,
    answers: input.answers,
    result,
    leadSource: input.leadSource,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmContent: input.utmContent,
    utmTerm: input.utmTerm,
    gclid: input.gclid,
    fbclid: input.fbclid,
    submissionId: input.submissionId,
    sessionId: input.sessionId,
    ipAddress: ctx.ipAddress,
    userAgent: ctx.userAgent,
  };

  const duplicate = await findDuplicateLead(
    input.submissionId,
    leadPayload.email,
    leadPayload.phone,
    input.funnelType,
  );

  if (duplicate) {
    return {
      success: true,
      leadId: duplicate.id,
      duplicate: true,
      result: duplicate.result ?? result,
      crmSynced: true,
    };
  }

  const supabase = createSupabaseAdmin();
  const configStatus = getSupabaseConfigStatus();

  if (!supabase) {
    const crmResults = await syncLeadToCrm(leadPayload, getActiveCrmProviders());
    const anyCrmSuccess = crmResults.some((r) => r.success);

    if (!anyCrmSuccess) {
      return {
        success: false,
        error:
          configStatus.configured === false
            ? "Lead storage is temporarily unavailable. Please try again shortly."
            : "Unable to save your submission. Please try again.",
        storageWarning:
          configStatus.configured === false
            ? `Supabase not configured (${configStatus.reason})`
            : undefined,
      };
    }

    return {
      success: true,
      result,
      storageWarning: "Lead saved to CRM only — database storage unavailable.",
      crmSynced: true,
    };
  }

  const insertRow = {
    submission_id: input.submissionId,
    first_name: leadPayload.firstName,
    last_name: leadPayload.lastName,
    email: leadPayload.email,
    phone: leadPayload.phone,
    tcpa_consent: true,
    tcpa_consent_version: tcpaConsentVersion,
    tcpa_consent_at: now,
    tcpa_consent_text: tcpaConsentText,
    ip_address: ctx.ipAddress,
    user_agent: ctx.userAgent,
    funnel_type: input.funnelType,
    answers: input.answers,
    result,
    lead_grade: result.leadGrade,
    mortgage_opportunity_score: result.mortgageOpportunityScore,
    readiness_score: result.readinessScore,
    urgency_score: result.urgencyScore,
    lead_quality_score: result.leadQualityScore,
    agent_referral_score: result.agentReferralScore,
    estimated_loan_amount: result.estimatedLoanAmount ?? null,
    credit_tier: result.creditTier ?? null,
    recommended_program: result.recommendedPrograms.join(", "),
    recommended_follow_up: getRecommendedFollowUp(result),
    realtor_referral: null,
    agent_needed: deriveAgentNeeded(input.answers),
    timeline: extractTimeline(input.answers),
    tags: result.tags,
    lead_source: input.leadSource ?? null,
    utm_source: input.utmSource ?? null,
    utm_medium: input.utmMedium ?? null,
    utm_campaign: input.utmCampaign ?? null,
    utm_content: input.utmContent ?? null,
    utm_term: input.utmTerm ?? null,
    gclid: input.gclid ?? null,
    fbclid: input.fbclid ?? null,
    crm_synced: false,
    crm_sync_results: [] as CrmSyncResultRow[],
  };

  const { data: row, error } = await supabase
    .from("leads")
    .insert(insertRow)
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      const existing = await findDuplicateLead(
        input.submissionId,
        leadPayload.email,
        leadPayload.phone,
        input.funnelType,
      );
      if (existing) {
        return {
          success: true,
          leadId: existing.id,
          duplicate: true,
          result: existing.result ?? result,
          crmSynced: true,
        };
      }
    }

    console.error("[Leads] Insert failed:", error.message);
    return {
      success: false,
      error: "Unable to save your submission. Please try again.",
    };
  }

  const leadId = row.id as string;
  leadPayload.leadId = leadId;

  const crmResults = await syncLeadToCrm(leadPayload, getActiveCrmProviders());

  const crmSynced = crmResults.some((r) => r.success);

  await supabase
    .from("leads")
    .update({
      crm_synced: crmSynced,
      crm_sync_results: crmResults,
    })
    .eq("id", leadId);

  await persistAnalyticsEvent(
    {
      event: "lead_submitted",
      funnelType: input.funnelType,
      leadId,
      sessionId: input.sessionId,
      metadata: {
        leadGrade: result.leadGrade,
        crmSynced,
        crmProviders: crmResults.map((r) => r.provider),
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
        utmContent: input.utmContent,
        utmTerm: input.utmTerm,
        gclid: input.gclid,
        fbclid: input.fbclid,
      },
    },
    ctx,
  );

  return {
    success: true,
    leadId,
    result,
    crmSynced,
  };
}

export async function updateLeadRealtorReferral(
  leadId: string,
  realtorReferral: "yes" | "no" | "already-working",
  sessionId?: string,
) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Database unavailable." };
  }

  const agentNeeded = realtorReferral === "yes";

  const { error } = await supabase
    .from("leads")
    .update({
      realtor_referral: realtorReferral,
      agent_needed: agentNeeded,
    })
    .eq("id", leadId);

  if (error) {
    return { success: false, error: "Unable to update referral preference." };
  }

  await persistAnalyticsEvent({
    event: "realtor_referral_requested",
    leadId,
    sessionId,
    metadata: { choice: realtorReferral },
  });

  return { success: true };
}

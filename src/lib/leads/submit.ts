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

function deriveHelocLeadData(
  answers: Record<string, string>,
  campaignPage?: string,
): NonNullable<LeadPayload["heloc"]> {
  const occupancy = answers.occupancy;
  const propertyType = answers.propertyType;
  const equityGoal = answers.equityGoal;
  const isInvestment =
    occupancy === "investment" ||
    equityGoal === "purchase-investment-property" ||
    propertyType === "multi-unit";

  return {
    equity_goal: equityGoal,
    occupancy,
    property_type: propertyType,
    estimated_property_value:
      answers.estimatedPropertyValue ?? answers.propertyValue,
    mortgage_balance: answers.mortgageBalance,
    desired_equity_amount:
      answers.desiredEquityAmount ?? answers.desiredEquityAccess,
    owner_occupied_vs_investment: isInvestment
      ? "investment"
      : "owner_occupied",
    campaign_page: campaignPage,
  };
}

function buildLeadTags(
  result: FunnelResult,
  input: SubmitLeadInput,
): string[] {
  const tags = [...result.tags];

  if (input.funnelType === "heloc") {
    const heloc = deriveHelocLeadData(input.answers, input.campaignPage);
    if (heloc.equity_goal) tags.push(`equity_goal:${heloc.equity_goal}`);
    if (heloc.occupancy) tags.push(`occupancy:${heloc.occupancy}`);
    if (heloc.property_type) tags.push(`property_type:${heloc.property_type}`);
    if (heloc.estimated_property_value) {
      tags.push(`estimated_property_value:${heloc.estimated_property_value}`);
    }
    if (heloc.mortgage_balance) {
      tags.push(`mortgage_balance:${heloc.mortgage_balance}`);
    }
    if (heloc.desired_equity_amount) {
      tags.push(`desired_equity_amount:${heloc.desired_equity_amount}`);
    }
    if (heloc.owner_occupied_vs_investment) {
      tags.push(
        `owner_occupied_vs_investment:${heloc.owner_occupied_vs_investment}`,
      );
    }
    if (heloc.campaign_page) tags.push(`campaign_page:${heloc.campaign_page}`);
  }

  return [...new Set(tags)];
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
  const helocLeadData =
    input.funnelType === "heloc"
      ? deriveHelocLeadData(input.answers, input.campaignPage)
      : undefined;
  const leadTags = buildLeadTags(result, input);
  const enrichedResult: FunnelResult = { ...result, tags: leadTags };

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
    result: enrichedResult,
    leadSource: input.leadSource,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmContent: input.utmContent,
    utmTerm: input.utmTerm,
    gclid: input.gclid,
    fbclid: input.fbclid,
    campaignPage: input.campaignPage,
    heloc: helocLeadData,
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
      result: duplicate.result ?? enrichedResult,
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
      result: enrichedResult,
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
    result: enrichedResult,
    lead_grade: enrichedResult.leadGrade,
    mortgage_opportunity_score: enrichedResult.mortgageOpportunityScore,
    readiness_score: enrichedResult.readinessScore,
    urgency_score: enrichedResult.urgencyScore,
    lead_quality_score: enrichedResult.leadQualityScore,
    agent_referral_score: enrichedResult.agentReferralScore,
    estimated_loan_amount: enrichedResult.estimatedLoanAmount ?? null,
    credit_tier: enrichedResult.creditTier ?? null,
    recommended_program: enrichedResult.recommendedPrograms.join(", "),
    recommended_follow_up: getRecommendedFollowUp(enrichedResult),
    realtor_referral: null,
    agent_needed: deriveAgentNeeded(input.answers),
    timeline: extractTimeline(input.answers),
    tags: leadTags,
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
          result: existing.result ?? enrichedResult,
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
        leadGrade: enrichedResult.leadGrade,
        crmSynced,
        crmProviders: crmResults.map((r) => r.provider),
        campaignPage: input.campaignPage,
        heloc: helocLeadData,
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
    result: enrichedResult,
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

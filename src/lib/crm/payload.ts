import type { LeadPayload } from "@/lib/funnels/types";
import { getRecommendedFollowUp } from "@/lib/scoring/engine";
import { tcpaConsentText } from "@/lib/compliance/tcpa";

export function buildCrmLeadPayload(lead: LeadPayload) {
  return {
    leadId: lead.leadId,
    submissionId: lead.submissionId,
    contact: {
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
    },
    funnelType: lead.funnelType,
    answers: lead.answers,
    scoreSummary: {
      leadGrade: lead.result.leadGrade,
      mortgageOpportunityScore: lead.result.mortgageOpportunityScore,
      readinessScore: lead.result.readinessScore,
      urgencyScore: lead.result.urgencyScore,
      leadQualityScore: lead.result.leadQualityScore,
      agentReferralScore: lead.result.agentReferralScore,
    },
    recommendedStrategy: {
      programs: lead.result.recommendedPrograms,
      nextStep: lead.result.recommendedNextStep,
      summary: lead.result.summary,
      highlights: lead.result.highlights,
      recommendedFollowUp: getRecommendedFollowUp(lead.result),
      tags: lead.result.tags,
      equityStrategy: lead.result.equityStrategy,
    },
    heloc: lead.heloc,
    realtorReferral: lead.realtorReferral ?? null,
    tcpa: {
      consent: lead.tcpaConsent,
      consentVersion: lead.tcpaConsentVersion,
      consentText: lead.tcpaConsentText ?? tcpaConsentText,
      consentAt: lead.tcpaConsentAt,
    },
    attribution: {
      leadSource: lead.leadSource,
      utmSource: lead.utmSource,
      utmMedium: lead.utmMedium,
      utmCampaign: lead.utmCampaign,
      utmContent: lead.utmContent,
      utmTerm: lead.utmTerm,
      gclid: lead.gclid,
      fbclid: lead.fbclid,
      campaignPage: lead.campaignPage,
    },
    metadata: {
      ipAddress: lead.ipAddress,
      userAgent: lead.userAgent,
      sessionId: lead.sessionId,
    },
  };
}

export type CrmLeadPayload = ReturnType<typeof buildCrmLeadPayload>;

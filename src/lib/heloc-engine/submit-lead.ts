import { submitLeadJson } from "@/actions/submit-lead";
import { getAttribution } from "@/lib/analytics/attribution";
import { getEquityAccessEstimate } from "@/lib/heloc-engine/funnel-ranges";
import { occupancyToBroadviewAnswer } from "@/lib/heloc-engine/property-occupancy";
import { normalizePhoneForStorage } from "@/lib/heloc-engine/phone-format";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/heloc-engine/constants";
import type {
  CreditScoreRangeId,
  PropertyValueRangeId,
} from "@/lib/heloc-engine/funnel-ranges";
import type { LeadFunnelData, LeadSubmitResult, RoutingTier } from "@/lib/heloc-engine/types";

export type SubmitHelocLeadInput = {
  data: LeadFunnelData;
  submissionId: string;
  sessionId: string;
  campaignPage?: string;
  /** equityGoal prefilled from a campaign landing page, if any. */
  equityGoal?: string;
};

/** Map the engine's credit range to the values Broadview scoring/CRM expect. */
function mapCreditScore(range: CreditScoreRangeId | ""): string {
  switch (range) {
    case "760-plus":
      return "740+";
    case "720-759":
      return "700-739";
    case "680-719":
      return "660-699";
    case "640-679":
      return "580-659";
    case "below-640":
    case "below-680":
      return "below-580";
    case "not-sure":
      return "unsure";
    default:
      return "";
  }
}

/** Map the engine's property type to Broadview's single-family/condo/multi-unit set. */
function mapPropertyType(type: LeadFunnelData["propertyType"]): string {
  switch (type) {
    case "single-family":
    case "townhome":
      return "single-family";
    case "condo":
      return "condo";
    case "two-to-four-unit":
    case "duplex":
    case "triplex":
    case "fourplex":
    case "duplex-triplex-fourplex":
    case "small-multifamily":
    case "fourplex-plus":
      return "multi-unit";
    default:
      return "";
  }
}

function mapValueRange(range: PropertyValueRangeId | ""): string {
  switch (range) {
    case "under-300k":
      return "250000";
    case "300k-500k":
      return "400000";
    case "500k-750k":
      return "625000";
    case "750k-1m":
      return "875000";
    case "1m-1.5m":
      return "1250000";
    case "1.5m-2m":
      return "1750000";
    case "2m-3m":
      return "2500000";
    case "3m-plus":
    case "1m-plus":
      return "3500000";
    default:
      return "";
  }
}

function formatAddress(data: LeadFunnelData): string {
  if (data.propertyFormattedAddress.trim()) return data.propertyFormattedAddress.trim();
  const cityState = [data.propertyCity, data.propertyState].filter(Boolean).join(", ");
  const tail = data.propertyZip ? `${cityState} ${data.propertyZip}`.trim() : cityState;
  return [data.propertyStreet, tail].filter(Boolean).join(", ");
}

function routingTierFromGrade(grade: string | undefined): RoutingTier {
  switch (grade) {
    case "A+":
    case "A":
      return "fast_track";
    case "B":
      return "standard";
    case "C":
      return "review";
    default:
      return "nurture";
  }
}

/**
 * Submits a completed funnel to Broadview's existing lead platform.
 * Reuses the platform's `submitLeadJson` server action, scoring, Supabase, and CRM
 * contracts without modification — only the answer shape is adapted.
 */
export async function submitHelocLead(input: SubmitHelocLeadInput): Promise<LeadSubmitResult> {
  const { data } = input;

  const desiredFunds =
    getEquityAccessEstimate(data.equityAccessRange) ?? data.desiredCashAmount ?? null;

  const answers: Record<string, string> = {
    propertyAddress: formatAddress(data),
    occupancy: occupancyToBroadviewAnswer(data.propertyOccupancy),
    creditScore: mapCreditScore(data.creditScoreRange),
    desiredEquityAmount: desiredFunds != null ? String(Math.round(desiredFunds)) : "",
  };

  const equityGoal = input.equityGoal?.trim();
  if (equityGoal) answers.equityGoal = equityGoal;

  const propertyType = mapPropertyType(data.propertyType);
  if (propertyType) answers.propertyType = propertyType;

  const propertyValue = mapValueRange(data.propertyValueRange);
  if (propertyValue) answers.estimatedPropertyValue = propertyValue;

  for (const key of Object.keys(answers)) {
    if (!answers[key]) delete answers[key];
  }

  const attribution = getAttribution();

  try {
    const result = await submitLeadJson({
      submissionId: input.submissionId,
      sessionId: input.sessionId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: normalizePhoneForStorage(data.phone),
      tcpaConsent: data.tcpaConsent,
      funnelType: "heloc",
      answers,
      campaignPage: input.campaignPage,
      leadSource: "heloc-strategy-funnel",
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      utmTerm: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
    });

    if (!result.success) {
      return { success: false, error: result.error ?? SUBMIT_ERROR_MESSAGE };
    }

    return {
      success: true,
      id: result.leadId,
      routingTier: routingTierFromGrade(result.result?.leadGrade),
    };
  } catch {
    return { success: false, error: SUBMIT_ERROR_MESSAGE };
  }
}

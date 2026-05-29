import { buildCrmLeadPayload } from "../payload";
import type { CrmAdapter } from "../types";
import type { LeadPayload } from "../../funnels/types";
import { getRecommendedFollowUp } from "../../scoring/engine";

export const consoleAdapter: CrmAdapter = {
  name: "console",
  async syncLead(lead: LeadPayload) {
    const payload = buildCrmLeadPayload(lead);

    if (process.env.NODE_ENV === "development") {
      console.log("[CRM:console] Lead synced:", payload);
    } else {
      console.log("[CRM:console] Lead synced:", {
        leadId: payload.leadId,
        phone: payload.contact.phone,
        funnel: payload.funnelType,
        grade: payload.scoreSummary.leadGrade,
        followUp: getRecommendedFollowUp(lead.result),
      });
    }

    return {
      success: true,
      provider: "console",
      externalId: payload.leadId ?? `local-${Date.now()}`,
    };
  },
};

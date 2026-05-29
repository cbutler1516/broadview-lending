import { buildCrmLeadPayload } from "../payload";
import type { CrmAdapter } from "../types";
import type { LeadPayload } from "../../funnels/types";

export const hubspotAdapter: CrmAdapter = {
  name: "hubspot",
  async syncLead(lead: LeadPayload) {
    const token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!token) {
      return {
        success: false,
        provider: "hubspot",
        error: "HUBSPOT_ACCESS_TOKEN not configured",
      };
    }

    const payload = buildCrmLeadPayload(lead);

    // HubSpot CRM API integration point — payload is ready for contacts API.
    if (process.env.NODE_ENV === "development") {
      console.log("[CRM:hubspot] Stub — payload ready:", {
        email: payload.contact.email,
        grade: payload.scoreSummary.leadGrade,
      });
    }

    return {
      success: false,
      provider: "hubspot",
      error: "HubSpot integration stub — configure CRM API mapping",
    };
  },
};

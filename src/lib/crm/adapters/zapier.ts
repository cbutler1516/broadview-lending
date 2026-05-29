import { buildCrmLeadPayload } from "../payload";
import type { CrmAdapter } from "../types";
import type { LeadPayload } from "../../funnels/types";

export const zapierAdapter: CrmAdapter = {
  name: "zapier",
  async syncLead(lead: LeadPayload) {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (!webhookUrl) {
      return {
        success: false,
        provider: "zapier",
        error: "ZAPIER_WEBHOOK_URL not configured",
      };
    }

    const payload = buildCrmLeadPayload(lead);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return {
        success: response.ok,
        provider: "zapier",
        externalId: response.ok ? `zapier-${Date.now()}` : undefined,
        error: response.ok ? undefined : `Zapier webhook returned ${response.status}`,
      };
    } catch (error) {
      return {
        success: false,
        provider: "zapier",
        error: error instanceof Error ? error.message : "Zapier sync failed",
      };
    }
  },
};

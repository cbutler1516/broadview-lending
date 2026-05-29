import type { LeadPayload } from "../funnels/types";

export type CrmSyncResult = {
  success: boolean;
  externalId?: string;
  provider: string;
  error?: string;
};

export interface CrmAdapter {
  name: string;
  syncLead(lead: LeadPayload): Promise<CrmSyncResult>;
}

export type CrmProvider =
  | "console"
  | "hubspot"
  | "gohighlevel"
  | "bonzo"
  | "follow-up-boss"
  | "zapier"
  | "make";

export function getActiveCrmProviders(): CrmProvider[] {
  const configured = process.env.CRM_PROVIDERS?.split(",").map((p) => p.trim()) ?? [
    "console",
  ];
  return configured as CrmProvider[];
}

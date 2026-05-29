import type { CrmAdapter } from "./types";
import type { LeadPayload } from "../funnels/types";
import { consoleAdapter } from "./adapters/console";
import { hubspotAdapter } from "./adapters/hubspot";
import { zapierAdapter } from "./adapters/zapier";

export { getActiveCrmProviders } from "./types";
export type { CrmAdapter, CrmSyncResult, CrmProvider } from "./types";

const adapters: Record<string, CrmAdapter> = {
  console: consoleAdapter,
  hubspot: hubspotAdapter,
  zapier: zapierAdapter,
};

export async function syncLeadToCrm(
  lead: LeadPayload,
  providers: string[],
) {
  const results = await Promise.all(
    providers.map(async (provider) => {
      const adapter = adapters[provider];
      if (!adapter) {
        return {
          success: false,
          provider,
          error: `Unknown CRM provider: ${provider}`,
        };
      }
      return adapter.syncLead(lead);
    }),
  );
  return results;
}

"use server";

import {
  parseSubmitLeadFormData,
  parseSubmitLeadJson,
  analyticsEventSchema,
} from "@/lib/leads/schema";
import {
  submitLeadToPlatform,
  updateLeadRealtorReferral,
  type SubmitLeadResult,
} from "@/lib/leads/submit";
import { persistAnalyticsEvent } from "@/lib/analytics/track";

export type SubmitLeadState = SubmitLeadResult;

export async function submitLead(
  _prev: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const parsed = parseSubmitLeadFormData(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error };
  }

  return submitLeadToPlatform(parsed.data);
}

export async function submitLeadJson(body: unknown): Promise<SubmitLeadState> {
  const parsed = parseSubmitLeadJson(body);
  if (!parsed.success) {
    return { success: false, error: parsed.error };
  }

  return submitLeadToPlatform(parsed.data);
}

export async function trackAnalyticsEvent(input: unknown) {
  const parsed = analyticsEventSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const };
  }

  await persistAnalyticsEvent(parsed.data);
  return { success: true as const };
}

export async function saveRealtorReferral(input: {
  leadId: string;
  realtorReferral: "yes" | "no" | "already-working";
  sessionId?: string;
}) {
  return updateLeadRealtorReferral(
    input.leadId,
    input.realtorReferral,
    input.sessionId,
  );
}

import { z } from "zod";
import type { FunnelType, RealtorReferralChoice } from "@/lib/funnels/types";

const funnelTypeSchema = z.enum([
  "purchase",
  "refinance",
  "heloc",
  "va",
  "fha",
  "first-time-homebuyer",
  "investment",
  "commercial",
]);

export const submitLeadInputSchema = z.object({
  submissionId: z.string().uuid(),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Valid phone number is required")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((digits) => digits.length >= 10, "Valid phone number is required"),
  tcpaConsent: z
    .boolean()
    .refine((value) => value === true, "TCPA consent is required"),
  funnelType: funnelTypeSchema,
  answers: z.record(z.string(), z.string()),
  sessionId: z.string().optional(),
  leadSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  campaignPage: z.string().optional(),
});

export type SubmitLeadInput = z.infer<typeof submitLeadInputSchema> & {
  funnelType: FunnelType;
};

export const updateRealtorReferralSchema = z.object({
  leadId: z.string().uuid(),
  realtorReferral: z.enum(["yes", "no", "already-working"]),
  sessionId: z.string().optional(),
});

export type UpdateRealtorReferralInput = z.infer<
  typeof updateRealtorReferralSchema
> & {
  realtorReferral: RealtorReferralChoice;
};

export const analyticsEventSchema = z.object({
  event: z.enum([
    "funnel_started",
    "question_answered",
    "lead_capture_viewed",
    "lead_submitted",
    "results_viewed",
    "realtor_referral_requested",
    "homepage_cta_clicked",
    "funnel_card_clicked",
    "booking_cta_clicked",
    "contact_page_viewed",
    "phone_clicked",
    "email_clicked",
  ]),
  funnelType: funnelTypeSchema.optional(),
  leadId: z.string().uuid().optional(),
  sessionId: z.string().optional(),
  step: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

export function parseSubmitLeadFormData(formData: FormData) {
  let answers: Record<string, string> = {};
  try {
    answers = JSON.parse(String(formData.get("answers") ?? "{}"));
  } catch {
    return { success: false as const, error: "Invalid funnel answers." };
  }

  const parsed = submitLeadInputSchema.safeParse({
    submissionId: formData.get("submissionId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    tcpaConsent: formData.get("tcpaConsent") === "true",
    funnelType: formData.get("funnelType"),
    answers,
    sessionId: formData.get("sessionId") || undefined,
    leadSource: formData.get("leadSource") || undefined,
    utmSource: formData.get("utmSource") || undefined,
    utmMedium: formData.get("utmMedium") || undefined,
    utmCampaign: formData.get("utmCampaign") || undefined,
    utmContent: formData.get("utmContent") || undefined,
    utmTerm: formData.get("utmTerm") || undefined,
    gclid: formData.get("gclid") || undefined,
    fbclid: formData.get("fbclid") || undefined,
    campaignPage: formData.get("campaignPage") || undefined,
  });

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Please complete all required fields.";
    return { success: false as const, error: message };
  }

  return { success: true as const, data: parsed.data as SubmitLeadInput };
}

export function parseSubmitLeadJson(body: unknown) {
  const parsed = submitLeadInputSchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid lead submission payload.";
    return { success: false as const, error: message };
  }
  return { success: true as const, data: parsed.data as SubmitLeadInput };
}

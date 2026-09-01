export const BASE_PROFILE_STRENGTH = 40;
export const MAX_PROFILE_STRENGTH = 100;

export type ProfileStrengthField =
  | "propertyType"
  | "propertyValueRange"
  | "mortgageBalanceRange"
  | "propertyCount"
  | "fundingTimeline"
  | "fundingGoal"
  | "ownershipType";

export const ENRICHMENT_PROFILE_FIELDS = [
  "propertyValueRange",
  "mortgageBalanceRange",
  "propertyType",
  "propertyCount",
  "fundingGoal",
  "fundingTimeline",
  "ownershipType",
] as const satisfies readonly ProfileStrengthField[];

export const PROFILE_STRENGTH_WEIGHTS: Record<ProfileStrengthField, number> = {
  propertyType: 9,
  propertyValueRange: 9,
  mortgageBalanceRange: 9,
  propertyCount: 8,
  fundingTimeline: 8,
  fundingGoal: 9,
  ownershipType: 8,
};

export const PRE_SUBMIT_MILESTONES = [
  { step: 1, label: "Property", icon: "🏠" },
  { step: 2, label: "Use", icon: "🔑" },
  { step: 3, label: "Credit", icon: "📈" },
  { step: 4, label: "Capital", icon: "💰" },
  { step: 5, label: "Contact", icon: "📋" },
] as const;

export function calculateProfileStrength(data: Record<string, string | undefined>): number {
  let strength = BASE_PROFILE_STRENGTH;
  for (const field of ENRICHMENT_PROFILE_FIELDS) {
    if (data[field]?.trim()) {
      strength += PROFILE_STRENGTH_WEIGHTS[field];
    }
  }
  return Math.min(MAX_PROFILE_STRENGTH, strength);
}

export function isEnrichmentDataComplete(
  data: Record<string, string | undefined>,
): boolean {
  return ENRICHMENT_PROFILE_FIELDS.every((field) => Boolean(data[field]?.trim()));
}

export function isProfileComplete(strength: number): boolean {
  return strength >= MAX_PROFILE_STRENGTH;
}

export function getProfileStrengthLabel(strength: number): string {
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  if (clamped >= 100) return "Profile fully built";
  if (clamped >= 80) return "Strong profile";
  if (clamped >= 60) return "Building momentum";
  if (clamped >= 40) return "Strategy started";
  return "Just getting started";
}

export function getProfileStrengthSupportingCopy(strength: number): string {
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  if (clamped >= 100) {
    return "Your profile is ready for your advisor to review.";
  }
  if (clamped >= 70) {
    return "You're close — a few more details help your advisor prepare.";
  }
  return "Each answer helps your advisor prepare a more useful conversation.";
}

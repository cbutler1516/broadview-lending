import type { FunnelType } from "@/lib/funnels/types";

/** Maps paid-ad / landing `campaign_page` paths to prefilled funnel answers. */
const campaignPrefills: Record<string, Record<string, string>> = {
  "/heloc/home-improvement": { equityGoal: "remodel-home" },
  "/heloc/debt-consolidation": { equityGoal: "consolidate-debt" },
  "/heloc/buy-another-home": { equityGoal: "buy-another-home" },
  "/heloc/investment-property": { equityGoal: "purchase-investment-property" },
  "/heloc/rental-property": { equityGoal: "purchase-investment-property" },
  "/heloc/keep-your-rate": { equityGoal: "increase-cash-flow" },
  "/refinance/lower-payment": { refinanceGoal: "lower-payment" },
  "/refinance/cash-out-refinance": { refinanceGoal: "cash-out" },
  "/refinance/remove-mortgage-insurance": { refinanceGoal: "remove-pmi" },
  "/refinance/debt-consolidation-refinance": { refinanceGoal: "cash-out" },
  "/refinance/rate-and-term-refinance": { refinanceGoal: "shorten-term" },
  "/buy/first-time-homebuyer": { firstTimeHomebuyer: "yes" },
  "/buy/va-loans": { veteran: "yes" },
};

const goalLabels: Record<string, string> = {
  "remodel-home": "Remodel My Home",
  "consolidate-debt": "Pay Off Debt",
  "buy-another-home": "Purchase Another Property",
  "purchase-investment-property": "Invest",
  "increase-cash-flow": "Pay Off Debt",
  "business-opportunity": "Grow My Business",
  education: "Education",
  "build-adu": "Remodel My Home",
  "emergency-funds": "Emergency Funds",
  "not-sure": "I'm Not Sure Yet",
  "lower-payment": "Lower my payment",
  "cash-out": "Access cash from equity",
  "shorten-term": "Pay off my loan faster",
  "remove-pmi": "Remove PMI",
};

export type GoalEntryContext = {
  prefilledAnswers: Record<string, string>;
  goalLabel?: string;
  goalPrompt: string;
  headline: string;
  showGoalStep: boolean;
};

function normalizeCampaignPath(campaignPage?: string): string | undefined {
  if (!campaignPage) return undefined;
  const path = campaignPage.startsWith("/") ? campaignPage : `/${campaignPage}`;
  return path.replace(/\/+$/, "");
}

export function resolveGoalEntry(
  funnelType: FunnelType,
  campaignPage?: string,
): GoalEntryContext {
  const path = normalizeCampaignPath(campaignPage);
  const prefilled = path ? { ...campaignPrefills[path] } : {};

  const goalKey =
    prefilled.equityGoal ?? prefilled.refinanceGoal ?? prefilled.purchaseGoal;
  const goalLabel = goalKey ? goalLabels[goalKey] : undefined;

  const helocPrompt =
    "What would you like your home equity to help you accomplish?";
  const refinancePrompt = "What would you like refinancing to help you accomplish?";
  const purchasePrompt = "What are you hoping to accomplish?";

  const prompts: Record<FunnelType, string> = {
    heloc: helocPrompt,
    refinance: refinancePrompt,
    purchase: purchasePrompt,
    va: "Let's explore your VA loan strategy.",
    fha: "Let's explore your homebuyer strategy.",
    "first-time-homebuyer": purchasePrompt,
    investment: purchasePrompt,
    commercial: "Let's explore your commercial financing strategy.",
  };

  const headlines: Record<FunnelType, string> = {
    heloc: goalLabel
      ? `Building your strategy for ${goalLabel.toLowerCase()}`
      : "Let's build your home equity strategy",
    refinance: goalLabel
      ? `Building your refinance strategy`
      : "Let's build your refinance strategy",
    purchase: "Let's build your home purchase strategy",
    va: "Let's build your VA loan strategy",
    fha: "Let's build your FHA homebuyer strategy",
    "first-time-homebuyer": "Let's build your first-home strategy",
    investment: "Let's build your investment property strategy",
    commercial: "Let's build your commercial strategy",
  };

  const showGoalStep =
    !goalKey &&
    (funnelType === "heloc" ||
      funnelType === "refinance" ||
      funnelType === "purchase");

  return {
    prefilledAnswers: prefilled,
    goalLabel,
    goalPrompt: prompts[funnelType] ?? purchasePrompt,
    headline: headlines[funnelType] ?? headlines.purchase,
    showGoalStep,
  };
}

export function labelForGoalValue(value: string): string {
  return goalLabels[value] ?? value.replace(/-/g, " ");
}

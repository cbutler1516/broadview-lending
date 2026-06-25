import type {
  FunnelAnswers,
  FunnelResult,
  FunnelType,
  LeadGrade,
  RecommendedProgram,
} from "../funnels/types";
import { scoringConfig } from "./config";

function parseCurrency(value?: string): number {
  if (!value) return 0;
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function parsePercent(value?: string): number {
  if (!value) return 0;
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function creditScoreToPoints(creditScore?: string): number {
  switch (creditScore) {
    case "740+":
      return 95;
    case "700-739":
      return 80;
    case "660-699":
      return 65;
    case "580-659":
      return 45;
    case "below-580":
      return 25;
    default:
      return 50;
  }
}

function creditScoreToTier(creditScore?: string): string {
  switch (creditScore) {
    case "740+":
      return scoringConfig.creditTiers.excellent.label;
    case "700-739":
      return scoringConfig.creditTiers.good.label;
    case "660-699":
      return scoringConfig.creditTiers.fair.label;
    case "580-659":
      return scoringConfig.creditTiers.poor.label;
    case "below-580":
      return scoringConfig.creditTiers.veryPoor.label;
    default:
      return "Unknown";
  }
}

function timelineToUrgency(timeline?: string): number {
  return (
    scoringConfig.urgencyWeights[
      timeline as keyof typeof scoringConfig.urgencyWeights
    ] ?? 30
  );
}

function scoreToGrade(score: number): LeadGrade {
  if (score >= scoringConfig.gradeThresholds["A+"]) return "A+";
  if (score >= scoringConfig.gradeThresholds.A) return "A";
  if (score >= scoringConfig.gradeThresholds.B) return "B";
  if (score >= scoringConfig.gradeThresholds.C) return "C";
  return "D";
}

function buildPurchaseResult(answers: FunnelAnswers): FunnelResult {
  const purchasePrice = parseCurrency(answers.purchasePrice);
  const downPayment = parseCurrency(answers.downPayment);
  const downPaymentPercent =
    purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;
  const loanAmount = Math.max(purchasePrice - downPayment, 0);
  const creditPoints = creditScoreToPoints(answers.creditScore);
  const urgencyScore = timelineToUrgency(answers.timeline);
  const isVeteran = answers.veteran === "yes";
  const isFirstTime = answers.firstTimeHomebuyer === "yes";
  const needsAgent = answers.workingWithRealtor === "no";

  const programs: RecommendedProgram[] = [];
  const tags: string[] = ["purchase"];
  const highlights: string[] = [];

  if (isVeteran) {
    programs.push("va");
    tags.push("veteran", "va-eligible");
    highlights.push("VA loan benefits may apply with $0 down options.");
  }

  if (loanAmount > scoringConfig.conformingLoanLimit) {
    programs.push("jumbo");
    tags.push("jumbo");
    highlights.push(
      "Purchase price exceeds conforming limits — jumbo financing may be recommended.",
    );
  } else {
    programs.push("conventional");
    tags.push("conventional");
  }

  if (
    downPaymentPercent < scoringConfig.lowDownPaymentThresholdPercent ||
    answers.creditScore === "580-659" ||
    answers.creditScore === "below-580"
  ) {
    programs.push("fha");
    tags.push("fha-eligible");
    highlights.push("FHA may offer flexible down payment and credit options.");
  }

  if (isFirstTime) {
    programs.push("down-payment-assistance");
    tags.push("first-time-homebuyer");
    highlights.push(
      "First-time homebuyer programs and down payment assistance may be available.",
    );
  }

  const readinessScore = Math.round(
    creditPoints * 0.4 +
      Math.min(downPaymentPercent * 8, 40) +
      (isFirstTime ? 10 : 5) +
      (answers.workingWithRealtor === "yes" ? 10 : 5),
  );

  const agentReferralScore = needsAgent ? 90 : answers.workingWithRealtor === "looking" ? 60 : 20;

  const leadQualityScore = Math.round(
    readinessScore * 0.35 + urgencyScore * 0.35 + creditPoints * 0.3,
  );

  return {
    funnelType: "purchase",
    mortgageOpportunityScore: Math.min(
      100,
      Math.round(loanAmount / 10000 + urgencyScore * 0.3),
    ),
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: [...new Set(programs)],
    recommendedNextStep: needsAgent
      ? "Book a consultation and connect with a trusted local Realtor."
      : "Book a consultation to review your personalized purchase strategy.",
    summary: `Based on your inputs, you appear ${readinessScore >= 70 ? "well-positioned" : "on the path"} for homeownership with ${programs.slice(0, 2).join(" and ")} options to explore.`,
    highlights,
    estimatedLoanAmount: loanAmount,
    creditTier: creditScoreToTier(answers.creditScore),
    tags,
  };
}

function buildRefinanceResult(answers: FunnelAnswers): FunnelResult {
  const balance = parseCurrency(answers.currentBalance);
  const value = parseCurrency(answers.homeValue);
  const equity = Math.max(value - balance, 0);
  const equityPercent = value > 0 ? (equity / value) * 100 : 0;
  const currentRate = parsePercent(answers.currentRate);
  const creditPoints = creditScoreToPoints(answers.creditScore);

  const programs: RecommendedProgram[] = ["rate-term-refi"];
  const tags: string[] = ["refinance"];
  const highlights: string[] = [
    `Estimated equity position: ${equityPercent.toFixed(0)}% ($${equity.toLocaleString()}).`,
  ];

  if (
    equityPercent >= scoringConfig.cashOutEquityThresholdPercent &&
    answers.refinanceGoal === "cash-out"
  ) {
    programs.push("cash-out-refi");
    tags.push("cash-out-opportunity");
    highlights.push(
      `Potential cash-out access of up to $${Math.round(equity * 0.8).toLocaleString()} may be available.`,
    );
  }

  if (currentRate > 6.5) {
    tags.push("rate-reduction-opportunity");
    highlights.push("Current rate suggests meaningful savings potential.");
  }

  const urgencyScore = answers.refinanceGoal === "cash-out" ? 80 : 60;
  const readinessScore = Math.round(creditPoints * 0.5 + Math.min(equityPercent, 50));
  const leadQualityScore = Math.round(readinessScore * 0.5 + urgencyScore * 0.5);

  return {
    funnelType: "refinance",
    mortgageOpportunityScore: Math.round(equity / 5000 + (currentRate > 6 ? 20 : 10)),
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore: 15,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: programs,
    recommendedNextStep:
      "Schedule a refinance review to compare rate, term, and cash-out strategies.",
    summary: `Your refinance profile suggests a ${answers.refinanceGoal?.replace("-", " ")} strategy with ${equityPercent.toFixed(0)}% estimated equity.`,
    highlights,
    estimatedLoanAmount: balance,
    creditTier: creditScoreToTier(answers.creditScore),
    tags,
  };
}

function buildHelocResult(answers: FunnelAnswers): FunnelResult {
  const value = parseCurrency(answers.estimatedPropertyValue ?? answers.propertyValue);
  const balance = parseCurrency(answers.mortgageBalance);
  const desired = parseCurrency(
    answers.desiredEquityAmount ?? answers.desiredEquityAccess,
  );
  const occupancy = answers.occupancy ?? "owner-occupied";
  const propertyType = answers.propertyType ?? "single-family";
  const equityGoal = answers.equityGoal ?? "something-else";
  const isInvestment =
    occupancy === "investment" ||
    equityGoal === "purchase-investment-property" ||
    propertyType === "multi-unit";
  const equity = Math.max(value - balance, 0);
  const maxCombinedLoanToValue = isInvestment ? 0.75 : 0.85;
  const availableEquity = Math.max(
    0,
    Math.round(value * maxCombinedLoanToValue - balance),
  );
  const creditPoints = creditScoreToPoints(answers.creditScore);
  const equityPercent = value > 0 ? (equity / value) * 100 : 0;
  const cltvAfterDesired =
    value > 0 ? ((balance + desired) / value) * 100 : 100;

  const readinessScore = Math.round(
    creditPoints * 0.45 +
      Math.min(equityPercent, 45) +
      (desired > 0 && desired <= availableEquity ? 10 : 0),
  );
  const urgencyScore = timelineToUrgency(answers.timeline);
  const leadQualityScore = Math.round(readinessScore * 0.6 + urgencyScore * 0.4);
  const equityAccessScore = Math.min(
    100,
    Math.round(
      creditPoints * 0.35 +
        Math.min(equityPercent, 45) +
        (desired > 0 && desired <= availableEquity ? 20 : 5),
    ),
  );

  const goalLabels: Record<string, string> = {
    "remodel-home": "Remodel my home",
    "consolidate-debt": "Consolidate debt",
    "buy-another-home": "Buy another home",
    "purchase-investment-property": "Purchase an investment property",
    "increase-cash-flow": "Increase monthly cash flow",
    "business-opportunity": "Fund a business opportunity",
    education: "Pay for education",
    "build-adu": "Build an ADU",
    "emergency-funds": "Access emergency funds",
    "not-sure": "I'm not sure yet",
  };

  const goalTags: Record<string, string> = {
    "remodel-home": "equity_goal:home_improvement",
    "consolidate-debt": "equity_goal:debt_consolidation",
    "buy-another-home": "equity_goal:buy_another_home",
    "purchase-investment-property": "equity_goal:investment_property",
    "increase-cash-flow": "equity_goal:increase_cash_flow",
    "business-opportunity": "equity_goal:business_opportunity",
    education: "equity_goal:education",
    "build-adu": "equity_goal:build_adu",
    "emergency-funds": "equity_goal:emergency_funds",
    "not-sure": "equity_goal:not_sure",
  };

  const recommendationByGoal: Record<string, string> = {
    "remodel-home":
      "Based on what you've shared, a Home Equity Line of Credit may allow you to access equity for improvements while preserving your current first mortgage and interest rate.",
    "consolidate-debt":
      "Based on what you've shared, a Home Equity Solution may help you explore whether consolidating higher-interest debt could improve monthly cash flow.",
    "buy-another-home":
      "Based on what you've shared, your home equity may be part of a next-home strategy, especially if preserving your current first mortgage is valuable.",
    "purchase-investment-property":
      "Based on what you've shared, your equity may support an investor strategy that should be reviewed alongside DSCR possibilities, reserves, and cash-flow impact.",
    "increase-cash-flow":
      "Based on what you've shared, a Home Equity Solution may be worth discussing as part of a broader cash-flow strategy.",
    "business-opportunity":
      "Based on what you've shared, accessing equity for a business opportunity deserves a careful risk and repayment conversation before choosing a structure.",
    education:
      "Based on what you've shared, home equity may be one way to fund education, but it should be compared with repayment timing and other funding options.",
    "build-adu":
      "Based on what you've shared, a Home Equity Line of Credit or renovation-focused second lien may help fund ADU planning while preserving your current first mortgage.",
    "emergency-funds":
      "Based on what you've shared, a Home Equity Solution may create access to funds for unexpected needs, but the repayment structure should be reviewed carefully.",
    "not-sure":
      "Based on what you've shared, the next best step is a guided home equity conversation to clarify what flexibility you need and which structures are worth comparing.",
  };

  const whyItFits = isInvestment
    ? "This fits as an initial strategy because investor equity decisions depend on leverage, reserves, property cash flow, and whether the next move strengthens the portfolio."
    : "This fits as an initial strategy because it may let you explore equity access without automatically replacing your current first mortgage.";

  const potentialHelocPath = isInvestment
    ? "Potential investment-property equity path, including HELOC availability review, DSCR possibilities, and portfolio cash-flow considerations."
    : "Potential owner-occupied HELOC path that may help access equity while keeping the current first mortgage in place.";

  const cashOutAlternative =
    "Potential options may also include a cash-out refinance if one new loan, a larger equity need, or fixed-payment structure is a better fit after full review.";

  const keepCurrentMortgageNote =
    "Keeping the current first mortgage may matter when the existing rate or terms are stronger than today's replacement options.";

  return {
    funnelType: "heloc",
    mortgageOpportunityScore: equityAccessScore,
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore: 20,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: ["heloc", "cash-out-refi"],
    recommendedNextStep:
      "A Broadview mortgage advisor should review your equity position, lien structure, and goal before recommending a path.",
    summary: `Based on the information you provided, estimated available equity may be around $${availableEquity.toLocaleString()}. This is not a loan approval or commitment to lend.`,
    highlights: [
      `Estimated available equity: $${availableEquity.toLocaleString()}`,
      desired <= availableEquity
        ? "Your desired access amount appears within the preliminary equity range you provided."
        : "Your desired amount may require additional review, a different lien structure, or an alternative strategy.",
      `Estimated CLTV after desired equity access: ${cltvAfterDesired.toFixed(0)}%.`,
      isInvestment
        ? "Investment and rental-property equity options may involve stricter guidelines, reserves, and cash-flow review."
        : "Owner-occupied HELOC paths often focus on flexibility, home improvements, debt consolidation, emergency funds, or keeping a favorable first mortgage.",
      keepCurrentMortgageNote,
    ],
    estimatedLoanAmount: desired,
    creditTier: creditScoreToTier(answers.creditScore),
    tags: [
      "heloc",
      "home_equity_solutions",
      goalTags[equityGoal] ?? "equity_goal:something_else",
      `occupancy:${occupancy}`,
      `property_type:${propertyType}`,
      isInvestment ? "investment" : "owner_occupied",
      isInvestment ? "owner_occupied_vs_investment:investment" : "owner_occupied_vs_investment:owner_occupied",
    ],
    equityStrategy: {
      goal: goalLabels[equityGoal] ?? goalLabels["not-sure"],
      equityAccessScore,
      estimatedAvailableEquity: availableEquity,
      initialRecommendation:
        recommendationByGoal[equityGoal] ?? recommendationByGoal["not-sure"],
      whyItFits,
      otherOptionsWorthDiscussing: [
        "Cash-out refinance",
        "Closed-end second mortgage",
        isInvestment ? "DSCR or investor financing" : "Bridge financing",
      ],
      estimatedNextSteps: [
        "Advisor review of your equity estimate, current lien, and goal.",
        "Discussion of payment comfort, timeline, and whether preserving your first mortgage matters.",
        "Comparison of potential home equity structures before choosing a path.",
      ],
      questionsToAskAdvisor: [
        "How would this strategy affect my monthly cash flow?",
        "What are the trade-offs of keeping my current first mortgage?",
        "Which option gives me flexibility without creating unnecessary risk?",
      ],
      potentialHelocPath,
      cashOutAlternative,
      keepCurrentMortgageNote,
      recommendedNextStep:
        "A Broadview mortgage advisor will personally review your information and walk through your options with you.",
    },
  };
}

function buildVaResult(answers: FunnelAnswers): FunnelResult {
  const purchasePrice = parseCurrency(answers.purchasePrice);
  const creditPoints = creditScoreToPoints(answers.creditScore);
  const urgencyScore = timelineToUrgency(answers.timeline);
  const readinessScore = Math.round(creditPoints * 0.6 + 30);
  const leadQualityScore = Math.round(readinessScore * 0.5 + urgencyScore * 0.5);

  return {
    funnelType: "va",
    mortgageOpportunityScore: Math.round(purchasePrice / 8000 + 20),
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore: 40,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: ["va"],
    recommendedNextStep:
      "Schedule a VA consultation to review entitlement, funding fee, and next steps.",
    summary: "Your profile indicates strong VA loan eligibility potential.",
    highlights: [
      answers.firstUseVa === "yes"
        ? "First-time VA use may qualify for full entitlement benefits."
        : "Subsequent VA use — we'll review remaining entitlement.",
      "VA loans typically offer $0 down and no PMI for eligible borrowers.",
    ],
    estimatedLoanAmount: purchasePrice,
    creditTier: creditScoreToTier(answers.creditScore),
    tags: ["va", "veteran", answers.militaryStatus ?? "veteran"],
  };
}

function buildFhaResult(answers: FunnelAnswers): FunnelResult {
  const purchasePrice = parseCurrency(answers.purchasePrice);
  const downPayment = parseCurrency(answers.downPayment);
  const downPaymentPercent =
    purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;
  const creditPoints = creditScoreToPoints(answers.creditScore);
  const urgencyScore = timelineToUrgency(answers.timeline);

  const programs: RecommendedProgram[] = ["fha", "down-payment-assistance"];
  const readinessScore = Math.round(creditPoints * 0.5 + Math.min(downPaymentPercent * 5, 30) + 20);
  const leadQualityScore = Math.round(readinessScore * 0.55 + urgencyScore * 0.45);

  return {
    funnelType: "fha",
    mortgageOpportunityScore: Math.round(purchasePrice / 10000 + 15),
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore: 55,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: programs,
    recommendedNextStep:
      "Book a consultation to review FHA eligibility and assistance programs.",
    summary: `FHA financing appears ${readinessScore >= 65 ? "likely" : "worth exploring"} based on your profile.`,
    highlights: [
      downPaymentPercent < 3.5
        ? "FHA allows as little as 3.5% down for eligible borrowers."
        : "Your down payment may provide additional program flexibility.",
      "Down payment assistance programs may be available in your area.",
    ],
    estimatedLoanAmount: Math.max(purchasePrice - downPayment, 0),
    creditTier: creditScoreToTier(answers.creditScore),
    tags: ["fha", "first-time-homebuyer"],
  };
}

export function generateFunnelResult(
  funnelType: FunnelType,
  answers: FunnelAnswers,
): FunnelResult {
  switch (funnelType) {
    case "purchase":
    case "investment":
      return buildPurchaseResult(answers);
    case "refinance":
      return buildRefinanceResult(answers);
    case "heloc":
      return buildHelocResult(answers);
    case "va":
      return buildVaResult(answers);
    case "fha":
    case "first-time-homebuyer":
      return buildFhaResult(answers);
    default:
      return buildPurchaseResult(answers);
  }
}

export function getRecommendedFollowUp(result: FunnelResult): string {
  if (result.leadGrade === "A+" || result.leadGrade === "A") {
    return "Priority callback within 1 business hour";
  }
  if (result.leadGrade === "B") {
    return "Consultation invite within 24 hours";
  }
  if (result.agentReferralScore >= 70) {
    return "Mortgage consultation + Realtor referral";
  }
  return "Educational nurture sequence + consultation invite";
}

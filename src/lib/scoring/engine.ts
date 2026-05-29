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
  const value = parseCurrency(answers.propertyValue);
  const balance = parseCurrency(answers.mortgageBalance);
  const desired = parseCurrency(answers.desiredEquityAccess);
  const equity = Math.max(value - balance, 0);
  const availableEquity = Math.round(equity * 0.85);
  const creditPoints = creditScoreToPoints(answers.creditScore);

  const readinessScore = Math.round(
    creditPoints * 0.5 + Math.min((equity / value) * 100, 50),
  );
  const urgencyScore = desired > 50000 ? 75 : 50;
  const leadQualityScore = Math.round(readinessScore * 0.6 + urgencyScore * 0.4);

  return {
    funnelType: "heloc",
    mortgageOpportunityScore: Math.round(desired / 1000 + equity / 10000),
    readinessScore,
    urgencyScore,
    leadQualityScore,
    agentReferralScore: 10,
    leadGrade: scoreToGrade(leadQualityScore),
    recommendedPrograms: ["heloc"],
    recommendedNextStep:
      "Book a consultation to review HELOC options and available equity.",
    summary: `You may have access to approximately $${availableEquity.toLocaleString()} in home equity.`,
    highlights: [
      `Estimated available equity: $${availableEquity.toLocaleString()}`,
      desired <= availableEquity
        ? "Your desired access amount appears within typical HELOC ranges."
        : "Your desired amount may require additional review or alternative strategies.",
    ],
    estimatedLoanAmount: desired,
    creditTier: creditScoreToTier(answers.creditScore),
    tags: ["heloc", answers.occupancy ?? "primary"],
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

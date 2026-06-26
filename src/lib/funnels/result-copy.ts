import type { FunnelResult, FunnelType } from "@/lib/funnels/types";
import { brand } from "@/lib/brand/config";

const programLabels: Record<string, string> = {
  conventional: "Conventional",
  fha: "FHA",
  va: "VA",
  jumbo: "Jumbo",
  heloc: "HELOC",
  "cash-out-refi": "Cash-Out Refinance",
  "rate-term-refi": "Rate & Term Refinance",
  "down-payment-assistance": "Down Payment Assistance",
};

type ResultCopy = {
  headline: string;
  interpretation: string;
  nextStep: string;
  pathsIntro: string;
};

function scoreLabel(grade: FunnelResult["leadGrade"]): string {
  switch (grade) {
    case "A+":
    case "A":
      return "strong";
    case "B":
      return "promising";
    case "C":
      return "developing";
    default:
      return "early-stage";
  }
}

export function getResultCopy(result: FunnelResult): ResultCopy {
  const gradeWord = scoreLabel(result.leadGrade);
  const prefix = brand.disclaimers.resultsPrefix;
  const pathsIntro = brand.disclaimers.resultsProgramsPrefix;

  switch (result.funnelType) {
    case "purchase":
    case "investment":
      return {
        headline: "Your Home Purchase Strategy",
        interpretation: `${prefix} your profile looks ${gradeWord} for exploring a home purchase. Your readiness reflects your timeline, down payment, and estimated credit range. Recommendations come after advisor review.`,
        nextStep:
          "Book a strategy call to review purchase price, planning structure, and program fit with a licensed advisor.",
        pathsIntro: `${pathsIntro} the following residential loan paths worth exploring`,
      };
    case "refinance":
      return {
        headline: "Your Refinance Strategy",
        interpretation: `${prefix} a refinance may be worth exploring based on your equity position, current rate, and stated goal. Savings and cash-out availability depend on appraisal, occupancy, and underwriting.`,
        nextStep:
          "Schedule a refinance review to compare rate, term, and cash-out scenarios with current market options.",
        pathsIntro: `${pathsIntro} these refinance approaches based on your inputs`,
      };
    case "heloc":
      return {
        headline: "Your Personalized Home Equity Strategy",
        interpretation: `${prefix} potential options may include a HELOC, a cash-out refinance, or another home equity structure. This is educational guidance and not a commitment to lend.`,
        nextStep:
          "A Broadview advisor will personally review your information and walk through your options with you.",
        pathsIntro: `${pathsIntro} a home equity line of credit (HELOC) and cash-out refinance as potential paths`,
      };
    case "va":
      return {
        headline: "Your VA Loan Strategy",
        interpretation: `${prefix} you may be a candidate to explore VA home loan benefits. VA programs often offer favorable terms for eligible veterans and service members, pending certificate of eligibility and underwriting.`,
        nextStep:
          "Schedule a VA strategy call to review entitlement, funding fee considerations, and purchase or refinance next steps.",
        pathsIntro: `${pathsIntro} VA purchase or VA refinance options for eligible borrowers`,
      };
    case "fha":
    case "first-time-homebuyer":
      return {
        headline: "Your FHA / First-Time Buyer Strategy",
        interpretation: `${prefix} FHA financing may be worth exploring given your down payment and credit profile. FHA loans are designed to help qualified borrowers access homeownership with flexible requirements.`,
        nextStep:
          "Book a strategy call to review FHA eligibility, monthly payment estimates, and down payment assistance programs in your area.",
        pathsIntro: `${pathsIntro} FHA and first-time homebuyer programs that may fit your situation`,
      };
    default:
      return {
        headline: "Your Mortgage Strategy",
        interpretation: `${prefix} we've outlined a preliminary strategy based on your responses. This is educational guidance for review, not a rate quote.`,
        nextStep: result.recommendedNextStep,
        pathsIntro: `${pathsIntro} these loan paths`,
      };
  }
}

export function formatProgramLabel(program: string) {
  return programLabels[program] ?? program;
}

export function getScoreInterpretation(
  funnelType: FunnelType,
  result: FunnelResult,
): string {
  const readiness =
    result.readinessScore >= 75
      ? "You appear well-positioned to move forward with a consultation."
      : result.readinessScore >= 55
        ? "You may benefit from a consultation to clarify program fit and next steps."
        : "A consultation can help identify the best path forward and any preparation needed.";

  if (funnelType === "refinance") {
    return `${readiness} Refinance benefits always depend on rate environment, closing costs, and how long you plan to keep the loan.`;
  }

  if (funnelType === "heloc") {
    return `${readiness} Available equity and HELOC terms depend on appraisal, combined loan-to-value limits, and lender guidelines.`;
  }

  return readiness;
}

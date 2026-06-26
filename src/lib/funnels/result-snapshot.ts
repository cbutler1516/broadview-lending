import type { StrategySnapshot } from "@/lib/content/types";
import type { FunnelResult } from "@/lib/funnels/types";
import { formatProgramLabel, getResultCopy } from "@/lib/funnels/result-copy";
import { labelForGoalValue } from "@/lib/funnels/goal-entry";

/**
 * Maps a scored funnel result into the educational Strategy Snapshot shape.
 * Keeps recommendations educational until advisor review.
 */
export function funnelResultToSnapshot(result: FunnelResult): StrategySnapshot {
  const copy = getResultCopy(result);
  const eq = result.equityStrategy;

  if (result.funnelType === "heloc" && eq) {
    return {
      whatWeLearned: [
        `Your stated goal: ${eq.goal}`,
        eq.whyItFits,
        `Estimated available equity (rough): $${Math.round(eq.estimatedAvailableEquity).toLocaleString()}`,
      ].filter(Boolean),
      strategies: [
        eq.initialRecommendation,
        eq.potentialHelocPath,
        eq.cashOutAlternative,
        ...eq.otherOptionsWorthDiscussing,
      ].filter(Boolean),
      questions: eq.questionsToAskAdvisor,
      thingsToVerify: [
        "Property value and lien position",
        "Credit, income, and occupancy",
        "Whether keeping your current first mortgage rate matters",
        "Draw amount, repayment plan, and long-term payment impact",
      ],
      commonMistakes: [
        eq.keepCurrentMortgageNote,
        "Choosing a structure before comparing HELOC vs cash-out trade-offs",
      ].filter(Boolean),
      nextStep: eq.recommendedNextStep,
    };
  }

  const strategies = result.recommendedPrograms.map(formatProgramLabel);

  return {
    whatWeLearned: [
      copy.interpretation,
      ...result.highlights.slice(0, 3),
    ].filter(Boolean),
    strategies:
      strategies.length > 0
        ? strategies
        : ["Conventional", "FHA", "VA — depending on your full profile"],
    questions: [
      "What monthly payment feels comfortable long-term?",
      "How long do you plan to keep this home or loan?",
        "What would make this plan feel clearly right for you?",
    ],
    thingsToVerify: [
        "Credit, income, assets, and employment details",
        "Property type, occupancy, and value review",
        "Advisor review of the complete picture",
    ],
    commonMistakes: [
      "Optimizing for rate alone without considering structure and timeline",
      "Moving forward before comparing all paths that fit your goal",
    ],
    nextStep: copy.nextStep,
  };
}

export function snapshotGoalLine(
  result: FunnelResult,
  answers: Record<string, string>,
): string | undefined {
  if (result.equityStrategy?.goal) return result.equityStrategy.goal;
  const goal =
    answers.equityGoal ?? answers.refinanceGoal ?? answers.purchaseOrRefinance;
  return goal ? labelForGoalValue(goal) : undefined;
}

import {
  type CreditScoreRangeId,
  type EquityAccessRangeId,
} from "@/lib/heloc-engine/funnel-ranges";

export function getStepEncouragement(
  stepId: string,
  context: {
    equityAccessRange?: EquityAccessRangeId | "";
    creditScoreRange?: CreditScoreRangeId | "";
  },
): string | null {
  if (stepId === "capital") {
    if (
      context.equityAccessRange === "100k-250k" ||
      context.equityAccessRange === "250k-500k" ||
      context.equityAccessRange === "500k-plus" ||
      context.equityAccessRange === "500k-750k" ||
      context.equityAccessRange === "750k-1m" ||
      context.equityAccessRange === "1m-plus"
    ) {
      return "A popular range for larger projects";
    }
    return null;
  }

  return null;
}

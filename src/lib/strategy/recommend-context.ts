import type { RecommendationContext } from "@/lib/intelligence/recommend";
import type { VisitorIntent } from "@/lib/intelligence/visitor";
import type { StrategyWorkspace } from "@/lib/strategy/workspace";

export function workspaceToRecommendContext(
  ws: StrategyWorkspace,
  currentPath?: string,
): RecommendationContext {
  let intent: VisitorIntent | undefined;
  if (ws.goal?.journey && ws.goal.journey !== "unknown") {
    intent = ws.goal.journey as VisitorIntent;
  } else if (ws.refinanceInterest) intent = "refinance";
  else if (ws.homeEquityInterest) intent = "home-equity";
  else   if (ws.ecosystemsVisited.includes("va")) intent = "va";
  else if (ws.ecosystemsVisited.includes("fha")) intent = "fha";
  else if (ws.ecosystemsVisited.includes("buy")) intent = "buy";
  else if (currentPath?.includes("va")) intent = "va";
  else if (currentPath?.includes("fha")) intent = "fha";

  const lastGuide = ws.guidesCompleted.at(-1);
  const lastCalc = ws.calculatorsCompleted.at(-1);

  return {
    intent,
    guideResult: lastGuide ? { slug: lastGuide } : undefined,
    calcResult: lastCalc ? { slug: lastCalc } : undefined,
    location: ws.location,
    currentPath,
    previousPath: ws.lastPath,
  };
}

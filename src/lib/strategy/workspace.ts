/**
 * Broadview OS 5.1 — Living Strategy Workspace.
 * localStorage only. No PII. Sync-ready for future auth.
 */

export type StrategyJourney =
  | "buy"
  | "refinance"
  | "home-equity"
  | "commercial"
  | "va"
  | "fha"
  | "unknown";

export type StrategyWorkspace = {
  goal?: { id: string; title: string; journey: StrategyJourney };
  timeline?: string;
  location?: string;
  estimatedBudget?: string;
  downPayment?: string;
  articlesRead: string[];
  guidesCompleted: string[];
  calculatorsCompleted: string[];
  comparisonsViewed: string[];
  lifeEventsViewed: string[];
  ecosystemsVisited: StrategyJourney[];
  pagesVisited: string[];
  commercialInterest: boolean;
  refinanceInterest: boolean;
  homeEquityInterest: boolean;
  questionsSaved: number;
  progress: number;
  confidence: number;
  advisorStatus: string;
  visits: number;
  lastPath?: string;
  updatedAt?: string;
};

const KEY = "broadview_strategy";

export function emptyWorkspace(): StrategyWorkspace {
  return {
    articlesRead: [],
    guidesCompleted: [],
    calculatorsCompleted: [],
    comparisonsViewed: [],
    lifeEventsViewed: [],
    ecosystemsVisited: [],
    pagesVisited: [],
    commercialInterest: false,
    refinanceInterest: false,
    homeEquityInterest: false,
    questionsSaved: 0,
    progress: 0,
    confidence: 0,
    advisorStatus: "Exploring",
    visits: 0,
  };
}

export function readWorkspace(): StrategyWorkspace {
  if (typeof window === "undefined") return emptyWorkspace();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyWorkspace();
    return { ...emptyWorkspace(), ...(JSON.parse(raw) as StrategyWorkspace) };
  } catch {
    return emptyWorkspace();
  }
}

export function writeWorkspace(patch: Partial<StrategyWorkspace>): StrategyWorkspace {
  if (typeof window === "undefined") return { ...emptyWorkspace(), ...patch };
  const merged: StrategyWorkspace = {
    ...readWorkspace(),
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent("broadview:strategy", { detail: merged }));
  } catch {
    // ignore
  }
  return merged;
}

function uniqPush<T extends string>(list: T[], item: T): T[] {
  if (list.includes(item)) return list;
  return [...list, item];
}

function journeyFromPath(path: string): StrategyJourney {
  if (path.startsWith("/commercial")) return "commercial";
  if (/(^|\/)heloc|home-equity/.test(path)) return "home-equity";
  if (path.includes("/va") || path.includes("va-loans")) return "va";
  if (path.includes("/fha") || path.includes("fha-loans")) return "fha";
  if (path.startsWith("/refinance")) return "refinance";
  if (path.startsWith("/buy")) return "buy";
  return "unknown";
}

export function recordStrategyPage(path: string) {
  const ws = readWorkspace();
  const journey = journeyFromPath(path);
  const ecosystems =
    journey !== "unknown"
      ? uniqPush(ws.ecosystemsVisited, journey)
      : ws.ecosystemsVisited;

  const next: Partial<StrategyWorkspace> = {
    lastPath: path,
    visits: (ws.visits ?? 0) + 1,
    pagesVisited: uniqPush(ws.pagesVisited, path).slice(-40),
    ecosystemsVisited: ecosystems,
    commercialInterest: ws.commercialInterest || journey === "commercial",
    refinanceInterest: ws.refinanceInterest || journey === "refinance",
    homeEquityInterest: ws.homeEquityInterest || journey === "home-equity",
  };

  if (path.startsWith("/compare/")) {
    next.comparisonsViewed = uniqPush(ws.comparisonsViewed, path.replace("/compare/", ""));
  }
  if (path.startsWith("/life/")) {
    next.lifeEventsViewed = uniqPush(ws.lifeEventsViewed, path.replace("/life/", ""));
  }
  if (path.startsWith("/locations/")) {
    const slug = path.replace("/locations/", "");
    next.location = slug.replace(/-/g, " ").replace(/\bwa\b/i, "WA");
  }

  writeWorkspace(next);
  recomputeProgress();
}

export function recordGoal(input: {
  id: string;
  title: string;
  journey: StrategyJourney;
}) {
  writeWorkspace({
    goal: input,
    ...(input.journey !== "unknown" && {
      ecosystemsVisited: uniqPush(readWorkspace().ecosystemsVisited, input.journey),
    }),
  });
  recomputeProgress();
}

export function recordArticle(slug: string) {
  const ws = readWorkspace();
  writeWorkspace({ articlesRead: uniqPush(ws.articlesRead, slug) });
  recomputeProgress();
}

export function recordGuideStarted() {
  const ws = readWorkspace();
  writeWorkspace({ questionsSaved: ws.questionsSaved + 1 });
  recomputeProgress();
}

export function recordGuideComplete(slug: string) {
  const ws = readWorkspace();
  writeWorkspace({
    guidesCompleted: uniqPush(ws.guidesCompleted, slug),
    questionsSaved: ws.questionsSaved + 2,
  });
  recomputeProgress();
}

export function recordCalculator(slug: string) {
  const ws = readWorkspace();
  writeWorkspace({ calculatorsCompleted: uniqPush(ws.calculatorsCompleted, slug) });
  recomputeProgress();
}

export function recordComparison(slug: string) {
  const ws = readWorkspace();
  writeWorkspace({ comparisonsViewed: uniqPush(ws.comparisonsViewed, slug) });
  recomputeProgress();
}

export function recordLifeEvent(slug: string) {
  const ws = readWorkspace();
  writeWorkspace({ lifeEventsViewed: uniqPush(ws.lifeEventsViewed, slug) });
  recomputeProgress();
}

export function recordCalcSnapshot(input: {
  budget?: string;
  downPayment?: string;
  timeline?: string;
}) {
  writeWorkspace({
    ...(input.budget && { estimatedBudget: input.budget }),
    ...(input.downPayment && { downPayment: input.downPayment }),
    ...(input.timeline && { timeline: input.timeline }),
  });
  recomputeProgress();
}

export function recomputeProgress() {
  const ws = readWorkspace();
  let score = 0;
  if (ws.goal) score += 15;
  if (ws.ecosystemsVisited.length) score += 5 * Math.min(ws.ecosystemsVisited.length, 3);
  score += Math.min(ws.articlesRead.length * 4, 20);
  score += Math.min(ws.guidesCompleted.length * 8, 24);
  score += Math.min(ws.calculatorsCompleted.length * 10, 20);
  score += Math.min(ws.comparisonsViewed.length * 5, 15);
  if (ws.location) score += 5;
  if (ws.estimatedBudget) score += 5;
  if (ws.timeline) score += 3;

  const progress = Math.min(100, score);
  const confidence = Math.min(
    95,
    Math.round(progress * 0.85 + ws.guidesCompleted.length * 3 + ws.calculatorsCompleted.length * 4),
  );

  let advisorStatus = "Exploring";
  if (progress >= 70) advisorStatus = "Ready for Review";
  else if (progress >= 45) advisorStatus = "Strategy Taking Shape";
  else if (progress >= 20) advisorStatus = "Building Context";

  writeWorkspace({ progress, confidence, advisorStatus });
}

export function journeyToHeroTheme(
  journey?: StrategyJourney,
): import("@/lib/media/assets").HeroTheme {
  switch (journey) {
    case "buy":
      return "buy";
    case "refinance":
      return "refinance";
    case "home-equity":
      return "home-equity";
    case "commercial":
      return "commercial";
    case "va":
    case "fha":
      return "buy";
    default:
      return "home";
  }
}

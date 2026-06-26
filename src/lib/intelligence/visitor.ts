/**
 * Visitor profile (localStorage only). Powers personalization across the
 * platform — dynamic homepage, recommendation engine, and the strategy
 * dashboard. No PII is stored here and nothing touches the backend.
 */

export type VisitorIntent =
  | "buy"
  | "refinance"
  | "home-equity"
  | "va"
  | "fha"
  | "unknown";

export type StrategyStage =
  | "received"
  | "reviewing"
  | "questions"
  | "discussion"
  | "recommendations"
  | "application"
  | "closing";

export type VisitorProfile = {
  intent?: VisitorIntent;
  lastFunnel?: string;
  lastPath?: string;
  previousPath?: string;
  lastGuide?: { slug: string; tier: string };
  lastCalc?: { slug: string };
  lastLocation?: string;
  leadSubmitted?: boolean;
  stage?: StrategyStage;
  leadGrade?: string;
  visits?: number;
  updatedAt?: string;
};

const KEY = "broadview_visitor";

export function readVisitor(): VisitorProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as VisitorProfile) : {};
  } catch {
    return {};
  }
}

export function writeVisitor(patch: Partial<VisitorProfile>): VisitorProfile {
  if (typeof window === "undefined") return patch;
  try {
    const merged: VisitorProfile = {
      ...readVisitor(),
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return patch;
  }
}

export function clearVisitor() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** Map a pathname to a likely intent. */
export function deriveIntentFromPath(path: string): VisitorIntent {
  if (/(heloc|home-equity)/.test(path)) return "home-equity";
  if (/(fha)/.test(path)) return "fha";
  if (/(\/va|va-loans)/.test(path)) return "va";
  if (/(refinance|cash-out|lower-payment|debt-consolidation)/.test(path))
    return "refinance";
  if (/(buy|purchase|homebuyer|conventional|jumbo|physician|self-employed)/.test(path))
    return "buy";
  return "unknown";
}

/** Map a campaign string (utm_campaign / gclid keyword) to an intent. */
export function deriveIntentFromCampaign(campaign?: string): VisitorIntent {
  if (!campaign) return "unknown";
  return deriveIntentFromPath(campaign.toLowerCase());
}

export function recordPageView(path: string) {
  const current = readVisitor();
  const derived = deriveIntentFromPath(path);
  writeVisitor({
    previousPath: current.lastPath,
    lastPath: path,
    visits: (current.visits ?? 0) + 1,
    // Only upgrade intent away from "unknown" — never clobber a known intent
    // with an unknown one from a generic page.
    intent: derived !== "unknown" ? derived : current.intent,
  });
}

export function recordIntent(intent: VisitorIntent) {
  if (intent === "unknown") return;
  writeVisitor({ intent });
}

export function recordGuideResult(slug: string, tier: string) {
  writeVisitor({ lastGuide: { slug, tier } });
}

export function recordCalcResult(slug: string) {
  writeVisitor({ lastCalc: { slug } });
}

export function recordLocation(slug: string) {
  writeVisitor({ lastLocation: slug });
}

export function markLeadSubmitted(input: {
  funnelType: string;
  leadGrade?: string;
}) {
  writeVisitor({
    leadSubmitted: true,
    lastFunnel: input.funnelType,
    leadGrade: input.leadGrade,
    stage: "received",
  });
}

const STAGE_ORDER: StrategyStage[] = [
  "received",
  "reviewing",
  "questions",
  "discussion",
  "recommendations",
  "application",
  "closing",
];

export function stageIndex(stage?: StrategyStage): number {
  if (!stage) return -1;
  return STAGE_ORDER.indexOf(stage);
}

export { STAGE_ORDER };

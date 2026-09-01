import { evaluateDeal } from "@/lib/deal-engine";
import {
  formatDealMoney,
  formatDealPercent,
  formatDealRatio,
} from "@/lib/deal-engine/format";
import type { DealAnalysis, DealMetrics } from "@/lib/deal-engine";
import {
  EMPTY_ANALYZER_AGENT,
  EMPTY_ANALYZER_FORM,
  formToDealScenario,
  showBrrrrFields,
  showRehabFields,
  type AnalyzerAgent,
  type AnalyzerAudience,
  type AnalyzerForm,
  type AnalyzerShape,
} from "@/lib/tools/investor-deal-analyzer";

export const CLIENT_ANALYSIS_SESSION_KEY = "broadview_client_analysis";
export const CLIENT_ANALYSIS_DRAFT_VERSION = 1 as const;

export type ClientAnalysisDraft = {
  version: typeof CLIENT_ANALYSIS_DRAFT_VERSION;
  /** Reserved for a future saved / shareable scenario. */
  scenarioId?: string;
  audience: AnalyzerAudience;
  shape: AnalyzerShape;
  form: AnalyzerForm;
  agent: AnalyzerAgent;
};

export type ClientAnalysisView = {
  scenarioId?: string;
  audience: AnalyzerAudience;
  shape: AnalyzerShape;
  agent: AnalyzerAgent;
  analysis: DealAnalysis;
  observations: string[];
  showLtc: boolean;
  showFlip: boolean;
  showBrrrr: boolean;
};

export function presentationFlags(shape: AnalyzerShape, metrics: DealMetrics) {
  const includeRehab = showRehabFields(shape);
  const includeBrrrr = showBrrrrFields(shape);
  return {
    showLtc: includeRehab || (metrics.ltcPercent !== null && shape !== "hold"),
    showFlip:
      includeRehab &&
      (metrics.projectedFlipProfit !== null || metrics.projectedFlipRoiPercent !== null),
    showBrrrr: includeBrrrr && metrics.brrrrCashRemaining !== null,
  };
}

export function buildStrategyObservations(
  analysis: DealAnalysis,
  shape: AnalyzerShape,
): string[] {
  const { metrics, scenario } = analysis;
  const notes: string[] = [];

  if (metrics.dscr !== null) {
    const dscr = formatDealRatio(metrics.dscr);
    if (metrics.dscr >= 1.25) {
      notes.push(
        `Estimated DSCR of ${dscr} is stronger on these assumptions — modeled NOI covers annual debt service with a cushion.`,
      );
    } else if (metrics.dscr >= 1) {
      notes.push(
        `Estimated DSCR of ${dscr} is near 1.0 — modeled NOI is close to covering annual debt service.`,
      );
    } else {
      notes.push(
        `Estimated DSCR of ${dscr} is weaker on these assumptions — modeled NOI does not fully cover annual debt service.`,
      );
    }
  }

  if (metrics.monthlyCashFlow !== null) {
    const cash = formatDealMoney(metrics.monthlyCashFlow);
    if (metrics.monthlyCashFlow > 0) {
      notes.push(
        `Estimated monthly cash flow is positive (${cash}) based on the rent, expenses, and financing entered.`,
      );
    } else if (metrics.monthlyCashFlow < 0) {
      notes.push(
        `Estimated monthly cash flow is negative (${cash}) based on the rent, expenses, and financing entered.`,
      );
    } else {
      notes.push(
        `Estimated monthly cash flow is break-even on the rent, expenses, and financing entered.`,
      );
    }
  }

  if (metrics.ltvPercent !== null) {
    const ltv = formatDealPercent(metrics.ltvPercent);
    if (metrics.ltvPercent >= 80) {
      notes.push(
        `Modeled LTV of ${ltv} is a higher-leverage structure on the entered purchase price or value.`,
      );
    } else if (metrics.ltvPercent >= 60) {
      notes.push(
        `Modeled LTV of ${ltv} reflects moderate leverage on the entered purchase price or value.`,
      );
    } else {
      notes.push(
        `Modeled LTV of ${ltv} is a lower-leverage structure on the entered purchase price or value.`,
      );
    }
  }

  if (scenario.income.vacancyPercent > 0) {
    notes.push(
      `NOI and cash flow reflect the ${formatDealPercent(scenario.income.vacancyPercent)} vacancy assumption entered.`,
    );
  }

  if (
    scenario.financing.paymentType === "interest_only" &&
    scenario.financing.interestOnlyMonths > 0
  ) {
    notes.push(
      `The estimated financing payment uses the interest-only period entered (${scenario.financing.interestOnlyMonths} months).`,
    );
  }

  if (
    scenario.financing.interestRatePercent > 0 &&
    metrics.monthlyPrincipalAndInterest !== null
  ) {
    notes.push(
      `The estimated financing payment uses the ${formatDealPercent(scenario.financing.interestRatePercent)} interest rate entered.`,
    );
  }

  if (shape === "rehab" && metrics.projectedFlipProfit !== null) {
    notes.push(
      `Projected flip profit uses the renovation budget and ARV entered — not a market estimate.`,
    );
  }

  if (shape === "brrrr" && metrics.brrrrCashRemaining !== null) {
    notes.push(
      `Estimated cash remaining in the deal uses the refinance amount or LTV entered against the ARV provided.`,
    );
  }

  return notes;
}

/**
 * Build the presentation view from a local draft (or a future saved scenario
 * mapped into the same draft shape). Always re-runs evaluateDeal — no copied math.
 */
export function buildClientAnalysisView(draft: ClientAnalysisDraft): ClientAnalysisView {
  const analysis = evaluateDeal(
    formToDealScenario(
      draft.form,
      draft.audience,
      draft.shape,
      draft.agent,
      draft.scenarioId,
    ),
  );
  return viewFromDealAnalysis(analysis, {
    audience: draft.audience,
    shape: draft.shape,
    agent: draft.agent,
    scenarioId: draft.scenarioId,
  });
}

/**
 * Hydrate the same presentation UI from any DealAnalysis — including a future
 * fetch by savedScenarioId — without rebuilding the component.
 */
export function viewFromDealAnalysis(
  analysis: DealAnalysis,
  options: {
    audience?: AnalyzerAudience;
    shape: AnalyzerShape;
    agent?: AnalyzerAgent;
    scenarioId?: string;
  },
): ClientAnalysisView {
  const flags = presentationFlags(options.shape, analysis.metrics);
  return {
    scenarioId: options.scenarioId ?? analysis.scenario.source.savedScenarioId,
    audience: options.audience ?? "realtor",
    shape: options.shape,
    agent: options.agent ?? EMPTY_ANALYZER_AGENT,
    analysis,
    observations: buildStrategyObservations(analysis, options.shape),
    ...flags,
  };
}

export function emptyClientAnalysisDraft(): ClientAnalysisDraft {
  return {
    version: CLIENT_ANALYSIS_DRAFT_VERSION,
    audience: "realtor",
    shape: "hold",
    form: EMPTY_ANALYZER_FORM,
    agent: EMPTY_ANALYZER_AGENT,
  };
}

export function saveClientAnalysisDraft(draft: ClientAnalysisDraft): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CLIENT_ANALYSIS_SESSION_KEY, JSON.stringify(draft));
}

export function loadClientAnalysisDraft(): ClientAnalysisDraft | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CLIENT_ANALYSIS_SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ClientAnalysisDraft>;
    if (parsed.version !== CLIENT_ANALYSIS_DRAFT_VERSION) return null;
    if (!parsed.form || !parsed.audience || !parsed.shape) return null;
    return {
      version: CLIENT_ANALYSIS_DRAFT_VERSION,
      scenarioId: parsed.scenarioId,
      audience: parsed.audience,
      shape: parsed.shape,
      form: { ...EMPTY_ANALYZER_FORM, ...parsed.form },
      agent: { ...EMPTY_ANALYZER_AGENT, ...parsed.agent },
    };
  } catch {
    return null;
  }
}

export function clearClientAnalysisDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CLIENT_ANALYSIS_SESSION_KEY);
}

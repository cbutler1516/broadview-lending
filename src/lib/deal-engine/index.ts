export type {
  DealAnalysis,
  DealBreakdown,
  DealComparison,
  DealEngineMode,
  DealExpenses,
  DealFinancing,
  DealIncome,
  DealMetricKey,
  DealMetrics,
  DealProperty,
  DealRefinance,
  DealRehab,
  DealScenario,
  DealSource,
  NormalizedDealScenario,
  PaymentType,
  PropertyType,
} from "@/lib/deal-engine/types";
export { DEAL_METRIC_KEYS } from "@/lib/deal-engine/types";

export {
  acquisitionCashRequired,
  annualCashFlow,
  asNonNegative,
  brrrrCashRemaining,
  capRate,
  cashOnCash,
  dscrFromNoi,
  dscrFromRentPitia,
  isFiniteNumber,
  loanToCost,
  loanToValue,
  monthlyCashFlow,
  monthlyDebtService,
  monthlyHousingPayment,
  monthlyInterestOnlyPayment,
  monthlyPrincipalAndInterest,
  netOperatingIncome,
  projectedFlipProfit,
  projectedFlipRoi,
  ratioToPercent,
  roundMoney,
  roundRatio,
} from "@/lib/deal-engine/math";

export {
  emptyDealScenario,
  mergeDealScenario,
  normalizeDealScenario,
} from "@/lib/deal-engine/scenario";

export {
  formatDealMoney,
  formatDealPercent,
  formatDealRatio,
  parseDealNumber,
} from "@/lib/deal-engine/format";

export { compareDeals, evaluateDeal, getDealMetric } from "@/lib/deal-engine/evaluate";

export {
  bridgeLens,
  brrrrLens,
  consumerHousingLens,
  dscrLens,
  fixAndFlipLens,
  listingAnalyzerLens,
  rentalProFormaLens,
  withDealMode,
} from "@/lib/deal-engine/lenses";

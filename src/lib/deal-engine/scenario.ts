import { asNonNegative, isFiniteNumber } from "@/lib/deal-engine/math";
import type {
  DealEngineMode,
  DealRefinance,
  DealScenario,
  DealSource,
  NormalizedDealScenario,
} from "@/lib/deal-engine/types";

const MODES: DealEngineMode[] = ["investor", "realtor", "consumer"];

export function emptyDealScenario(mode: DealEngineMode = "investor"): DealScenario {
  return {
    mode,
    property: {},
    financing: {},
    income: {},
    expenses: {},
    rehab: {},
    refinance: {},
    source: {},
  };
}

export function mergeDealScenario(
  base: DealScenario,
  patch: DealScenario,
): DealScenario {
  return {
    mode: patch.mode ?? base.mode,
    property: { ...base.property, ...patch.property },
    financing: { ...base.financing, ...patch.financing },
    income: { ...base.income, ...patch.income },
    expenses: { ...base.expenses, ...patch.expenses },
    rehab: { ...base.rehab, ...patch.rehab },
    refinance: { ...base.refinance, ...patch.refinance },
    source: {
      ...base.source,
      ...patch.source,
      agent: { ...base.source?.agent, ...patch.source?.agent },
      mls: { ...base.source?.mls, ...patch.source?.mls },
    },
  };
}

export function normalizeDealScenario(input: DealScenario = {}): NormalizedDealScenario {
  const mode = input.mode && MODES.includes(input.mode) ? input.mode : "investor";
  const purchase = asNonNegative(input.property?.purchasePrice);
  const arvFromProperty = asNonNegative(input.property?.arv);
  const arvFromRehab = asNonNegative(input.rehab?.estimatedArv);
  const arv = arvFromRehab > 0 ? arvFromRehab : arvFromProperty;
  const estimatedValue = asNonNegative(input.property?.estimatedValue);

  let loanAmount = asNonNegative(input.financing?.loanAmount);
  let downPayment = asNonNegative(input.financing?.downPayment);

  if (
    purchase > 0 &&
    !isFiniteNumber(input.financing?.loanAmount) &&
    isFiniteNumber(input.financing?.downPayment)
  ) {
    loanAmount = Math.max(0, purchase - downPayment);
  } else if (
    purchase > 0 &&
    !isFiniteNumber(input.financing?.downPayment) &&
    isFiniteNumber(input.financing?.loanAmount)
  ) {
    downPayment = Math.max(0, purchase - loanAmount);
  }

  const amortizationYears =
    asNonNegative(input.financing?.amortizationYears) ||
    asNonNegative(input.financing?.loanTermYears) ||
    30;
  const loanTermYears =
    asNonNegative(input.financing?.loanTermYears) || amortizationYears;

  const source: DealSource = input.source ?? {};
  const refinance: DealRefinance = input.refinance ?? {};

  return {
    mode,
    property: {
      ...input.property,
      purchasePrice: purchase,
      estimatedValue,
      arv,
      units: asNonNegative(input.property?.units) || 1,
    },
    financing: {
      ...input.financing,
      loanAmount,
      downPayment,
      interestRatePercent: asNonNegative(input.financing?.interestRatePercent),
      amortizationYears,
      loanTermYears,
      interestOnlyMonths: asNonNegative(input.financing?.interestOnlyMonths),
      lenderCosts: asNonNegative(input.financing?.lenderCosts),
      paymentType: input.financing?.paymentType,
    },
    income: {
      monthlyRent: asNonNegative(input.income?.monthlyRent),
      otherMonthlyIncome: asNonNegative(input.income?.otherMonthlyIncome),
      vacancyPercent: Math.min(100, asNonNegative(input.income?.vacancyPercent)),
    },
    expenses: {
      ...input.expenses,
      taxesAnnual: asNonNegative(input.expenses?.taxesAnnual),
      insuranceAnnual: asNonNegative(input.expenses?.insuranceAnnual),
      hoaMonthly: asNonNegative(input.expenses?.hoaMonthly),
      utilitiesMonthly: asNonNegative(input.expenses?.utilitiesMonthly),
      managementMonthly: asNonNegative(input.expenses?.managementMonthly),
      maintenanceMonthly: asNonNegative(input.expenses?.maintenanceMonthly),
      otherMonthly: asNonNegative(input.expenses?.otherMonthly),
    },
    rehab: {
      ...input.rehab,
      renovationBudget: asNonNegative(input.rehab?.renovationBudget),
      renovationMonths: asNonNegative(input.rehab?.renovationMonths),
      financed: Boolean(input.rehab?.financed),
      estimatedArv: arvFromRehab,
    },
    refinance,
    source,
  };
}

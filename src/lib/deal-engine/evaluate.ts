import {
  acquisitionCashRequired,
  annualCashFlow,
  brrrrCashRemaining,
  capRate,
  cashOnCash,
  dscrFromNoi,
  dscrFromRentPitia,
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
} from "@/lib/deal-engine/math";
import { normalizeDealScenario } from "@/lib/deal-engine/scenario";
import type {
  DealAnalysis,
  DealComparison,
  DealMetricKey,
  DealMetrics,
  DealScenario,
  NormalizedDealScenario,
} from "@/lib/deal-engine/types";
import { DEAL_METRIC_KEYS } from "@/lib/deal-engine/types";

function emptyMetrics(): DealMetrics {
  return Object.fromEntries(DEAL_METRIC_KEYS.map((key) => [key, null])) as DealMetrics;
}

function valueBasis(scenario: NormalizedDealScenario): number | null {
  const estimated = scenario.property.estimatedValue;
  const purchase = scenario.property.purchasePrice;
  const arv = scenario.property.arv;
  if (estimated > 0) return estimated;
  if (purchase > 0) return purchase;
  if (arv > 0) return arv;
  return null;
}

function refinanceLoanAmount(scenario: NormalizedDealScenario): number | null {
  const explicit = scenario.refinance.loanAmount;
  if (typeof explicit === "number" && Number.isFinite(explicit) && explicit >= 0) {
    return explicit;
  }
  const ltv = scenario.refinance.ltvPercent;
  const arv = scenario.property.arv;
  if (
    typeof ltv === "number" &&
    Number.isFinite(ltv) &&
    ltv > 0 &&
    arv > 0
  ) {
    return roundMoney(arv * (ltv / 100));
  }
  return null;
}

export function evaluateDeal(input: DealScenario = {}): DealAnalysis {
  const scenario = normalizeDealScenario(input);
  const metrics = emptyMetrics();

  const monthlyTaxes = roundMoney(scenario.expenses.taxesAnnual / 12);
  const monthlyInsurance = roundMoney(scenario.expenses.insuranceAnnual / 12);
  const monthlyHoa = scenario.expenses.hoaMonthly;

  const amortizingMonthlyPayment = monthlyPrincipalAndInterest(
    scenario.financing.loanAmount,
    scenario.financing.interestRatePercent,
    scenario.financing.amortizationYears,
  );
  const interestOnlyMonthlyPayment = monthlyInterestOnlyPayment(
    scenario.financing.loanAmount,
    scenario.financing.interestRatePercent,
  );
  const inInterestOnlyPeriod =
    scenario.financing.paymentType === "interest_only" ||
    scenario.financing.interestOnlyMonths > 0;

  const monthlyDebt = monthlyDebtService({
    principal: scenario.financing.loanAmount,
    annualRatePercent: scenario.financing.interestRatePercent,
    amortizationYears: scenario.financing.amortizationYears,
    interestOnlyMonths: scenario.financing.interestOnlyMonths,
    paymentType: scenario.financing.paymentType,
  });

  const monthlyDebtAmount = monthlyDebt ?? 0;
  const annualDebt = roundMoney(monthlyDebtAmount * 12);
  const housing = monthlyHousingPayment(
    monthlyDebtAmount,
    monthlyTaxes,
    monthlyInsurance,
    monthlyHoa,
  );

  metrics.monthlyPrincipalAndInterest = inInterestOnlyPeriod
    ? interestOnlyMonthlyPayment
    : amortizingMonthlyPayment;
  metrics.monthlyHousingPayment = monthlyDebt === null ? null : housing;

  const grossScheduledRent = roundMoney(scenario.income.monthlyRent * 12);
  const vacancyLoss = roundMoney(
    grossScheduledRent * (scenario.income.vacancyPercent / 100),
  );
  const effectiveRentalIncome = roundMoney(grossScheduledRent - vacancyLoss);
  const annualOtherIncome = roundMoney(scenario.income.otherMonthlyIncome * 12);
  const effectiveGrossIncome = roundMoney(effectiveRentalIncome + annualOtherIncome);

  const managementFromPercent =
    scenario.expenses.managementPercent !== undefined
      ? roundMoney(effectiveRentalIncome * (scenario.expenses.managementPercent / 100))
      : 0;
  const maintenanceFromPercent =
    scenario.expenses.maintenancePercent !== undefined
      ? roundMoney(grossScheduledRent * (scenario.expenses.maintenancePercent / 100))
      : 0;

  const management =
    scenario.expenses.managementMonthly > 0
      ? roundMoney(scenario.expenses.managementMonthly * 12)
      : managementFromPercent;
  const maintenance =
    scenario.expenses.maintenanceMonthly > 0
      ? roundMoney(scenario.expenses.maintenanceMonthly * 12)
      : maintenanceFromPercent;

  const annualOperatingExpenses = roundMoney(
    scenario.expenses.taxesAnnual +
      scenario.expenses.insuranceAnnual +
      monthlyHoa * 12 +
      scenario.expenses.utilitiesMonthly * 12 +
      management +
      maintenance +
      scenario.expenses.otherMonthly * 12,
  );

  const hasOperatingInputs =
    effectiveGrossIncome > 0 || annualOperatingExpenses > 0;
  const noi = hasOperatingInputs
    ? netOperatingIncome(effectiveGrossIncome, annualOperatingExpenses)
    : null;

  metrics.noi = noi;
  const basis = valueBasis(scenario);
  const cap = noi !== null && basis !== null ? capRate(noi, basis) : null;
  metrics.capRate = cap;
  metrics.capRatePercent = ratioToPercent(cap);

  metrics.dscr = noi !== null ? dscrFromNoi(noi, annualDebt) : null;
  metrics.dscrRentPitia =
    metrics.monthlyHousingPayment !== null
      ? dscrFromRentPitia(scenario.income.monthlyRent, metrics.monthlyHousingPayment)
      : null;

  if (noi !== null && monthlyDebt !== null) {
    metrics.monthlyCashFlow = monthlyCashFlow(noi, monthlyDebtAmount);
    metrics.annualCashFlow = annualCashFlow(noi, annualDebt);
  }

  const unfinancedRehab = scenario.rehab.financed
    ? 0
    : scenario.rehab.renovationBudget;
  const cashInvested = roundMoney(
    scenario.financing.downPayment + scenario.financing.lenderCosts + unfinancedRehab,
  );
  const acquisition = acquisitionCashRequired(
    scenario.property.purchasePrice,
    scenario.financing.lenderCosts,
    unfinancedRehab,
    scenario.financing.loanAmount,
  );

  metrics.cashInvested = cashInvested;
  metrics.acquisitionCashRequired =
    scenario.property.purchasePrice > 0 || scenario.financing.loanAmount > 0
      ? acquisition
      : cashInvested > 0
        ? cashInvested
        : null;
  const coc =
    metrics.annualCashFlow !== null ? cashOnCash(metrics.annualCashFlow, cashInvested) : null;
  metrics.cashOnCash = coc;
  metrics.cashOnCashPercent = ratioToPercent(coc);

  const projectCost = roundMoney(
    scenario.property.purchasePrice +
      scenario.rehab.renovationBudget +
      scenario.financing.lenderCosts,
  );
  const ltv = basis !== null ? loanToValue(scenario.financing.loanAmount, basis) : null;
  const ltc = projectCost > 0 ? loanToCost(scenario.financing.loanAmount, projectCost) : null;
  metrics.ltv = ltv;
  metrics.ltvPercent = ratioToPercent(ltv);
  metrics.ltc = ltc;
  metrics.ltcPercent = ratioToPercent(ltc);

  const holdingDebt = roundMoney(
    monthlyDebtAmount * scenario.rehab.renovationMonths,
  );
  const flipProfit = projectedFlipProfit({
    arv: scenario.property.arv,
    purchasePrice: scenario.property.purchasePrice,
    rehabBudget: scenario.rehab.renovationBudget,
    lenderCosts: scenario.financing.lenderCosts,
    holdingDebt,
  });
  metrics.projectedFlipProfit = flipProfit;
  const flipRoi =
    flipProfit !== null ? projectedFlipRoi(flipProfit, cashInvested) : null;
  metrics.projectedFlipRoi = flipRoi;
  metrics.projectedFlipRoiPercent = ratioToPercent(flipRoi);

  const refiLoan = refinanceLoanAmount(scenario);
  metrics.brrrrCashRemaining =
    refiLoan !== null
      ? brrrrCashRemaining(cashInvested, refiLoan, scenario.financing.loanAmount)
      : null;

  return {
    scenario,
    metrics,
    breakdown: {
      grossScheduledRent,
      vacancyLoss,
      effectiveRentalIncome,
      annualOtherIncome,
      effectiveGrossIncome,
      annualOperatingExpenses,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHoa,
      monthlyDebtService: monthlyDebtAmount,
      annualDebtService: annualDebt,
      amortizingMonthlyPayment,
      interestOnlyMonthlyPayment,
      inInterestOnlyPeriod,
      projectCost,
      holdingDebtDuringRehab: holdingDebt,
      valueBasis: basis,
      refinanceLoanAmount: refiLoan,
    },
  };
}

export function getDealMetric(
  analysis: DealAnalysis,
  key: DealMetricKey,
): number | null {
  return analysis.metrics[key];
}

export function compareDeals(left: DealScenario, right: DealScenario): DealComparison {
  const leftAnalysis = evaluateDeal(left);
  const rightAnalysis = evaluateDeal(right);
  const delta: DealComparison["delta"] = {};

  for (const key of DEAL_METRIC_KEYS) {
    const a = leftAnalysis.metrics[key];
    const b = rightAnalysis.metrics[key];
    if (a === null || b === null) {
      delta[key] = null;
    } else {
      delta[key] = b - a;
    }
  }

  return { left: leftAnalysis, right: rightAnalysis, delta };
}

/**
 * Named projections for future tools. Same engine, different field sets.
 * Do not add separate calculation engines per tool or mode.
 */

import type { DealAnalysis, DealEngineMode } from "@/lib/deal-engine/types";

export function withDealMode(
  analysis: DealAnalysis,
  mode: DealEngineMode,
): DealAnalysis {
  return {
    ...analysis,
    scenario: { ...analysis.scenario, mode },
  };
}

export function dscrLens(analysis: DealAnalysis) {
  return {
    dscr: analysis.metrics.dscr,
    dscrRentPitia: analysis.metrics.dscrRentPitia,
    noi: analysis.metrics.noi,
    monthlyHousingPayment: analysis.metrics.monthlyHousingPayment,
    annualDebtService: analysis.breakdown.annualDebtService,
    monthlyRent: analysis.scenario.income.monthlyRent,
  };
}

export function rentalProFormaLens(analysis: DealAnalysis) {
  return {
    noi: analysis.metrics.noi,
    capRatePercent: analysis.metrics.capRatePercent,
    dscr: analysis.metrics.dscr,
    monthlyCashFlow: analysis.metrics.monthlyCashFlow,
    annualCashFlow: analysis.metrics.annualCashFlow,
    cashOnCashPercent: analysis.metrics.cashOnCashPercent,
    cashInvested: analysis.metrics.cashInvested,
    income: {
      grossScheduledRent: analysis.breakdown.grossScheduledRent,
      vacancyLoss: analysis.breakdown.vacancyLoss,
      effectiveGrossIncome: analysis.breakdown.effectiveGrossIncome,
    },
    expenses: analysis.breakdown.annualOperatingExpenses,
  };
}

export function fixAndFlipLens(analysis: DealAnalysis) {
  return {
    projectedFlipProfit: analysis.metrics.projectedFlipProfit,
    projectedFlipRoiPercent: analysis.metrics.projectedFlipRoiPercent,
    ltcPercent: analysis.metrics.ltcPercent,
    ltvPercent: analysis.metrics.ltvPercent,
    acquisitionCashRequired: analysis.metrics.acquisitionCashRequired,
    projectCost: analysis.breakdown.projectCost,
    holdingDebtDuringRehab: analysis.breakdown.holdingDebtDuringRehab,
    arv: analysis.scenario.property.arv,
  };
}

export function brrrrLens(analysis: DealAnalysis) {
  return {
    cashInvested: analysis.metrics.cashInvested,
    brrrrCashRemaining: analysis.metrics.brrrrCashRemaining,
    refinanceLoanAmount: analysis.breakdown.refinanceLoanAmount,
    dscr: analysis.metrics.dscr,
    noi: analysis.metrics.noi,
    cashOnCashPercent: analysis.metrics.cashOnCashPercent,
  };
}

export function bridgeLens(analysis: DealAnalysis) {
  return {
    monthlyHousingPayment: analysis.metrics.monthlyHousingPayment,
    monthlyPrincipalAndInterest: analysis.metrics.monthlyPrincipalAndInterest,
    inInterestOnlyPeriod: analysis.breakdown.inInterestOnlyPeriod,
    interestOnlyMonthlyPayment: analysis.breakdown.interestOnlyMonthlyPayment,
    amortizingMonthlyPayment: analysis.breakdown.amortizingMonthlyPayment,
    ltcPercent: analysis.metrics.ltcPercent,
    ltvPercent: analysis.metrics.ltvPercent,
    acquisitionCashRequired: analysis.metrics.acquisitionCashRequired,
    holdingDebtDuringRehab: analysis.breakdown.holdingDebtDuringRehab,
  };
}

export function listingAnalyzerLens(analysis: DealAnalysis) {
  return {
    mode: analysis.scenario.mode,
    source: analysis.scenario.source,
    monthlyHousingPayment: analysis.metrics.monthlyHousingPayment,
    noi: analysis.metrics.noi,
    capRatePercent: analysis.metrics.capRatePercent,
    dscr: analysis.metrics.dscr,
    cashOnCashPercent: analysis.metrics.cashOnCashPercent,
    ltvPercent: analysis.metrics.ltvPercent,
  };
}

export function consumerHousingLens(analysis: DealAnalysis) {
  return {
    monthlyHousingPayment: analysis.metrics.monthlyHousingPayment,
    monthlyPrincipalAndInterest: analysis.metrics.monthlyPrincipalAndInterest,
    ltvPercent: analysis.metrics.ltvPercent,
    acquisitionCashRequired: analysis.metrics.acquisitionCashRequired,
    cashInvested: analysis.metrics.cashInvested,
  };
}

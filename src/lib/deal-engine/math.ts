/**
 * Pure deal-engine primitives. UI must import these — never recompute inline.
 * Payment math matches Broadview's affordability planner (0% rate → principal / n).
 */

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function roundRatio(value: number, decimals = 6): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function asNonNegative(value: number | undefined | null): number {
  if (!isFiniteNumber(value) || value < 0) return 0;
  return value;
}

/**
 * Monthly amortizing P&I. 0% rate uses principal / months (same as /tools/affordability-planner).
 */
export function monthlyPrincipalAndInterest(
  principal: number,
  annualRatePercent: number,
  amortizationYears: number,
): number | null {
  if (!isFiniteNumber(principal) || principal < 0) return null;
  if (principal === 0) return 0;
  if (!isFiniteNumber(annualRatePercent) || annualRatePercent < 0) return null;
  if (!isFiniteNumber(amortizationYears) || amortizationYears <= 0) return null;

  const months = amortizationYears * 12;
  if (annualRatePercent === 0) return roundMoney(principal / months);

  const monthlyRate = annualRatePercent / 100 / 12;
  const growth = Math.pow(1 + monthlyRate, months);
  return roundMoney((principal * monthlyRate * growth) / (growth - 1));
}

export function monthlyInterestOnlyPayment(
  principal: number,
  annualRatePercent: number,
): number | null {
  if (!isFiniteNumber(principal) || principal < 0) return null;
  if (principal === 0) return 0;
  if (!isFiniteNumber(annualRatePercent) || annualRatePercent < 0) return null;
  if (annualRatePercent === 0) return 0;
  return roundMoney((principal * (annualRatePercent / 100)) / 12);
}

export function monthlyDebtService(input: {
  principal: number;
  annualRatePercent: number;
  amortizationYears: number;
  interestOnlyMonths?: number;
  paymentType?: "principal_and_interest" | "interest_only";
}): number | null {
  const ioMonths = asNonNegative(input.interestOnlyMonths);
  const useIo =
    input.paymentType === "interest_only" || ioMonths > 0;

  if (useIo) {
    return monthlyInterestOnlyPayment(input.principal, input.annualRatePercent);
  }

  return monthlyPrincipalAndInterest(
    input.principal,
    input.annualRatePercent,
    input.amortizationYears,
  );
}

export function monthlyHousingPayment(
  monthlyDebtServiceAmount: number,
  monthlyTaxes: number,
  monthlyInsurance: number,
  monthlyHoa: number,
): number {
  return roundMoney(
    monthlyDebtServiceAmount + monthlyTaxes + monthlyInsurance + monthlyHoa,
  );
}

export function netOperatingIncome(
  effectiveGrossIncome: number,
  operatingExpenses: number,
): number {
  return roundMoney(effectiveGrossIncome - operatingExpenses);
}

export function capRate(noi: number, value: number): number | null {
  if (!isFiniteNumber(noi) || !isFiniteNumber(value) || value <= 0) return null;
  return roundRatio(noi / value);
}

export function dscrFromNoi(noi: number, annualDebtService: number): number | null {
  if (!isFiniteNumber(noi) || !isFiniteNumber(annualDebtService) || annualDebtService <= 0) {
    return null;
  }
  return roundRatio(noi / annualDebtService, 4);
}

/** Residential DSCR method: monthly rent ÷ monthly PITIA. */
export function dscrFromRentPitia(monthlyRent: number, monthlyPitia: number): number | null {
  if (
    !isFiniteNumber(monthlyRent) ||
    !isFiniteNumber(monthlyPitia) ||
    monthlyRent <= 0 ||
    monthlyPitia <= 0
  ) {
    return null;
  }
  return roundRatio(monthlyRent / monthlyPitia, 4);
}

export function monthlyCashFlow(noi: number, monthlyDebt: number): number {
  return roundMoney(noi / 12 - monthlyDebt);
}

export function annualCashFlow(noi: number, annualDebt: number): number {
  return roundMoney(noi - annualDebt);
}

export function cashOnCash(annualCash: number, cashInvested: number): number | null {
  if (!isFiniteNumber(cashInvested) || cashInvested <= 0) return null;
  return roundRatio(annualCash / cashInvested);
}

export function loanToValue(loanAmount: number, value: number): number | null {
  if (!isFiniteNumber(loanAmount) || !isFiniteNumber(value) || value <= 0 || loanAmount < 0) {
    return null;
  }
  return roundRatio(loanAmount / value);
}

export function loanToCost(loanAmount: number, projectCost: number): number | null {
  if (
    !isFiniteNumber(loanAmount) ||
    !isFiniteNumber(projectCost) ||
    projectCost <= 0 ||
    loanAmount < 0
  ) {
    return null;
  }
  return roundRatio(loanAmount / projectCost);
}

export function acquisitionCashRequired(
  purchasePrice: number,
  lenderCosts: number,
  unfinancedRehab: number,
  loanAmount: number,
): number {
  return roundMoney(purchasePrice + lenderCosts + unfinancedRehab - loanAmount);
}

export function projectedFlipProfit(input: {
  arv: number;
  purchasePrice: number;
  rehabBudget: number;
  lenderCosts: number;
  holdingDebt: number;
}): number | null {
  if (!isFiniteNumber(input.arv) || input.arv <= 0) return null;
  return roundMoney(
    input.arv -
      input.purchasePrice -
      input.rehabBudget -
      input.lenderCosts -
      input.holdingDebt,
  );
}

export function projectedFlipRoi(profit: number, cashInvested: number): number | null {
  if (!isFiniteNumber(cashInvested) || cashInvested <= 0) return null;
  return roundRatio(profit / cashInvested);
}

/**
 * Cash remaining after a refinance takeout:
 * cash invested − (refi loan − acquisition loan payoff).
 * Negative means cash out at refinance.
 */
export function brrrrCashRemaining(
  cashInvested: number,
  refinanceLoan: number,
  acquisitionLoanPayoff: number,
): number {
  return roundMoney(cashInvested - (refinanceLoan - acquisitionLoanPayoff));
}

export function ratioToPercent(ratio: number | null): number | null {
  if (ratio === null) return null;
  return roundRatio(ratio * 100, 2);
}

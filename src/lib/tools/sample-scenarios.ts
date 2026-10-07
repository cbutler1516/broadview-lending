import type { AnalyzerForm, AnalyzerShape } from "./investor-deal-analyzer";
import type { OfferInputs } from "./offer-comparison";

/** Fictional demonstration inputs, never current quotes or property estimates. */
export const SAMPLE_NOTICE = "Illustrative sample only—not a real property, rate quote, loan offer, or guarantee of returns. Edit it to explore, or clear it to enter your own numbers.";

export const AFFORDABILITY_SAMPLE: Record<string, string> = {
  payment: "3000", down: "60000", rate: "6.5", taxIns: "1.4",
};
export const EQUITY_SAMPLE: Record<string, string> = {
  value: "650000", balance: "300000", currentRate: "3.25", cashNeeded: "75000", newRate: "6.75",
};
export const OFFER_SAMPLE_A: OfferInputs = {
  price: "490000", downPercent: "20", rate: "6.5", years: "30",
  closingCosts: "10000", points: "0", sellerCredit: "0",
  taxes: "450", insurance: "150", hoa: "0", mortgageInsurance: "0",
};
export const OFFER_SAMPLE_B: OfferInputs = {
  ...OFFER_SAMPLE_A, price: "500000", sellerCredit: "10000",
};

const rental: AnalyzerForm = {
  address: "Illustrative sample — not a real property",
  propertyType: "2-4", purchasePrice: "400000", estimatedValue: "400000", arv: "400000", units: "2",
  downPayment: "100000", loanAmount: "300000", interestRatePercent: "7", amortizationYears: "30",
  loanTermYears: "30", interestOnlyMonths: "0", paymentType: "principal_and_interest", lenderCosts: "6000",
  monthlyRent: "3800", otherMonthlyIncome: "100", vacancyPercent: "5",
  taxesAnnual: "4800", insuranceAnnual: "1800", hoaMonthly: "0", utilitiesMonthly: "100",
  managementMonthly: "300", maintenanceMonthly: "200", otherMonthly: "50",
  renovationBudget: "0", renovationMonths: "0", refinanceLoanAmount: "0", refinanceLtvPercent: "0",
};

export function createAnalyzerSample(shape: AnalyzerShape): AnalyzerForm {
  if (shape === "hold") return { ...rental };
  return {
    ...rental, propertyType: "sfr", units: "1", purchasePrice: "250000", estimatedValue: "250000", arv: "375000",
    downPayment: "75000", loanAmount: "175000", interestRatePercent: "9", loanTermYears: "1",
    paymentType: "interest_only", interestOnlyMonths: "12", lenderCosts: "5000",
    monthlyRent: shape === "brrrr" ? "3000" : "0", otherMonthlyIncome: "0",
    vacancyPercent: shape === "brrrr" ? "5" : "0", taxesAnnual: "3600", insuranceAnnual: "1500",
    managementMonthly: shape === "brrrr" ? "240" : "0", maintenanceMonthly: shape === "brrrr" ? "150" : "0",
    renovationBudget: "50000", renovationMonths: "6",
    refinanceLoanAmount: shape === "brrrr" ? "281250" : "0", refinanceLtvPercent: shape === "brrrr" ? "75" : "0",
  };
}

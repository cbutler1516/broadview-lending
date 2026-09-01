/**
 * Shared Property / Deal Engine scenario.
 * One model for investor, realtor/partner, and consumer analysis.
 * Persistence, MLS, and CRM wiring stay optional metadata.
 */

export type DealEngineMode = "investor" | "realtor" | "consumer";

export type PropertyType =
  | "sfr"
  | "condo"
  | "townhome"
  | "2-4"
  | "multifamily"
  | "mixed_use"
  | "other";

export type PaymentType = "principal_and_interest" | "interest_only";

export interface DealProperty {
  address?: string;
  propertyType?: PropertyType;
  purchasePrice?: number;
  /** As-is or current estimated value. */
  estimatedValue?: number;
  /** After-repair / after-completion value. */
  arv?: number;
  units?: number;
}

export interface DealFinancing {
  loanAmount?: number;
  downPayment?: number;
  /** Annual interest rate percent, e.g. 6.5. */
  interestRatePercent?: number;
  /** Amortizing term in years. Defaults to loanTermYears. */
  amortizationYears?: number;
  /** Note term in years (balloon / hold). Defaults to amortizationYears. */
  loanTermYears?: number;
  /** Months of interest-only before amortizing payments. */
  interestOnlyMonths?: number;
  paymentType?: PaymentType;
  /** Lender / origination / closing costs paid in cash. */
  lenderCosts?: number;
}

export interface DealIncome {
  monthlyRent?: number;
  otherMonthlyIncome?: number;
  /** Vacancy percent, e.g. 5. */
  vacancyPercent?: number;
}

export interface DealExpenses {
  taxesAnnual?: number;
  insuranceAnnual?: number;
  hoaMonthly?: number;
  utilitiesMonthly?: number;
  managementMonthly?: number;
  /** If set and managementMonthly is omitted, applied to effective rental income. */
  managementPercent?: number;
  maintenanceMonthly?: number;
  /** If set and maintenanceMonthly is omitted, applied to gross scheduled rent. */
  maintenancePercent?: number;
  otherMonthly?: number;
}

export interface DealRehab {
  renovationBudget?: number;
  estimatedArv?: number;
  renovationMonths?: number;
  /** When true, renovation budget is treated as loan proceeds, not extra cash. */
  financed?: boolean;
}

/**
 * Optional takeout / refinance slice for BRRRR and bridge exits.
 * No default LTV is assumed.
 */
export interface DealRefinance {
  loanAmount?: number;
  ltvPercent?: number;
}

/**
 * Reserved source / attribution fields. No integrations in this sprint.
 */
export interface DealSource {
  agent?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
  };
  mls?: {
    listingId?: string;
    mlsName?: string;
  };
  referralSource?: string;
  campaign?: string;
  savedScenarioId?: string;
}

export interface DealScenario {
  mode?: DealEngineMode;
  property?: DealProperty;
  financing?: DealFinancing;
  income?: DealIncome;
  expenses?: DealExpenses;
  rehab?: DealRehab;
  refinance?: DealRefinance;
  source?: DealSource;
}

export interface NormalizedDealScenario {
  mode: DealEngineMode;
  property: Required<
    Pick<DealProperty, "purchasePrice" | "estimatedValue" | "arv" | "units">
  > &
    DealProperty;
  financing: Required<
    Pick<
      DealFinancing,
      | "loanAmount"
      | "downPayment"
      | "interestRatePercent"
      | "amortizationYears"
      | "loanTermYears"
      | "interestOnlyMonths"
      | "lenderCosts"
    >
  > &
    DealFinancing;
  income: Required<DealIncome>;
  expenses: Required<
    Pick<
      DealExpenses,
      | "taxesAnnual"
      | "insuranceAnnual"
      | "hoaMonthly"
      | "utilitiesMonthly"
      | "managementMonthly"
      | "maintenanceMonthly"
      | "otherMonthly"
    >
  > &
    DealExpenses;
  rehab: Required<Pick<DealRehab, "renovationBudget" | "renovationMonths" | "financed">> &
    DealRehab;
  refinance: DealRefinance;
  source: DealSource;
}

export const DEAL_METRIC_KEYS = [
  "monthlyPrincipalAndInterest",
  "monthlyHousingPayment",
  "noi",
  "capRate",
  "capRatePercent",
  "dscr",
  "dscrRentPitia",
  "monthlyCashFlow",
  "annualCashFlow",
  "cashInvested",
  "cashOnCash",
  "cashOnCashPercent",
  "ltv",
  "ltvPercent",
  "ltc",
  "ltcPercent",
  "acquisitionCashRequired",
  "projectedFlipProfit",
  "projectedFlipRoi",
  "projectedFlipRoiPercent",
  "brrrrCashRemaining",
] as const;

export type DealMetricKey = (typeof DEAL_METRIC_KEYS)[number];

export type DealMetrics = Record<DealMetricKey, number | null>;

export interface DealBreakdown {
  grossScheduledRent: number;
  vacancyLoss: number;
  effectiveRentalIncome: number;
  annualOtherIncome: number;
  effectiveGrossIncome: number;
  annualOperatingExpenses: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  monthlyDebtService: number;
  annualDebtService: number;
  amortizingMonthlyPayment: number | null;
  interestOnlyMonthlyPayment: number | null;
  inInterestOnlyPeriod: boolean;
  projectCost: number;
  holdingDebtDuringRehab: number;
  valueBasis: number | null;
  refinanceLoanAmount: number | null;
}

export interface DealAnalysis {
  scenario: NormalizedDealScenario;
  metrics: DealMetrics;
  breakdown: DealBreakdown;
}

export interface DealComparison {
  left: DealAnalysis;
  right: DealAnalysis;
  delta: Partial<Record<DealMetricKey, number | null>>;
}

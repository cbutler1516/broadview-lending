import { parseDealNumber } from "@/lib/deal-engine/format";
import type { DealEngineMode, DealScenario, PropertyType } from "@/lib/deal-engine";

export const DEAL_ANALYZER_SLUG = "investor-deal-analyzer";
export const DEAL_ANALYZER_PATH = "/tools/investor-deal-analyzer";

export type AnalyzerAudience = "investor" | "realtor";
export type AnalyzerShape = "hold" | "rehab" | "brrrr";

export type AnalyzerAgent = {
  name: string;
  brokerage: string;
  email: string;
  phone: string;
};

export const EMPTY_ANALYZER_AGENT: AnalyzerAgent = {
  name: "",
  brokerage: "",
  email: "",
  phone: "",
};

export const ANALYZER_SHAPES: { value: AnalyzerShape; label: string }[] = [
  { value: "hold", label: "Hold / rental" },
  { value: "rehab", label: "Rehab / flip" },
  { value: "brrrr", label: "BRRRR" },
];

export const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "sfr", label: "Single-family" },
  { value: "condo", label: "Condo" },
  { value: "townhome", label: "Townhome" },
  { value: "2-4", label: "2–4 units" },
  { value: "multifamily", label: "Multifamily (5+)" },
  { value: "mixed_use", label: "Mixed-use" },
  { value: "other", label: "Other" },
];

export type AnalyzerForm = {
  address: string;
  propertyType: PropertyType;
  purchasePrice: string;
  estimatedValue: string;
  arv: string;
  units: string;
  downPayment: string;
  loanAmount: string;
  interestRatePercent: string;
  amortizationYears: string;
  loanTermYears: string;
  interestOnlyMonths: string;
  paymentType: "principal_and_interest" | "interest_only";
  lenderCosts: string;
  monthlyRent: string;
  otherMonthlyIncome: string;
  vacancyPercent: string;
  taxesAnnual: string;
  insuranceAnnual: string;
  hoaMonthly: string;
  utilitiesMonthly: string;
  managementMonthly: string;
  maintenanceMonthly: string;
  otherMonthly: string;
  renovationBudget: string;
  renovationMonths: string;
  refinanceLoanAmount: string;
  refinanceLtvPercent: string;
};

export const EMPTY_ANALYZER_FORM: AnalyzerForm = {
  address: "",
  propertyType: "sfr",
  purchasePrice: "",
  estimatedValue: "",
  arv: "",
  units: "",
  downPayment: "",
  loanAmount: "",
  interestRatePercent: "",
  amortizationYears: "",
  loanTermYears: "",
  interestOnlyMonths: "",
  paymentType: "principal_and_interest",
  lenderCosts: "",
  monthlyRent: "",
  otherMonthlyIncome: "",
  vacancyPercent: "",
  taxesAnnual: "",
  insuranceAnnual: "",
  hoaMonthly: "",
  utilitiesMonthly: "",
  managementMonthly: "",
  maintenanceMonthly: "",
  otherMonthly: "",
  renovationBudget: "",
  renovationMonths: "",
  refinanceLoanAmount: "",
  refinanceLtvPercent: "",
};

export function audienceToEngineMode(audience: AnalyzerAudience): DealEngineMode {
  return audience === "realtor" ? "realtor" : "investor";
}

export function showRehabFields(shape: AnalyzerShape): boolean {
  return shape === "rehab" || shape === "brrrr";
}

export function showBrrrrFields(shape: AnalyzerShape): boolean {
  return shape === "brrrr";
}

export function hasStartedAnalysis(form: AnalyzerForm): boolean {
  return Boolean(
    parseDealNumber(form.purchasePrice) ||
      parseDealNumber(form.loanAmount) ||
      parseDealNumber(form.monthlyRent) ||
      parseDealNumber(form.estimatedValue),
  );
}

export function syncLoanAndDown(
  form: AnalyzerForm,
  changed: "purchasePrice" | "downPayment" | "loanAmount",
): AnalyzerForm {
  const purchase = parseDealNumber(form.purchasePrice);
  if (purchase === undefined) return form;

  if (changed === "loanAmount") {
    const loan = parseDealNumber(form.loanAmount);
    if (loan === undefined) return form;
    return { ...form, downPayment: String(Math.max(0, purchase - loan)) };
  }

  const down = parseDealNumber(form.downPayment);
  if (down === undefined) return form;
  return { ...form, loanAmount: String(Math.max(0, purchase - down)) };
}

export function agentHasDetails(agent?: AnalyzerAgent): boolean {
  if (!agent) return false;
  return Boolean(
    agent.name.trim() ||
      agent.brokerage.trim() ||
      agent.email.trim() ||
      agent.phone.trim(),
  );
}

export function propertyTypeLabel(value: AnalyzerForm["propertyType"]): string {
  return PROPERTY_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function shapeLabel(shape: AnalyzerShape): string {
  return ANALYZER_SHAPES.find((option) => option.value === shape)?.label ?? shape;
}

export function formToDealScenario(
  form: AnalyzerForm,
  audience: AnalyzerAudience,
  shape: AnalyzerShape,
  agent?: AnalyzerAgent,
  scenarioId?: string,
): DealScenario {
  const includeRehab = showRehabFields(shape);
  const includeBrrrr = showBrrrrFields(shape);

  return {
    mode: audienceToEngineMode(audience),
    property: {
      address: form.address.trim() || undefined,
      propertyType: form.propertyType,
      purchasePrice: parseDealNumber(form.purchasePrice),
      estimatedValue: parseDealNumber(form.estimatedValue),
      arv: parseDealNumber(form.arv),
      units: parseDealNumber(form.units),
    },
    financing: {
      downPayment: parseDealNumber(form.downPayment),
      loanAmount: parseDealNumber(form.loanAmount),
      interestRatePercent: parseDealNumber(form.interestRatePercent),
      amortizationYears: parseDealNumber(form.amortizationYears),
      loanTermYears: parseDealNumber(form.loanTermYears),
      interestOnlyMonths:
        form.paymentType === "interest_only"
          ? parseDealNumber(form.interestOnlyMonths)
          : undefined,
      paymentType: form.paymentType,
      lenderCosts: parseDealNumber(form.lenderCosts),
    },
    income: {
      monthlyRent: parseDealNumber(form.monthlyRent),
      otherMonthlyIncome: parseDealNumber(form.otherMonthlyIncome),
      vacancyPercent: parseDealNumber(form.vacancyPercent),
    },
    expenses: {
      taxesAnnual: parseDealNumber(form.taxesAnnual),
      insuranceAnnual: parseDealNumber(form.insuranceAnnual),
      hoaMonthly: parseDealNumber(form.hoaMonthly),
      utilitiesMonthly: parseDealNumber(form.utilitiesMonthly),
      managementMonthly: parseDealNumber(form.managementMonthly),
      maintenanceMonthly: parseDealNumber(form.maintenanceMonthly),
      otherMonthly: parseDealNumber(form.otherMonthly),
    },
    rehab: includeRehab
      ? {
          renovationBudget: parseDealNumber(form.renovationBudget),
          estimatedArv: parseDealNumber(form.arv),
          renovationMonths: parseDealNumber(form.renovationMonths),
        }
      : {},
    refinance: includeBrrrr
      ? {
          loanAmount: parseDealNumber(form.refinanceLoanAmount),
          ltvPercent: parseDealNumber(form.refinanceLtvPercent),
        }
      : {},
    source: {
      savedScenarioId: scenarioId,
      agent: agentHasDetails(agent)
        ? {
            name: agent?.name.trim() || undefined,
            company: agent?.brokerage.trim() || undefined,
            email: agent?.email.trim() || undefined,
            phone: agent?.phone.trim() || undefined,
          }
        : undefined,
    },
  };
}

export const ANALYZER_COPY = {
  investor: {
    helper:
      "Enter the assumptions you want to test. Results are estimates based on what you type — not a quote or approval.",
    empty:
      "Add a purchase price, loan, or rent to see estimated financing, cash flow, and returns.",
    resultsEyebrow: "Estimated performance",
    resultsTitle: "What these assumptions produce",
    resultsNote:
      "Figures update as you type. A Broadview advisor reviews structure before any financing recommendation.",
  },
  realtor: {
    helper:
      "Enter the listing or offer assumptions you want to walk through with a client. Same engine — framed for presenting an opportunity.",
    empty:
      "Add the purchase price, loan, or rent your client is considering to estimate how the deal may perform.",
    resultsEyebrow: "Client-ready estimates",
    resultsTitle: "What you can show from these assumptions",
    resultsNote:
      "Use this to present an opportunity clearly. It is not a financing decision or a commitment for your client.",
  },
} as const;

export const ANALYZER_RELATED = [
  { href: "/invest/dscr", label: "DSCR", description: "Rental coverage conversations." },
  { href: "/invest/fix-and-flip", label: "Fix & Flip", description: "Acquisition, rehab, and exit." },
  { href: "/invest/bridge", label: "Bridge", description: "When timing is the constraint." },
  { href: "/invest/brrrr", label: "BRRRR", description: "Buy, rehab, rent, refinance." },
  { href: "/invest/investor-heloc", label: "Investor HELOC", description: "Equity on investment property." },
  {
    href: "/invest/multifamily",
    label: "Multifamily / Commercial",
    description: "Larger assets and entity conversations.",
  },
] as const;

export const FINANCING_REVIEW_HREF = "/invest";
export const CLIENT_ANALYSIS_PRESENTATION_PATH =
  "/tools/investor-deal-analyzer/presentation";

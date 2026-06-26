import type { RelatedRefs, SeoMeta } from "@/lib/content/types";

/**
 * Calculator & Strategy Center registry. These are decision-making tools, not
 * generic calculators: each live tool produces a personalized strategy summary,
 * recommendations, and questions to discuss, then hands off to the existing
 * funnel/booking lead engine (no separate backend).
 *
 * `live` tools are interactive and routed at /tools/[slug]. `planned` tools are
 * shown on the hub as upcoming and are intentionally not routed (no empty
 * placeholder pages).
 */
export type CalculatorStatus = "live" | "planned";

export type CalculatorCategory = "buy" | "refinance" | "home-equity" | "planning";

export type CalculatorMeta = {
  slug: string;
  title: string;
  tagline: string;
  category: CalculatorCategory;
  status: CalculatorStatus;
  related: RelatedRefs;
  seo: SeoMeta;
};

export const calculators: CalculatorMeta[] = [
  {
    slug: "affordability-planner",
    title: "Affordability Planner",
    tagline:
      "Start with a comfortable monthly payment and see the home price it supports.",
    category: "buy",
    status: "live",
    related: {
      articles: ["how-much-home-can-you-afford", "understanding-down-payments"],
      landings: ["first-time-homebuyer", "conventional-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Home Affordability Planner",
      description:
        "Find the home price that fits your comfortable monthly payment with Broadview Lending's affordability planner.",
    },
  },
  {
    slug: "cash-out-vs-heloc",
    title: "Cash-Out vs HELOC",
    tagline:
      "Compare keeping your current mortgage with a HELOC against a full cash-out refinance.",
    category: "home-equity",
    status: "live",
    related: {
      articles: ["heloc-vs-cash-out-refinance", "debt-consolidation-strategies"],
      landings: ["cash-out-refinance", "debt-consolidation-refinance"],
      funnels: ["heloc", "refinance"],
    },
    seo: {
      title: "Cash-Out vs HELOC Calculator",
      description:
        "Compare a cash-out refinance against a HELOC to access equity wisely with Broadview Lending.",
    },
  },
  {
    slug: "mortgage-strategy-builder",
    title: "Mortgage Strategy Builder",
    tagline: "Answer a few questions and get a personalized strategy direction.",
    category: "planning",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Mortgage Strategy Builder",
      description: "Build a personalized mortgage strategy with Broadview Lending.",
    },
  },
  {
    slug: "payment-planner",
    title: "Payment Planner",
    tagline: "See how rate, term, and down payment change your monthly payment.",
    category: "buy",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Mortgage Payment Planner",
      description: "Plan your monthly mortgage payment with Broadview Lending.",
    },
  },
  {
    slug: "buy-vs-rent",
    title: "Buy vs Rent",
    tagline: "Compare the long-term cost of buying against renting.",
    category: "buy",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Buy vs Rent Calculator",
      description: "Compare buying and renting with Broadview Lending.",
    },
  },
  {
    slug: "heloc-planner",
    title: "HELOC Planner",
    tagline: "Estimate your available equity and a potential HELOC draw.",
    category: "home-equity",
    status: "planned",
    related: { funnels: ["heloc"] },
    seo: {
      title: "HELOC Planner",
      description: "Plan a home equity line of credit with Broadview Lending.",
    },
  },
  {
    slug: "refinancing-decision-tool",
    title: "Refinancing Decision Tool",
    tagline: "Find your break-even and whether refinancing fits your timeline.",
    category: "refinance",
    status: "planned",
    related: { funnels: ["refinance"] },
    seo: {
      title: "Refinancing Decision Tool",
      description: "Decide whether to refinance with Broadview Lending.",
    },
  },
  {
    slug: "down-payment-planner",
    title: "Down Payment Planner",
    tagline: "Compare how 0%, 3%, 5%, and 20% down change your costs.",
    category: "buy",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Down Payment Planner",
      description: "Plan your down payment strategy with Broadview Lending.",
    },
  },
  {
    slug: "mortgage-insurance-comparison",
    title: "Mortgage Insurance Comparison",
    tagline: "Compare mortgage insurance across down payment scenarios.",
    category: "buy",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Mortgage Insurance Comparison",
      description: "Compare mortgage insurance options with Broadview Lending.",
    },
  },
  {
    slug: "closing-cost-estimator",
    title: "Closing Cost Estimator",
    tagline: "Estimate the cash you'll need to close.",
    category: "buy",
    status: "planned",
    related: { funnels: ["purchase"] },
    seo: {
      title: "Closing Cost Estimator",
      description: "Estimate your mortgage closing costs with Broadview Lending.",
    },
  },
  {
    slug: "debt-consolidation-planner",
    title: "Debt Consolidation Planner",
    tagline: "See whether consolidating debt truly improves your position.",
    category: "refinance",
    status: "planned",
    related: { funnels: ["refinance", "heloc"] },
    seo: {
      title: "Debt Consolidation Planner",
      description: "Plan a debt consolidation strategy with Broadview Lending.",
    },
  },
  {
    slug: "buy-before-sell-planner",
    title: "Buy Before Sell Planner",
    tagline: "Model buying before selling versus selling first.",
    category: "planning",
    status: "planned",
    related: { funnels: ["purchase", "heloc"] },
    seo: {
      title: "Buy Before Sell Planner",
      description: "Plan buying before you sell with Broadview Lending.",
    },
  },
  {
    slug: "equity-access-planner",
    title: "Equity Access Planner",
    tagline: "Estimate how much equity you could responsibly access.",
    category: "home-equity",
    status: "planned",
    related: { funnels: ["heloc"] },
    seo: {
      title: "Equity Access Planner",
      description: "Plan how to access your home equity with Broadview Lending.",
    },
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getLiveCalculators(): CalculatorMeta[] {
  return calculators.filter((c) => c.status === "live");
}

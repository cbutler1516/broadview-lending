import type { Faq, RelatedRefs, SeoMeta } from "@/lib/content/types";

/**
 * Reusable Comparison Engine. Each comparison frames two paths fairly — best use
 * cases, advantages, tradeoffs — and ends with questions to discuss. Educational
 * only; never implies which a reader qualifies for.
 */
export type ComparisonSide = {
  name: string;
  bestFor: string[];
  advantages: string[];
  tradeoffs: string[];
};

export type Comparison = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  a: ComparisonSide;
  b: ComparisonSide;
  questionsToDiscuss: string[];
  thingsToConsider: string[];
  faqs?: Faq[];
  related: RelatedRefs;
  seo: SeoMeta;
};

export const comparisons: Comparison[] = [
  {
    slug: "heloc-vs-cash-out",
    title: "HELOC vs Cash-Out Refinance",
    eyebrow: "Comparison",
    intro:
      "Two ways to access home equity that solve different problems. The right one often depends on your current mortgage rate.",
    a: {
      name: "HELOC",
      bestFor: [
        "Keeping a low first-mortgage rate",
        "Flexible, as-needed access",
        "Phased projects like remodels",
      ],
      advantages: [
        "Leaves your existing mortgage untouched",
        "Pay interest only on what you draw",
        "Reusable line during the draw period",
      ],
      tradeoffs: [
        "Typically a variable rate",
        "Payment can change over time",
      ],
    },
    b: {
      name: "Cash-Out Refinance",
      bestFor: [
        "One large, one-time need",
        "Wanting a single fixed payment",
        "When today's rate is similar or better",
      ],
      advantages: [
        "One consolidated loan and payment",
        "Often a fixed rate",
      ],
      tradeoffs: [
        "Replaces your first mortgage and its rate",
        "Resets your loan term",
      ],
    },
    questionsToDiscuss: [
      "Is preserving your current first-mortgage rate a priority?",
      "Do you need flexible access or one lump sum?",
      "How long will you carry the balance?",
    ],
    thingsToConsider: [
      "Your current rate versus today's rates",
      "Comfort with a variable rate",
      "Total long-term cost, not just the payment",
    ],
    related: {
      guides: ["would-a-heloc-fit"],
      calculators: ["cash-out-vs-heloc"],
      articles: ["heloc-vs-cash-out-refinance"],
      landings: ["cash-out-refinance"],
      funnels: ["heloc", "refinance"],
    },
    seo: {
      title: "HELOC vs Cash-Out Refinance — Compared",
      description:
        "Compare a HELOC against a cash-out refinance: best use cases, advantages, and tradeoffs, from Broadview Lending.",
    },
  },
  {
    slug: "conventional-vs-fha",
    title: "Conventional vs FHA",
    eyebrow: "Comparison",
    intro:
      "Two common loan types that fit different credit and down payment situations.",
    a: {
      name: "Conventional",
      bestFor: [
        "Stronger credit profiles",
        "Wanting to remove mortgage insurance later",
        "Primary, second, or investment homes",
      ],
      advantages: [
        "Mortgage insurance can be removed as equity grows",
        "Competitive pricing for higher credit",
      ],
      tradeoffs: [
        "Stricter credit and debt-ratio guidelines",
      ],
    },
    b: {
      name: "FHA",
      bestFor: [
        "Lower or rebuilding credit",
        "Higher debt-to-income ratios",
        "Smaller down payments",
      ],
      advantages: [
        "Flexible credit guidelines",
        "Down payments as low as 3.5%",
      ],
      tradeoffs: [
        "Mortgage insurance often requires a refinance to remove",
        "Upfront mortgage insurance premium",
      ],
    },
    questionsToDiscuss: [
      "How does pricing compare at your credit tier?",
      "How important is removing mortgage insurance later?",
      "What's the all-in cost over your expected time in the home?",
    ],
    thingsToConsider: [
      "Your credit and down payment",
      "Long-term cost of mortgage insurance",
      "Whether FHA is a stepping stone to conventional",
    ],
    related: {
      guides: ["fha-or-conventional"],
      articles: ["fha-vs-conventional"],
      landings: ["fha-loans", "conventional-loans"],
      funnels: ["fha", "purchase"],
    },
    seo: {
      title: "Conventional vs FHA Loans — Compared",
      description:
        "Compare conventional and FHA loans on credit, down payment, and mortgage insurance, from Broadview Lending.",
    },
  },
  {
    slug: "va-vs-conventional",
    title: "VA vs Conventional",
    eyebrow: "Comparison",
    intro:
      "For eligible veterans and service members, the VA loan is a powerful benefit — but conventional still has its place.",
    a: {
      name: "VA Loan",
      bestFor: [
        "Eligible veterans and service members",
        "Buying with little or no down payment",
        "Avoiding monthly mortgage insurance",
      ],
      advantages: [
        "0% down for eligible borrowers",
        "No monthly mortgage insurance",
        "Competitive rates",
      ],
      tradeoffs: [
        "One-time funding fee (with exemptions)",
        "Primary residence focus",
      ],
    },
    b: {
      name: "Conventional",
      bestFor: [
        "Second homes and investment properties",
        "Borrowers wanting to avoid the funding fee",
        "Strong-credit buyers with a down payment",
      ],
      advantages: [
        "Flexible for non-primary properties",
        "No VA funding fee",
      ],
      tradeoffs: [
        "Down payment required to avoid mortgage insurance",
      ],
    },
    questionsToDiscuss: [
      "Is this a primary residence?",
      "Are you exempt from the funding fee?",
      "How does each option's total cost compare?",
    ],
    thingsToConsider: [
      "Your VA entitlement and prior use",
      "Property type and occupancy",
      "Funding fee versus down payment math",
    ],
    related: {
      articles: ["va-loan-benefits"],
      landings: ["va-loans", "conventional-loans"],
      funnels: ["va", "purchase"],
    },
    seo: {
      title: "VA vs Conventional Loans — Compared",
      description:
        "Compare VA and conventional loans on down payment, mortgage insurance, and fees, from Broadview Lending.",
    },
  },
  {
    slug: "five-vs-twenty-down",
    title: "5% Down vs 20% Down",
    eyebrow: "Comparison",
    intro:
      "A larger down payment lowers your payment, but keeping cash has real value too. Here's the tradeoff.",
    a: {
      name: "5% Down",
      bestFor: [
        "Keeping cash and reserves",
        "Buying sooner",
        "Investing the difference elsewhere",
      ],
      advantages: [
        "Less cash needed to close",
        "Preserves emergency savings",
      ],
      tradeoffs: [
        "Higher monthly payment",
        "Mortgage insurance until you reach ~20% equity",
      ],
    },
    b: {
      name: "20% Down",
      bestFor: [
        "Lowest monthly payment",
        "Avoiding mortgage insurance",
        "Buyers with ample savings",
      ],
      advantages: [
        "No mortgage insurance",
        "Lower payment and total interest",
      ],
      tradeoffs: [
        "Uses significantly more cash",
        "Less liquidity after closing",
      ],
    },
    questionsToDiscuss: [
      "How much cushion do you want after closing?",
      "Is a lower payment or more liquidity the priority?",
      "Could you remove mortgage insurance later instead?",
    ],
    thingsToConsider: [
      "Your reserve targets",
      "Mortgage insurance removal timeline",
      "What the extra cash could do elsewhere",
    ],
    related: {
      guides: ["should-i-put-more-money-down"],
      articles: ["understanding-down-payments", "mortgage-insurance-explained"],
      landings: ["low-down-payment"],
      funnels: ["purchase"],
    },
    seo: {
      title: "5% Down vs 20% Down — Compared",
      description:
        "Compare putting 5% down against 20% down on payment, mortgage insurance, and reserves, from Broadview Lending.",
    },
  },
  {
    slug: "buy-vs-rent",
    title: "Buy vs Rent",
    eyebrow: "Comparison",
    intro:
      "Renting offers flexibility; buying builds equity. The better choice depends on your timeline and goals.",
    a: {
      name: "Buying",
      bestFor: [
        "Staying put for several years",
        "Building equity over time",
        "Wanting stability and control",
      ],
      advantages: [
        "Builds equity instead of paying a landlord",
        "Predictable principal-and-interest payment",
        "Potential long-term appreciation",
      ],
      tradeoffs: [
        "Upfront costs and maintenance",
        "Less flexibility to move quickly",
      ],
    },
    b: {
      name: "Renting",
      bestFor: [
        "Short or uncertain timelines",
        "Maximum flexibility",
        "Avoiding maintenance responsibility",
      ],
      advantages: [
        "Lower upfront cost",
        "Easy to relocate",
      ],
      tradeoffs: [
        "No equity accumulation",
        "Rent can rise over time",
      ],
    },
    questionsToDiscuss: [
      "How long do you expect to stay?",
      "How stable is your income and location?",
      "What would the equity difference look like over time?",
    ],
    thingsToConsider: [
      "Your time horizon",
      "Total cost of owning vs renting",
      "Lifestyle and flexibility needs",
    ],
    related: {
      articles: ["how-much-home-can-you-afford"],
      landings: ["first-time-homebuyer"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Buy vs Rent — Compared",
      description:
        "Compare buying a home against renting on equity, flexibility, and total cost, from Broadview Lending.",
    },
  },
  {
    slug: "buy-before-sell-vs-sell-first",
    title: "Buy Before Sell vs Sell First",
    eyebrow: "Comparison",
    intro:
      "When moving up, the order matters. Each path trades convenience against financial certainty.",
    a: {
      name: "Buy Before Sell",
      bestFor: [
        "Avoiding a double move",
        "Competitive buying markets",
        "Strong equity and reserves",
      ],
      advantages: [
        "Move once, on your timeline",
        "Shop without rushing",
      ],
      tradeoffs: [
        "Brief overlap of two payments",
        "Needs a bridge or equity plan",
      ],
    },
    b: {
      name: "Sell First",
      bestFor: [
        "Maximum financial certainty",
        "Tighter budgets",
        "Knowing your exact proceeds",
      ],
      advantages: [
        "No overlapping payments",
        "A known, in-hand budget",
      ],
      tradeoffs: [
        "May need temporary housing",
        "Faster purchase timeline",
      ],
    },
    questionsToDiscuss: [
      "How comfortable are you carrying two payments briefly?",
      "Could a rent-back or bridge bridge the gap?",
      "How competitive is your target market?",
    ],
    thingsToConsider: [
      "Equity and reserves",
      "Bridge financing options",
      "Tolerance for moving twice",
    ],
    related: {
      guides: ["should-i-buy-before-selling"],
      articles: ["buy-before-you-sell"],
      landings: ["buying-your-next-home"],
      funnels: ["purchase", "heloc"],
    },
    seo: {
      title: "Buy Before Sell vs Sell First — Compared",
      description:
        "Compare buying before selling against selling first when moving up, from Broadview Lending.",
    },
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

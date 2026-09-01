import type { RelatedRefs } from "@/lib/content/types";

export type HelocPageSlug =
  | "home-improvement"
  | "debt-consolidation"
  | "buy-another-home"
  | "investment-property"
  | "rental-property"
  | "keep-your-rate"
  | "heloc-vs-cash-out";

export type HelocFaq = {
  question: string;
  answer: string;
};

export type HelocGoalCard = {
  title: string;
  body: string;
  href: string;
};

export type HelocLandingPage = {
  slug: HelocPageSlug;
  path: `/heloc/${HelocPageSlug}`;
  title: string;
  eyebrow: string;
  h1: string;
  description: string;
  metadata: {
    title: string;
    description: string;
  };
  primaryCta: string;
  secondaryCta: string;
  goalPrompt: string;
  audience: "owner-occupied" | "investment" | "comparison";
  benefits: string[];
  advisorNotes: string[];
  faqs: HelocFaq[];
  related: RelatedRefs;
};

export const homeEquityCopy = {
  primaryCta: "Build My Home Equity Strategy",
  secondaryCta: "Talk To A Mortgage Advisor",
  humanPromise:
    "Start online. A Broadview advisor reviews the details before recommendations are made.",
  prepareConversation:
    "Your answers help us prepare. The real value comes from the conversation that follows.",
  advisorReview:
    "A Broadview advisor personally reviews your property, goal, and timing before walking through options.",
  noPressure:
    "Clear answers, no call-center feel, no pressure, and no obligation to move forward.",
  notAlone:
    "You will not be left alone trying to figure out your mortgage or home equity strategy.",
  resultsPromise:
    "A Broadview mortgage advisor will personally review your information and walk through your options with you.",
  compliance:
    "This is educational guidance and not a commitment to lend. Final terms depend on full review of credit, income, assets, property, occupancy, lien position, and underwriting.",
};

export const helocGoalCards: HelocGoalCard[] = [
  {
    title: "Remodel my home",
    body: "Explore home equity options for renovations, repairs, additions, or upgrades without automatically replacing your first mortgage.",
    href: "/heloc/home-improvement",
  },
  {
    title: "Consolidate debt",
    body: "Review whether home equity may help simplify higher-interest payments while understanding the risks of secured debt.",
    href: "/heloc/debt-consolidation",
  },
  {
    title: "Buy another home",
    body: "Look at ways equity may support a down payment, second home, or move-up strategy.",
    href: "/heloc/buy-another-home",
  },
  {
    title: "Purchase an investment property",
    body: "Discuss portfolio leverage, rental-property equity, DSCR possibilities, and cash-flow considerations.",
    href: "/heloc/investment-property",
  },
  {
    title: "Increase monthly cash flow",
    body: "Understand whether equity access may improve flexibility while preserving your current first mortgage.",
    href: "/heloc/keep-your-rate",
  },
  {
    title: "Build an ADU or expand housing",
    body: "Talk through equity access for an ADU, rental unit, or space that supports family or income goals.",
    href: "/heloc/home-improvement",
  },
  {
    title: "Compare home equity options",
    body: "See when a HELOC, cash-out refinance, closed-end second mortgage, or bridge strategy may be worth discussing.",
    href: "/heloc/heloc-vs-cash-out",
  },
];

const defaultFaqs: HelocFaq[] = [
  {
    question: "Can I start without a credit pull?",
    answer:
      "Yes. The HELOC Strategy Experience starts with your goal, property, and estimated credit range. No credit pull is needed to begin.",
  },
  {
    question: "What happens after I share my information?",
    answer:
      "A Broadview advisor reviews your answers and prepares recommendations for a home equity conversation.",
  },
  {
    question: "Why work with Broadview instead of a call center?",
    answer:
      "Broadview combines a fast online strategy experience with advisor review, so you get context before comparing home equity options.",
  },
];

export const helocLandingPages: HelocLandingPage[] = [
  {
    slug: "home-improvement",
    path: "/heloc/home-improvement",
    title: "Home Improvement Equity Strategy",
    eyebrow: "Home Improvement HELOC Strategy",
    h1: "Explore a HELOC for home improvements without replacing your first mortgage.",
    description:
      "For remodels, repairs, additions, and ADUs, start with a quick home equity strategy reviewed by a Broadview advisor.",
    metadata: {
      title: "Home Improvement HELOC | Renovation Equity Options",
      description:
        "Explore home improvement HELOC options with Broadview Lending. Check equity access for renovations with real advisor guidance and no credit pull to start.",
    },
    primaryCta: "Build My Renovation Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Renovations can improve how you live. The equity strategy should fit the project, payment, and current mortgage.",
    audience: "owner-occupied",
    benefits: [
      "Estimate equity for remodels, repairs, additions, or ADUs.",
      "Compare a HELOC with cash-out refinance trade-offs.",
      "Discuss draw timing, payment changes, and budget fit.",
    ],
    advisorNotes: [
      "We compare HELOC flexibility with other renovation financing paths.",
      "Your advisor explains trade-offs before you choose a structure.",
    ],
    faqs: [
      {
        question: "Can a HELOC be used for home improvements?",
        answer:
          "Yes. Many homeowners use a HELOC for remodeling, repairs, additions, or ADUs when they want flexible access to equity.",
      },
      {
        question: "Is a HELOC better than a renovation refinance?",
        answer:
          "It depends on your current rate, project size, payment goals, and timeline. Broadview helps compare both paths.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "heloc-vs-cash-out-refinance",
        "when-does-refinancing-make-sense",
        "using-home-equity-to-invest",
      ],
      calculators: ["cash-out-vs-heloc", "equity-access-planner"],
      helocLandings: ["keep-your-rate", "heloc-vs-cash-out", "debt-consolidation"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "debt-consolidation",
    path: "/heloc/debt-consolidation",
    title: "Debt Consolidation Equity Options",
    eyebrow: "Debt Consolidation HELOC Strategy",
    h1: "Use home equity to compare debt consolidation options carefully.",
    description:
      "Review whether a HELOC or cash-out strategy may simplify payments while understanding the risks of secured debt.",
    metadata: {
      title: "Debt Consolidation HELOC | Home Equity Debt Options",
      description:
        "Explore debt consolidation HELOC options with Broadview Lending. Review potential home equity paths with a real mortgage advisor.",
    },
    primaryCta: "Build My Cash-Flow Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Consolidating debt can change monthly cash flow. It also turns unsecured debt into debt secured by your home.",
    audience: "owner-occupied",
    benefits: [
      "Estimate whether equity may support consolidation.",
      "Compare HELOC flexibility with cash-out alternatives.",
      "Review payment, lien, and repayment considerations.",
    ],
    advisorNotes: [
      "We review debt consolidation as budget planning, not just math.",
      "Your advisor helps compare options without pressure.",
    ],
    faqs: [
      {
        question: "Can I use a HELOC to consolidate debt?",
        answer:
          "Potentially. A HELOC may be used for debt consolidation, but you should understand the risk of securing debt against your home.",
      },
      {
        question: "Will Broadview tell me if a HELOC is not the right fit?",
        answer:
          "Yes. The advisor conversation is designed to compare options and avoid a strategy that does not fit.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "debt-consolidation-strategies",
        "heloc-vs-cash-out-refinance",
        "when-does-refinancing-make-sense",
      ],
      calculators: ["debt-consolidation-planner", "cash-out-vs-heloc"],
      helocLandings: ["keep-your-rate", "heloc-vs-cash-out", "home-improvement"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "buy-another-home",
    path: "/heloc/buy-another-home",
    title: "Use Equity to Buy Another Home",
    eyebrow: "HELOC Strategy for Buying Another Home",
    h1: "Explore using home equity to buy another home.",
    description:
      "See whether equity in your current property may support a down payment, bridge strategy, second home, or move-up plan.",
    metadata: {
      title: "Use Home Equity to Buy Another Home | HELOC Options",
      description:
        "Explore using home equity to buy another home. Broadview Lending helps compare HELOC, cash-out refinance, and purchase financing paths.",
    },
    primaryCta: "Build My Next-Home Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Buying another home depends on timing, cash reserves, and whether keeping your current first mortgage helps.",
    audience: "owner-occupied",
    benefits: [
      "Estimate equity for a potential down payment.",
      "Review second-home, move-up, and bridge considerations.",
      "Connect the equity strategy to the next purchase.",
    ],
    advisorNotes: [
      "Your advisor connects the current-home strategy to the next purchase.",
      "We compare HELOC, cash-out, and purchase structures.",
    ],
    faqs: [
      {
        question: "Can I use a HELOC for a down payment on another home?",
        answer:
          "Potentially. Occupancy, reserves, monthly payment, and purchase timing all matter, so advisor review is important.",
      },
      {
        question: "Should I get a HELOC before shopping for the next home?",
        answer:
          "Sometimes. Timing can affect your purchase plan, so Broadview helps map the sequence before you shop.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "buy-before-you-sell",
        "heloc-vs-cash-out-refinance",
        "using-home-equity-to-invest",
      ],
      calculators: ["buy-before-sell-planner", "equity-access-planner"],
      helocLandings: ["keep-your-rate", "investment-property", "heloc-vs-cash-out"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "investment-property",
    path: "/heloc/investment-property",
    title: "Investment Property Equity Strategy",
    eyebrow: "Investment Property HELOC Strategy",
    h1: "Use equity to plan your next investment property move.",
    description:
      "Compare rental-property equity, owner-occupied leverage, DSCR possibilities, and portfolio cash-flow considerations.",
    metadata: {
      title: "Investment Property HELOC | Real Estate Equity Strategy",
      description:
        "Explore investment property HELOC and equity strategies with Broadview Lending. Review rental property leverage, DSCR possibilities, and advisor guidance.",
    },
    primaryCta: "Build My Investor Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Investor equity decisions should consider cash flow, reserves, lien position, and the next acquisition.",
    audience: "investment",
    benefits: [
      "Review equity access for acquisition, reserves, or improvements.",
      "Discuss DSCR possibilities and investor structures.",
      "Compare owner-occupied and rental-property equity paths.",
    ],
    advisorNotes: [
      "We help investors think beyond proceeds and cash-to-close.",
      "Your advisor can discuss alternatives if HELOC availability is limited.",
    ],
    faqs: [
      {
        question: "Can investment properties use a HELOC?",
        answer:
          "Some programs may allow investment-property equity access, but guidelines are often more restrictive than primary residences.",
      },
      {
        question: "What is DSCR?",
        answer:
          "DSCR stands for debt service coverage ratio. Some investor loans evaluate rental income and property cash flow rather than only personal income.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "using-home-equity-to-invest",
        "heloc-vs-cash-out-refinance",
        "debt-consolidation-strategies",
      ],
      calculators: ["equity-access-planner", "cash-out-vs-heloc"],
      helocLandings: ["rental-property", "heloc-vs-cash-out", "buy-another-home"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "rental-property",
    path: "/heloc/rental-property",
    title: "Rental Property Equity Options",
    eyebrow: "Rental Property HELOC Strategy",
    h1: "Explore rental-property equity with an investor-minded advisor.",
    description:
      "Review ways rental owners may use equity for improvements, reserves, acquisitions, or portfolio planning.",
    metadata: {
      title: "Rental Property HELOC | Equity Options for Landlords",
      description:
        "Explore rental property HELOC and equity options with Broadview Lending. Get advisor guidance on investor strategy and cash-flow considerations.",
    },
    primaryCta: "Build My Rental Equity Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Rental equity can support growth or stability. The right structure depends on cash flow and investor guidelines.",
    audience: "investment",
    benefits: [
      "Estimate equity in a rental or investment property.",
      "Review cash flow, reserves, and lien-position considerations.",
      "Compare HELOC, cash-out refinance, and DSCR-style paths.",
    ],
    advisorNotes: [
      "Your advisor helps evaluate whether tapping equity strengthens the portfolio.",
      "We compare rental-property and owner-occupied equity paths.",
    ],
    faqs: [
      {
        question: "Is rental-property equity harder to access?",
        answer:
          "It can be. Investment-property guidelines are often more restrictive, and pricing, CLTV limits, income review, and reserves may differ.",
      },
      {
        question: "Can rental income be reviewed?",
        answer:
          "Potentially. Rental income and DSCR-style options may matter depending on the strategy and property cash flow.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "using-home-equity-to-invest",
        "heloc-vs-cash-out-refinance",
        "buy-before-you-sell",
      ],
      calculators: ["equity-access-planner", "cash-out-vs-heloc"],
      helocLandings: ["investment-property", "heloc-vs-cash-out", "keep-your-rate"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "keep-your-rate",
    path: "/heloc/keep-your-rate",
    title: "Keep Your First Mortgage Rate",
    eyebrow: "Keep Your Low Mortgage Rate",
    h1: "Need cash without giving up your current mortgage rate?",
    description:
      "Explore whether a HELOC may help access equity without replacing a favorable first mortgage rate.",
    metadata: {
      title: "Keep Your Low Mortgage Rate | HELOC vs Refinance",
      description:
        "Explore HELOC options for homeowners who want to keep a low first mortgage rate. Broadview Lending helps compare equity strategies.",
    },
    primaryCta: "Build My Keep-My-Rate Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Replacing a low first mortgage can be expensive. A HELOC may access equity while preserving that loan.",
    audience: "owner-occupied",
    benefits: [
      "Review why keeping your first mortgage may matter.",
      "Estimate equity without assuming a full refinance.",
      "Compare HELOC flexibility with cash-out trade-offs.",
    ],
    advisorNotes: [
      "We compare a HELOC against replacing your first mortgage.",
      "Your advisor reviews rates, balance, cash need, and timeline.",
    ],
    faqs: [
      {
        question: "Can a HELOC let me keep my current mortgage?",
        answer:
          "Often, a HELOC sits behind the existing first mortgage, which may let you keep that loan in place.",
      },
      {
        question: "When would a cash-out refinance still make sense?",
        answer:
          "A cash-out refinance may still fit if you need a larger amount, want one fixed payment, or if the overall terms are stronger after full comparison.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "heloc-vs-cash-out-refinance",
        "when-does-refinancing-make-sense",
        "debt-consolidation-strategies",
      ],
      calculators: ["cash-out-vs-heloc", "equity-access-planner"],
      helocLandings: ["heloc-vs-cash-out", "home-improvement", "debt-consolidation"],
      funnels: ["heloc"],
    },
  },
  {
    slug: "heloc-vs-cash-out",
    path: "/heloc/heloc-vs-cash-out",
    title: "HELOC vs Cash-Out Refinance",
    eyebrow: "HELOC vs Cash-Out Refinance",
    h1: "HELOC vs cash-out refinance: compare before you choose.",
    description:
      "Understand the trade-offs between keeping your current first mortgage and replacing it with a cash-out refinance.",
    metadata: {
      title: "HELOC vs Cash-Out Refinance | Compare Equity Options",
      description:
        "Compare HELOC and cash-out refinance options with Broadview Lending. Get advisor guidance on equity access and rate trade-offs.",
    },
    primaryCta: "Compare My Home Equity Options",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "The right equity option depends on your current rate, cash need, repayment preference, and timeline.",
    audience: "comparison",
    benefits: [
      "Compare keeping your first mortgage with replacing it.",
      "Review flexible credit-line access versus one new loan.",
      "Understand lien position, CLTV, and payment trade-offs.",
    ],
    advisorNotes: [
      "Broadview prepares the comparison, then an advisor explains it.",
      "You should understand both paths before choosing next steps.",
    ],
    faqs: [
      {
        question: "Is a HELOC always better than cash-out refinancing?",
        answer:
          "No. A HELOC can be useful when preserving the first mortgage matters, but a cash-out refinance may make sense for larger needs or one-loan simplicity.",
      },
      {
        question: "Can Broadview compare both options?",
        answer:
          "Yes. Potential paths may include a HELOC, cash-out refinance, or another structure based on your goal and property.",
      },
      ...defaultFaqs,
    ],
    related: {
      articles: [
        "heloc-vs-cash-out-refinance",
        "when-does-refinancing-make-sense",
        "debt-consolidation-strategies",
      ],
      calculators: ["cash-out-vs-heloc", "equity-access-planner"],
      helocLandings: ["keep-your-rate", "debt-consolidation", "home-improvement"],
      funnels: ["heloc"],
    },
  },
];

export function getHelocLandingPage(slug: string) {
  return helocLandingPages.find((page) => page.slug === slug);
}

export function getHelocFunnelHref(campaignPage: string) {
  return `/funnel/heloc?campaign_page=${encodeURIComponent(campaignPage)}`;
}

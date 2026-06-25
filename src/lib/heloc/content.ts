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
};

export const homeEquityCopy = {
  primaryCta: "Build My Home Equity Strategy",
  secondaryCta: "Talk To A Mortgage Advisor",
  humanPromise:
    "Technology helps us understand your situation quickly. A real mortgage advisor helps you make the right decision.",
  prepareConversation:
    "Your answers help us prepare. The real value comes from the conversation that follows.",
  advisorReview:
    "A real Broadview mortgage advisor will personally review your information before walking through your options with you.",
  noPressure:
    "Clear answers, no call-center feel, no pressure, and no obligation to move forward.",
  notAlone:
    "You will not be left alone trying to figure out your mortgage or home equity strategy.",
  resultsPromise:
    "A Broadview mortgage advisor will personally review your information and walk through your options with you.",
  compliance:
    "This is not a loan approval or commitment to lend. Final eligibility depends on full application, credit, income, assets, property, occupancy, lien position, and underwriting review.",
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
    question: "Will checking my equity options affect my credit?",
    answer:
      "The Broadview equity check is designed as an initial educational review. No credit pull is needed to start the conversation.",
  },
  {
    question: "Is this a loan approval?",
    answer:
      "No. Results are based on the information you provide and are not a loan approval, loan offer, or commitment to lend.",
  },
  {
    question: "Will someone actually call me?",
    answer:
      "Yes. Your information helps us prepare, and a Broadview mortgage advisor will follow up to answer questions and walk through potential options.",
  },
];

export const helocLandingPages: HelocLandingPage[] = [
  {
    slug: "home-improvement",
    path: "/heloc/home-improvement",
    title: "Home Improvement Equity Strategy",
    eyebrow: "Home Equity Solutions for Renovations",
    h1: "Use home equity for renovations with an advisor by your side.",
    description:
      "Explore Home Equity Solutions for remodeling, repairs, additions, or upgrades while keeping the bigger mortgage strategy in view.",
    metadata: {
      title: "Home Improvement HELOC | Renovation Equity Options",
      description:
        "Explore home improvement HELOC options with Broadview Lending. Check equity access for renovations with real advisor guidance and no credit pull to start.",
    },
    primaryCta: "Build My Renovation Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Renovations can improve how you live in your home, but the financing should fit your budget, timeline, and current mortgage.",
    audience: "owner-occupied",
    benefits: [
      "Explore available equity for remodels, repairs, or upgrades.",
      "Review whether a Home Equity Solution may preserve your current first mortgage.",
      "Talk through draw timing, payment changes, and project budget fit.",
    ],
    advisorNotes: [
      "We help you compare the flexibility of a Home Equity Line of Credit with the stability of other financing options.",
      "If a cash-out refinance is worth considering, your advisor can explain the trade-offs clearly.",
    ],
    faqs: [
      {
        question: "Can a HELOC be used for home improvements?",
        answer:
          "Yes, many homeowners use a HELOC for renovations or repairs. Eligibility and available line amount depend on equity, credit, income, occupancy, property, and underwriting review.",
      },
      {
        question: "Is a HELOC better than a renovation refinance?",
        answer:
          "It depends on your current rate, project size, payment goals, and timeline. A Broadview advisor can compare both paths with you.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "debt-consolidation",
    path: "/heloc/debt-consolidation",
    title: "Debt Consolidation Equity Options",
    eyebrow: "Home Equity Solutions for Cash Flow",
    h1: "Explore debt consolidation with your home equity and real guidance.",
    description:
      "See whether a HELOC or cash-out strategy may help organize higher-interest debt while understanding the risks and trade-offs.",
    metadata: {
      title: "Debt Consolidation HELOC | Home Equity Debt Options",
      description:
        "Explore debt consolidation HELOC options with Broadview Lending. Review potential home equity paths with a real mortgage advisor.",
    },
    primaryCta: "Build My Cash-Flow Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Consolidating debt can change your monthly cash flow, but it also turns unsecured debt into debt secured by your home.",
    audience: "owner-occupied",
    benefits: [
      "Estimate whether your equity position may support consolidation.",
      "Compare HELOC flexibility with cash-out refinance alternatives.",
      "Understand payment, lien, and repayment considerations before choosing a path.",
    ],
    advisorNotes: [
      "We do not treat debt consolidation as just a math problem. Your advisor will talk through behavior, budget, and long-term fit.",
      "The goal is clarity, not pressure.",
    ],
    faqs: [
      {
        question: "Can I use a HELOC to consolidate debt?",
        answer:
          "Potentially, yes. A HELOC may be used for debt consolidation, but final eligibility depends on full underwriting and you should understand the risk of securing debt against your home.",
      },
      {
        question: "Will Broadview tell me if a HELOC is not the right fit?",
        answer:
          "Yes. The advisor conversation is meant to compare options and help you avoid a strategy that does not fit your situation.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "buy-another-home",
    path: "/heloc/buy-another-home",
    title: "Use Equity to Buy Another Home",
    eyebrow: "Home Equity Solutions for Your Next Property",
    h1: "Use home equity to explore buying another home.",
    description:
      "Review whether equity in your current property may support a down payment, bridge strategy, second home, or move-up plan.",
    metadata: {
      title: "Use Home Equity to Buy Another Home | HELOC Options",
      description:
        "Explore using home equity to buy another home. Broadview Lending helps compare HELOC, cash-out refinance, and purchase financing paths.",
    },
    primaryCta: "Build My Next-Home Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Buying another home often depends on timing, cash reserves, debt-to-income, and whether keeping your current first mortgage helps.",
    audience: "owner-occupied",
    benefits: [
      "Estimate equity available for a potential down payment.",
      "Review second-home, move-up, and bridge-style considerations.",
      "Coordinate the equity strategy with the next purchase loan.",
    ],
    advisorNotes: [
      "Your advisor can help connect the current-home strategy with the next-home financing plan.",
      "We will discuss whether a HELOC, cash-out refinance, or other purchase structure may fit.",
    ],
    faqs: [
      {
        question: "Can I use a HELOC for a down payment on another home?",
        answer:
          "Potentially. Lender guidelines, occupancy, reserves, and debt-to-income requirements all matter, so this should be reviewed with an advisor.",
      },
      {
        question: "Should I get a HELOC before shopping for the next home?",
        answer:
          "Sometimes timing matters. A Broadview advisor can help you understand when to move forward and how it may affect purchase qualification.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "investment-property",
    path: "/heloc/investment-property",
    title: "Investment Property Equity Strategy",
    eyebrow: "Home Equity Solutions for Real Estate Investors",
    h1: "Turn equity into an investment-property strategy.",
    description:
      "Explore rental-property equity, owner-occupied leverage, DSCR possibilities, and portfolio cash-flow considerations with a mortgage advisor.",
    metadata: {
      title: "Investment Property HELOC | Real Estate Equity Strategy",
      description:
        "Explore investment property HELOC and equity strategies with Broadview Lending. Review rental property leverage, DSCR possibilities, and advisor guidance.",
    },
    primaryCta: "Build My Investor Strategy",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "Investor equity decisions should consider cash flow, reserves, lien position, and the next acquisition or portfolio goal.",
    audience: "investment",
    benefits: [
      "Review equity access for acquisition, reserves, or property improvements.",
      "Discuss DSCR possibilities and investor loan structures.",
      "Compare owner-occupied and rental-property equity paths.",
    ],
    advisorNotes: [
      "We help investors think beyond proceeds and consider cash-flow durability.",
      "If rental-property HELOC availability is limited, your advisor can discuss alternative investor strategies.",
    ],
    faqs: [
      {
        question: "Can investment properties qualify for a HELOC?",
        answer:
          "Some programs may allow equity access on investment properties, but guidelines can be more restrictive than primary residences.",
      },
      {
        question: "What is DSCR?",
        answer:
          "DSCR stands for debt service coverage ratio. Some investor loans evaluate rental income and property cash flow rather than only personal income.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "rental-property",
    path: "/heloc/rental-property",
    title: "Rental Property Equity Options",
    eyebrow: "Home Equity Solutions for Rental Owners",
    h1: "Access rental-property equity with an investor-minded advisor.",
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
      "Rental equity can support growth or stability, but the right structure depends on property cash flow and investor guidelines.",
    audience: "investment",
    benefits: [
      "Estimate equity available in a rental or investment property.",
      "Talk through rental cash flow, reserves, and lien-position considerations.",
      "Compare HELOC, cash-out refinance, and DSCR-style paths.",
    ],
    advisorNotes: [
      "Your advisor can help evaluate whether tapping rental equity strengthens or strains the portfolio.",
      "We will help identify when an owner-occupied equity path may be simpler than a rental-property path.",
    ],
    faqs: [
      {
        question: "Is rental-property equity harder to access?",
        answer:
          "It can be. Investment-property guidelines are often more restrictive, and pricing, CLTV limits, income review, and reserves may differ.",
      },
      {
        question: "Can rental income help qualify?",
        answer:
          "Potentially. Rental income and DSCR-style options may matter depending on the program and full underwriting review.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "keep-your-rate",
    path: "/heloc/keep-your-rate",
    title: "Keep Your First Mortgage Rate",
    eyebrow: "Home Equity Solutions for Low-Rate Homeowners",
    h1: "Need cash but want to keep your current low mortgage rate?",
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
      "Replacing a low first mortgage can be expensive. A HELOC may be one way to access equity while preserving that loan.",
    audience: "owner-occupied",
    benefits: [
      "Review why keeping your current first mortgage may matter.",
      "Estimate available equity without assuming a full refinance.",
      "Compare HELOC payment flexibility with cash-out refinance trade-offs.",
    ],
    advisorNotes: [
      "We will help you compare the blended cost of a HELOC against replacing your first mortgage.",
      "The right answer depends on rates, loan balance, desired cash, and how long you plan to keep the home.",
    ],
    faqs: [
      {
        question: "Can a HELOC let me keep my current mortgage?",
        answer:
          "Often, a HELOC sits behind the existing first mortgage, which may let you keep that loan in place. Final structure depends on program and underwriting.",
      },
      {
        question: "When would a cash-out refinance still make sense?",
        answer:
          "A cash-out refinance may still fit if you need a larger amount, want one fixed payment, or if the overall terms are stronger after full comparison.",
      },
      ...defaultFaqs,
    ],
  },
  {
    slug: "heloc-vs-cash-out",
    path: "/heloc/heloc-vs-cash-out",
    title: "HELOC vs Cash-Out Refinance",
    eyebrow: "Compare Home Equity Solutions",
    h1: "HELOC vs cash-out refinance: compare before you choose.",
    description:
      "Understand the trade-offs between keeping your current first mortgage and replacing it with a cash-out refinance.",
    metadata: {
      title: "HELOC vs Cash-Out Refinance | Compare Equity Options",
      description:
        "Compare HELOC and cash-out refinance options with Broadview Lending. Get advisor guidance on equity access, rate trade-offs, and eligibility.",
    },
    primaryCta: "Compare My Home Equity Options",
    secondaryCta: homeEquityCopy.secondaryCta,
    goalPrompt:
      "The right equity option depends on your current rate, desired cash amount, repayment preference, and full qualification profile.",
    audience: "comparison",
    benefits: [
      "Compare keeping your first mortgage with replacing it.",
      "Review flexible line-of-credit access versus one new loan.",
      "Understand how lien position, CLTV, and underwriting affect options.",
    ],
    advisorNotes: [
      "Broadview uses digital tools to prepare the comparison, then a real advisor explains the trade-offs.",
      "You should understand both paths before deciding what comes next.",
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
          "Yes. Potential options may include a HELOC, cash-out refinance, or another structure based on the information you provide and full eligibility review.",
      },
      ...defaultFaqs,
    ],
  },
];

export function getHelocLandingPage(slug: string) {
  return helocLandingPages.find((page) => page.slug === slug);
}

export function getHelocFunnelHref(campaignPage: string) {
  return `/funnel/heloc?campaign_page=${encodeURIComponent(campaignPage)}`;
}

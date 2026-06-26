import type { Faq, RelatedRefs, SeoMeta } from "@/lib/content/types";

/**
 * Data-driven landing-page system. Every paid + organic landing page renders
 * from one of these entries via the shared LandingPageTemplate. Adding a new
 * campaign page means adding a data entry — no new component code.
 */
export type LandingEcosystem = "buy" | "refinance";

export type LandingPage = {
  ecosystem: LandingEcosystem;
  slug: string;
  /** Canonical route, e.g. /buy/first-time-homebuyer */
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Entry point into the existing funnel engine. */
  funnelHref: string;
  primaryCta: string;
  secondaryCta: string;
  /** Goal-first value props. */
  highlights: string[];
  /** "What we'd discuss together" advisor notes. */
  advisorNotes: string[];
  faqs: Faq[];
  related: RelatedRefs;
  seo: SeoMeta;
  schema: "FinancialProduct" | "WebPage";
};

export const landingPages: LandingPage[] = [
  // ---------------------------------------------------------------- BUY
  {
    ecosystem: "buy",
    slug: "first-time-homebuyer",
    path: "/buy/first-time-homebuyer",
    eyebrow: "Home Buying",
    h1: "Buying your first home, with someone in your corner.",
    intro:
      "First-time buying is mostly about confidence. We help you understand your budget, your down payment options, and your real monthly cost before you ever tour a home.",
    funnelHref: "/funnel/first-time-homebuyer",
    primaryCta: "Build My Buying Strategy",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Understand how much home fits your life — not just what you qualify for.",
      "Compare low and zero down payment programs side by side.",
      "Know your true monthly cost, including taxes and insurance.",
    ],
    advisorNotes: [
      "We'll map your savings to the right down payment strategy.",
      "We'll explain closing costs and what assistance you may qualify for.",
      "We'll prepare you to make a strong, confident offer.",
    ],
    faqs: [
      {
        question: "How much do I need for a down payment on my first home?",
        answer:
          "Many first-time buyers put down 3% to 5%, and some programs allow 0% down. The right number depends on your goals, monthly comfort, and whether you want to minimize cash to close or monthly payment.",
      },
      {
        question: "What credit score do I need to buy my first home?",
        answer:
          "There is no single cutoff. FHA financing can work with lower scores, while conventional loans reward higher scores with better pricing. We help you see realistic options for your profile.",
      },
      {
        question: "How long does it take to buy a first home?",
        answer:
          "From pre-approval to closing is often 30 to 45 days once you are under contract. Getting your strategy and pre-approval ready first makes the rest move faster.",
      },
    ],
    related: {
      articles: ["how-much-home-can-you-afford", "understanding-down-payments"],
      calculators: ["affordability-planner", "down-payment-planner"],
      landings: ["low-down-payment", "fha-loans"],
      funnels: ["first-time-homebuyer"],
    },
    seo: {
      title: "First-Time Homebuyer Loans & Guidance",
      description:
        "First-time homebuyer guidance from Broadview Lending. Understand down payment options, budgets, and programs with a real mortgage advisor by your side.",
      keywords: ["first time homebuyer", "first home loan", "low down payment"],
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "buying-your-next-home",
    path: "/buy/buying-your-next-home",
    eyebrow: "Home Buying",
    h1: "Buying your next home without the timing stress.",
    intro:
      "Moving up, downsizing, or relocating? The hard part is usually coordinating the sale and the purchase. We help you plan the sequence before you commit.",
    funnelHref: "/funnel/purchase",
    primaryCta: "Plan My Next Move",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Decide whether to buy before you sell — and how to finance it.",
      "Use existing equity strategically for your next down payment.",
      "Avoid double moves and rushed decisions.",
    ],
    advisorNotes: [
      "We'll model buy-before-sell vs sell-first scenarios.",
      "We'll discuss bridge and equity options to ease the transition.",
      "We'll align your timeline with your financing.",
    ],
    faqs: [
      {
        question: "Should I buy before I sell my current home?",
        answer:
          "It depends on your equity, cash reserves, and local market. Buying first avoids temporary housing but requires a plan to carry two payments briefly. We model both paths so you can choose with clarity.",
      },
      {
        question: "Can I use my current home's equity for the next down payment?",
        answer:
          "Often yes — through sale proceeds, a bridge strategy, or a HELOC depending on timing. We help you compare the options and the costs.",
      },
    ],
    related: {
      articles: ["buy-before-you-sell"],
      calculators: ["buy-before-sell-planner", "affordability-planner"],
      landings: ["jumbo-loans", "conventional-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Buying Your Next Home | Move-Up & Relocation Loans",
      description:
        "Plan your next home purchase with Broadview Lending. Coordinate selling and buying, use your equity, and finance your move with advisor guidance.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "low-down-payment",
    path: "/buy/low-down-payment",
    eyebrow: "Home Buying",
    h1: "Low down payment options that actually fit your life.",
    intro:
      "You don't always need 20% down. We help you compare low and zero down programs and understand the real trade-offs in monthly cost and flexibility.",
    funnelHref: "/funnel/purchase",
    primaryCta: "See Low Down Payment Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Compare 0%, 3%, and 5% down strategies clearly.",
      "Understand mortgage insurance and how to remove it later.",
      "Balance cash-to-close against monthly payment.",
    ],
    advisorNotes: [
      "We'll show how each down payment changes your monthly cost.",
      "We'll explain when paying mortgage insurance is worth it.",
      "We'll keep reserves and emergency funds in the conversation.",
    ],
    faqs: [
      {
        question: "Can I buy a home with no down payment?",
        answer:
          "VA and USDA loans offer 0% down for eligible buyers. Other programs allow as little as 3%. We help you confirm eligibility and compare total cost.",
      },
      {
        question: "Is a low down payment a bad idea?",
        answer:
          "Not necessarily. Keeping cash in reserve can be smarter than draining savings for a larger down payment. The right choice depends on your goals and comfort.",
      },
    ],
    related: {
      articles: ["understanding-down-payments", "mortgage-insurance-explained"],
      calculators: ["down-payment-planner", "mortgage-insurance-comparison"],
      landings: ["fha-loans", "va-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Low & Zero Down Payment Home Loans",
      description:
        "Explore low down payment mortgage options with Broadview Lending. Compare 0%, 3%, and 5% down strategies with a real advisor.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "conventional-loans",
    path: "/buy/conventional-loans",
    eyebrow: "Home Buying",
    h1: "Conventional loans, explained without the jargon.",
    intro:
      "Conventional financing is the most common path for buyers with solid credit. We help you decide whether it's the right fit versus FHA, VA, or jumbo.",
    funnelHref: "/funnel/purchase",
    primaryCta: "Explore Conventional Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Competitive pricing for strong credit profiles.",
      "Avoid mortgage insurance with 20% down — or remove it later.",
      "Flexible terms for primary, second, and investment homes.",
    ],
    advisorNotes: [
      "We'll compare conventional against FHA for your numbers.",
      "We'll plan a path to drop mortgage insurance if you put less down.",
      "We'll match the term to your long-term goals.",
    ],
    faqs: [
      {
        question: "What credit score do I need for a conventional loan?",
        answer:
          "Conventional loans typically start around a 620 score, but pricing improves meaningfully with higher scores. We help you see how your score affects your rate.",
      },
      {
        question: "Conventional vs FHA — which is better?",
        answer:
          "Conventional often wins for strong credit and the ability to remove mortgage insurance. FHA can be better for lower scores or higher debt ratios. We compare both with your real numbers.",
      },
    ],
    related: {
      articles: ["fha-vs-conventional", "mortgage-insurance-explained"],
      calculators: ["affordability-planner", "mortgage-insurance-comparison"],
      landings: ["fha-loans", "jumbo-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Conventional Home Loans | Rates & Requirements",
      description:
        "Understand conventional mortgage options with Broadview Lending. Compare against FHA, VA, and jumbo with advisor guidance.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "fha-loans",
    path: "/buy/fha-loans",
    eyebrow: "Home Buying",
    h1: "FHA loans for flexible, accessible homebuying.",
    intro:
      "FHA financing can open the door with lower credit and down payment requirements. We help you understand the costs and whether it's your best path.",
    funnelHref: "/funnel/fha",
    primaryCta: "Check FHA Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Down payments as low as 3.5%.",
      "More flexible credit and debt-ratio guidelines.",
      "A clear plan to refinance out of mortgage insurance later.",
    ],
    advisorNotes: [
      "We'll weigh FHA mortgage insurance against conventional.",
      "We'll plan your exit strategy as your equity grows.",
      "We'll confirm the home and budget fit FHA guidelines.",
    ],
    faqs: [
      {
        question: "What is the minimum down payment for an FHA loan?",
        answer:
          "FHA loans allow as little as 3.5% down with qualifying credit. We help you compare that against low down payment conventional options.",
      },
      {
        question: "Does an FHA loan have mortgage insurance?",
        answer:
          "Yes — FHA includes upfront and annual mortgage insurance. For many buyers it's a stepping stone, and we plan a refinance path once you have enough equity.",
      },
    ],
    related: {
      articles: ["fha-vs-conventional", "mortgage-insurance-explained"],
      calculators: ["affordability-planner", "mortgage-insurance-comparison"],
      landings: ["first-time-homebuyer", "low-down-payment"],
      funnels: ["fha"],
    },
    seo: {
      title: "FHA Home Loans | Low Down Payment Mortgages",
      description:
        "Explore FHA loan options with Broadview Lending. Flexible credit and 3.5% down with a clear plan to remove mortgage insurance later.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "va-loans",
    path: "/buy/va-loans",
    eyebrow: "Home Buying",
    h1: "VA loans — the benefit you earned, used well.",
    intro:
      "For eligible veterans and service members, VA financing offers zero down and no monthly mortgage insurance. We help you use the benefit strategically.",
    funnelHref: "/funnel/va",
    primaryCta: "Review VA Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "0% down for eligible borrowers.",
      "No monthly mortgage insurance.",
      "Competitive rates and flexible guidelines.",
    ],
    advisorNotes: [
      "We'll confirm your entitlement and first-use vs subsequent-use.",
      "We'll explain the VA funding fee and exemptions.",
      "We'll compare VA against conventional where it makes sense.",
    ],
    faqs: [
      {
        question: "Do VA loans really require no down payment?",
        answer:
          "Yes, eligible borrowers can finance up to the full purchase price with 0% down, subject to entitlement and qualification.",
      },
      {
        question: "What is the VA funding fee?",
        answer:
          "It's a one-time fee that helps sustain the program. It varies by down payment and use, and some veterans are exempt. We'll calculate it for your scenario.",
      },
    ],
    related: {
      articles: ["va-loan-benefits"],
      calculators: ["affordability-planner"],
      landings: ["first-time-homebuyer", "conventional-loans"],
      funnels: ["va"],
    },
    seo: {
      title: "VA Home Loans | Zero Down for Veterans",
      description:
        "VA loan guidance for veterans and service members from Broadview Lending. Zero down, no monthly mortgage insurance, advisor support.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "jumbo-loans",
    path: "/buy/jumbo-loans",
    eyebrow: "Home Buying",
    h1: "Jumbo financing for higher-value homes.",
    intro:
      "When your loan amount exceeds conforming limits, the strategy matters more. We help you navigate jumbo guidelines, reserves, and structure.",
    funnelHref: "/funnel/purchase",
    primaryCta: "Explore Jumbo Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Financing above conforming loan limits.",
      "Flexible structures for complex income and assets.",
      "Strategies to optimize rate, reserves, and down payment.",
    ],
    advisorNotes: [
      "We'll structure the loan around your assets and reserves.",
      "We'll compare a single jumbo against combination strategies.",
      "We'll plan documentation for self-employed or complex income.",
    ],
    faqs: [
      {
        question: "What makes a loan 'jumbo'?",
        answer:
          "A jumbo loan exceeds the conforming limit set for your county. Guidelines are typically stricter on credit, reserves, and documentation.",
      },
      {
        question: "How much down do I need for a jumbo loan?",
        answer:
          "It varies by lender and profile — often 10% to 20%+. We help you find structures that fit your cash and goals.",
      },
    ],
    related: {
      articles: ["self-employed-mortgage-guide"],
      calculators: ["affordability-planner", "closing-cost-estimator"],
      landings: ["self-employed-home-loans", "conventional-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Jumbo Home Loans | High-Balance Mortgage Strategy",
      description:
        "Jumbo mortgage guidance from Broadview Lending. Finance higher-value homes with smart structure and advisor support.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "physician-loans",
    path: "/buy/physician-loans",
    eyebrow: "Home Buying",
    h1: "Physician loans built around your career timeline.",
    intro:
      "Physician programs can account for student debt and future income, often with low down payment and no mortgage insurance. We help you use them wisely.",
    funnelHref: "/funnel/purchase",
    primaryCta: "Explore Physician Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Low down payment without monthly mortgage insurance.",
      "Flexible treatment of student loan debt.",
      "Designed for residents, fellows, and attending physicians.",
    ],
    advisorNotes: [
      "We'll factor your contract and start date into the plan.",
      "We'll compare physician programs against conventional.",
      "We'll keep your reserves and cash flow protected.",
    ],
    faqs: [
      {
        question: "Who qualifies for a physician loan?",
        answer:
          "Typically MDs, DOs, dentists, and certain other professionals — sometimes including residents and fellows. Eligibility varies by program; we'll confirm yours.",
      },
      {
        question: "Do physician loans ignore student debt?",
        answer:
          "Many treat student debt more flexibly than conventional loans, which can meaningfully improve qualification. We'll show the difference for your numbers.",
      },
    ],
    related: {
      articles: ["self-employed-mortgage-guide"],
      calculators: ["affordability-planner"],
      landings: ["conventional-loans", "jumbo-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Physician Home Loans | Doctor Mortgage Programs",
      description:
        "Physician loan guidance from Broadview Lending. Low down payment, flexible student debt treatment, and advisor support for medical professionals.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "buy",
    slug: "self-employed-home-loans",
    path: "/buy/self-employed-home-loans",
    eyebrow: "Home Buying",
    h1: "Self-employed home loans that see your full picture.",
    intro:
      "Being self-employed shouldn't make homebuying harder. We help you document income the right way and find programs that fit how you actually earn.",
    funnelHref: "/funnel/purchase",
    primaryCta: "Explore Self-Employed Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Programs for tax-return, bank-statement, and asset-based income.",
      "Guidance on how write-offs affect qualification.",
      "Structures for business owners and 1099 earners.",
    ],
    advisorNotes: [
      "We'll review how your returns translate to qualifying income.",
      "We'll compare full-doc against alternative documentation.",
      "We'll plan ahead so tax strategy and mortgage goals align.",
    ],
    faqs: [
      {
        question: "Can I get a mortgage if I'm self-employed?",
        answer:
          "Yes. Beyond standard tax-return programs, there are bank-statement and asset-based options designed for self-employed borrowers. We help you choose the right fit.",
      },
      {
        question: "How many years self-employed do I need?",
        answer:
          "Two years is common, but some programs allow less with a strong profile. We'll review your situation and the available paths.",
      },
    ],
    related: {
      articles: ["self-employed-mortgage-guide"],
      calculators: ["affordability-planner"],
      landings: ["jumbo-loans", "conventional-loans"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Self-Employed Home Loans | Bank Statement & More",
      description:
        "Self-employed mortgage guidance from Broadview Lending. Tax-return, bank-statement, and asset-based options with advisor support.",
    },
    schema: "FinancialProduct",
  },

  // ------------------------------------------------------------ REFINANCE
  {
    ecosystem: "refinance",
    slug: "lower-payment",
    path: "/refinance/lower-payment",
    eyebrow: "Refinancing",
    h1: "Lower your payment without losing the long game.",
    intro:
      "A lower monthly payment can free up cash flow — but only if the math works. We help you see your break-even and total cost before you decide.",
    funnelHref: "/funnel/refinance",
    primaryCta: "See If Refinancing Fits",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Understand your break-even point clearly.",
      "Weigh payment savings against resetting your term.",
      "Decide if now is the right time — honestly.",
    ],
    advisorNotes: [
      "We'll calculate your true break-even, including costs.",
      "We'll compare lowering payment vs keeping your term.",
      "We'll tell you if waiting is the smarter move.",
    ],
    faqs: [
      {
        question: "How much lower does my rate need to be to refinance?",
        answer:
          "There's no magic number. What matters is whether monthly savings recover your costs before you'd sell or refinance again. We calculate your break-even precisely.",
      },
      {
        question: "Does refinancing restart my loan?",
        answer:
          "A new loan can reset your term, which lowers payment but may increase total interest. We show both effects so you choose intentionally.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense"],
      calculators: ["refinancing-decision-tool", "payment-planner"],
      landings: ["rate-and-term-refinance", "remove-mortgage-insurance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Lower Your Mortgage Payment | Refinance Options",
      description:
        "See whether refinancing can lower your payment with Broadview Lending. Break-even analysis and advisor guidance, not pressure.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "refinance",
    slug: "cash-out-refinance",
    path: "/refinance/cash-out-refinance",
    eyebrow: "Refinancing",
    h1: "Cash-out refinance, weighed against the alternatives.",
    intro:
      "A cash-out refinance replaces your mortgage and returns equity as cash. Sometimes a HELOC is smarter. We help you compare before you commit.",
    funnelHref: "/funnel/refinance",
    primaryCta: "Compare Cash-Out Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Access equity with one consolidated mortgage.",
      "Compare against a HELOC that keeps your current rate.",
      "Understand the long-term cost of resetting your loan.",
    ],
    advisorNotes: [
      "We'll compare cash-out refi vs HELOC vs second mortgage.",
      "We'll protect a low first-mortgage rate when it matters.",
      "We'll size the cash to your actual goal.",
    ],
    faqs: [
      {
        question: "Cash-out refinance or HELOC — which is better?",
        answer:
          "If your current first-mortgage rate is low, a HELOC may let you keep it while accessing equity. If you want one fixed payment or a better overall rate, cash-out may win. We compare both.",
      },
      {
        question: "How much equity can I take out?",
        answer:
          "Most cash-out refinances allow borrowing up to roughly 80% of your home's value, depending on the program. We'll estimate your available equity.",
      },
    ],
    related: {
      articles: ["heloc-vs-cash-out-refinance"],
      calculators: ["cash-out-vs-heloc", "equity-access-planner"],
      landings: ["debt-consolidation-refinance", "high-balance-refinancing"],
      funnels: ["refinance", "heloc"],
    },
    seo: {
      title: "Cash-Out Refinance | Access Your Home Equity",
      description:
        "Compare cash-out refinance against a HELOC with Broadview Lending. Access equity wisely with advisor guidance and clear trade-offs.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "refinance",
    slug: "remove-mortgage-insurance",
    path: "/refinance/remove-mortgage-insurance",
    eyebrow: "Refinancing",
    h1: "Stop paying mortgage insurance you no longer need.",
    intro:
      "As your equity grows, you may be able to remove mortgage insurance and lower your payment. We help you confirm whether it's time.",
    funnelHref: "/funnel/refinance",
    primaryCta: "Check If I Can Remove PMI",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Confirm whether you've reached the equity threshold.",
      "Compare a refinance against requesting removal.",
      "Lower your payment without resetting unnecessarily.",
    ],
    advisorNotes: [
      "We'll check whether removal or refinance is cheaper.",
      "We'll factor your current rate into the decision.",
      "We'll estimate the equity needed for your loan type.",
    ],
    faqs: [
      {
        question: "When can I remove mortgage insurance?",
        answer:
          "On conventional loans, typically once you reach about 20% equity. FHA insurance often requires a refinance to remove. We confirm your specific path.",
      },
      {
        question: "Is refinancing worth it just to remove PMI?",
        answer:
          "Sometimes — especially if rates are favorable. If your rate is already low, a value reassessment may be better than a full refinance. We compare both.",
      },
    ],
    related: {
      articles: ["mortgage-insurance-explained"],
      calculators: ["mortgage-insurance-comparison", "refinancing-decision-tool"],
      landings: ["lower-payment", "rate-and-term-refinance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Remove Mortgage Insurance | PMI Removal Options",
      description:
        "Find out if you can remove mortgage insurance with Broadview Lending. Compare PMI removal vs refinance with advisor guidance.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "refinance",
    slug: "divorce-refinance",
    path: "/refinance/divorce-refinance",
    eyebrow: "Refinancing",
    h1: "A calm, clear refinance during a hard transition.",
    intro:
      "Refinancing during divorce is as much about clarity as numbers. We help you remove a spouse from the loan and plan a stable next chapter.",
    funnelHref: "/funnel/refinance",
    primaryCta: "Plan My Refinance",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Remove a co-borrower from the mortgage.",
      "Buy out equity as part of the settlement.",
      "Qualify on your own income with a clear plan.",
    ],
    advisorNotes: [
      "We'll handle the process with discretion and patience.",
      "We'll coordinate with the equity buyout in your agreement.",
      "We'll confirm qualification on a single income.",
    ],
    faqs: [
      {
        question: "How do I remove my ex-spouse from the mortgage?",
        answer:
          "Refinancing into your own name is the most common way to remove a co-borrower's liability. We'll confirm you qualify and plan any equity buyout.",
      },
      {
        question: "Can I use a refinance to fund an equity buyout?",
        answer:
          "Often yes — a cash-out refinance can provide funds to buy out your former spouse's share, subject to equity and qualification.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense"],
      calculators: ["refinancing-decision-tool", "equity-access-planner"],
      landings: ["cash-out-refinance", "lower-payment"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Divorce Refinance | Remove a Spouse From a Mortgage",
      description:
        "Refinance during divorce with Broadview Lending. Remove a co-borrower, fund an equity buyout, and plan your next chapter with care.",
    },
    schema: "WebPage",
  },
  {
    ecosystem: "refinance",
    slug: "debt-consolidation-refinance",
    path: "/refinance/debt-consolidation-refinance",
    eyebrow: "Refinancing",
    h1: "Consolidate debt with a plan, not just a payoff.",
    intro:
      "Rolling high-interest debt into your mortgage can lower payments — but only with discipline. We help you decide if it truly improves your position.",
    funnelHref: "/funnel/refinance",
    primaryCta: "Build My Consolidation Plan",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Compare consolidation against a HELOC or staying put.",
      "Understand total cost, not just the lower payment.",
      "Avoid trading short-term relief for long-term cost.",
    ],
    advisorNotes: [
      "We'll calculate real interest savings, not just payment drop.",
      "We'll discuss the habits that keep consolidation working.",
      "We'll compare a refinance against a HELOC.",
    ],
    faqs: [
      {
        question: "Is it smart to consolidate debt into my mortgage?",
        answer:
          "It can be, if the rate is meaningfully lower and you avoid running balances back up. We show the true total cost so you decide with eyes open.",
      },
      {
        question: "Will consolidating hurt my credit?",
        answer:
          "Paying off revolving debt often helps over time, though there can be a short-term dip. We'll talk through the realistic impact.",
      },
    ],
    related: {
      articles: ["debt-consolidation-strategies"],
      calculators: ["debt-consolidation-planner", "cash-out-vs-heloc"],
      landings: ["cash-out-refinance", "lower-payment"],
      funnels: ["refinance", "heloc"],
    },
    seo: {
      title: "Debt Consolidation Refinance | Lower Your Payments",
      description:
        "Consolidate high-interest debt with Broadview Lending. Compare a refinance against a HELOC and understand the true cost with advisor guidance.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "refinance",
    slug: "high-balance-refinancing",
    path: "/refinance/high-balance-refinancing",
    eyebrow: "Refinancing",
    h1: "High-balance refinancing done with strategy.",
    intro:
      "Larger loan balances reward careful structure. We help you optimize rate, term, and equity access on high-balance and jumbo refinances.",
    funnelHref: "/funnel/refinance",
    primaryCta: "Explore High-Balance Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Strategies for high-balance and jumbo refinances.",
      "Optimize rate, term, and cash-out together.",
      "Plan documentation for complex income.",
    ],
    advisorNotes: [
      "We'll structure the loan around your reserves and goals.",
      "We'll compare term options for total interest.",
      "We'll coordinate documentation early.",
    ],
    faqs: [
      {
        question: "What is high-balance refinancing?",
        answer:
          "It refers to refinancing loan amounts above standard conforming limits, often in higher-cost areas or jumbo territory, with specific guidelines we'll walk through.",
      },
      {
        question: "Can I take cash out on a high-balance refinance?",
        answer:
          "Often yes, subject to equity and program limits. We'll estimate your options and the trade-offs.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense"],
      calculators: ["refinancing-decision-tool", "equity-access-planner"],
      landings: ["cash-out-refinance", "rate-and-term-refinance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "High-Balance & Jumbo Refinancing",
      description:
        "High-balance refinance guidance from Broadview Lending. Optimize rate, term, and equity access with advisor support.",
    },
    schema: "FinancialProduct",
  },
  {
    ecosystem: "refinance",
    slug: "rate-and-term-refinance",
    path: "/refinance/rate-and-term-refinance",
    eyebrow: "Refinancing",
    h1: "Rate-and-term refinance, timed to your goals.",
    intro:
      "Adjusting your rate or term — without taking cash out — can save real money or help you pay off sooner. We help you choose the right structure.",
    funnelHref: "/funnel/refinance",
    primaryCta: "See My Refinance Options",
    secondaryCta: "Talk With A Mortgage Advisor",
    highlights: [
      "Lower your rate or shorten your term intentionally.",
      "Understand break-even before you commit.",
      "Choose between lower payment and faster payoff.",
    ],
    advisorNotes: [
      "We'll compare 15-, 20-, and 30-year structures.",
      "We'll calculate your break-even with real costs.",
      "We'll align the term with your retirement and goals.",
    ],
    faqs: [
      {
        question: "What is a rate-and-term refinance?",
        answer:
          "It changes your interest rate and/or loan term without taking cash out. It's often the cleanest way to save interest or pay off faster.",
      },
      {
        question: "Should I refinance to a shorter term?",
        answer:
          "A shorter term saves interest and builds equity faster, but raises the payment. We model the trade-off against your cash flow and goals.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense"],
      calculators: ["payment-planner", "refinancing-decision-tool"],
      landings: ["lower-payment", "remove-mortgage-insurance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Rate-and-Term Refinance | Lower Rate or Shorter Term",
      description:
        "Rate-and-term refinance guidance from Broadview Lending. Lower your rate or shorten your term with break-even clarity and advisor support.",
    },
    schema: "FinancialProduct",
  },
];

export const landingEcosystems: Record<
  LandingEcosystem,
  { title: string; path: string; intro: string }
> = {
  buy: {
    title: "Home Buying",
    path: "/buy",
    intro:
      "From your first home to your next move, we help you understand your options before recommending a loan.",
  },
  refinance: {
    title: "Refinancing",
    path: "/refinance",
    intro:
      "Lower your payment, access equity, or pay off sooner — only when the math truly works for you.",
  },
};

export function getLandingPage(
  ecosystem: LandingEcosystem,
  slug: string,
): LandingPage | undefined {
  return landingPages.find(
    (p) => p.ecosystem === ecosystem && p.slug === slug,
  );
}

export function getLandingPageByPath(path: string): LandingPage | undefined {
  return landingPages.find((p) => p.path === path);
}

export function getLandingPagesByEcosystem(
  ecosystem: LandingEcosystem,
): LandingPage[] {
  return landingPages.filter((p) => p.ecosystem === ecosystem);
}

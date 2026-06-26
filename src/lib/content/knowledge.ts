import type {
  AdvisorInsight,
  Faq,
  RelatedRefs,
  SeoMeta,
  StrategySnapshot,
} from "@/lib/content/types";

/**
 * Structured knowledge center (not a blog). Articles are written for both human
 * readers and AI search (AI Overviews, ChatGPT, Perplexity, Claude, Gemini):
 * a concise summary answer, clear headings, key takeaways, and FAQ blocks.
 */
export type KnowledgeCategorySlug =
  | "buying"
  | "refinancing"
  | "home-equity"
  | "mortgage-basics"
  | "credit"
  | "rates"
  | "investing"
  | "life-events";

export type KnowledgeCategory = {
  slug: KnowledgeCategorySlug;
  title: string;
  description: string;
};

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    slug: "buying",
    title: "Buying",
    description: "Budgets, down payments, and programs for buying a home.",
  },
  {
    slug: "refinancing",
    title: "Refinancing",
    description: "Lower payments, cash-out, and break-even strategy.",
  },
  {
    slug: "home-equity",
    title: "Home Equity",
    description: "HELOCs, home equity loans, and accessing equity wisely.",
  },
  {
    slug: "mortgage-basics",
    title: "Mortgage Basics",
    description: "The core concepts behind every mortgage decision.",
  },
  {
    slug: "credit",
    title: "Credit",
    description: "How credit shapes your options and pricing.",
  },
  {
    slug: "rates",
    title: "Rates",
    description: "How mortgage rates work and what moves them.",
  },
  {
    slug: "investing",
    title: "Investing",
    description: "Using real estate and equity to build wealth.",
  },
  {
    slug: "life-events",
    title: "Life Events",
    description: "Mortgage strategy for the moments that change everything.",
  },
];

export type ArticleSection = {
  heading: string;
  body: string[];
};

export type KnowledgeArticle = {
  slug: string;
  category: KnowledgeCategorySlug;
  title: string;
  /** Concise, quotable answer for AI search and featured snippets. */
  summary: string;
  readingTime: string;
  updated: string;
  eyebrow: string;
  intro: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  faqs: Faq[];
  related: RelatedRefs;
  nextArticle?: string;
  seo: SeoMeta;
  // Intelligence layer (optional, rendered when present)
  advisorInsight?: AdvisorInsight;
  questionsWeHear?: Faq[];
  strategySnapshot?: StrategySnapshot;
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "how-much-home-can-you-afford",
    category: "buying",
    title: "How Much Home Can You Afford?",
    summary:
      "Affordability is about your comfortable monthly payment, not just the maximum a lender approves. Start with your target payment, then work backward to a price using rate, taxes, insurance, and your other goals.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Buying",
    intro:
      "The number a lender approves and the number that fits your life are rarely the same. Here's how to find your real budget before you start touring homes.",
    sections: [
      {
        heading: "Start with the payment, not the price",
        body: [
          "Most buyers anchor on a home price. A better approach is to start with the monthly payment you'd feel genuinely comfortable making, then translate that into a price range.",
          "Your payment includes principal, interest, property taxes, homeowners insurance, and sometimes mortgage insurance or HOA dues. Two homes at the same price can have very different monthly costs.",
        ],
      },
      {
        heading: "Know your debt-to-income picture",
        body: [
          "Lenders look at how much of your gross monthly income goes toward debt. Lower ratios open more options and better pricing.",
          "Reducing a car payment or credit card balance before you buy can sometimes increase your buying power more than a higher income would.",
        ],
      },
      {
        heading: "Protect your reserves",
        body: [
          "Draining savings for the largest possible down payment can leave you exposed. Keeping a healthy emergency fund is part of a smart affordability decision.",
        ],
      },
    ],
    keyTakeaways: [
      "Begin with a comfortable payment, then back into a price.",
      "Payment includes taxes, insurance, and sometimes mortgage insurance.",
      "Keep reserves — affordability is about stability, not just approval.",
    ],
    faqs: [
      {
        question: "What percentage of income should go to a mortgage?",
        answer:
          "A common guideline is keeping your total housing payment around 28% of gross income, but the right number depends on your other debts, goals, and comfort. We help you find yours.",
      },
      {
        question: "Does a bigger down payment mean I can afford more?",
        answer:
          "It lowers your monthly payment and can remove mortgage insurance, but draining reserves can hurt. The best down payment balances payment, cash to close, and savings.",
      },
    ],
    related: {
      articles: ["understanding-down-payments", "fha-vs-conventional"],
      calculators: ["affordability-planner", "payment-planner"],
      landings: ["first-time-homebuyer", "conventional-loans"],
      funnels: ["purchase"],
    },
    nextArticle: "understanding-down-payments",
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is the payment you'd feel comfortable making on a tough month — not just a good one.",
      more: "Affordability built around your comfortable payment, with reserves intact, tends to age far better than a budget built around the maximum you qualify for.",
    },
    questionsWeHear: [
      {
        question: "Should I buy the most house I qualify for?",
        answer:
          "Usually not. Qualifying for an amount and being comfortable with it are different. We help you find the payment that fits your real life.",
      },
      {
        question: "How much should I keep in savings after buying?",
        answer:
          "A common target is several months of expenses, but it depends on your job stability and the home. We factor reserves into your budget.",
      },
    ],
    strategySnapshot: {
      whatWeLearned: [
        "Your comfortable payment is the better starting point than a price.",
        "Taxes, insurance, and reserves all shape true affordability.",
      ],
      strategies: [
        "Building a budget around a comfortable payment",
        "Comparing down payment scenarios on monthly cost",
      ],
      questions: [
        "What payment feels comfortable on an average month?",
        "How much cushion do you want after closing?",
      ],
      thingsToVerify: ["Income and debts", "Reserve targets", "Local taxes"],
      commonMistakes: [
        "Anchoring on the maximum approval",
        "Draining savings for a larger down payment",
      ],
      nextStep:
        "Confirm your real budget with an advisor and a pre-approval. This is educational guidance only — not a loan approval or commitment to lend.",
    },
    seo: {
      title: "How Much Home Can You Afford?",
      description:
        "Find your real home buying budget. Learn how to start with a comfortable payment and work back to a price with Broadview Lending.",
    },
  },
  {
    slug: "understanding-down-payments",
    category: "buying",
    title: "Understanding Down Payments",
    summary:
      "You rarely need 20% down. Options range from 0% (VA/USDA) to 3–5% (conventional and FHA). The right down payment balances your monthly payment, cash to close, mortgage insurance, and reserves.",
    readingTime: "5 min",
    updated: "2026-05-01",
    eyebrow: "Buying",
    intro:
      "The 20% rule is a myth for most buyers. Here's how to think about down payments strategically.",
    sections: [
      {
        heading: "How low can you go?",
        body: [
          "VA and USDA loans allow 0% down for eligible buyers. Conventional loans can start at 3%, and FHA at 3.5%. Larger down payments reduce your loan and may remove mortgage insurance.",
        ],
      },
      {
        heading: "The trade-offs",
        body: [
          "A smaller down payment keeps cash in your pocket but raises your payment and may add mortgage insurance. A larger one lowers your payment but uses more savings.",
          "The smartest choice depends on your goals: minimizing monthly cost, minimizing cash to close, or preserving reserves.",
        ],
      },
    ],
    keyTakeaways: [
      "20% down is not required for most buyers.",
      "0% options exist for VA and USDA borrowers.",
      "Balance payment, cash to close, mortgage insurance, and reserves.",
    ],
    faqs: [
      {
        question: "Is it better to put more money down?",
        answer:
          "Not always. A larger down payment lowers your payment but reduces savings. Sometimes keeping reserves and accepting mortgage insurance is the smarter move.",
      },
      {
        question: "Can down payment assistance help?",
        answer:
          "Yes — many buyers qualify for assistance programs. We help you find and compare options for your area and profile.",
      },
    ],
    related: {
      articles: ["how-much-home-can-you-afford", "mortgage-insurance-explained"],
      calculators: ["down-payment-planner", "mortgage-insurance-comparison"],
      landings: ["low-down-payment", "first-time-homebuyer"],
      funnels: ["purchase"],
    },
    nextArticle: "fha-vs-conventional",
    seo: {
      title: "Understanding Down Payments",
      description:
        "How much should you put down on a home? Compare 0%, 3%, and 5% strategies with Broadview Lending.",
    },
  },
  {
    slug: "fha-vs-conventional",
    category: "mortgage-basics",
    title: "FHA vs Conventional: Which Is Right for You?",
    summary:
      "FHA loans favor lower credit and higher debt ratios with 3.5% down, but carry mortgage insurance that usually requires a refinance to remove. Conventional loans reward stronger credit and let you drop mortgage insurance as equity grows.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Mortgage Basics",
    intro:
      "Two of the most common loan types solve different problems. Here's how to tell which fits your situation.",
    sections: [
      {
        heading: "When FHA shines",
        body: [
          "FHA is often the better path for buyers with lower credit scores or higher debt-to-income ratios. It allows 3.5% down and more flexible guidelines.",
          "The trade-off is mortgage insurance that typically stays for the life of the loan unless you refinance.",
        ],
      },
      {
        heading: "When conventional wins",
        body: [
          "With stronger credit, conventional loans usually offer better pricing and the ability to remove mortgage insurance once you reach about 20% equity.",
        ],
      },
      {
        heading: "Run both with real numbers",
        body: [
          "The only way to choose well is to compare both for your actual scenario, including the long-term cost of mortgage insurance.",
        ],
      },
    ],
    keyTakeaways: [
      "FHA: flexible credit, 3.5% down, longer-lasting mortgage insurance.",
      "Conventional: better for strong credit, removable mortgage insurance.",
      "Always compare both with your real numbers.",
    ],
    faqs: [
      {
        question: "Is FHA or conventional cheaper?",
        answer:
          "It depends on your credit and down payment. Conventional is often cheaper long-term for strong credit; FHA can be cheaper upfront for lower scores. We compare both.",
      },
      {
        question: "Can I switch from FHA to conventional later?",
        answer:
          "Yes. Many buyers use FHA to get in, then refinance to conventional once they have enough equity to drop mortgage insurance.",
      },
    ],
    related: {
      articles: ["mortgage-insurance-explained", "understanding-credit-scores"],
      calculators: ["affordability-planner", "mortgage-insurance-comparison"],
      landings: ["fha-loans", "conventional-loans"],
      funnels: ["fha", "purchase"],
    },
    nextArticle: "mortgage-insurance-explained",
    seo: {
      title: "FHA vs Conventional Loans",
      description:
        "Compare FHA and conventional mortgages on down payment, credit, and long-term cost with Broadview Lending.",
    },
  },
  {
    slug: "mortgage-insurance-explained",
    category: "mortgage-basics",
    title: "Mortgage Insurance, Explained",
    summary:
      "Mortgage insurance lets you buy with less than 20% down by protecting the lender. On conventional loans it can be removed around 20% equity; on FHA loans it usually requires a refinance to remove.",
    readingTime: "5 min",
    updated: "2026-05-01",
    eyebrow: "Mortgage Basics",
    intro:
      "Mortgage insurance is often misunderstood. Used intentionally, it's a tool — not a penalty.",
    sections: [
      {
        heading: "What it is and why it exists",
        body: [
          "Mortgage insurance protects the lender if a borrower defaults, which is what makes low down payment lending possible. It's the cost of getting in sooner.",
        ],
      },
      {
        heading: "How to remove it",
        body: [
          "On conventional loans, you can typically request removal near 20% equity, or it falls off automatically at 22%. FHA mortgage insurance usually requires refinancing into a conventional loan to remove.",
        ],
      },
    ],
    keyTakeaways: [
      "Mortgage insurance enables low down payment buying.",
      "Conventional MI can be removed as equity grows.",
      "FHA MI usually requires a refinance to remove.",
    ],
    faqs: [
      {
        question: "Is mortgage insurance always bad?",
        answer:
          "No. Paying it for a few years to buy sooner — while keeping reserves — can be smarter than waiting years to save 20%.",
      },
      {
        question: "How do I get rid of PMI?",
        answer:
          "On conventional loans, request removal around 20% equity. On FHA, refinance once you qualify. We help you plan the timing.",
      },
    ],
    related: {
      articles: ["understanding-down-payments", "fha-vs-conventional"],
      calculators: ["mortgage-insurance-comparison", "down-payment-planner"],
      landings: ["remove-mortgage-insurance", "low-down-payment"],
      funnels: ["refinance", "purchase"],
    },
    nextArticle: "understanding-credit-scores",
    seo: {
      title: "Mortgage Insurance Explained (PMI & MIP)",
      description:
        "Understand mortgage insurance, when it's worth it, and how to remove it, with Broadview Lending.",
    },
  },
  {
    slug: "va-loan-benefits",
    category: "buying",
    title: "VA Loan Benefits Explained",
    summary:
      "VA loans offer eligible veterans and service members 0% down, no monthly mortgage insurance, and competitive rates. A one-time funding fee applies, with exemptions for some veterans.",
    readingTime: "5 min",
    updated: "2026-05-01",
    eyebrow: "Buying",
    intro:
      "The VA loan is one of the strongest benefits available — if you use it strategically.",
    sections: [
      {
        heading: "Why VA loans are powerful",
        body: [
          "Zero down and no monthly mortgage insurance can save eligible borrowers hundreds per month compared to other low down payment options.",
        ],
      },
      {
        heading: "Understanding the funding fee",
        body: [
          "The VA funding fee is a one-time cost that sustains the program. It varies by down payment and whether it's your first use, and some veterans are exempt.",
        ],
      },
    ],
    keyTakeaways: [
      "0% down and no monthly mortgage insurance.",
      "A one-time funding fee applies (with exemptions).",
      "Benefits can be reused over your lifetime.",
    ],
    faqs: [
      {
        question: "Can I use my VA benefit more than once?",
        answer:
          "Yes. VA entitlement can be restored and reused. We help you understand first-use vs subsequent-use and remaining entitlement.",
      },
      {
        question: "Do VA loans have higher rates?",
        answer:
          "VA rates are typically very competitive. Combined with no monthly mortgage insurance, the total cost is often lower than comparable options.",
      },
    ],
    related: {
      articles: ["how-much-home-can-you-afford"],
      calculators: ["affordability-planner"],
      landings: ["va-loans", "first-time-homebuyer"],
      funnels: ["va"],
    },
    nextArticle: "how-much-home-can-you-afford",
    seo: {
      title: "VA Loan Benefits Explained",
      description:
        "Learn how VA loans offer zero down and no monthly mortgage insurance for eligible veterans, with Broadview Lending.",
    },
  },
  {
    slug: "buy-before-you-sell",
    category: "life-events",
    title: "Should You Buy Before You Sell?",
    summary:
      "Buying before you sell avoids temporary housing and double moves but requires a plan to carry two payments briefly — often via reserves, a bridge strategy, or a HELOC. Selling first is safer financially but adds logistics.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Life Events",
    intro:
      "The hardest part of moving up is timing. Here's how to decide which order is right for you.",
    sections: [
      {
        heading: "The case for buying first",
        body: [
          "Buying before selling lets you move once, avoid temporary rentals, and shop without pressure — if you can manage the brief overlap in payments.",
        ],
      },
      {
        heading: "The case for selling first",
        body: [
          "Selling first removes financial risk and gives you a known budget, but may require short-term housing and a faster purchase timeline.",
        ],
      },
      {
        heading: "Bridging the gap",
        body: [
          "A bridge loan or HELOC on your current home can fund the new down payment before your sale closes. We model the cost against the convenience.",
        ],
      },
    ],
    keyTakeaways: [
      "Buying first means one move but a brief payment overlap.",
      "Selling first is safer but adds logistics.",
      "Bridge financing or a HELOC can connect the two.",
    ],
    faqs: [
      {
        question: "How can I afford two mortgages at once?",
        answer:
          "Usually you don't carry both long-term. Reserves, a bridge loan, or a HELOC cover the short overlap until your sale closes.",
      },
      {
        question: "Is a bridge loan expensive?",
        answer:
          "Bridge financing costs more than a standard loan but is short-term. We compare it against the cost and stress of moving twice.",
      },
    ],
    related: {
      articles: ["heloc-vs-cash-out-refinance"],
      calculators: ["buy-before-sell-planner", "equity-access-planner"],
      landings: ["buying-your-next-home", "cash-out-refinance"],
      funnels: ["purchase", "heloc"],
    },
    nextArticle: "heloc-vs-cash-out-refinance",
    seo: {
      title: "Should You Buy Before You Sell?",
      description:
        "Decide whether to buy or sell first with Broadview Lending. Compare bridge financing, HELOCs, and timing strategies.",
    },
  },
  {
    slug: "self-employed-mortgage-guide",
    category: "buying",
    title: "The Self-Employed Mortgage Guide",
    summary:
      "Self-employed borrowers can qualify with tax returns, bank statements, or assets. Because write-offs reduce taxable income, the right documentation strategy — planned in advance — often matters more than your rate.",
    readingTime: "7 min",
    updated: "2026-05-01",
    eyebrow: "Buying",
    intro:
      "Being your own boss shouldn't make homebuying harder. It just requires the right approach to documenting income.",
    sections: [
      {
        heading: "How lenders see self-employment income",
        body: [
          "Traditional programs average your net income from tax returns. Aggressive write-offs lower taxes but can also lower qualifying income.",
        ],
      },
      {
        heading: "Alternative documentation options",
        body: [
          "Bank-statement and asset-based programs let qualifying income reflect actual cash flow or assets rather than net tax figures. These can dramatically change qualification.",
        ],
      },
      {
        heading: "Plan ahead",
        body: [
          "The best results come from aligning your tax strategy with your mortgage goals a year or two before you buy. We help you plan the sequence.",
        ],
      },
    ],
    keyTakeaways: [
      "Write-offs can reduce qualifying income.",
      "Bank-statement and asset programs offer alternatives.",
      "Plan documentation strategy well before you buy.",
    ],
    faqs: [
      {
        question: "How many years of self-employment do I need?",
        answer:
          "Two years is typical, though some programs allow less with a strong profile. We review your situation and available paths.",
      },
      {
        question: "What is a bank-statement loan?",
        answer:
          "It qualifies you using deposits across recent bank statements instead of tax returns — useful when write-offs lower your net income.",
      },
    ],
    related: {
      articles: ["how-much-home-can-you-afford"],
      calculators: ["affordability-planner"],
      landings: ["self-employed-home-loans", "jumbo-loans"],
      funnels: ["purchase"],
    },
    nextArticle: "how-much-home-can-you-afford",
    seo: {
      title: "The Self-Employed Mortgage Guide",
      description:
        "How self-employed borrowers qualify for a mortgage — tax returns, bank statements, and assets — with Broadview Lending.",
    },
  },
  {
    slug: "when-does-refinancing-make-sense",
    category: "refinancing",
    title: "When Does Refinancing Make Sense?",
    summary:
      "Refinancing makes sense when your monthly savings recover the closing costs before you'd sell or refinance again — your break-even point. Rate, remaining term, and how long you'll stay all matter more than the rate alone.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Refinancing",
    intro:
      "There's no universal rate-drop rule. The real question is whether the savings outrun the costs in your timeframe.",
    sections: [
      {
        heading: "Find your break-even",
        body: [
          "Divide your total refinance costs by your monthly savings to find how many months it takes to break even. If you'll stay past that point, refinancing likely pays off.",
        ],
      },
      {
        heading: "Don't ignore the term reset",
        body: [
          "Lowering your payment by restarting a 30-year term can increase total interest. Sometimes a shorter term or keeping your current schedule is better.",
        ],
      },
    ],
    keyTakeaways: [
      "Break-even, not rate drop, is the real test.",
      "Watch the impact of resetting your term.",
      "How long you'll stay determines the answer.",
    ],
    faqs: [
      {
        question: "What is a refinance break-even point?",
        answer:
          "It's how long it takes for monthly savings to recover your closing costs. Stay past it and you come out ahead.",
      },
      {
        question: "Can I refinance with no closing costs?",
        answer:
          "Sometimes — by accepting a slightly higher rate or rolling costs in. We show whether that helps or hurts your break-even.",
      },
    ],
    related: {
      articles: ["heloc-vs-cash-out-refinance", "how-mortgage-rates-work"],
      calculators: ["refinancing-decision-tool", "payment-planner"],
      landings: ["lower-payment", "rate-and-term-refinance"],
      funnels: ["refinance"],
    },
    nextArticle: "heloc-vs-cash-out-refinance",
    seo: {
      title: "When Does Refinancing Make Sense?",
      description:
        "Learn how to use break-even analysis to decide if refinancing is worth it, with Broadview Lending.",
    },
  },
  {
    slug: "heloc-vs-cash-out-refinance",
    category: "home-equity",
    title: "HELOC vs Cash-Out Refinance",
    summary:
      "A HELOC lets you access equity while keeping your existing first mortgage and rate — ideal when that rate is low. A cash-out refinance replaces your mortgage with one new loan, which can be better for large needs or a single fixed payment.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Home Equity",
    intro:
      "Both let you tap equity, but they solve different problems. The right choice often hinges on your current rate.",
    sections: [
      {
        heading: "Why a HELOC may win",
        body: [
          "If your first mortgage carries a low rate, a HELOC lets you borrow against equity without touching it. You only pay interest on what you use.",
        ],
      },
      {
        heading: "Why cash-out may win",
        body: [
          "For larger, one-time needs or a preference for a single fixed payment, replacing your mortgage can make sense — especially if the new rate is favorable.",
        ],
      },
    ],
    keyTakeaways: [
      "HELOC keeps your existing first mortgage and rate.",
      "Cash-out consolidates into one new loan.",
      "Your current rate is often the deciding factor.",
    ],
    faqs: [
      {
        question: "Which is cheaper, a HELOC or cash-out refinance?",
        answer:
          "It depends on your current rate, how much you need, and how long you'll carry the balance. We compare both with your real numbers.",
      },
      {
        question: "Can I lose my low mortgage rate with a cash-out refinance?",
        answer:
          "Yes — a cash-out refinance replaces your first mortgage. If your rate is low, a HELOC may be the smarter way to preserve it.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense", "debt-consolidation-strategies"],
      calculators: ["cash-out-vs-heloc", "equity-access-planner"],
      landings: ["cash-out-refinance", "debt-consolidation-refinance"],
      funnels: ["heloc", "refinance"],
    },
    nextArticle: "debt-consolidation-strategies",
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is your current first-mortgage rate — it often decides the whole conversation.",
      more: "If you locked a low rate, a HELOC usually lets you keep it while accessing equity. If your rate is already near today's, a cash-out refinance becomes more reasonable.",
    },
    questionsWeHear: [
      {
        question: "Will I lose my low rate if I take cash out?",
        answer:
          "With a cash-out refinance, yes — it replaces your first mortgage. A HELOC leaves your first mortgage and its rate in place.",
      },
      {
        question: "Which has a lower payment?",
        answer:
          "It depends on amounts, rates, and how long you carry the balance. We compare both with your real numbers.",
      },
    ],
    strategySnapshot: {
      whatWeLearned: [
        "Both options access equity, but affect your first mortgage differently.",
        "Your current rate is often the deciding factor.",
      ],
      strategies: [
        "A HELOC to preserve a low first-mortgage rate",
        "A cash-out refinance for one consolidated payment",
      ],
      questions: [
        "Is preserving your current rate a priority?",
        "Do you want flexible access or a fixed payment?",
      ],
      thingsToVerify: ["Current rate and balance", "Home value", "Goal amount"],
      commonMistakes: [
        "Replacing a low rate without comparing a HELOC",
        "Borrowing more than the goal requires",
      ],
      nextStep:
        "Compare both paths with an advisor using your numbers. This is educational guidance only — not a loan approval or commitment to lend.",
    },
    seo: {
      title: "HELOC vs Cash-Out Refinance",
      description:
        "Compare a HELOC against a cash-out refinance to access home equity wisely, with Broadview Lending.",
    },
  },
  {
    slug: "debt-consolidation-strategies",
    category: "refinancing",
    title: "Smart Debt Consolidation Strategies",
    summary:
      "Consolidating high-interest debt into home financing can lower payments and total interest — but only if you avoid rebuilding balances. Compare a cash-out refinance, a HELOC, and staying put before deciding.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Refinancing",
    intro:
      "Consolidation can be powerful or a trap. The difference is strategy and discipline.",
    sections: [
      {
        heading: "The real math",
        body: [
          "Moving 20%+ credit card debt to a much lower mortgage rate can save significant interest. But stretching short-term debt over 30 years can cost more unless you keep paying it down aggressively.",
        ],
      },
      {
        heading: "Choosing the vehicle",
        body: [
          "A HELOC preserves a low first-mortgage rate; a cash-out refinance consolidates everything into one payment. We compare both against simply paying down debt directly.",
        ],
      },
    ],
    keyTakeaways: [
      "Lower rate can mean big interest savings.",
      "Avoid re-running balances after consolidating.",
      "Compare HELOC, cash-out, and staying put.",
    ],
    faqs: [
      {
        question: "Will consolidating debt save me money?",
        answer:
          "It can, if the new rate is much lower and you don't rebuild the debt. We calculate true savings, not just the lower payment.",
      },
      {
        question: "Should I use a HELOC or refinance to consolidate?",
        answer:
          "If your first mortgage rate is low, a HELOC may preserve it. If you want one fixed payment, a refinance may fit. We compare both.",
      },
    ],
    related: {
      articles: ["heloc-vs-cash-out-refinance", "when-does-refinancing-make-sense"],
      calculators: ["debt-consolidation-planner", "cash-out-vs-heloc"],
      landings: ["debt-consolidation-refinance", "cash-out-refinance"],
      funnels: ["refinance", "heloc"],
    },
    nextArticle: "heloc-vs-cash-out-refinance",
    seo: {
      title: "Smart Debt Consolidation Strategies",
      description:
        "Consolidate debt the smart way. Compare HELOC, cash-out refinance, and direct payoff with Broadview Lending.",
    },
  },
  {
    slug: "understanding-credit-scores",
    category: "credit",
    title: "Understanding Credit Scores for a Mortgage",
    summary:
      "Your credit score affects both whether you qualify and the rate you're offered. Even small improvements — lowering card balances, fixing errors — can move you into better pricing tiers before you apply.",
    readingTime: "5 min",
    updated: "2026-05-01",
    eyebrow: "Credit",
    intro:
      "Credit is one of the few mortgage factors you can improve quickly. Here's what actually moves the needle.",
    sections: [
      {
        heading: "What lenders look at",
        body: [
          "Payment history and credit utilization carry the most weight. Lowering balances relative to limits can lift your score within a cycle or two.",
        ],
      },
      {
        heading: "Pricing tiers matter",
        body: [
          "Mortgage pricing improves in steps. Moving from one tier to the next — say, crossing a key score threshold — can lower your rate meaningfully.",
        ],
      },
    ],
    keyTakeaways: [
      "Utilization and payment history matter most.",
      "Small improvements can change your pricing tier.",
      "Check your credit before you apply, not after.",
    ],
    faqs: [
      {
        question: "What credit score do I need to buy a home?",
        answer:
          "FHA can work with lower scores; conventional typically starts around 620 with better pricing higher up. We help you see realistic options.",
      },
      {
        question: "How fast can I raise my score?",
        answer:
          "Lowering card balances can help within one or two statement cycles. We can suggest targeted steps before you apply.",
      },
    ],
    related: {
      articles: ["fha-vs-conventional", "how-mortgage-rates-work"],
      calculators: ["affordability-planner"],
      landings: ["first-time-homebuyer", "fha-loans"],
      funnels: ["purchase"],
    },
    nextArticle: "how-mortgage-rates-work",
    seo: {
      title: "Understanding Credit Scores for a Mortgage",
      description:
        "How credit scores affect mortgage approval and pricing — and how to improve yours, with Broadview Lending.",
    },
  },
  {
    slug: "how-mortgage-rates-work",
    category: "rates",
    title: "How Mortgage Rates Actually Work",
    summary:
      "Mortgage rates are driven by the bond market, not just the Fed. Your personal rate also depends on credit, down payment, loan type, and points. Timing the market is hard; structuring your loan well is in your control.",
    readingTime: "5 min",
    updated: "2026-05-01",
    eyebrow: "Rates",
    intro:
      "Rates feel mysterious, but the fundamentals are simple. Understanding them helps you focus on what you can control.",
    sections: [
      {
        heading: "What moves rates",
        body: [
          "Mortgage rates track mortgage-backed bond prices, which respond to inflation and economic data. The Fed influences the environment but doesn't set your rate directly.",
        ],
      },
      {
        heading: "What you control",
        body: [
          "Your credit, down payment, loan type, and whether you buy points all shape your personal rate. Structuring these well often matters more than trying to time the market.",
        ],
      },
    ],
    keyTakeaways: [
      "Rates follow the bond market, not just the Fed.",
      "Credit, down payment, and loan type shape your rate.",
      "Focus on structure, not perfect timing.",
    ],
    faqs: [
      {
        question: "Should I wait for rates to drop?",
        answer:
          "Timing is hard. A strong strategy — including the option to refinance later — usually beats waiting indefinitely. We help you plan for both.",
      },
      {
        question: "What are mortgage points?",
        answer:
          "Points are upfront fees to lower your rate. Whether they pay off depends on how long you keep the loan. We calculate your break-even.",
      },
    ],
    related: {
      articles: ["when-does-refinancing-make-sense", "understanding-credit-scores"],
      calculators: ["payment-planner", "refinancing-decision-tool"],
      landings: ["rate-and-term-refinance", "lower-payment"],
      funnels: ["refinance", "purchase"],
    },
    nextArticle: "when-does-refinancing-make-sense",
    seo: {
      title: "How Mortgage Rates Actually Work",
      description:
        "Understand what drives mortgage rates and what you can control, with Broadview Lending.",
    },
  },
  {
    slug: "using-home-equity-to-invest",
    category: "investing",
    title: "Using Home Equity to Invest",
    summary:
      "Home equity can fund a down payment on an investment property or other opportunities, often via a HELOC that preserves your low first-mortgage rate. The key is comparing expected return against the cost and risk of borrowing.",
    readingTime: "6 min",
    updated: "2026-05-01",
    eyebrow: "Investing",
    intro:
      "Your equity can be a tool for building wealth — used carefully and with a clear plan.",
    sections: [
      {
        heading: "Leverage, thoughtfully",
        body: [
          "A HELOC can fund a rental property down payment while keeping your current mortgage intact. Done well, the new asset's return can exceed the borrowing cost.",
        ],
      },
      {
        heading: "Mind the risk",
        body: [
          "Borrowing against your home adds risk. Reserves, conservative assumptions, and a clear exit plan keep the strategy sound.",
        ],
      },
    ],
    keyTakeaways: [
      "A HELOC can fund investment down payments.",
      "Compare expected return against borrowing cost.",
      "Protect yourself with reserves and conservative math.",
    ],
    faqs: [
      {
        question: "Can I use a HELOC to buy a rental property?",
        answer:
          "Yes — many investors use a HELOC for the down payment, then finance the rest. We help you weigh the cash flow and risk.",
      },
      {
        question: "Is investing with home equity risky?",
        answer:
          "It adds leverage, which amplifies both gains and risk. A conservative plan with reserves is essential. We talk through it honestly.",
      },
    ],
    related: {
      articles: ["heloc-vs-cash-out-refinance"],
      calculators: ["equity-access-planner", "cash-out-vs-heloc"],
      landings: ["cash-out-refinance"],
      funnels: ["heloc", "investment"],
    },
    nextArticle: "heloc-vs-cash-out-refinance",
    seo: {
      title: "Using Home Equity to Invest",
      description:
        "How to use home equity to invest in real estate — carefully and strategically — with Broadview Lending.",
    },
  },
];

export function getArticle(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(
  category: KnowledgeCategorySlug,
): KnowledgeArticle[] {
  return knowledgeArticles.filter((a) => a.category === category);
}

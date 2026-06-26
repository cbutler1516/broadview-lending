import type {
  AdvisorInsight,
  RelatedRefs,
  SeoMeta,
  StrategySnapshot,
} from "@/lib/content/types";

/**
 * Life Event framework. Mortgage strategy organized around the moments that
 * actually drive decisions. Each event connects to articles, calculators,
 * guides, comparisons, and funnels — never a dead end.
 */
export type LifeEvent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  /** The human situation, in plain language. */
  situation: string[];
  /** What's usually worth thinking about. */
  considerations: string[];
  advisorInsight: AdvisorInsight;
  snapshot: StrategySnapshot;
  related: RelatedRefs;
  seo: SeoMeta;
};

const compliance =
  "This is educational guidance only — not a loan approval, qualification, or commitment to lend.";

export const lifeEvents: LifeEvent[] = [
  {
    slug: "getting-married",
    title: "Getting Married",
    eyebrow: "Life Event",
    intro:
      "Combining lives often means combining finances — and sometimes homes. Here's how to think about it.",
    situation: [
      "You may be merging two incomes, two credit profiles, and possibly two properties.",
      "Maybe you're buying your first home together, or deciding what to do with a home one of you already owns.",
    ],
    considerations: [
      "How combined income and debt affect buying power",
      "Whether to keep, sell, or rent an existing home",
      "Whose credit profile to build the loan around",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether to use both of your profiles or build the loan around the stronger one.",
      more: "Sometimes using a single borrower's credit improves pricing, while adding a co-borrower increases qualifying income. There's no universal answer — it depends on your numbers and goals.",
    },
    snapshot: {
      whatWeLearned: [
        "You're aligning finances and possibly housing.",
        "Two profiles create more options — and more decisions.",
      ],
      strategies: [
        "Buying together using combined income",
        "Keeping one home as a rental and buying another",
      ],
      questions: [
        "Should the loan be built around one profile or both?",
        "Keep, sell, or rent an existing home?",
      ],
      thingsToVerify: ["Combined income and debts", "Both credit profiles"],
      commonMistakes: ["Assuming two borrowers is always better"],
      nextStep:
        "Talk through your combined picture with an advisor. " + compliance,
    },
    related: {
      articles: ["how-much-home-can-you-afford"],
      calculators: ["affordability-planner"],
      landings: ["first-time-homebuyer", "buying-your-next-home"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Getting Married: Mortgage Strategy",
      description:
        "How marriage affects buying power, existing homes, and mortgage strategy — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "growing-your-family",
    title: "Growing Your Family",
    eyebrow: "Life Event",
    intro:
      "More space, a better school district, or a home that fits the next chapter — and how to finance the move.",
    situation: [
      "You may be outgrowing your current home and weighing a move or a remodel.",
      "Cash flow matters more than ever with a growing family.",
    ],
    considerations: [
      "Remodeling versus moving",
      "Protecting monthly cash flow",
      "Using existing equity wisely",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether a remodel using equity beats the full cost of moving.",
      more: "A HELOC can fund an addition while preserving a low first-mortgage rate. Other times, the right move is simply a bigger home. We compare both honestly.",
    },
    snapshot: {
      whatWeLearned: [
        "Your space needs are changing.",
        "Cash flow and equity are both in play.",
      ],
      strategies: [
        "A remodel funded by home equity",
        "Moving up with a buy-before-sell plan",
      ],
      questions: [
        "Is remodeling cheaper than moving for your goal?",
        "How would either option affect your monthly budget?",
      ],
      thingsToVerify: ["Equity available", "Budget comfort", "Timeline"],
      commonMistakes: ["Moving when a remodel would have served the goal"],
      nextStep: "Compare remodel vs move with an advisor. " + compliance,
    },
    related: {
      guides: ["should-i-buy-before-selling"],
      comparisons: ["buy-before-sell-vs-sell-first"],
      calculators: ["cash-out-vs-heloc"],
      landings: ["buying-your-next-home"],
      funnels: ["purchase", "heloc"],
    },
    seo: {
      title: "Growing Your Family: Mortgage Strategy",
      description:
        "Remodel or move? How to finance a growing family's home needs — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "divorce",
    title: "Divorce",
    eyebrow: "Life Event",
    intro:
      "A difficult transition that often involves the home. Clarity and patience matter as much as the numbers.",
    situation: [
      "You may need to remove a spouse from the mortgage or fund an equity buyout.",
      "Qualifying on a single income changes the picture.",
    ],
    considerations: [
      "Removing a co-borrower's liability",
      "Funding an equity buyout",
      "Qualifying on your own",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether refinancing into your own name aligns with the settlement timeline.",
      more: "A cash-out refinance can fund a buyout, but qualification on one income needs review. We handle these conversations with discretion and care.",
    },
    snapshot: {
      whatWeLearned: [
        "The home and the loan likely need to be separated.",
        "Single-income qualification matters now.",
      ],
      strategies: [
        "Refinancing to remove a co-borrower",
        "A cash-out refinance to fund a buyout",
      ],
      questions: [
        "What does the settlement require for the home?",
        "Can the loan work on one income?",
      ],
      thingsToVerify: ["Income and credit", "Equity and buyout amount"],
      commonMistakes: ["Delaying until the timeline forces a rushed decision"],
      nextStep:
        "Plan the refinance calmly with an advisor. " + compliance,
    },
    related: {
      articles: ["when-does-refinancing-make-sense"],
      landings: ["divorce-refinance", "cash-out-refinance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Divorce: Mortgage & Refinance Strategy",
      description:
        "Removing a spouse from a mortgage and funding an equity buyout — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "retirement",
    title: "Approaching Retirement",
    eyebrow: "Life Event",
    intro:
      "Your mortgage strategy can support cash flow, flexibility, and peace of mind in retirement.",
    situation: [
      "You may be focused on lowering payments, accessing equity, or paying off your home.",
      "Fixed income changes how you weigh tradeoffs.",
    ],
    considerations: [
      "Lowering monthly obligations",
      "Accessing equity for flexibility",
      "Balancing payoff against liquidity",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether keeping accessible equity matters more than being mortgage-free.",
      more: "Paying off a home feels great, but liquidity has value in retirement. The right balance is personal, and worth talking through.",
    },
    snapshot: {
      whatWeLearned: [
        "Cash flow and flexibility are priorities.",
        "Equity strategy can support retirement goals.",
      ],
      strategies: [
        "Lowering the payment to ease cash flow",
        "Keeping equity accessible for flexibility",
      ],
      questions: [
        "Is being mortgage-free or keeping liquidity more important?",
        "How stable is your retirement income?",
      ],
      thingsToVerify: ["Income sources", "Equity position", "Reserves"],
      commonMistakes: ["Using all liquidity to pay off the home"],
      nextStep:
        "Discuss a retirement-aligned strategy with an advisor. " + compliance,
    },
    related: {
      articles: ["heloc-vs-cash-out-refinance"],
      calculators: ["cash-out-vs-heloc"],
      landings: ["lower-payment"],
      funnels: ["refinance", "heloc"],
    },
    seo: {
      title: "Retirement: Mortgage & Equity Strategy",
      description:
        "How to align your mortgage with retirement cash flow and flexibility — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "relocation",
    title: "Relocating",
    eyebrow: "Life Event",
    intro:
      "A new city or job often means buying and selling at once. Coordination is everything.",
    situation: [
      "You may be selling in one market and buying in another, possibly on a tight timeline.",
      "Income or job changes can affect the plan.",
    ],
    considerations: [
      "Timing the sale and purchase",
      "Carrying costs during the transition",
      "How a new job affects qualification",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether to buy before selling given your timeline and reserves.",
      more: "Relocations reward planning. A bridge strategy or rent-back can smooth the gap so you're not forced into a rushed decision.",
    },
    snapshot: {
      whatWeLearned: [
        "You're managing a sale and a purchase together.",
        "Timeline and reserves shape the plan.",
      ],
      strategies: [
        "Buy-before-sell with a bridge plan",
        "Sell-first with temporary housing",
      ],
      questions: [
        "How firm is your timeline?",
        "How does a new job affect qualification?",
      ],
      thingsToVerify: ["Income stability", "Equity and reserves"],
      commonMistakes: ["Underestimating overlap and moving costs"],
      nextStep: "Map the relocation sequence with an advisor. " + compliance,
    },
    related: {
      guides: ["should-i-buy-before-selling"],
      comparisons: ["buy-before-sell-vs-sell-first"],
      landings: ["buying-your-next-home"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Relocating: Mortgage Strategy",
      description:
        "Coordinating a sale and purchase during relocation — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "buying-an-investment-property",
    title: "Buying an Investment Property",
    eyebrow: "Life Event",
    intro:
      "Building wealth through real estate starts with the right financing strategy.",
    situation: [
      "You may be using savings or home equity to fund a down payment on a rental.",
      "Cash flow and leverage both matter.",
    ],
    considerations: [
      "Funding the down payment",
      "Weighing leverage against risk",
      "How rental income factors in",
    ],
    advisorInsight: {
      body: "In situations like this, one of the first things we'd discuss is whether a HELOC on your primary home funds the down payment while preserving your rate.",
      more: "Leverage amplifies both returns and risk. Conservative assumptions and reserves keep an investment strategy sound.",
    },
    snapshot: {
      whatWeLearned: [
        "You're considering real estate to build wealth.",
        "Equity and leverage are part of the plan.",
      ],
      strategies: [
        "A HELOC to fund the down payment",
        "Conventional investment-property financing",
      ],
      questions: [
        "What return are you underwriting, conservatively?",
        "What reserves will you keep?",
      ],
      thingsToVerify: ["Equity available", "Reserves", "Property cash flow"],
      commonMistakes: ["Over-leveraging without a cushion"],
      nextStep:
        "Build an investment financing plan with an advisor. " + compliance,
    },
    related: {
      articles: ["using-home-equity-to-invest"],
      calculators: ["cash-out-vs-heloc"],
      landings: ["cash-out-refinance"],
      funnels: ["heloc"],
    },
    seo: {
      title: "Buying an Investment Property: Strategy",
      description:
        "How to finance an investment property using savings or home equity — educational guidance from Broadview Lending.",
    },
  },
];

export function getLifeEvent(slug: string): LifeEvent | undefined {
  return lifeEvents.find((e) => e.slug === slug);
}

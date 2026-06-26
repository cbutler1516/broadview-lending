import type {
  RelatedRefs,
  SeoMeta,
  StrategySnapshot,
} from "@/lib/content/types";

/**
 * Interactive Decision Guides. Each guide asks a few thoughtful questions, then
 * produces EDUCATIONAL guidance — never a qualification or approval. Guidance is
 * tier-based (data only, no functions) so it serializes cleanly and the logic is
 * transparent and compliant.
 */
export type GuideOption = {
  label: string;
  /** Relative signal toward "worth discussing now". */
  weight: number;
};

export type GuideQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  options: GuideOption[];
};

export type GuideTier = "strong" | "mixed" | "light";

export type GuideGuidance = {
  headline: string;
  summary: string;
  snapshot: StrategySnapshot;
};

export type DecisionGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  question: string;
  questions: GuideQuestion[];
  guidance: Record<GuideTier, GuideGuidance>;
  related: RelatedRefs;
  seo: SeoMeta;
};

/** Compute a 0–1 ratio and tier from selected option indexes. */
export function evaluateGuide(
  guide: DecisionGuide,
  answers: Record<string, number>,
): GuideTier {
  let score = 0;
  let max = 0;
  for (const q of guide.questions) {
    const weights = q.options.map((o) => o.weight);
    max += Math.max(...weights);
    const idx = answers[q.id];
    if (idx != null && q.options[idx]) score += q.options[idx].weight;
  }
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.66) return "strong";
  if (ratio >= 0.4) return "mixed";
  return "light";
}

const compliance =
  "This is educational guidance only — not a loan approval, qualification, or commitment to lend.";

export const decisionGuides: DecisionGuide[] = [
  {
    slug: "would-a-heloc-fit",
    title: "Would a HELOC potentially fit?",
    eyebrow: "Decision Guide",
    intro:
      "A few quick questions to help you understand whether a home equity line of credit is worth discussing — not whether you qualify.",
    question: "Is a HELOC worth a conversation for your situation?",
    questions: [
      {
        id: "rate",
        prompt: "How does your current mortgage rate compare to today's rates?",
        options: [
          { label: "Much lower than today", weight: 3 },
          { label: "About the same", weight: 1 },
          { label: "Higher than today", weight: 0 },
          { label: "Not sure", weight: 1 },
        ],
      },
      {
        id: "need",
        prompt: "How would you use the funds?",
        options: [
          { label: "Ongoing / phased (remodel, tuition)", weight: 3 },
          { label: "One-time lump sum", weight: 1 },
          { label: "Just exploring", weight: 1 },
        ],
      },
      {
        id: "equity",
        prompt: "Roughly how much equity do you have?",
        options: [
          { label: "More than 30%", weight: 3 },
          { label: "20–30%", weight: 2 },
          { label: "Less than 20%", weight: 0 },
          { label: "Not sure", weight: 1 },
        ],
      },
    ],
    guidance: {
      strong: {
        headline: "A HELOC looks worth discussing.",
        summary:
          "Keeping a low first mortgage while accessing equity flexibly is exactly where a HELOC tends to shine. The next step is a conversation to confirm the details.",
        snapshot: {
          whatWeLearned: [
            "You likely have a rate worth protecting.",
            "Your use case favors flexible, as-needed access.",
            "You appear to have meaningful equity to work with.",
          ],
          strategies: [
            "A HELOC that preserves your current first mortgage",
            "Comparing a HELOC against a fixed home equity loan",
          ],
          questions: [
            "How much access do you actually need, and over what period?",
            "Are you comfortable with a variable rate?",
            "What's your plan to pay it back down?",
          ],
          thingsToVerify: [
            "Current home value and lien position",
            "Combined loan-to-value limits",
            "Income and reserves",
          ],
          commonMistakes: [
            "Drawing more than the goal requires",
            "Ignoring variable-rate movement",
          ],
          nextStep:
            "Talk it through with an advisor to confirm the right structure. " +
            compliance,
        },
      },
      mixed: {
        headline: "A HELOC might fit — it depends.",
        summary:
          "There are reasons it could work and reasons to look closer. A short conversation will clarify whether a HELOC or an alternative fits better.",
        snapshot: {
          whatWeLearned: [
            "Parts of your situation favor a HELOC, others are less clear.",
            "The right answer depends on details worth reviewing together.",
          ],
          strategies: [
            "A HELOC vs a cash-out refinance comparison",
            "A fixed home equity loan if you prefer predictability",
          ],
          questions: [
            "Is preserving your current rate a priority?",
            "Do you prefer flexible access or a fixed payment?",
          ],
          thingsToVerify: ["Available equity", "Goal timeline", "Budget comfort"],
          commonMistakes: [
            "Choosing a product before clarifying the goal",
            "Overlooking total long-term cost",
          ],
          nextStep:
            "Compare your options with an advisor before deciding. " + compliance,
        },
      },
      light: {
        headline: "A HELOC may not be the first thing to explore.",
        summary:
          "Based on your answers, other paths might serve you better right now. That said, equity strategy is personal and worth a brief conversation.",
        snapshot: {
          whatWeLearned: [
            "A few signals suggest a HELOC isn't the obvious fit today.",
            "Other strategies may align better with your goal.",
          ],
          strategies: [
            "Reviewing whether equity access is the right tool at all",
            "Exploring a cash-out refinance or other options",
          ],
          questions: [
            "What is the underlying goal you're solving for?",
            "Is timing flexible?",
          ],
          thingsToVerify: ["Equity position", "Overall objective"],
          commonMistakes: ["Forcing a product to fit a goal"],
          nextStep:
            "A short conversation can point you to the best path. " + compliance,
        },
      },
    },
    related: {
      comparisons: ["heloc-vs-cash-out"],
      calculators: ["cash-out-vs-heloc"],
      articles: ["heloc-vs-cash-out-refinance"],
      funnels: ["heloc"],
    },
    seo: {
      title: "Would a HELOC Fit? Interactive Guide",
      description:
        "Answer a few questions to understand whether a HELOC is worth discussing — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "would-refinancing-make-sense",
    title: "Would refinancing make sense?",
    eyebrow: "Decision Guide",
    intro:
      "A quick way to understand whether a refinance conversation is worthwhile — focused on clarity, not qualification.",
    question: "Is refinancing worth exploring for you?",
    questions: [
      {
        id: "gap",
        prompt: "How does your rate compare to today's rates?",
        options: [
          { label: "Mine is much higher", weight: 3 },
          { label: "Slightly higher", weight: 2 },
          { label: "About the same or lower", weight: 0 },
          { label: "Not sure", weight: 1 },
        ],
      },
      {
        id: "stay",
        prompt: "How long do you plan to keep the home?",
        options: [
          { label: "Many years", weight: 3 },
          { label: "A few years", weight: 1 },
          { label: "Might sell soon", weight: 0 },
        ],
      },
      {
        id: "goal",
        prompt: "What's the main goal?",
        options: [
          { label: "Lower payment", weight: 2 },
          { label: "Pay off faster", weight: 2 },
          { label: "Access cash", weight: 2 },
          { label: "Remove mortgage insurance", weight: 2 },
        ],
      },
    ],
    guidance: {
      strong: {
        headline: "Refinancing looks worth a closer look.",
        summary:
          "With a meaningful rate gap and time to recover costs, the math may work in your favor. A break-even review will confirm it.",
        snapshot: {
          whatWeLearned: [
            "There appears to be room between your rate and today's.",
            "You plan to stay long enough to recover costs.",
          ],
          strategies: [
            "A rate-and-term refinance to lower your payment or term",
            "A cash-out refinance if accessing equity is the goal",
          ],
          questions: [
            "What's your true break-even after costs?",
            "Do you want a lower payment or a faster payoff?",
          ],
          thingsToVerify: ["Current rate and balance", "Closing costs", "Home value"],
          commonMistakes: [
            "Chasing a rate without checking break-even",
            "Resetting to a new 30-year term without intention",
          ],
          nextStep:
            "Run the break-even with an advisor before deciding. " + compliance,
        },
      },
      mixed: {
        headline: "Refinancing might make sense — let's check the math.",
        summary:
          "Some signals favor it, but break-even and your timeline will decide. A short review makes it clear.",
        snapshot: {
          whatWeLearned: [
            "The rate gap or timeline is borderline.",
            "Break-even analysis will tell the real story.",
          ],
          strategies: [
            "A break-even-focused rate-and-term review",
            "Comparing keeping your loan vs refinancing",
          ],
          questions: ["How long will you stay?", "What costs are involved?"],
          thingsToVerify: ["Break-even point", "Rate options"],
          commonMistakes: ["Ignoring how long you'll keep the loan"],
          nextStep: "Confirm break-even with an advisor. " + compliance,
        },
      },
      light: {
        headline: "Refinancing may not be urgent right now.",
        summary:
          "Your answers suggest the timing or savings may not favor a refinance today — but goals change, and it's worth revisiting.",
        snapshot: {
          whatWeLearned: [
            "The rate gap or your timeline doesn't strongly favor it now.",
          ],
          strategies: [
            "Revisiting if rates move or your plans change",
            "Focusing on other goals first",
          ],
          questions: ["Has your goal changed recently?", "Is timing flexible?"],
          thingsToVerify: ["Current terms", "Future plans"],
          commonMistakes: ["Refinancing out of habit rather than math"],
          nextStep:
            "Keep it on your radar and revisit with an advisor later. " +
            compliance,
        },
      },
    },
    related: {
      calculators: ["cash-out-vs-heloc"],
      articles: ["when-does-refinancing-make-sense"],
      landings: ["lower-payment", "cash-out-refinance"],
      funnels: ["refinance"],
    },
    seo: {
      title: "Would Refinancing Make Sense? Interactive Guide",
      description:
        "Answer a few questions to see whether refinancing is worth exploring — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "should-i-buy-before-selling",
    title: "Should I buy before selling?",
    eyebrow: "Decision Guide",
    intro:
      "Moving up or relocating? This guide helps you think through the order of operations.",
    question: "Should you buy your next home before selling your current one?",
    questions: [
      {
        id: "reserves",
        prompt: "Could you briefly handle two payments if needed?",
        options: [
          { label: "Comfortably", weight: 3 },
          { label: "For a short time", weight: 2 },
          { label: "Not really", weight: 0 },
        ],
      },
      {
        id: "equity",
        prompt: "How much equity is in your current home?",
        options: [
          { label: "A lot", weight: 3 },
          { label: "Some", weight: 2 },
          { label: "Little", weight: 0 },
        ],
      },
      {
        id: "market",
        prompt: "How competitive is the market you're buying in?",
        options: [
          { label: "Very competitive", weight: 3 },
          { label: "Balanced", weight: 1 },
          { label: "Slow", weight: 0 },
        ],
      },
    ],
    guidance: {
      strong: {
        headline: "Buying first may be worth planning.",
        summary:
          "With reserves, equity, and a competitive target market, buying before selling could spare you a double move. The key is the bridge plan.",
        snapshot: {
          whatWeLearned: [
            "You appear positioned to handle a short overlap.",
            "Your equity could help fund the next down payment.",
          ],
          strategies: [
            "A bridge strategy or HELOC on your current home",
            "A contingent vs non-contingent offer plan",
          ],
          questions: [
            "How long could you carry both comfortably?",
            "How will you fund the new down payment before the sale closes?",
          ],
          thingsToVerify: ["Equity and reserves", "Timeline", "Carrying costs"],
          commonMistakes: [
            "Underestimating overlap costs",
            "Skipping a backup plan if the sale lags",
          ],
          nextStep:
            "Map the sequence with an advisor before you shop. " + compliance,
        },
      },
      mixed: {
        headline: "It could go either way — let's plan it.",
        summary:
          "Buying first is possible but depends on your bridge plan and comfort with overlap. A short conversation will clarify the safest path.",
        snapshot: {
          whatWeLearned: ["Some pieces fit; the bridge plan is the question."],
          strategies: ["Buy-before-sell vs sell-first comparison", "Bridge options"],
          questions: ["What's your comfort with carrying two payments?"],
          thingsToVerify: ["Equity access", "Cash flow"],
          commonMistakes: ["Committing before the financing plan is set"],
          nextStep: "Compare both paths with an advisor. " + compliance,
        },
      },
      light: {
        headline: "Selling first may be the calmer path.",
        summary:
          "Your answers suggest selling first could reduce risk. Temporary housing has tradeoffs, but the financial footing is steadier.",
        snapshot: {
          whatWeLearned: ["Carrying two payments may strain things right now."],
          strategies: [
            "Selling first with a rent-back or short-term housing plan",
            "Revisiting buy-first if your position changes",
          ],
          questions: ["Could a rent-back bridge the gap?"],
          thingsToVerify: ["Sale timeline", "Housing options"],
          commonMistakes: ["Overextending to avoid one extra move"],
          nextStep: "Talk through a sell-first plan with an advisor. " + compliance,
        },
      },
    },
    related: {
      articles: ["buy-before-you-sell"],
      comparisons: ["buy-before-sell-vs-sell-first"],
      landings: ["buying-your-next-home"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Should I Buy Before Selling? Interactive Guide",
      description:
        "Think through whether to buy before selling your current home — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "should-i-put-more-money-down",
    title: "Should I put more money down?",
    eyebrow: "Decision Guide",
    intro:
      "More down isn't always better. This guide helps you weigh payment, reserves, and flexibility.",
    question: "Is a larger down payment the right move for you?",
    questions: [
      {
        id: "reserves",
        prompt: "After buying, how strong would your savings be?",
        options: [
          { label: "Very strong", weight: 3 },
          { label: "Adequate", weight: 2 },
          { label: "Thin", weight: 0 },
        ],
      },
      {
        id: "priority",
        prompt: "What matters more to you?",
        options: [
          { label: "Lowest monthly payment", weight: 3 },
          { label: "Keeping cash available", weight: 0 },
          { label: "Not sure", weight: 1 },
        ],
      },
      {
        id: "mi",
        prompt: "How do you feel about mortgage insurance?",
        options: [
          { label: "Want to avoid it", weight: 3 },
          { label: "Fine if it preserves cash", weight: 0 },
          { label: "Not sure", weight: 1 },
        ],
      },
    ],
    guidance: {
      strong: {
        headline: "A larger down payment may align with your goals.",
        summary:
          "If you'll keep strong reserves and want the lowest payment without mortgage insurance, more down can make sense.",
        snapshot: {
          whatWeLearned: [
            "You'd retain healthy reserves after a larger down payment.",
            "You prefer a lower payment and avoiding mortgage insurance.",
          ],
          strategies: [
            "20% down to avoid mortgage insurance",
            "Comparing 10–20% scenarios on total cost",
          ],
          questions: [
            "What reserve cushion do you want to keep?",
            "Is the payment savings worth the extra cash?",
          ],
          thingsToVerify: ["Reserve targets", "Payment scenarios"],
          commonMistakes: ["Draining savings to hit 20%"],
          nextStep:
            "Compare down payment scenarios with an advisor. " + compliance,
        },
      },
      mixed: {
        headline: "It depends on your reserves and goals.",
        summary:
          "There's a balance between a lower payment and keeping cash available. A quick comparison clarifies the tradeoff.",
        snapshot: {
          whatWeLearned: ["Your priorities pull in different directions."],
          strategies: ["A side-by-side of 5% vs 20% down", "Reserve-first planning"],
          questions: ["How much cushion do you need to feel secure?"],
          thingsToVerify: ["Budget", "Reserves"],
          commonMistakes: ["Optimizing payment while ignoring reserves"],
          nextStep: "Weigh the scenarios with an advisor. " + compliance,
        },
      },
      light: {
        headline: "Keeping more cash may serve you better.",
        summary:
          "Your answers lean toward preserving liquidity. A smaller down payment with mortgage insurance you can remove later may fit.",
        snapshot: {
          whatWeLearned: ["Flexibility and reserves appear to be the priority."],
          strategies: [
            "A lower down payment with a plan to remove mortgage insurance",
            "Keeping reserves for stability",
          ],
          questions: ["Would you rather keep cash invested or available?"],
          thingsToVerify: ["Mortgage insurance removal path"],
          commonMistakes: ["Over-committing cash to the down payment"],
          nextStep: "Explore low down payment paths with an advisor. " + compliance,
        },
      },
    },
    related: {
      articles: ["understanding-down-payments", "mortgage-insurance-explained"],
      comparisons: ["five-vs-twenty-down"],
      landings: ["low-down-payment"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Should I Put More Money Down? Interactive Guide",
      description:
        "Weigh a larger down payment against keeping cash available — educational guidance from Broadview Lending.",
    },
  },
  {
    slug: "fha-or-conventional",
    title: "Could FHA or Conventional be the better discussion?",
    eyebrow: "Decision Guide",
    intro:
      "A quick way to frame the FHA vs conventional conversation around your situation.",
    question: "Which loan type is worth discussing first for you?",
    questions: [
      {
        id: "credit",
        prompt: "How would you describe your credit?",
        options: [
          { label: "Strong", weight: 3 },
          { label: "Fair", weight: 1 },
          { label: "Rebuilding", weight: 0 },
        ],
      },
      {
        id: "down",
        prompt: "How much can you put down?",
        options: [
          { label: "10%+", weight: 3 },
          { label: "3–5%", weight: 1 },
          { label: "Minimum possible", weight: 0 },
        ],
      },
      {
        id: "mi",
        prompt: "How important is removing mortgage insurance later?",
        options: [
          { label: "Very important", weight: 3 },
          { label: "Somewhat", weight: 1 },
          { label: "Not a priority", weight: 0 },
        ],
      },
    ],
    guidance: {
      strong: {
        headline: "Conventional is likely worth discussing first.",
        summary:
          "Strong credit and the ability to remove mortgage insurance often make conventional the better long-term conversation — though FHA is still worth comparing.",
        snapshot: {
          whatWeLearned: [
            "Your credit and down payment may favor conventional pricing.",
            "Removing mortgage insurance later matters to you.",
          ],
          strategies: [
            "Conventional with a plan to drop mortgage insurance",
            "Comparing FHA vs conventional total cost",
          ],
          questions: [
            "How does pricing compare at your credit tier?",
            "When could mortgage insurance come off?",
          ],
          thingsToVerify: ["Credit details", "Down payment", "Property type"],
          commonMistakes: ["Assuming one type is always cheaper"],
          nextStep:
            "Compare both with an advisor using your real numbers. " + compliance,
        },
      },
      mixed: {
        headline: "Both are worth comparing.",
        summary:
          "Your profile could go either way. The right answer comes from comparing real pricing and the long-term cost of mortgage insurance.",
        snapshot: {
          whatWeLearned: ["Either path could fit depending on the details."],
          strategies: ["A true side-by-side of FHA vs conventional"],
          questions: ["What's the all-in cost of each over time?"],
          thingsToVerify: ["Credit", "Down payment"],
          commonMistakes: ["Choosing before comparing total cost"],
          nextStep: "Run a comparison with an advisor. " + compliance,
        },
      },
      light: {
        headline: "FHA may be the more accessible starting point.",
        summary:
          "FHA's flexibility can open the door now, with conventional as a future refinance target once equity and credit grow.",
        snapshot: {
          whatWeLearned: ["Flexibility may matter more than long-term pricing today."],
          strategies: [
            "FHA now with a refinance-to-conventional plan later",
            "Steps to strengthen credit over time",
          ],
          questions: ["What would it take to refinance out of FHA later?"],
          thingsToVerify: ["FHA guidelines fit", "Credit-building path"],
          commonMistakes: ["Treating FHA as permanent rather than a stepping stone"],
          nextStep:
            "Map an FHA-now, options-later plan with an advisor. " + compliance,
        },
      },
    },
    related: {
      articles: ["fha-vs-conventional"],
      comparisons: ["conventional-vs-fha"],
      landings: ["fha-loans", "conventional-loans"],
      funnels: ["fha", "purchase"],
    },
    seo: {
      title: "FHA or Conventional? Interactive Guide",
      description:
        "Frame the FHA vs conventional conversation around your situation — educational guidance from Broadview Lending.",
    },
  },
];

export function getGuide(slug: string): DecisionGuide | undefined {
  return decisionGuides.find((g) => g.slug === slug);
}

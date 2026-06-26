import type { FunnelDefinition, FunnelQuestion } from "./types";

const creditScoreOptions = [
  { value: "740+", label: "740 or higher" },
  { value: "700-739", label: "700 – 739" },
  { value: "660-699", label: "660 – 699" },
  { value: "580-659", label: "580 – 659" },
  { value: "below-580", label: "Below 580" },
  { value: "unsure", label: "Not sure" },
];

const timelineOptions = [
  { value: "0-30-days", label: "Within 30 days" },
  { value: "1-3-months", label: "1 – 3 months" },
  { value: "3-6-months", label: "3 – 6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "exploring", label: "Just exploring" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const purchaseQuestions: FunnelQuestion[] = [
  {
    id: "purchasePrice",
    label: "What purchase price are you targeting?",
    type: "currency",
    required: true,
  },
  {
    id: "downPayment",
    label: "How much do you plan to put down?",
    type: "currency",
    required: true,
  },
  {
    id: "creditScore",
    label: "What's your estimated credit score range?",
    type: "single-select",
    options: creditScoreOptions,
    required: true,
  },
  {
    id: "firstTimeHomebuyer",
    label: "Are you a first-time homebuyer?",
    type: "single-select",
    options: yesNoOptions,
    required: true,
  },
  {
    id: "veteran",
    label: "Are you a veteran or active military?",
    type: "single-select",
    options: yesNoOptions,
    required: true,
  },
  {
    id: "workingWithRealtor",
    label: "Are you working with a Realtor?",
    type: "single-select",
    options: [
      { value: "yes", label: "Yes, I have one" },
      { value: "no", label: "No, I need one" },
      { value: "looking", label: "Still looking" },
    ],
    required: true,
  },
  {
    id: "timeline",
    label: "When are you hoping to buy?",
    type: "single-select",
    options: timelineOptions,
    required: true,
  },
];

const refinanceQuestions: FunnelQuestion[] = [
  {
    id: "currentBalance",
    label: "What's your current loan balance?",
    type: "currency",
    required: true,
  },
  {
    id: "homeValue",
    label: "What's your estimated home value?",
    type: "currency",
    required: true,
  },
  {
    id: "currentRate",
    label: "What's your current interest rate?",
    type: "percentage",
    required: true,
  },
  {
    id: "refinanceGoal",
    label: "What's your primary goal?",
    type: "single-select",
    options: [
      { value: "lower-payment", label: "Lower my payment" },
      { value: "cash-out", label: "Access cash from equity" },
      { value: "shorten-term", label: "Pay off my loan faster" },
      { value: "remove-pmi", label: "Remove PMI" },
    ],
    required: true,
  },
  {
    id: "creditScore",
    label: "What's your estimated credit score range?",
    type: "single-select",
    options: creditScoreOptions,
    required: true,
  },
  {
    id: "propertyType",
    label: "What type of property is this?",
    type: "single-select",
    options: [
      { value: "primary", label: "Primary residence" },
      { value: "second-home", label: "Second home" },
      { value: "investment", label: "Investment property" },
    ],
    required: true,
  },
];

const helocQuestions: FunnelQuestion[] = [
  {
    id: "equityGoal",
    label: "What are you hoping to accomplish?",
    description:
      "Start with the reason. Your answers help us prepare for a useful advisor conversation.",
    type: "single-select",
    options: [
      { value: "remodel-home", label: "Remodel my home" },
      { value: "consolidate-debt", label: "Consolidate debt" },
      { value: "buy-another-home", label: "Buy another home" },
      { value: "purchase-investment-property", label: "Purchase an investment property" },
      { value: "increase-cash-flow", label: "Increase monthly cash flow" },
      { value: "business-opportunity", label: "Fund a business opportunity" },
      { value: "education", label: "Pay for education" },
      { value: "build-adu", label: "Build an ADU" },
      { value: "emergency-funds", label: "Access emergency funds" },
      { value: "not-sure", label: "I'm not sure yet" },
    ],
    required: false,
  },
  {
    id: "goalDetail",
    label: "What kind of project are you thinking about?",
    type: "single-select",
    options: [
      { value: "kitchen-bath", label: "Kitchen, bath, or interior remodel" },
      { value: "addition-adu", label: "Addition, ADU, or major construction" },
      { value: "repairs-upgrades", label: "Repairs, systems, or energy upgrades" },
      { value: "still-planning", label: "Still planning the scope" },
    ],
    required: false,
    condition: (a) => a.equityGoal === "remodel-home" || a.equityGoal === "build-adu",
  },
  {
    id: "goalDetail",
    label: "What would you like to feel different after consolidation?",
    type: "single-select",
    options: [
      { value: "lower-monthly-payments", label: "Lower monthly payments" },
      { value: "fewer-payments", label: "Fewer payments to manage" },
      { value: "pay-down-faster", label: "A clearer payoff strategy" },
      { value: "understand-options", label: "I want to understand my options" },
    ],
    required: false,
    condition: (a) =>
      a.equityGoal === "consolidate-debt" ||
      a.equityGoal === "increase-cash-flow",
  },
  {
    id: "goalDetail",
    label: "What kind of property goal are you exploring?",
    type: "single-select",
    options: [
      { value: "move-up-home", label: "Move-up primary home" },
      { value: "second-home", label: "Second home" },
      { value: "rental-property", label: "Rental property" },
      { value: "portfolio-growth", label: "Portfolio growth" },
    ],
    required: false,
    condition: (a) =>
      a.equityGoal === "buy-another-home" ||
      a.equityGoal === "purchase-investment-property",
  },
  {
    id: "goalDetail",
    label: "How would access to equity support you?",
    type: "single-select",
    options: [
      { value: "flexibility", label: "More financial flexibility" },
      { value: "safety-net", label: "A safety net for unexpected costs" },
      { value: "business-growth", label: "A business or career opportunity" },
      { value: "education-planning", label: "Education or family planning" },
      { value: "advisor-guidance", label: "I need help thinking it through" },
    ],
    required: false,
    condition: (a) =>
      a.equityGoal === "business-opportunity" ||
      a.equityGoal === "education" ||
      a.equityGoal === "emergency-funds" ||
      a.equityGoal === "not-sure",
  },
  {
    id: "estimatedPropertyValue",
    label: "If you know it, what's the rough home value?",
    description:
      "A rough estimate is fine. Your advisor can review details with you later.",
    type: "currency",
    required: false,
  },
  {
    id: "mortgageBalance",
    label: "About how much is still owed on the home?",
    type: "currency",
    required: false,
  },
  {
    id: "desiredEquityAmount",
    label: "How much equity would you like to access?",
    type: "currency",
    required: false,
  },
  {
    id: "creditScore",
    label: "How would you describe your credit profile?",
    type: "single-select",
    options: creditScoreOptions,
    required: false,
  },
  {
    id: "occupancy",
    label: "How do you use this property?",
    description:
      "Most Home Equity Solutions start with a primary residence, but we can also review investment and rental-property goals.",
    type: "single-select",
    options: [
      { value: "owner-occupied", label: "Primary residence / owner-occupied" },
      { value: "second-home", label: "Second home" },
      { value: "investment", label: "Investment or rental property" },
    ],
    required: false,
  },
  {
    id: "propertyType",
    label: "What type of property is this?",
    type: "single-select",
    options: [
      { value: "single-family", label: "Single-family home" },
      { value: "condo", label: "Condo / Townhome" },
      { value: "multi-unit", label: "Multi-unit (2-4 units)" },
    ],
    required: false,
  },
  {
    id: "timeline",
    label: "When would you ideally like access to your equity?",
    type: "single-select",
    options: timelineOptions,
    required: false,
  },
  {
    id: "advisorNotes",
    label: "Anything else you'd like your advisor to know?",
    description:
      "Share any context that would make the conversation more useful.",
    type: "text",
    required: false,
  },
];

const vaQuestions: FunnelQuestion[] = [
  {
    id: "militaryStatus",
    label: "What's your military status?",
    type: "single-select",
    options: [
      { value: "active", label: "Active duty" },
      { value: "veteran", label: "Veteran" },
      { value: "reserve", label: "Reserve / National Guard" },
      { value: "surviving-spouse", label: "Surviving spouse" },
    ],
    required: true,
  },
  {
    id: "firstUseVa",
    label: "Is this your first use of VA benefits?",
    type: "single-select",
    options: yesNoOptions,
    required: true,
  },
  {
    id: "purchaseOrRefinance",
    label: "Are you buying or refinancing?",
    type: "single-select",
    options: [
      { value: "purchase", label: "Purchase a home" },
      { value: "refinance", label: "Refinance my VA loan" },
    ],
    required: true,
  },
  {
    id: "purchasePrice",
    label: "What purchase price are you targeting?",
    type: "currency",
    required: true,
    condition: (a) => a.purchaseOrRefinance === "purchase",
  },
  {
    id: "creditScore",
    label: "What's your estimated credit score range?",
    type: "single-select",
    options: creditScoreOptions,
    required: true,
  },
  {
    id: "timeline",
    label: "When are you hoping to move forward?",
    type: "single-select",
    options: timelineOptions,
    required: true,
  },
];

const fhaQuestions: FunnelQuestion[] = [
  {
    id: "purchasePrice",
    label: "What purchase price are you targeting?",
    type: "currency",
    required: true,
  },
  {
    id: "downPayment",
    label: "How much do you plan to put down?",
    type: "currency",
    required: true,
  },
  {
    id: "creditScore",
    label: "What's your estimated credit score range?",
    type: "single-select",
    options: creditScoreOptions,
    required: true,
  },
  {
    id: "timeline",
    label: "When are you hoping to buy?",
    type: "single-select",
    options: timelineOptions,
    required: true,
  },
];

export const funnelDefinitions: FunnelDefinition[] = [
  {
    type: "purchase",
    title: "Buy a Home",
    subtitle:
      "See which purchase programs may fit your price range, down payment, and timeline.",
    icon: "🏠",
    href: "/funnel/purchase",
    questions: purchaseQuestions,
  },
  {
    type: "refinance",
    title: "Refinance",
    subtitle:
      "Explore whether a lower rate, shorter term, or cash-out strategy may make sense.",
    icon: "📉",
    href: "/funnel/refinance",
    questions: refinanceQuestions,
  },
  {
    type: "heloc",
    title: "Home Equity Solutions",
    subtitle:
      "Check potential HELOC and home equity paths with a real advisor by your side.",
    icon: "💰",
    href: "/heloc",
    questions: helocQuestions,
  },
  {
    type: "va",
    title: "VA Loan",
    subtitle:
      "Review potential VA purchase or refinance paths for eligible veterans and service members.",
    icon: "🎖️",
    href: "/funnel/va",
    questions: vaQuestions,
  },
  {
    type: "first-time-homebuyer",
    title: "First-Time Homebuyer",
    subtitle:
      "Explore FHA and first-time buyer programs with flexible down payment options.",
    icon: "🔑",
    href: "/funnel/fha",
    questions: fhaQuestions,
  },
  {
    type: "fha",
    title: "FHA Loan",
    subtitle:
      "Check whether FHA financing and down payment assistance may fit your profile.",
    icon: "🏡",
    href: "/funnel/fha",
    questions: fhaQuestions,
  },
  {
    type: "investment",
    title: "Second Home / Non-Owner Occupied",
    subtitle:
      "Residential financing guidance for second homes and non-owner-occupied properties.",
    icon: "🏘️",
    href: "/funnel/purchase",
    questions: purchaseQuestions,
  },
  {
    type: "commercial",
    title: "Commercial Financing",
    subtitle: "Commercial real estate financing through our commercial division.",
    icon: "🏢",
    href: "https://www.broadviewlending.com/bfg-cre",
    questions: [],
  },
];

export const residentialFunnelDefinitions = funnelDefinitions.filter(
  (funnel) =>
    ["purchase", "refinance", "heloc", "va", "fha", "first-time-homebuyer"].includes(
      funnel.type,
    ),
);

export function getFunnelDefinition(type: string) {
  return funnelDefinitions.find((f) => f.type === type);
}

export function getActiveQuestions(
  definition: FunnelDefinition,
  answers: Record<string, string>,
) {
  return definition.questions.filter(
    (q) => !q.condition || q.condition(answers),
  );
}

import { getLandingPagesByEcosystem } from "@/lib/content/landing-pages";
import type { ExperienceConfig, PlatformGoal } from "./types";

export const platformGoals: PlatformGoal[] = [
  {
    id: "buy",
    title: "Buy a home",
    hint: "First home, move-up, or something in between",
    href: "/buy",
    icon: "home",
    theme: "buy",
  },
  {
    id: "refinance",
    title: "Refinance",
    hint: "Lower payment, access cash, or simplify debt",
    href: "/refinance",
    icon: "refresh",
    theme: "refinance",
  },
  {
    id: "home-equity",
    title: "Use my home equity",
    hint: "Remodel, invest, consolidate, or create options",
    href: "/heloc",
    icon: "equity",
    theme: "home-equity",
  },
  {
    id: "commercial",
    title: "Commercial financing",
    hint: "Acquire, expand, or invest in property",
    href: "/commercial",
    icon: "building",
    theme: "commercial",
  },
  {
    id: "not-sure",
    title: "Not sure yet",
    hint: "Start with a short conversation",
    href: "/funnel/purchase",
    icon: "compass",
  },
];

function seoRoutesFor(ecosystem: "buy" | "refinance") {
  return getLandingPagesByEcosystem(ecosystem).map((p) => ({
    label: p.seo.title,
    href: p.path,
  }));
}

export const buyExperience: ExperienceConfig = {
  theme: "buy",
  path: "/buy",
  title: "Home buying",
  intro: "Tell us what you're working toward. We'll help you understand the path — before any loan conversation.",
  question: "What are you trying to accomplish?",
  funnelHref: "/funnel/purchase",
  funnelType: "purchase",
  seoRoutes: seoRoutesFor("buy"),
  goals: [
    {
      id: "first-home",
      title: "Buying my first home",
      hint: "Confidence, clarity, and a plan",
      href: "/buy/first-time-homebuyer",
      icon: "key",
      discuss: ["Monthly payment comfort", "Down payment options", "Timeline and pre-approval"],
      strategyPreview:
        "We'll map what fits your budget and life — not just what you might qualify for.",
    },
    {
      id: "move-up",
      title: "Moving into something bigger",
      hint: "More space, new neighborhood, next chapter",
      href: "/buy/buying-your-next-home",
      icon: "arrow-up",
      discuss: ["Buy before you sell", "Equity from your current home", "Payment on the new place"],
      strategyPreview:
        "Move-up timing and equity are usually the first things worth sorting out together.",
    },
    {
      id: "military",
      title: "Buying with military benefits",
      hint: "VA eligibility and veteran-friendly paths",
      href: "/buy/va-loans",
      icon: "shield",
      discuss: ["VA eligibility", "Funding fee and exemptions", "Purchase vs refinance"],
      strategyPreview:
        "VA can be powerful — we'll walk through how it applies to your situation.",
    },
    {
      id: "keep-cash",
      title: "Keeping my cash available",
      hint: "Low down payment and flexible options",
      href: "/buy/low-down-payment",
      icon: "wallet",
      discuss: ["Down payment sources", "Monthly payment trade-offs", "Mortgage insurance"],
      strategyPreview:
        "Keeping cash reserves often matters as much as the down payment amount.",
    },
    {
      id: "luxury",
      title: "Buying a luxury home",
      hint: "Higher loan amounts and jumbo strategies",
      href: "/buy/jumbo-loans",
      icon: "star",
      discuss: ["Jumbo vs conforming", "Asset and reserve requirements", "Rate and structure"],
      strategyPreview:
        "Above conforming limits, structure and reserves become central to the conversation.",
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      hint: "Start with a guided assessment",
      href: "/funnel/purchase",
      icon: "compass",
      discuss: ["What you're hoping to accomplish", "Timeline and comfort level", "Questions before any recommendation"],
      strategyPreview:
        "No wrong starting point — a few questions help us prepare a useful first conversation.",
    },
  ],
};

export const refinanceExperience: ExperienceConfig = {
  theme: "refinance",
  path: "/refinance",
  title: "Refinancing",
  intro: "Refinancing should serve a goal — not a rate quote. Start with what you want to change.",
  question: "What are you trying to accomplish?",
  funnelHref: "/funnel/refinance",
  funnelType: "refinance",
  seoRoutes: seoRoutesFor("refinance"),
  goals: [
    {
      id: "lower-payment",
      title: "Lower my payment",
      href: "/refinance/lower-payment",
      icon: "trend-down",
      discuss: ["Current rate and term", "Break-even timeline", "Closing costs vs savings"],
      strategyPreview: "We'll compare payment relief against how long you plan to keep the loan.",
    },
    {
      id: "access-cash",
      title: "Access cash",
      href: "/refinance/cash-out-refinance",
      icon: "cash",
      discuss: ["How much equity to use", "Cash-out vs HELOC", "Long-term payment impact"],
      strategyPreview: "Cash-out and home equity lines solve different problems — we'll compare both.",
    },
    {
      id: "remove-mi",
      title: "Remove mortgage insurance",
      href: "/refinance/remove-mortgage-insurance",
      icon: "unlock",
      discuss: ["Current MI type", "Appraisal and equity", "Refinance vs removal paths"],
      strategyPreview: "Sometimes MI comes off without refinancing — we'll look at every path.",
    },
    {
      id: "pay-debt",
      title: "Pay off debt",
      href: "/refinance/debt-consolidation-refinance",
      icon: "layers",
      discuss: ["Total interest over time", "Secured vs unsecured trade-offs", "Payment comfort"],
      strategyPreview: "Consolidation can simplify payments — we'll stress-test the long-term math.",
    },
    {
      id: "change-type",
      title: "Change my loan type",
      href: "/refinance/rate-and-term-refinance",
      icon: "swap",
      discuss: ["Fixed vs adjustable", "Term length", "Why you're restructuring"],
      strategyPreview: "Structure changes should match how long you'll keep the home and the loan.",
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      href: "/funnel/refinance",
      icon: "compass",
      discuss: ["What prompted the question", "Timeline and plans", "What success looks like"],
      strategyPreview: "We'll clarify whether refinancing even makes sense before discussing products.",
    },
  ],
};

export const homeEquityExperience: ExperienceConfig = {
  theme: "home-equity",
  path: "/heloc",
  title: "Home equity",
  intro: "Your equity can create options. The goal comes first — the product recommendation follows.",
  question: "What would access to your equity make possible?",
  funnelHref: "/funnel/heloc",
  funnelType: "heloc",
  seoRoutes: [
    { label: "Home improvement", href: "/heloc/home-improvement" },
    { label: "Debt consolidation", href: "/heloc/debt-consolidation" },
    { label: "Buy another home", href: "/heloc/buy-another-home" },
    { label: "Investment property", href: "/heloc/investment-property" },
    { label: "Keep your rate", href: "/heloc/keep-your-rate" },
    { label: "HELOC vs cash-out", href: "/heloc/heloc-vs-cash-out" },
  ],
  goals: [
    {
      id: "remodel",
      title: "Remodel",
      href: "/heloc/home-improvement",
      icon: "hammer",
      discuss: ["Project scope and timeline", "HELOC vs cash-out refinance", "Keeping your first mortgage rate"],
      strategyPreview: "Many homeowners want to renovate without giving up a great first mortgage rate.",
    },
    {
      id: "debt",
      title: "Pay off debt",
      href: "/heloc/debt-consolidation",
      icon: "layers",
      discuss: ["Interest comparison", "Payment flexibility", "Risk of secured debt"],
      strategyPreview: "We'll walk through the math and the trade-offs before any recommendation.",
    },
    {
      id: "another-property",
      title: "Purchase another property",
      href: "/heloc/buy-another-home",
      icon: "home-plus",
      discuss: ["Down payment from equity", "Timing with your current home", "Reserve requirements"],
      strategyPreview: "Equity can fund a next move — structure depends on your timeline and goals.",
    },
    {
      id: "business",
      title: "Fund a business",
      href: "/funnel/heloc?campaign_page=heloc",
      icon: "briefcase",
      discuss: ["Use of funds", "Repayment flexibility", "Alternatives worth comparing"],
      strategyPreview: "Business use cases need clear repayment planning — we'll discuss that first.",
    },
    {
      id: "education",
      title: "Education",
      href: "/funnel/heloc?campaign_page=heloc",
      icon: "book",
      discuss: ["Amount and timeline", "Draw vs fixed options", "Impact on monthly cash flow"],
      strategyPreview: "Education funding works best when matched to a clear draw and repayment plan.",
    },
    {
      id: "emergency",
      title: "Emergency savings",
      href: "/funnel/heloc?campaign_page=heloc",
      icon: "shield-heart",
      discuss: ["Line vs lump sum", "When you'd draw", "Keeping costs predictable"],
      strategyPreview: "A line of credit can be a safety net — we'll talk about when and how to use it.",
    },
    {
      id: "investment",
      title: "Investment property",
      href: "/heloc/investment-property",
      icon: "chart",
      discuss: ["Portfolio strategy", "DSCR and investor options", "Cash-flow impact"],
      strategyPreview: "Investment equity decisions balance leverage, reserves, and cash flow.",
    },
    {
      id: "cash-flow",
      title: "Increase monthly cash flow",
      href: "/heloc/keep-your-rate",
      icon: "flow",
      discuss: ["Current first mortgage", "Payment restructuring", "HELOC vs refinance"],
      strategyPreview: "Often the goal is flexibility without replacing a low first mortgage rate.",
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      href: "/funnel/heloc",
      icon: "compass",
      discuss: ["What you're hoping to accomplish", "Your current mortgage", "Questions before any recommendation"],
      strategyPreview: "We'll start with your goal — then explore whether home equity fits.",
    },
  ],
};

export const commercialExperience: ExperienceConfig = {
  theme: "commercial",
  path: "/commercial",
  title: "Commercial",
  intro: "Commercial financing starts with ambition — not a product sheet.",
  question: "What are you trying to accomplish?",
  funnelHref: "/contact",
  seoRoutes: [],
  goals: [
    {
      id: "acquire",
      title: "Acquire property",
      href: "/contact",
      icon: "building",
      discuss: ["Property type and use", "Down payment and reserves", "Timeline to close"],
      strategyPreview: "Acquisition strategy depends on occupancy, cash flow, and your long-term plan.",
    },
    {
      id: "expand",
      title: "Expand operations",
      href: "/contact",
      icon: "expand",
      discuss: ["Growth plans", "Existing debt", "Working capital needs"],
      strategyPreview: "Expansion often blends real estate and operating capital — we'll map both.",
    },
    {
      id: "investment-re",
      title: "Investment real estate",
      href: "/contact",
      icon: "chart",
      discuss: ["Asset class and market", "Cash-flow targets", "Portfolio structure"],
      strategyPreview: "Investor goals drive structure — DSCR, conventional, and bridge each fit differently.",
    },
    {
      id: "construction",
      title: "Construction",
      href: "/contact",
      icon: "hammer",
      discuss: ["Project scope", "Draw schedule", "Exit or permanent financing"],
      strategyPreview: "Construction needs a clear timeline from ground-break to permanent financing.",
    },
    {
      id: "bridge",
      title: "Bridge financing",
      href: "/contact",
      icon: "bridge",
      discuss: ["Gap you're bridging", "Exit strategy", "Speed vs cost"],
      strategyPreview: "Bridge loans are short-term tools — the exit plan is the first thing we discuss.",
    },
    {
      id: "working-capital",
      title: "Working capital",
      href: "/contact",
      icon: "wallet",
      discuss: ["Use of funds", "Repayment source", "Collateral options"],
      strategyPreview: "Working capital should match how and when the business will repay.",
    },
    {
      id: "owner-occupied",
      title: "Owner occupied",
      href: "/contact",
      icon: "office",
      discuss: ["SBA vs conventional", "Occupancy plans", "Down payment sources"],
      strategyPreview: "Owner-occupied commercial often blends SBA and conventional paths.",
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      href: "/contact",
      icon: "compass",
      discuss: ["What prompted the search", "Timeline", "Property or business context"],
      strategyPreview: "A short conversation usually clarifies which commercial path is worth exploring.",
    },
  ],
};

export function getExperience(slug: string): ExperienceConfig | undefined {
  const map: Record<string, ExperienceConfig> = {
    buy: buyExperience,
    refinance: refinanceExperience,
    "home-equity": homeEquityExperience,
    heloc: homeEquityExperience,
    commercial: commercialExperience,
  };
  return map[slug];
}

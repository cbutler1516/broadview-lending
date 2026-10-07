import { brand } from "@/lib/brand/config";
import { APPLICATION_CTA } from "@/lib/nav/constants";
import type { ProductPathCardsConfig } from "@/lib/product/types";
import {
  buyBackgroundVideo,
  ctaBackgroundVideo,
  learningStrategyVideo,
  loanImages,
} from "@/lib/media/assets";
import type { MediaAsset } from "@/lib/media/assets";

export const HOMEPAGE_HERO = {
  eyebrow: "Home Loans · Personal Guidance",
  titleLines: ["Home financing.", "Built around you."],
  subtitle:
    "Buying a home, refinancing, or planning your next investment? Get clear options and personal guidance from a Broadview advisor.",
  primaryCta: "Apply for a Home Loan",
  primaryHref: APPLICATION_CTA.href,
  trustNote: "Apply Online, or talk through your options first.",
  video: buyBackgroundVideo,
};

export const HOMEPAGE_LOAN_PATHS: ProductPathCardsConfig = {
  tag: "Home Loan Options",
  title: "A home loan that fits your next move.",
  description:
    "Start with your budget, down payment, and plans for the home. Your advisor helps you compare the paths that fit your situation.",
  layout: "band",
  paths: [
    {
      title: "Conventional",
      description: "Explore purchase financing with your payment, down payment, and long-term plans in view.",
      href: "/buy/conventional-loans",
      cta: "Explore conventional loans",
    },
    {
      title: "First-Time Buyer",
      description: "Understand the steps, plan for closing costs, and prepare for your first home purchase.",
      href: "/buy/first-time-homebuyer",
      cta: "Plan your first purchase",
    },
    {
      title: "FHA",
      description: "Review an FHA mortgage alongside other purchase options with an advisor.",
      href: "/buy/fha-loans",
      cta: "Explore FHA loans",
    },
    {
      title: "VA",
      description: "Explore VA home financing and discuss eligibility, costs, and next steps.",
      href: "/buy/va-loans",
      cta: "Explore VA loans",
    },
    {
      title: "Jumbo",
      description: "Plan a larger home purchase with attention to cash reserves and payment comfort.",
      href: "/buy/jumbo-loans",
      cta: "Explore jumbo loans",
    },
    {
      title: "Refinance",
      description: "Compare your current mortgage with a new structure, including costs and your time horizon.",
      href: "/refinance",
      cta: "Review refinance options",
    },
  ],
};

export type JourneyPath = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  sequence: string;
  category: string;
  video: MediaAsset;
  featured?: boolean;
};

export const PRIMARY_JOURNEYS: JourneyPath[] = [
  {
    id: "buy",
    title: "Buy a Home",
    description:
      "First home, move-up, or a more complex purchase — start with the goal, then build the financing around your life.",
    href: "/buy",
    cta: "Explore home buying",
    sequence: "01",
    category: "Purchase",
    video: loanImages.purchase,
    featured: true,
  },
  {
    id: "equity",
    title: "Access Home Equity",
    description:
      "Plan a renovation, consolidate balances, or explore another goal. Compare ways to access your equity with an advisor.",
    href: "/heloc",
    cta: "Explore home equity",
    sequence: "02",
    category: "Home Equity",
    video: loanImages.equity,
  },
  {
    id: "invest",
    title: "Invest in Real Estate",
    description:
      "From your first rental to your next renovation, build the financing around the property and your plan.",
    href: "/invest",
    cta: "Explore investor financing",
    sequence: "03",
    category: "Investor",
    video: loanImages.rental,
  },
];

export const SECONDARY_PATHS = [
  {
    title: "Refinance",
    description: "Rate-and-term, cash-out, or a cleaner payment structure.",
    href: "/refinance",
  },
  {
    title: "Tools",
    description: "Affordability, home equity, and deal-analysis tools.",
    href: "/tools",
  },
  {
    title: "Learn",
    description: "Guides that prepare a better advisor conversation.",
    href: "/learn",
  },
] as const;

export const HOMEPAGE_WHY = {
  title: "Why Broadview",
  description: "Clear choices. Thoughtful advice. A plan you understand.",
  items: [
    {
      title: "Advisor-led strategy",
      description:
        "A licensed Broadview advisor reviews your goal, property, and timing before recommendations are made.",
    },
    {
      title: "Your full financial picture",
      description:
        "Consider your monthly budget, available cash, and future plans together when choosing a mortgage.",
    },
    {
      title: "A useful first conversation",
      description:
        "Digital tools gather context quickly so the first call already has substance.",
    },
    {
      title: "Understand the trade-offs",
      description:
        "Talk through payment, closing costs, and loan structure in plain language before choosing your next step.",
    },
    {
      title: "Room for your next chapter",
      description:
        "From your first home to refinancing, using equity, or buying an investment property, start with what you want to accomplish.",
    },
  ],
};

export const HOMEPAGE_TOOLS = {
  tag: "Tools",
  title: "Run the numbers before the conversation.",
  description:
    "Decision tools for homeowners and investors. Each one prepares a clearer discussion with an advisor.",
  editorialNote:
    "Estimates are educational. A Broadview advisor reviews the details before any recommendation.",
  viewAllHref: "/tools",
  viewAllLabel: "View all tools",
  tools: [
    {
      title: "Affordability Planner",
      description: "Start with a comfortable payment and see the home price it supports.",
      href: "/tools/affordability-planner",
    },
    {
      title: "Cash-Out vs HELOC",
      description: "Compare keeping your mortgage with a HELOC against a cash-out refinance.",
      href: "/tools/cash-out-vs-heloc",
    },
    {
      title: "Home Equity Strategy",
      description: "A short experience that prepares your advisor to review equity options.",
      href: "/funnel/heloc",
    },
    {
      title: "Investor Deal Analyzer",
      description: "Estimate cash flow, financing payments, and returns using your own property assumptions.",
      href: "/tools/investor-deal-analyzer",
    },
  ],
};

export const HOMEPAGE_CTA = {
  title: "Ready to think through the next move?",
  description:
    "Tell us where you are in the process. A Broadview advisor can help you compare your options and plan the next step toward buying, refinancing, or using your home equity.",
  trustNote: brand.trust.leadCapture,
  video: ctaBackgroundVideo,
  conversationVideo: learningStrategyVideo,
};

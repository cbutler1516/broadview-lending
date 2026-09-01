import { brand } from "@/lib/brand/config";
import { SCENARIO_CTA } from "@/lib/nav/constants";
import {
  buyBackgroundVideo,
  commercialBackgroundVideo,
  ctaBackgroundVideo,
  homeEquityBackgroundVideo,
  learningStrategyVideo,
} from "@/lib/media/assets";
import type { MediaAsset } from "@/lib/media/assets";

export const HOMEPAGE_HERO = {
  eyebrow: "Mortgage Advisory · Investor Financing",
  titleLines: ["Strategy for the home", "you live in — and the deals you buy."],
  subtitle:
    "Premium conventional mortgage guidance and sophisticated investor financing, prepared by technology and decided with a real advisor.",
  primaryCta: SCENARIO_CTA.longLabel,
  primaryHref: SCENARIO_CTA.href,
  trustNote: brand.trust.funnelDuration,
  video: buyBackgroundVideo,
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
    video: buyBackgroundVideo,
    featured: true,
  },
  {
    id: "equity",
    title: "Access Home Equity",
    description:
      "HELOC, cash access, and home-equity strategy without treating your house like a product sheet.",
    href: "/heloc",
    cta: "Explore home equity",
    sequence: "02",
    category: "Home Equity",
    video: homeEquityBackgroundVideo,
  },
  {
    id: "invest",
    title: "Invest in Real Estate",
    description:
      "DSCR, fix & flip, bridge, construction, BRRRR, investor HELOC, and multifamily — structured around the deal.",
    href: "/invest",
    cta: "Explore investor financing",
    sequence: "03",
    category: "Investor",
    video: commercialBackgroundVideo,
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
  description: "Human judgment first. Technology prepares the conversation.",
  items: [
    {
      title: "Advisor-led strategy",
      description:
        "A licensed Broadview advisor reviews your goal, property, and timing before recommendations are made.",
    },
    {
      title: "Two platforms, one desk",
      description:
        "Conventional home financing and investor capital live in the same conversation — not two disconnected companies.",
    },
    {
      title: "Prepared, not pressured",
      description:
        "Digital tools gather context quickly so the first call already has substance.",
    },
    {
      title: "Clarity before products",
      description:
        "We explain trade-offs in plain language. No call-center script. No product-first pitch.",
    },
    {
      title: "Built for real decisions",
      description:
        "Purchase, equity, and investment paths stay distinct — then meet in a single strategy.",
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
      title: "Investor Deal Tools",
      description: "DSCR, fix & flip, BRRRR, and rental analysis — opening inside the investor platform.",
      href: "/invest#tools",
    },
  ],
};

export const HOMEPAGE_CTA = {
  title: "Ready to think through the next move?",
  description:
    "Start with your goal. A Broadview advisor will help you understand which financing paths may fit — for the home you live in, or the property you are buying.",
  trustNote: brand.trust.leadCapture,
  video: ctaBackgroundVideo,
  conversationVideo: learningStrategyVideo,
};

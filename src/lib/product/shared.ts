import { brand } from "@/lib/brand/config";
import {
  ADVISOR_POSITIONING,
  CTA_DURATION_NOTE,
  CTA_TRUST_NOTE,
  EDUCATIONAL_NOTE,
  INVESTOR_POSITIONING,
} from "@/lib/product/claims";
import { PRODUCT_CTA_LABEL, productCtas, productPrimaryHref } from "@/lib/product/cta";
import {
  buyBackgroundVideo,
  commercialBackgroundVideo,
  ctaBackgroundVideo,
  homeEquityBackgroundVideo,
  learningStrategyVideo,
  refinanceBackgroundVideo,
} from "@/lib/media/assets";
import type { MediaAsset } from "@/lib/media/assets";
import type {
  AdvisorSectionConfig,
  CalculatorSectionConfig,
  CalculatorTool,
  FundingProcessConfig,
  LoanCtaConfig,
  ProductGroup,
  ProductHeroConfig,
} from "@/lib/product/types";

export function videoForGroup(group: ProductGroup): MediaAsset {
  switch (group) {
    case "buy":
      return buyBackgroundVideo;
    case "refinance":
      return refinanceBackgroundVideo;
    case "equity":
      return homeEquityBackgroundVideo;
    case "invest":
      return commercialBackgroundVideo;
  }
}

export function conventionalProcess(title = "How guidance works"): FundingProcessConfig {
  return {
    tag: "The Process",
    title,
    description: "Technology gathers context. A licensed advisor helps you decide.",
    background: "slate",
    compact: true,
    steps: [
      {
        icon: "fileSearch",
        step: "1",
        title: "Start with the goal",
        description: "Tell us what you are trying to accomplish — not which product you think you need.",
      },
      {
        icon: "layers",
        step: "2",
        title: "Understand the situation",
        description: "A short experience captures property, timing, and constraints so the first conversation has substance.",
      },
      {
        icon: "handshake",
        step: "3",
        title: "Review with an advisor",
        description: "A Broadview advisor walks through trade-offs in plain language before any recommendation.",
      },
    ],
  };
}

export function investorProcess(): FundingProcessConfig {
  return {
    tag: "The Process",
    title: "Start with the deal, then the financing.",
    description: INVESTOR_POSITIONING,
    background: "slate",
    compact: true,
    steps: [
      {
        icon: "fileSearch",
        step: "1",
        title: "Frame the deal",
        description: "Property type, hold period, exit, and what the numbers need to support.",
      },
      {
        icon: "calculator",
        step: "2",
        title: "Understand the financing path",
        description: "DSCR, fix & flip, bridge, construction, BRRRR, equity, or commercial — matched to the deal, not a product menu.",
      },
      {
        icon: "handshake",
        step: "3",
        title: "Build the strategy",
        description: "An advisor reviews structure with you. Real estate professionals can sit in the same conversation.",
      },
    ],
  };
}

export function advisorSection(
  group: ProductGroup,
  options?: { path?: string; funnel?: string },
): AdvisorSectionConfig {
  const investor = group === "invest";
  return {
    eyebrow: "Advisor Guidance",
    title: investor
      ? "A financing desk that can sit with the deal."
      : "A real advisor reviews the strategy.",
    description: investor
      ? "Broadview is not a call-center product shop. Investor conversations start with the property and the plan — then an advisor helps you understand which financing path may fit."
      : "Digital tools prepare the conversation. A licensed Broadview advisor reviews your goal, property, and timing before recommendations are made.",
    benefits: investor
      ? [
          "One desk for rental, rehab, bridge, construction, and commercial conversations.",
          "Real estate professionals can use the same review to present an opportunity clearly.",
          ADVISOR_POSITIONING,
        ]
      : [
          "Human judgment first — no scripted product pitch.",
          "Trade-offs explained in plain language.",
          CTA_DURATION_NOTE,
        ],
    video: learningStrategyVideo,
    badge: { label: "Broadview", text: "Licensed advisor review" },
    primaryCta: productCtas(group, options)[0],
    phoneLabel: brand.contact.phone,
    phoneHref: brand.contact.phoneHref,
    secondaryLink: { label: "Talk With An Advisor", href: "/contact" },
    trustNote: CTA_TRUST_NOTE,
    imageSide: investor ? "right" : "left",
  };
}

export function calculatorSection(
  group: ProductGroup,
  tools: CalculatorTool[],
  options?: { path?: string; funnel?: string },
): CalculatorSectionConfig {
  return {
    tag: "Tools",
    title: group === "invest" ? "Run the deal before the conversation." : "Run the numbers before the conversation.",
    description:
      group === "invest"
        ? "Deal-analysis tools will share one Property / Deal Engine. Until then, start with the path and an advisor review."
        : "Decision tools that prepare a clearer discussion with an advisor.",
    editorialNote: EDUCATIONAL_NOTE,
    tools,
    viewAllHref: group === "invest" ? "/invest#tools" : "/tools",
    viewAllLabel: "View current tools",
    background: "slate",
    compact: true,
    primaryCta: productCtas(group, options)[0],
    primaryCtaTrustNote: CTA_DURATION_NOTE,
  };
}

export function productHero(
  group: ProductGroup,
  copy: {
    eyebrow: string;
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter?: string;
    subheadline: string;
    chips: string[];
  },
  options?: { path?: string; funnel?: string; compact?: boolean; hidePanel?: boolean; facts?: ProductHeroConfig["programHighlights"] },
): ProductHeroConfig {
  return {
    eyebrow: copy.eyebrow,
    headlineBefore: copy.headlineBefore,
    headlineAccent: copy.headlineAccent,
    headlineAfter: copy.headlineAfter,
    subheadline: copy.subheadline,
    ctas: productCtas(group, options),
    trustChips: copy.chips,
    video: videoForGroup(group),
    programHighlights: options?.facts,
    trustNote: CTA_DURATION_NOTE,
    compact: options?.compact ?? true,
    phone: { label: brand.contact.phone, href: brand.contact.phoneHref },
    heroVertical: "upper-middle",
    heroOverlay: "bottom-left",
  };
}

export function finalCta(
  group: ProductGroup,
  copy: { title: string; description: string },
  options?: { path?: string; funnel?: string },
): LoanCtaConfig {
  return {
    title: copy.title,
    description: copy.description,
    ctas: productCtas(group, options),
    trustNote: CTA_TRUST_NOTE,
    backgroundVideo: ctaBackgroundVideo,
  };
}

export function analyzeAnchorHref(path: string): string {
  return productPrimaryHref("invest", { path });
}

export { PRODUCT_CTA_LABEL, productCtas, productPrimaryHref };

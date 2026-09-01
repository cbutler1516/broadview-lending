import type { Faq } from "@/lib/content/types";
import type { MediaAsset } from "@/lib/media/assets";
import type { ProductIconName } from "@/lib/product/icons";

export type { DealEngineMode } from "@/lib/deal-engine";

export type ProductGroup = "buy" | "refinance" | "equity" | "invest";

export type ProductCtaIcon = "arrow" | "calendar";

export interface ProductCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  icon?: ProductCtaIcon;
}

export interface ProgramHighlightFact {
  label: string;
  detail?: string;
}

export interface ProgramHighlightsConfig {
  eyebrow?: string;
  title: string;
  facts: ProgramHighlightFact[];
  hideInHero?: boolean;
}

export interface ProductHeroConfig {
  eyebrow: string;
  headlineBefore: string;
  headlineAccent: string;
  headlineAfter?: string;
  subheadline: string;
  ctas: ProductCta[];
  trustChips: string[];
  video: MediaAsset;
  programHighlights?: ProgramHighlightsConfig;
  trustNote?: string;
  compact?: boolean;
  phone?: { label: string; href: string };
  heroVertical?: "upper" | "upper-middle" | "lower";
  heroOverlay?: "left" | "bottom" | "bottom-left";
}

export interface LoanHighlightItem {
  icon: ProductIconName;
  title: string;
  description: string;
}

export interface LoanHighlightsConfig {
  tag: string;
  title: string;
  description: string;
  items: LoanHighlightItem[];
  background?: "white" | "slate" | "warm";
  compact?: boolean;
}

export interface FundingStep {
  icon: ProductIconName;
  step: string;
  title: string;
  description: string;
}

export interface FundingProcessConfig {
  tag: string;
  title: string;
  description: string;
  steps: FundingStep[];
  background?: "white" | "slate" | "warm";
  compact?: boolean;
}

export interface AdvisorSectionConfig {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  video: MediaAsset;
  badge: { label: string; text: string };
  primaryCta: ProductCta;
  phoneLabel: string;
  phoneHref: string;
  secondaryLink: { label: string; href: string };
  trustNote?: string;
  imageSide?: "left" | "right";
}

export interface LoanCtaConfig {
  title: string;
  description: string;
  ctas: ProductCta[];
  trustNote?: string;
  backgroundVideo?: MediaAsset;
}

export interface CalculatorTool {
  icon: ProductIconName;
  title: string;
  description: string;
  href: string;
}

export interface CalculatorSectionConfig {
  tag: string;
  title: string;
  description: string;
  editorialNote?: string;
  tools: CalculatorTool[];
  viewAllHref?: string;
  viewAllLabel?: string;
  background?: "white" | "slate" | "warm";
  compact?: boolean;
  primaryCta?: ProductCta;
  primaryCtaTrustNote?: string;
}

export interface ProductPathItem {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon?: ProductIconName;
  facts?: string[];
}

export interface ProductPathCardsConfig {
  tag?: string;
  title: string;
  description?: string;
  paths: ProductPathItem[];
  background?: "white" | "slate";
  layout?: "rows" | "band";
}

export interface ProductPullQuoteConfig {
  quote: string;
  attribution?: string;
  background?: "white" | "slate" | "warm" | "navy";
}

export interface ProductRelatedLink {
  href: string;
  label: string;
  description?: string;
}

export type ProductComposition =
  | "advisory"
  | "active"
  | "analytical"
  | "decisive"
  | "institutional";

export type ProductStoryTreatment =
  | "bleed"
  | "cinematic"
  | "asymmetric"
  | "portrait"
  | "none";

export type ProductAdvisorVariant = "standard" | "editorial" | "asymmetric";
export type ProductHighlightsLayout = "editorial" | "band" | "inline";

export interface ProductStoryConfig {
  video: MediaAsset;
  caption?: string;
  fact?: { label: string; value: string };
}

export interface ProductArtDirection {
  composition: ProductComposition;
  storyTreatment?: ProductStoryTreatment;
  story?: ProductStoryConfig;
  showQualificationSnapshot?: boolean;
  showPullQuote?: boolean;
  advisorVariant?: ProductAdvisorVariant;
  highlightsLayout?: ProductHighlightsLayout;
  density?: "compact" | "spacious";
}

export interface ProductPageConfig {
  hero?: ProductHeroConfig;
  paths?: ProductPathCardsConfig;
  highlights?: LoanHighlightsConfig;
  advisor?: AdvisorSectionConfig;
  process?: FundingProcessConfig;
  pullQuote?: ProductPullQuoteConfig;
  faq?: { title: string; items: Faq[] };
  cta?: LoanCtaConfig;
  calculators?: CalculatorSectionConfig;
  related?: ProductRelatedLink[];
  sectionOrder?: Array<
    "paths" | "highlights" | "calculators" | "advisor" | "process"
  >;
  artDirection?: ProductArtDirection;
}

export interface ProductDefinition {
  slug: string;
  path: string;
  group: ProductGroup;
  title: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
  page: ProductPageConfig;
}

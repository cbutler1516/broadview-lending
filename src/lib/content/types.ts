/**
 * Shared content primitives for the Broadview platform.
 *
 * These types power the data-driven landing-page, knowledge, calculator, and
 * internal-linking systems so new content can be added without rebuilding
 * components.
 */

export type Ecosystem =
  | "strategy"
  | "buy"
  | "refinance"
  | "home-equity"
  | "learn"
  | "tools";

export type Faq = {
  question: string;
  answer: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string[];
};

/**
 * Explicit related references declared by a content item. The resolver in
 * `related.ts` turns these into renderable links, guaranteeing there are no
 * orphan pages and every page leads somewhere useful.
 */
export type RelatedRefs = {
  articles?: string[];
  calculators?: string[];
  landings?: string[];
  funnels?: string[];
  comparisons?: string[];
  guides?: string[];
  lifeEvents?: string[];
  locations?: string[];
};

export type ResolvedLinkKind =
  | "article"
  | "calculator"
  | "landing"
  | "funnel"
  | "comparison"
  | "guide"
  | "life-event"
  | "location"
  | "external";

export type ResolvedLink = {
  label: string;
  href: string;
  description?: string;
  kind: ResolvedLinkKind;
};

/**
 * The Broadview Intelligence Layer's signature output. A Strategy Snapshot is
 * educational guidance only — it never implies qualification or approval.
 */
export type StrategySnapshot = {
  /** Plain-language read of the situation. */
  whatWeLearned: string[];
  /** Strategies worth discussing (never recommendations to apply). */
  strategies: string[];
  /** Questions an advisor would ask together. */
  questions: string[];
  /** Details an advisor would verify. */
  thingsToVerify: string[];
  /** Common mistakes to avoid. */
  commonMistakes: string[];
  /** A single, non-committal recommended next step. */
  nextStep: string;
};

/** Reusable conversational advisor note that appears throughout the platform. */
export type AdvisorInsight = {
  body: string;
  /** Optional longer continuation shown when expanded. */
  more?: string;
};

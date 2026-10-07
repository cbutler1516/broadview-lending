/**
 * Centralized media/content system for Broadview Lending.
 *
 * This is the single source of truth for future background videos, HeyGen
 * testimonials, advisor photos, client story modules, and trust visuals.
 *
 * IMPORTANT: No real media files are required yet. Every entry ships with a
 * safe placeholder and an `enabled` flag. Components must only render assets
 * where `enabled === true` and a usable `src` exists, otherwise they fall back
 * to the existing elegant placeholder treatments. This keeps the site fast and
 * avoids broken media while the real assets are produced.
 */

export type MediaType = "video" | "image" | "heygen";

export type MediaPlacement =
  | "hero-background"
  | "home-equity-background"
  | "buy-background"
  | "refinance-background"
  | "commercial"
  | "funnel"
  | "learning"
  | "cta-background"
  | "advisor-intro"
  | "testimonial"
  | "advisor-photo"
  | "client-story"
  | "trust"
  | "office"
  | "fallback";

export type MediaAsset = {
  /** Stable identifier for keys and analytics. */
  id: string;
  /** Human-readable title (used for captions / aria where relevant). */
  title: string;
  /** Media source URL. Empty string means "not provided yet". */
  src: string;
  /** Poster/fallback image for videos (and required for good UX). */
  poster?: string;
  /** Description of the editorial still when it differs from the motion asset. */
  posterAlt?: string;
  /** Accessible description. */
  alt: string;
  type: MediaType;
  placement: MediaPlacement;
  /** Only render when true AND a usable src exists. */
  enabled: boolean;
  /** Optional testimonial/quote fields. */
  quote?: string;
  attribution?: string;
  role?: string;
};

/** A video is renderable only when enabled and it has a real src. */
export function isPlayable(asset?: MediaAsset | null): asset is MediaAsset {
  return Boolean(asset && asset.enabled && asset.src.trim().length > 0);
}

/** A poster/image is renderable only when enabled and it has a real src. */
export function isViewable(asset?: MediaAsset | null): asset is MediaAsset {
  return Boolean(asset && asset.enabled && asset.src.trim().length > 0);
}

/** Editorial illustrations, not actual listings or properties financed by Broadview. */
export const loanImages = {
  purchase: { id: "loan-purchase", title: "A place to call home", src: "/images/loans/purchase.webp", alt: "Illustrative Craftsman home with a welcoming porch and garden", type: "image", placement: "buy-background", enabled: true },
  equity: { id: "loan-equity", title: "Room for what comes next", src: "/images/loans/equity.webp", alt: "Illustrative renovated oak kitchen opening onto a garden", type: "image", placement: "home-equity-background", enabled: true },
  refinance: { id: "loan-refinance", title: "Make room in your plans", src: "/images/loans/refinance.webp", alt: "Illustrative sunlit living room with a linen sofa and garden views", type: "image", placement: "refinance-background", enabled: true },
  rental: { id: "loan-rental", title: "A property with a plan", src: "/images/loans/rental.webp", alt: "Illustrative rental townhomes with individual entrances and landscaped gardens", type: "image", placement: "commercial", enabled: true },
  construction: { id: "loan-construction", title: "Build the next chapter", src: "/images/loans/construction.webp", alt: "Illustrative timber-framed home under construction beside evergreen trees", type: "image", placement: "commercial", enabled: true },
  multifamily: { id: "loan-multifamily", title: "Think beyond one front door", src: "/images/loans/multifamily.webp", alt: "Illustrative neighborhood apartment building with brick walls and balconies", type: "image", placement: "commercial", enabled: true },
} as const satisfies Record<string, MediaAsset>;

/** Filter a list down to renderable entries. */
export function enabledMedia(list: MediaAsset[]): MediaAsset[] {
  return list.filter((a) => a.enabled && a.src.trim().length > 0);
}

// ---------------------------------------------------------------------------
// Single-slot media
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Living Architecture video library
// ---------------------------------------------------------------------------
// Real motion assets live under /public/media/**. Posters are optional — if a
// poster file does not exist yet, leave it undefined so no broken image request
// is made. Components must lazy-load and degrade gracefully.

export const heroBackgroundVideo: MediaAsset = {
  id: "hero-living-blueprint",
  title: "A living blueprint of your mortgage strategy",
  src: "/media/hero/living-blueprint.mp4",
  poster: "/images/blog/neighborhood.webp",
  posterAlt: "Illustrative residential neighborhood in warm natural light",
  alt: "An abstract architectural blueprint coming to life, representing a mortgage strategy taking shape.",
  type: "video",
  placement: "hero-background",
  enabled: true,
};

export const homeEquityBackgroundVideo: MediaAsset = {
  id: "home-equity-equity-flow",
  title: "Equity flow — turning home value into options",
  src: "/media/home-equity/equity-flow.mp4",
  poster: "/images/blog/renovation.webp",
  posterAlt: "Illustrative renovated kitchen with cream cabinetry and blue tile",
  alt: "Flowing motion representing home equity creating new financial options.",
  type: "video",
  placement: "home-equity-background",
  enabled: true,
};

export const buyBackgroundVideo: MediaAsset = {
  id: "buy-future-being-built",
  title: "The future, being built",
  src: "/media/hero/future-being-built.mp4",
  poster: "/images/blog/neighborhood.webp",
  posterAlt: "Illustrative tree-lined street with welcoming front porches",
  alt: "A home and future taking shape, representing the home buying journey.",
  type: "video",
  placement: "buy-background",
  enabled: true,
};

export const refinanceBackgroundVideo: MediaAsset = {
  id: "refinance-transformation",
  title: "Refinance transformation",
  src: "/media/refinance/refinance-transformation.mp4",
  poster: "/images/blog/planning.webp",
  posterAlt: "Illustrative house keys and notebook on a sunlit table",
  alt: "A smooth transformation representing refinancing into a better position.",
  type: "video",
  placement: "refinance-background",
  enabled: true,
};

export const commercialBackgroundVideo: MediaAsset = {
  id: "commercial-district",
  title: "Commercial district",
  src: "/media/commercial/commercial-district.mp4",
  poster: "/images/blog/rental.webp",
  posterAlt: "Illustrative duplex with two front porches",
  alt: "A modern commercial district representing commercial lending.",
  type: "video",
  placement: "commercial",
  enabled: true,
};

export const funnelJourneyVideo: MediaAsset = {
  id: "journey-decision-pathways",
  title: "Decision pathways",
  src: "/media/journey/decision-pathways.mp4",
  poster: "/images/blog/planning.webp",
  posterAlt: "Illustrative notebook and coffee on a table, ready for planning",
  alt: "Branching pathways representing guided mortgage decisions.",
  type: "video",
  placement: "funnel",
  enabled: true,
};

export const learningStrategyVideo: MediaAsset = {
  id: "systems-living-strategy",
  title: "Living strategy",
  src: "/media/systems/living-strategy.mp4",
  poster: "/images/blog/planning.webp",
  posterAlt: "Illustrative coffee, house keys and notebook in morning light",
  alt: "An evolving strategy system representing thinking through mortgage decisions.",
  type: "video",
  placement: "learning",
  enabled: true,
};

export const ctaBackgroundVideo: MediaAsset = {
  id: "systems-possibility-engine",
  title: "Possibility engine",
  src: "/media/systems/possibility-engine.mp4",
  poster: "/images/blog/neighborhood.webp",
  posterAlt: "Illustrative homes along a sunny neighborhood sidewalk",
  alt: "An ambient system of moving possibilities behind a call to action.",
  type: "video",
  placement: "cta-background",
  enabled: true,
};

export const advisorIntroVideo: MediaAsset = {
  id: "advisor-intro-video",
  title: "Meet your Broadview advisor",
  src: "",
  poster: "",
  alt: "A Broadview mortgage advisor introducing how the process works.",
  type: "video",
  placement: "advisor-intro",
  enabled: false,
};

export const fallbackHeroImage: MediaAsset = {
  id: "fallback-hero-image",
  title: "Broadview advisor and client",
  src: "",
  poster: "",
  alt: "A warm conversation between a Broadview advisor and a client.",
  type: "image",
  placement: "fallback",
  enabled: false,
};

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const heygenTestimonials: MediaAsset[] = [
  {
    id: "heygen-testimonial-1",
    title: "Client story — kept a low first mortgage",
    src: "",
    poster: "",
    alt: "Client shares how Broadview helped access equity while keeping a low rate.",
    type: "heygen",
    placement: "testimonial",
    enabled: false,
    quote:
      "They helped me access my equity without giving up my 2.75% rate. I finally understood my options.",
    attribution: "Homeowner, Washington",
    role: "customer",
  },
  {
    id: "heygen-testimonial-2",
    title: "Client story — first-time buyer",
    src: "",
    poster: "",
    alt: "First-time buyer describes the guidance they received from Broadview.",
    type: "heygen",
    placement: "testimonial",
    enabled: false,
    quote:
      "A real person walked me through everything. It never felt like a call center.",
    attribution: "First-time buyer",
    role: "customer",
  },
  {
    id: "heygen-testimonial-3",
    title: "Advisor perspective — strategy first",
    src: "",
    poster: "",
    alt: "A Broadview advisor explains the strategy-first approach.",
    type: "heygen",
    placement: "testimonial",
    enabled: false,
    quote:
      "We start with your goal, then explain the trade-offs before recommending a loan.",
    attribution: "Broadview Mortgage Advisor",
    role: "advisor",
  },
];

export const advisorPhotos: MediaAsset[] = [
  {
    id: "advisor-photo-1",
    title: "Broadview advisor",
    src: "",
    poster: "",
    alt: "Portrait of a licensed Broadview mortgage advisor.",
    type: "image",
    placement: "advisor-photo",
    enabled: false,
    role: "advisor",
  },
];

export const clientStoryCards: MediaAsset[] = [
  {
    id: "client-story-1",
    title: "Renovation without refinancing",
    src: "",
    poster: "",
    alt: "Client story about funding a renovation with a home equity strategy.",
    type: "video",
    placement: "client-story",
    enabled: false,
    quote: "We remodeled the kitchen and kept our existing mortgage.",
    attribution: "Homeowner",
    role: "customer",
  },
  {
    id: "client-story-2",
    title: "Consolidating debt with confidence",
    src: "",
    poster: "",
    alt: "Client story about consolidating debt with advisor guidance.",
    type: "video",
    placement: "client-story",
    enabled: false,
    quote: "Someone actually explained the math before we decided anything.",
    attribution: "Homeowner",
    role: "customer",
  },
];

export const officeOrConsultationImages: MediaAsset[] = [
  {
    id: "office-1",
    title: "A real conversation",
    src: "",
    poster: "",
    alt: "A Broadview advisor and client reviewing options together.",
    type: "image",
    placement: "office",
    enabled: false,
  },
];

// ---------------------------------------------------------------------------
// Cinematic hero mapping
// ---------------------------------------------------------------------------
// One place that maps a page "theme" to its single hero video, so every
// ecosystem stays consistent and we never load more than one hero per page.

export type HeroTheme =
  | "home"
  | "buy"
  | "refinance"
  | "home-equity"
  | "guides"
  | "compare"
  | "tools"
  | "learn"
  | "life"
  | "locations"
  | "commercial";

export function heroVideoForTheme(theme: HeroTheme): MediaAsset {
  switch (theme) {
    case "home":
      return heroBackgroundVideo;
    case "buy":
      return buyBackgroundVideo;
    case "refinance":
      return refinanceBackgroundVideo;
    case "home-equity":
      return homeEquityBackgroundVideo;
    case "guides":
    case "compare":
      return funnelJourneyVideo;
    case "tools":
      return ctaBackgroundVideo;
    case "learn":
    case "life":
      return learningStrategyVideo;
    case "locations":
      return buyBackgroundVideo;
    case "commercial":
      return commercialBackgroundVideo;
  }
}

export const media = {
  heroBackgroundVideo,
  homeEquityBackgroundVideo,
  buyBackgroundVideo,
  refinanceBackgroundVideo,
  commercialBackgroundVideo,
  funnelJourneyVideo,
  learningStrategyVideo,
  ctaBackgroundVideo,
  advisorIntroVideo,
  fallbackHeroImage,
  heygenTestimonials,
  advisorPhotos,
  clientStoryCards,
  officeOrConsultationImages,
};

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

/** Filter a list down to renderable entries. */
export function enabledMedia(list: MediaAsset[]): MediaAsset[] {
  return list.filter((a) => a.enabled && a.src.trim().length > 0);
}

// ---------------------------------------------------------------------------
// Single-slot media
// ---------------------------------------------------------------------------

export const heroBackgroundVideo: MediaAsset = {
  id: "hero-background-video",
  title: "Broadview hero background",
  src: "",
  poster: "",
  alt: "A Broadview mortgage advisor reviewing options with a client.",
  type: "video",
  placement: "hero-background",
  enabled: false,
};

export const homeEquityBackgroundVideo: MediaAsset = {
  id: "home-equity-background-video",
  title: "Home Equity hero background",
  src: "",
  poster: "",
  alt: "A homeowner discussing home equity options with a Broadview advisor.",
  type: "video",
  placement: "home-equity-background",
  enabled: false,
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

export const media = {
  heroBackgroundVideo,
  homeEquityBackgroundVideo,
  advisorIntroVideo,
  fallbackHeroImage,
  heygenTestimonials,
  advisorPhotos,
  clientStoryCards,
  officeOrConsultationImages,
};

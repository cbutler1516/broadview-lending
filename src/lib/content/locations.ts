import type { Faq, RelatedRefs, SeoMeta } from "@/lib/content/types";

/**
 * Local Authority architecture. Reusable city templates that combine local
 * market guidance, relevant programs, local FAQs, and internal links. Built to
 * scale across WA first, then OR, CO, TX, FL, ID, CA, AZ, NV.
 */
export type LocationPage = {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  eyebrow: string;
  intro: string;
  marketGuidance: string[];
  /** Programs especially relevant locally. */
  programs: { name: string; note: string }[];
  localFaqs: Faq[];
  related: RelatedRefs;
  seo: SeoMeta;
};

export const locationPages: LocationPage[] = [
  {
    slug: "seattle-wa",
    city: "Seattle",
    state: "Washington",
    stateAbbr: "WA",
    eyebrow: "Seattle Mortgage Advisor",
    intro:
      "From first condos in the city to move-up homes on the Eastside commute, Seattle buyers face higher prices and competitive offers. A clear strategy matters here.",
    marketGuidance: [
      "Higher home values often push buyers into high-balance or jumbo territory.",
      "Competitive offers reward strong, ready pre-approvals.",
      "Tech-sector income (RSUs, bonuses) benefits from careful documentation.",
    ],
    programs: [
      { name: "Jumbo & high-balance", note: "Common given Seattle price points." },
      { name: "Conventional", note: "Strong-credit buyers with a down payment." },
      { name: "First-time buyer paths", note: "Low down payment options for condos and starters." },
    ],
    localFaqs: [
      {
        question: "Do I need a jumbo loan in Seattle?",
        answer:
          "Often, but not always — it depends on your price point and down payment. We'll confirm whether high-balance conforming or jumbo fits your purchase.",
      },
      {
        question: "How do I make a competitive offer in Seattle?",
        answer:
          "A fully reviewed pre-approval and a responsive advisor help your offer stand out. We prepare you before you tour.",
      },
    ],
    related: {
      landings: ["jumbo-loans", "first-time-homebuyer", "conventional-loans"],
      calculators: ["affordability-planner"],
      articles: ["how-much-home-can-you-afford", "self-employed-mortgage-guide"],
      funnels: ["purchase"],
    },
    seo: {
      title: "Seattle Mortgage Advisor | Home Loans in Seattle, WA",
      description:
        "Seattle mortgage guidance from Broadview Lending. Jumbo, conventional, and first-time buyer strategy with a real advisor.",
      keywords: ["Seattle mortgage", "Seattle home loans", "Seattle mortgage advisor"],
    },
  },
  {
    slug: "bellevue-wa",
    city: "Bellevue",
    state: "Washington",
    stateAbbr: "WA",
    eyebrow: "Bellevue Home Loans",
    intro:
      "Bellevue's premium market means larger loan amounts and buyers who value strategy. We help you structure financing around complex income and higher values.",
    marketGuidance: [
      "Higher values frequently require jumbo financing.",
      "Equity-rich homeowners often explore HELOCs for remodels and investments.",
      "Complex compensation rewards a planned documentation approach.",
    ],
    programs: [
      { name: "Jumbo", note: "Typical for Bellevue price points." },
      { name: "HELOC / home equity", note: "Popular for remodels and leverage." },
      { name: "Physician & professional", note: "Tailored options for high earners." },
    ],
    localFaqs: [
      {
        question: "Can I use my Bellevue home's equity for a remodel?",
        answer:
          "Often yes — a HELOC can fund a remodel while preserving your existing first mortgage rate. We'll compare it against alternatives.",
      },
    ],
    related: {
      landings: ["jumbo-loans", "physician-loans"],
      calculators: ["cash-out-vs-heloc"],
      comparisons: ["heloc-vs-cash-out"],
      funnels: ["purchase", "heloc"],
    },
    seo: {
      title: "Bellevue Home Loans | Mortgage Advisor in Bellevue, WA",
      description:
        "Bellevue mortgage guidance from Broadview Lending. Jumbo, home equity, and professional loan strategy with a real advisor.",
      keywords: ["Bellevue home loans", "Bellevue mortgage", "Bellevue HELOC"],
    },
  },
  {
    slug: "tacoma-wa",
    city: "Tacoma",
    state: "Washington",
    stateAbbr: "WA",
    eyebrow: "Tacoma Refinance & Home Loans",
    intro:
      "Tacoma offers relative affordability in the Puget Sound region — great for first-time buyers, FHA/VA paths, and homeowners weighing a refinance.",
    marketGuidance: [
      "More accessible price points suit first-time and lower-down-payment buyers.",
      "Many homeowners explore refinance or equity options as values rise.",
      "Proximity to JBLM makes VA financing especially relevant.",
    ],
    programs: [
      { name: "FHA & first-time buyer", note: "Flexible, low down payment paths." },
      { name: "VA", note: "Relevant for the area's military community." },
      { name: "Refinance", note: "Lower-payment and cash-out options." },
    ],
    localFaqs: [
      {
        question: "Is Tacoma good for first-time buyers?",
        answer:
          "Relatively, given more accessible prices than Seattle. FHA and low down payment options can help you get in. We'll map your budget first.",
      },
    ],
    related: {
      landings: ["fha-loans", "va-loans", "lower-payment"],
      calculators: ["affordability-planner"],
      articles: ["va-loan-benefits", "fha-vs-conventional"],
      funnels: ["fha", "va", "refinance"],
    },
    seo: {
      title: "Tacoma Refinance & Home Loans | Mortgage Advisor, WA",
      description:
        "Tacoma mortgage guidance from Broadview Lending. FHA, VA, first-time buyer, and refinance strategy with a real advisor.",
      keywords: ["Tacoma mortgage", "Tacoma refinance", "Tacoma VA loans"],
    },
  },
  {
    slug: "spokane-wa",
    city: "Spokane",
    state: "Washington",
    stateAbbr: "WA",
    eyebrow: "Spokane VA & Home Loans",
    intro:
      "Spokane combines affordability with steady demand — ideal for first-time buyers, VA borrowers, and homeowners exploring equity.",
    marketGuidance: [
      "Affordability supports low down payment and first-time strategies.",
      "VA financing is widely used in the region.",
      "Rising values open the door to equity strategies.",
    ],
    programs: [
      { name: "VA", note: "Common and powerful for eligible buyers." },
      { name: "FHA & first-time buyer", note: "Accessible entry paths." },
      { name: "Home equity", note: "For remodels and consolidation." },
    ],
    localFaqs: [
      {
        question: "Are VA loans common in Spokane?",
        answer:
          "Yes — many eligible buyers use VA financing for 0% down and no monthly mortgage insurance. We'll confirm your entitlement and options.",
      },
    ],
    related: {
      landings: ["va-loans", "fha-loans"],
      calculators: ["affordability-planner"],
      articles: ["va-loan-benefits"],
      funnels: ["va", "fha"],
    },
    seo: {
      title: "Spokane VA & Home Loans | Mortgage Advisor, WA",
      description:
        "Spokane mortgage guidance from Broadview Lending. VA, FHA, first-time buyer, and home equity strategy with a real advisor.",
      keywords: ["Spokane mortgage", "Spokane VA loans", "Spokane home loans"],
    },
  },
];

export function getLocation(slug: string): LocationPage | undefined {
  return locationPages.find((l) => l.slug === slug);
}

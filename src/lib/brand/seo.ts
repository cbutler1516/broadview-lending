import type { Metadata } from "next";
import { brand, siteUrl } from "./config";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.companyName} | Home Loans, Home Equity & Investor Financing`,
    template: `%s | ${brand.companyName}`,
  },
  description:
    "Broadview Lending is a premium conventional mortgage advisory platform and a sophisticated investor financing desk. Buy a home, access equity, or invest in real estate with a real advisor.",
  keywords: [
    "mortgage lender",
    "home loans",
    "purchase mortgage",
    "refinance",
    "VA loans",
    "FHA loans",
    "Seattle mortgage lender",
    "Washington mortgage lender",
    "national mortgage options",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: brand.companyName,
    url: siteUrl,
    title: `${brand.companyName} | Residential Mortgage Strategy`,
    description: brand.positioning.description,
  },
  robots: { index: true, follow: true },
};

export const pageMetadata = {
  home: {
    title: "Home Loans, Refinance & Home Equity",
    description:
      "Explore conventional, FHA, VA, and jumbo home loans with Broadview Lending. Get personal advisor guidance for buying a home, refinancing, or accessing home equity.",
  },
  purchase: {
    title: "Purchase Mortgage | Home Loan Options",
    description:
      "Explore purchase mortgage options with Broadview Lending. Conventional, FHA, VA, and jumbo home loan strategies tailored to your timeline, down payment, and credit profile.",
  },
  refinance: {
    title: "Refinance Mortgage | Lower Rate & Cash-Out Options",
    description:
      "See whether refinance may make sense for your goals. Compare rate-and-term, cash-out, and PMI removal strategies with a Washington mortgage lender.",
  },
  va: {
    title: "VA Home Loans | Veteran Mortgage Options",
    description:
      "Review potential VA loan paths for eligible veterans and active military. Understand benefits, eligibility factors, and next steps with Broadview Lending.",
  },
  fha: {
    title: "FHA Home Loans | First-Time Buyer Options",
    description:
      "Explore FHA mortgage options with flexible down payment requirements. First-time homebuyer guidance from a licensed mortgage lender serving Washington and beyond.",
  },
  heloc: {
    title: "Home Equity Solutions | HELOC Options",
    description:
      "Check potential HELOC and home equity options with Broadview Lending. Smart digital tools plus real mortgage advisor guidance.",
  },
  learn: {
    title: "Mortgage Education Hub | Home Buying & Refinance Guides",
    description:
      "Mortgage education for homebuyers and homeowners — purchase guides, VA and FHA loans, refinance strategies, HELOCs, and Pacific Northwest market insights.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Broadview Lending collects, uses, and protects information submitted through this website, including TCPA consent for mortgage communications.",
  },
  terms: {
    title: "Terms of Use",
    description:
      "Terms governing use of the Broadview Lending website and mortgage strategy tools. Educational content — not a loan offer or commitment to lend.",
  },
  disclosures: {
    title: "Disclosures & Licensing",
    description:
      "Broadview Lending licensing disclosures, NMLS information, Equal Housing Opportunity notice, and important mortgage consumer notices.",
  },
  contact: {
    title: "Contact & Schedule | Book a Mortgage Strategy Call",
    description:
      "Schedule a mortgage strategy call with Broadview Lending. Purchase, refinance, VA, FHA, and HELOC guidance from a licensed mortgage lender.",
  },
} as const;

export function buildPageMetadata(
  key: keyof typeof pageMetadata,
  overrides?: Partial<Metadata>,
): Metadata {
  const page = pageMetadata[key];
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: siteUrl,
    },
    ...overrides,
  };
}

/**
 * JSON-LD schema.org builders.
 *
 * Centralizes structured data so every landing page, article, FAQ block, and
 * tool can ship schema-ready markup for Google rich results and AI search
 * (AI Overviews, ChatGPT, Perplexity, Claude, Gemini).
 */
import { brand, siteUrl } from "@/lib/brand/config";
import type { Faq } from "@/lib/content/types";

type JsonLd = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    name: brand.companyName,
    legalName: brand.legalEntity,
    description: brand.positioning.description,
    url: siteUrl,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    areaServed: ["United States", "Washington", "Seattle"],
    sameAs: Object.values(brand.social).map((s) => s.href),
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: brand.companyName,
      url: siteUrl,
    },
  };
}

export function financialProductSchema(input: {
  name: string;
  description: string;
  path: string;
  category?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    category: input.category ?? "Mortgage",
    provider: {
      "@type": "MortgageBroker",
      name: brand.companyName,
      url: siteUrl,
    },
  };
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: brand.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: brand.companyName,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Render-ready helper: serialize one or more schema objects for a <script> tag. */
export function jsonLdString(...schemas: JsonLd[]): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}

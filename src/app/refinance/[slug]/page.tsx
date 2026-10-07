import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { LandingPageTemplate } from "@/components/landing/landing-page-template";
import { getProductByPath } from "@/lib/product/configs";
import {
  getLandingPage,
  getLandingPagesByEcosystem,
} from "@/lib/content/landing-pages";
import { siteUrl } from "@/lib/brand/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PRODUCT_SLUGS = [
  "rate-and-term-refinance",
  "cash-out-refinance",
  "fha-streamline",
  "va-irrrl",
];

export function generateStaticParams() {
  const landing = getLandingPagesByEcosystem("refinance").map((p) => ({ slug: p.slug }));
  const extra = PRODUCT_SLUGS.filter((slug) => !landing.some((item) => item.slug === slug)).map(
    (slug) => ({ slug }),
  );
  return [...landing, ...extra];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByPath(`/refinance/${slug}`);
  if (product) return productMetadata(product);

  const page = getLandingPage("refinance", slug);
  if (!page) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: `${siteUrl}${page.path}` },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: `${siteUrl}${page.path}`,
    },
  };
}

export default async function RefinanceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductByPath(`/refinance/${slug}`);
  if (product) return <ProductPageView product={product} />;

  const page = getLandingPage("refinance", slug);
  if (!page) notFound();

  return <LandingPageTemplate page={page} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { HomeEquityLandingPage } from "@/components/home-equity-landing-page";
import { getProductByPath } from "@/lib/product/configs";
import {
  getHelocLandingPage,
  helocLandingPages,
} from "@/lib/heloc/content";
import { siteUrl } from "@/lib/brand/config";

type HelocIntentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...helocLandingPages.map((page) => ({ slug: page.slug })),
    { slug: "home-equity-loan" },
  ];
}

export async function generateMetadata({
  params,
}: HelocIntentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByPath(`/heloc/${slug}`);
  if (product) return productMetadata(product);

  const page = getHelocLandingPage(slug);
  if (!page) {
    return {
      title: "Home Equity Solution Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    alternates: { canonical: `${siteUrl}${page.path}` },
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      url: `${siteUrl}${page.path}`,
    },
  };
}

export default async function HelocIntentPage({ params }: HelocIntentPageProps) {
  const { slug } = await params;
  const product = getProductByPath(`/heloc/${slug}`);
  if (product) return <ProductPageView product={product} />;

  const page = getHelocLandingPage(slug);
  if (!page) notFound();

  return <HomeEquityLandingPage page={page} />;
}

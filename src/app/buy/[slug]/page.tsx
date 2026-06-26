import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { LandingPageTemplate } from "@/components/landing/landing-page-template";
import {
  getLandingPage,
  getLandingPagesByEcosystem,
} from "@/lib/content/landing-pages";
import { siteUrl } from "@/lib/brand/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLandingPagesByEcosystem("buy").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage("buy", slug);
  if (!page) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: `${siteUrl}${page.path}`,
    },
  };
}

export default async function BuyLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage("buy", slug);
  if (!page) notFound();

  return (
    <>
      <SiteNav />
      <LandingPageTemplate page={page} />
      <ComplianceFooter />
    </>
  );
}

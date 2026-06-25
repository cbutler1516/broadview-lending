import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { HomeEquityLandingPage } from "@/components/home-equity-landing-page";
import {
  getHelocLandingPage,
  helocLandingPages,
} from "@/lib/heloc/content";
import { siteUrl } from "@/lib/brand/config";

type HelocIntentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return helocLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: HelocIntentPageProps): Promise<Metadata> {
  const { slug } = await params;
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
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      url: `${siteUrl}${page.path}`,
    },
  };
}

export default async function HelocIntentPage({ params }: HelocIntentPageProps) {
  const { slug } = await params;
  const page = getHelocLandingPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <SiteNav />
      <HomeEquityLandingPage page={page} />
      <ComplianceFooter />
    </>
  );
}

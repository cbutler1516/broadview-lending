import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { LocationTemplate } from "@/components/intelligence/location-template";
import { getLocation, locationPages } from "@/lib/content/locations";
import { siteUrl } from "@/lib/brand/config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locationPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) {
    return { title: "Location Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: location.seo.title,
    description: location.seo.description,
    keywords: location.seo.keywords,
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      url: `${siteUrl}/locations/${location.slug}`,
    },
  };
}

export default async function LocationPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <>
      <SiteNav />
      <LocationTemplate location={location} />
      <ComplianceFooter />
    </>
  );
}

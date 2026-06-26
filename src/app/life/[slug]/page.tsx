import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { LifeEventTemplate } from "@/components/intelligence/life-event-template";
import { getLifeEvent, lifeEvents } from "@/lib/content/life-events";
import { siteUrl } from "@/lib/brand/config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lifeEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getLifeEvent(slug);
  if (!event) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: event.seo.title,
    description: event.seo.description,
    openGraph: {
      title: event.seo.title,
      description: event.seo.description,
      url: `${siteUrl}/life/${event.slug}`,
    },
  };
}

export default async function LifeEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getLifeEvent(slug);
  if (!event) notFound();

  return (
    <>
      <SiteNav />
      <LifeEventTemplate event={event} />
      <ComplianceFooter />
    </>
  );
}

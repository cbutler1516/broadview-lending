import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { RelatedContent } from "@/components/content/related-content";
import { DecisionGuideRunner } from "@/components/intelligence/decision-guide-runner";
import { WhatHappensNext } from "@/components/what-happens-next";
import { decisionGuides, getGuide } from "@/lib/content/decision-guides";
import { siteUrl } from "@/lib/brand/config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return decisionGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return { title: "Guide Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: guide.seo.title,
    description: guide.seo.description,
    openGraph: {
      title: guide.seo.title,
      description: guide.seo.description,
      url: `${siteUrl}/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="guides"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]}
          eyebrow={guide.eyebrow}
          title={guide.question}
          subtitle={guide.intro}
          ctas={[
            { label: "Start This Guide", href: "#guide" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: `guide_${guide.slug}_hero`,
              variant: "secondary",
            },
          ]}
        />

        <section id="guide" className="scroll-mt-24 py-12 md:py-16">
          <div className="section-container">
            <DecisionGuideRunner guide={guide} />
          </div>
        </section>

        <RelatedContent
          refs={guide.related}
          className="border-t border-border py-14 md:py-18"
        />

        <WhatHappensNext className="border-y border-border bg-surface-muted" />
      </main>
      <ComplianceFooter />
    </>
  );
}

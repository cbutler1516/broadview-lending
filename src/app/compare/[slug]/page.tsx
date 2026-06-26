import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
import { ComparisonView } from "@/components/intelligence/comparison-view";
import { WhatWeDiscuss } from "@/components/intelligence/what-we-discuss";
import { WhatHappensNext } from "@/components/what-happens-next";
import { comparisons, getComparison } from "@/lib/content/comparisons";
import { jsonLdString, webPageSchema } from "@/lib/seo/schema";
import { siteUrl } from "@/lib/brand/config";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) {
    return { title: "Comparison Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: c.seo.title,
    description: c.seo.description,
    openGraph: {
      title: c.seo.title,
      description: c.seo.description,
      url: `${siteUrl}/compare/${c.slug}`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(
              webPageSchema({
                name: c.seo.title,
                description: c.seo.description,
                path: `/compare/${c.slug}`,
              }),
            ),
          }}
        />
        <CinematicHero
          theme="compare"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: c.title, path: `/compare/${c.slug}` },
          ]}
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.intro}
          ctas={[
            { label: "Compare My Options", href: "#comparison" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: `compare_${c.slug}_hero`,
              variant: "secondary",
            },
          ]}
        />

        <div id="comparison" className="scroll-mt-24" />
        <ComparisonView
          slug={c.slug}
          a={c.a}
          b={c.b}
          questionsToDiscuss={c.questionsToDiscuss}
          thingsToConsider={c.thingsToConsider}
          className="py-12 md:py-16"
        />

        {c.faqs && c.faqs.length > 0 && (
          <FaqList faqs={c.faqs} className="pb-12 md:pb-16" />
        )}

        <RelatedContent
          refs={c.related}
          className="border-t border-border py-14 md:py-18"
        />

        <WhatWeDiscuss
          sourceId={`compare_${c.slug}`}
          className="border-y border-border bg-surface-muted py-14 md:py-18"
        />

        <WhatHappensNext className="border-b border-border" />
      </main>
      <ComplianceFooter />
    </>
  );
}

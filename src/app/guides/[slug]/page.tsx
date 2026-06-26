import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
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
        <section className="border-b border-border bg-surface">
          <div className="section-container py-10 md:py-14">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Guides", path: "/guides" },
                { name: guide.title, path: `/guides/${guide.slug}` },
              ]}
            />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-brand">
              {guide.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
              {guide.question}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {guide.intro}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
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

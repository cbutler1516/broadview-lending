import Link from "next/link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { ConversationPreview } from "@/components/experience/conversation-preview";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
import { WhatHappensNext } from "@/components/what-happens-next";
import { brand } from "@/lib/brand/config";
import {
  getHelocFunnelHref,
  homeEquityCopy,
  helocLandingPages,
  type HelocLandingPage,
} from "@/lib/heloc/content";
import {
  financialProductSchema,
  jsonLdString,
  webPageSchema,
} from "@/lib/seo/schema";

type HomeEquityLandingPageProps = {
  page: HelocLandingPage;
};

export function HomeEquityLandingPage({ page }: HomeEquityLandingPageProps) {
  const funnelHref = getHelocFunnelHref(page.path);
  const relatedPages = helocLandingPages
    .filter((item) => item.slug !== page.slug)
    .slice(0, 4);
  const schema = [
    webPageSchema({
      name: page.metadata.title,
      description: page.metadata.description,
      path: page.path,
    }),
    financialProductSchema({
      name: page.title,
      description: page.description,
      path: page.path,
      category: "Home Equity",
    }),
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(...schema) }}
      />
      <CinematicHero
        theme="home-equity"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Home Equity", path: "/heloc" },
          { name: page.h1, path: page.path },
        ]}
        eyebrow={page.eyebrow}
        title={page.h1}
        subtitle={page.description}
        advisorPromise={homeEquityCopy.humanPromise}
        note={brand.trust.funnelDuration}
        ctas={[{ label: page.primaryCta, href: funnelHref }]}
      />

      <section className="border-t border-border py-12 md:py-16">
        <div className="section-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
              Built for this search
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A home equity page that leads to a real strategy.
            </h2>
            <p className="mt-4 text-muted">{page.goalPrompt}</p>
            <Link href={funnelHref} className="btn-primary mt-6">
              {page.primaryCta}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {page.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)]"
              >
                <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConversationPreview
        topics={page.advisorNotes.slice(0, 4)}
        heading="What your advisor will prepare"
        className="border-t border-border"
      />

      <AdvisorTrustSection
        eyebrow="Why Broadview"
        heading="Advisor expertise before recommendations."
        paragraphs={[
          "Home equity decisions are rarely just about the highest line amount. Your Broadview advisor reviews the property, purpose, payment impact, and timing together.",
          "The online experience helps us prepare quickly. The advisor conversation helps you compare options with context.",
        ]}
        className="border-t border-border bg-surface-muted"
      />

      <FaqList
        faqs={page.faqs}
        heading={`${page.title}: related questions`}
        className="py-12 md:py-14"
      />

      <RelatedContent
        refs={page.related}
        className="border-t border-border py-12 md:py-14"
      />

      <section className="border-t border-border py-12 md:py-14">
        <div className="section-container">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                Related home equity topics
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Compare nearby strategies
              </h2>
            </div>
            <Link href={funnelHref} className="btn-primary md:shrink-0">
              {page.primaryCta}
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedPages.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="card-elevated block p-5"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 md:py-16">
        <div className="section-container text-center">
          <Link href={funnelHref} className="btn-primary">
            {page.primaryCta}
          </Link>
          <ComplianceDisclaimer className="mx-auto mt-8 max-w-2xl text-center" />
        </div>
      </section>

      <WhatHappensNext className="border-t border-border bg-surface-muted" compact />
    </main>
  );
}

import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
import { AdvisorNotes } from "@/components/trust/trust-modules";
import { WhatWeDiscuss } from "@/components/intelligence/what-we-discuss";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { WhatHappensNext } from "@/components/what-happens-next";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import {
  financialProductSchema,
  jsonLdString,
  webPageSchema,
} from "@/lib/seo/schema";
import {
  landingEcosystems,
  type LandingPage,
} from "@/lib/content/landing-pages";
import { brand } from "@/lib/brand/config";

type LandingPageTemplateProps = {
  page: LandingPage;
};

export function LandingPageTemplate({ page }: LandingPageTemplateProps) {
  const ecosystem = landingEcosystems[page.ecosystem];
  const schema =
    page.schema === "FinancialProduct"
      ? financialProductSchema({
          name: page.seo.title,
          description: page.seo.description,
          path: page.path,
        })
      : webPageSchema({
          name: page.seo.title,
          description: page.seo.description,
          path: page.path,
        });

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
      />
      <EngagementTracker contentId={page.path} contentType="landing" />

      <section className="border-b border-border bg-surface">
        <div className="section-container py-10 md:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: ecosystem.title, path: ecosystem.path },
              { name: page.seo.title, path: page.path },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={page.funnelHref} className="btn-primary">
                  {page.primaryCta}
                </Link>
                <BookingLink location={`landing_${page.slug}`} className="btn-secondary">
                  {page.secondaryCta}
                </BookingLink>
              </div>
              <p className="mt-4 text-sm text-muted">{brand.trust.funnelDuration}</p>
            </div>

            <div className="card-elevated p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                Why this fits
              </p>
              <ul className="mt-5 space-y-3">
                {page.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand"
                    >
                      ✓
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AdvisorNotes notes={page.advisorNotes} className="py-14 md:py-18" />

      <AdvisorTrustSection className="border-y border-border bg-surface-muted" />

      <FaqList faqs={page.faqs} className="py-14 md:py-18" />

      <RelatedContent
        refs={page.related}
        className="border-t border-border py-14 md:py-18"
      />

      <WhatWeDiscuss
        sourceId={`landing_${page.slug}`}
        className="border-y border-border bg-surface-muted py-14 md:py-18"
      />

      <WhatHappensNext className="border-b border-border" />

      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="card-elevated mx-auto max-w-3xl overflow-hidden">
            <div className="bg-brand px-8 py-12 text-center text-white md:px-12">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {page.primaryCta}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                A Broadview advisor will personally review your information and walk
                through your options with you.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={page.funnelHref}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
                >
                  {page.primaryCta}
                </Link>
                <BookingLink
                  location={`landing_${page.slug}_final`}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {page.secondaryCta}
                </BookingLink>
              </div>
            </div>
            <ComplianceDisclaimer className="px-6 py-4 text-center md:px-8" />
          </div>
        </div>
      </section>
    </main>
  );
}

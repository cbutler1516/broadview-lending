import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { ConversationPreview } from "@/components/experience/conversation-preview";
import { AdvisorPromise } from "@/components/experience/advisor-promise";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
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
import { loanImages } from "@/lib/media/assets";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";

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

      <CinematicHero
        theme={page.ecosystem}
        video={page.ecosystem === "buy" ? loanImages.purchase : loanImages.refinance}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: ecosystem.title, path: ecosystem.path },
          { name: page.seo.title, path: page.path },
        ]}
        eyebrow={page.eyebrow}
        title={page.h1}
        subtitle={page.intro}
        note={brand.trust.funnelDuration}
        ctas={[
          { label: page.primaryCta, href: page.funnelHref },
          {
            label: page.secondaryCta,
            booking: true,
            bookingLocation: `landing_${page.slug}`,
            variant: "secondary",
          },
        ]}
      />

      {page.sections && (
        <section className="section-container py-12 md:py-16" aria-label="Planning guide">
          <div className="mx-auto max-w-3xl space-y-8">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
                {section.body.map((paragraph) => <p key={paragraph} className="mt-3 leading-relaxed text-muted">{paragraph}</p>)}
              </section>
            ))}
            {page.sources && (
              <div className="border-t border-border pt-6">
                <h2 className="text-base font-semibold">Sources and further reading</h2>
                <ul className="mt-3 space-y-3">
                  {page.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm text-brand underline underline-offset-4">{source.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
                </ul>
                <ComplianceDisclaimer className="mt-5" />
              </div>
            )}
          </div>
        </section>
      )}

      <ConversationPreview
        topics={page.advisorNotes.slice(0, 4)}
        className="border-t border-border"
      />

      <AdvisorPromise compact />

      <FaqList faqs={page.faqs} className="py-12 md:py-14" />

      <RelatedContent
        refs={page.related}
        className="border-t border-border py-12 md:py-14"
      />

      <section className="border-t border-border py-14 md:py-16">
        <div className="section-container text-center">
          <Link href={page.funnelHref} className="btn-primary">
            {page.primaryCta}
          </Link>
          <div className="mt-4">
            <BookingLink location={`landing_${page.slug}_final`} className="btn-secondary">
              {page.secondaryCta}
            </BookingLink>
          </div>
        </div>
      </section>
    </main>
  );
}

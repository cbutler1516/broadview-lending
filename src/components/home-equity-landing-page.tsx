import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { ConversationPreview } from "@/components/experience/conversation-preview";
import { AdvisorPromise } from "@/components/experience/advisor-promise";
import { FaqList } from "@/components/content/faq-list";
import { WhatHappensNext } from "@/components/what-happens-next";
import { brand } from "@/lib/brand/config";
import {
  getHelocFunnelHref,
  homeEquityCopy,
  type HelocLandingPage,
} from "@/lib/heloc/content";

type HomeEquityLandingPageProps = {
  page: HelocLandingPage;
};

export function HomeEquityLandingPage({ page }: HomeEquityLandingPageProps) {
  const funnelHref = getHelocFunnelHref(page.path);

  return (
    <main className="flex-1">
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
        ctas={[
          { label: page.primaryCta, href: funnelHref },
          {
            label: page.secondaryCta,
            booking: true,
            bookingLocation: `${page.slug}_hero`,
            bookingFunnelType: "heloc",
            variant: "secondary",
          },
        ]}
      />

      <ConversationPreview
        topics={page.advisorNotes.slice(0, 4)}
        heading="Here's what we'd discuss together"
        className="border-t border-border"
      />

      <AdvisorPromise compact />

      <FaqList faqs={page.faqs} className="py-12 md:py-14" />

      <section className="border-t border-border py-14 md:py-16">
        <div className="section-container text-center">
          <Link href={funnelHref} className="btn-primary">
            {page.primaryCta}
          </Link>
          <div className="mt-4">
            <BookingLink
              location={`${page.slug}_final`}
              funnelType="heloc"
              className="btn-secondary"
            >
              {page.secondaryCta}
            </BookingLink>
          </div>
          <ComplianceDisclaimer className="mx-auto mt-8 max-w-2xl text-center" />
        </div>
      </section>

      <WhatHappensNext className="border-t border-border bg-surface-muted" compact />
    </main>
  );
}

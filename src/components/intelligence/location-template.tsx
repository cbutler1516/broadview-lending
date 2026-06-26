import { CinematicHero } from "@/components/media/cinematic-hero";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
import { WhatWeDiscuss } from "@/components/intelligence/what-we-discuss";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { WhatHappensNext } from "@/components/what-happens-next";
import { InViewTracker } from "@/components/analytics/in-view-tracker";
import { jsonLdString, webPageSchema } from "@/lib/seo/schema";
import type { LocationPage } from "@/lib/content/locations";

export function LocationTemplate({ location }: { location: LocationPage }) {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            webPageSchema({
              name: location.seo.title,
              description: location.seo.description,
              path: `/locations/${location.slug}`,
            }),
          ),
        }}
      />
      <InViewTracker
        event="location_viewed"
        metadata={{ location: location.slug }}
      />

      <CinematicHero
        theme="locations"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          {
            name: `${location.city}, ${location.stateAbbr}`,
            path: `/locations/${location.slug}`,
          },
        ]}
        eyebrow={location.eyebrow}
        title={`Mortgage strategy in ${location.city}, ${location.stateAbbr}`}
        subtitle={location.intro}
        ctas={[
          {
            label: "Talk With A Local Advisor",
            booking: true,
            bookingLocation: `location_${location.slug}_hero`,
          },
          { label: "Build My Strategy", href: "/#funnels", variant: "secondary" },
        ]}
      />

      <section className="section-container grid gap-10 py-12 md:py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {location.city} market guidance
          </h2>
          <ul className="mt-4 space-y-2.5">
            {location.marketGuidance.map((g) => (
              <li key={g} className="flex items-start gap-3 text-sm text-muted">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Programs that fit {location.city}
          </h2>
          <div className="mt-4 space-y-3">
            {location.programs.map((p) => (
              <div key={p.name} className="card-elevated p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-muted">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqList
        faqs={location.localFaqs}
        heading={`${location.city} mortgage questions`}
        className="pb-12 md:pb-16"
      />

      <AdvisorTrustSection className="border-y border-border bg-surface-muted" />

      <RelatedContent
        refs={location.related}
        className="border-b border-border py-14 md:py-18"
      />

      <WhatWeDiscuss
        sourceId={`location_${location.slug}`}
        className="py-14 md:py-18"
      />

      <WhatHappensNext className="border-t border-border bg-surface-muted" />
    </main>
  );
}

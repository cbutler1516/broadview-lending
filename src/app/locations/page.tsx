import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { locationPages } from "@/lib/content/locations";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Local Mortgage Advisors | Washington & Beyond",
  description:
    "Local mortgage guidance from Broadview Lending — Seattle, Bellevue, Tacoma, Spokane and more. Local market insight plus a real advisor.",
  openGraph: { url: `${siteUrl}/locations` },
};

export default function LocationsHubPage() {
  const byState = locationPages.reduce<Record<string, typeof locationPages>>(
    (acc, loc) => {
      (acc[loc.state] ??= []).push(loc);
      return acc;
    },
    {},
  );

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="locations"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]}
          eyebrow="Local authority"
          title="Local guidance, real advisors"
          subtitle="Mortgage strategy with local market context. Starting in Washington and growing across the West."
          ctas={[
            {
              label: "Talk With A Local Advisor",
              booking: true,
              bookingLocation: "locations_hub_hero",
            },
            { label: "Build My Strategy", href: "/#funnels", variant: "secondary" },
          ]}
        />

        <div className="section-container space-y-12 py-14 md:py-18">
          {Object.entries(byState).map(([state, locs]) => (
            <section key={state}>
              <h2 className="text-2xl font-semibold tracking-tight">{state}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {locs.map((loc) => (
                  <TrackedLink
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    group="locations_hub"
                    label={`${loc.city}, ${loc.stateAbbr}`}
                    className="card-elevated group flex flex-col p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                      {loc.eyebrow}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                      {loc.city}, {loc.stateAbbr}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {loc.intro}
                    </p>
                  </TrackedLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

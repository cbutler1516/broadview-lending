import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
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
        <section className="border-b border-border bg-surface">
          <div className="section-container py-10 md:py-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Locations", path: "/locations" },
              ]}
            />
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Local guidance, real advisors
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Mortgage strategy with local market context. Starting in Washington and
              growing across the West.
            </p>
          </div>
        </section>

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

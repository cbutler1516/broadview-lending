import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { comparisons } from "@/lib/content/comparisons";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Mortgage Comparisons | Weigh Your Options",
  description:
    "Side-by-side mortgage comparisons from Broadview Lending — HELOC vs cash-out, FHA vs conventional, buy vs rent, and more. Best uses, advantages, and tradeoffs.",
  openGraph: { url: `${siteUrl}/compare` },
};

export default function CompareHubPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="compare"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]}
          eyebrow="Mortgage comparisons"
          title="Compare your options"
          subtitle="Fair, side-by-side comparisons of the decisions homeowners and buyers face most — with the questions we'd discuss together."
          ctas={[
            { label: "Build My Strategy", href: "/#funnels" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: "compare_hub_hero",
              variant: "secondary",
            },
          ]}
        />

        <div className="section-container py-14 md:py-18">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => (
              <TrackedLink
                key={c.slug}
                href={`/compare/${c.slug}`}
                group="compare_hub"
                label={c.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {c.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {c.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {c.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Compare
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

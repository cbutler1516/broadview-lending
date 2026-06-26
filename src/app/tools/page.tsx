import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { calculators } from "@/lib/content/calculators";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Calculator & Strategy Center | Mortgage Decision Tools",
  description:
    "Decision-making mortgage tools from Broadview Lending — affordability, cash-out vs HELOC, refinancing, debt consolidation, and more, each with a personalized strategy summary.",
  openGraph: { url: `${siteUrl}/tools` },
};

const categoryLabels: Record<string, string> = {
  buy: "Buying",
  refinance: "Refinancing",
  "home-equity": "Home Equity",
  planning: "Planning",
};

export default function ToolsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="tools"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]}
          eyebrow="Calculator & Strategy Center"
          title="Decision tools, not just calculators"
          subtitle="Each tool ends with a personalized strategy snapshot and a real advisor to talk it through."
          ctas={[
            { label: "Build My Strategy", href: "/#funnels" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: "tools_hub_hero",
              variant: "secondary",
            },
          ]}
        />

        <div className="section-container py-14 md:py-18">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => {
              const isLive = calc.status === "live";
              const card = (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                      {categoryLabels[calc.category]}
                    </p>
                    {!isLive && (
                      <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                    {calc.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {calc.tagline}
                  </p>
                  {isLive && (
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Open tool
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  )}
                </>
              );

              return isLive ? (
                <TrackedLink
                  key={calc.slug}
                  href={`/tools/${calc.slug}`}
                  group="tools_hub"
                  label={calc.title}
                  className="card-elevated group flex flex-col p-6"
                >
                  {card}
                </TrackedLink>
              ) : (
                <div
                  key={calc.slug}
                  className="card-elevated flex flex-col p-6 opacity-70"
                >
                  {card}
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href="/learn" className="btn-secondary">
              Visit the Learning Center
            </Link>
          </div>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

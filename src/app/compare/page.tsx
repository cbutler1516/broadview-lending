import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
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
        <section className="border-b border-border bg-surface">
          <div className="section-container py-10 md:py-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Compare", path: "/compare" },
              ]}
            />
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Compare Your Options
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Fair, side-by-side comparisons of the decisions homeowners and buyers
              face most — with the questions we&apos;d discuss together.
            </p>
          </div>
        </section>

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

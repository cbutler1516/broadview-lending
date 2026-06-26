import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { decisionGuides } from "@/lib/content/decision-guides";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Interactive Decision Guides | Mortgage Clarity",
  description:
    "Answer a few thoughtful questions and get educational guidance on HELOCs, refinancing, down payments, and more — from Broadview Lending. Clarity, not qualification.",
  openGraph: { url: `${siteUrl}/guides` },
};

export default function GuidesHubPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="border-b border-border bg-surface">
          <div className="section-container py-10 md:py-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Guides", path: "/guides" },
              ]}
            />
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Interactive Decision Guides
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              A few thoughtful questions, then clear educational guidance. These
              guides help you understand your options — they never imply approval or
              qualification.
            </p>
          </div>
        </section>

        <div className="section-container py-14 md:py-18">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {decisionGuides.map((guide) => (
              <TrackedLink
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                group="guides_hub"
                label={guide.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {guide.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {guide.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {guide.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Start guide
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

import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { WhatHappensNext } from "@/components/what-happens-next";
import { HeroMedia } from "@/components/hero-media";
import type { MediaAsset } from "@/lib/media/assets";
import {
  getLandingPagesByEcosystem,
  landingEcosystems,
  type LandingEcosystem,
} from "@/lib/content/landing-pages";

type EcosystemHubProps = {
  ecosystem: LandingEcosystem;
  /** Optional Living Architecture hero video for this ecosystem. */
  heroVideo?: MediaAsset;
  /** Optional glass caption rendered over the hero video. */
  heroCaption?: string;
};

export function EcosystemHub({
  ecosystem,
  heroVideo,
  heroCaption,
}: EcosystemHubProps) {
  const meta = landingEcosystems[ecosystem];
  const pages = getLandingPagesByEcosystem(ecosystem);

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-surface">
        <div className="section-container py-10 md:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: meta.title, path: meta.path },
            ]}
          />
          <div
            className={
              heroVideo
                ? "mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
                : "mt-8"
            }
          >
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.08]">
                {meta.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                {meta.intro}
              </p>
            </div>
            {heroVideo && (
              <HeroMedia
                video={heroVideo}
                caption={heroCaption}
                fallback={
                  <div className="card-elevated p-6 md:p-8">
                    <p className="text-sm font-semibold text-brand">
                      {meta.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {meta.intro}
                    </p>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="section-container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <TrackedLink
                key={page.path}
                href={page.path}
                group={`${ecosystem}_hub`}
                label={page.seo.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {page.seo.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {page.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </TrackedLink>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/tools" className="btn-secondary">
              Explore Calculators
            </Link>
            <Link href="/learn" className="btn-secondary">
              Visit the Learning Center
            </Link>
          </div>
        </div>
      </section>

      <AdvisorTrustSection className="border-y border-border bg-surface-muted" />
      <WhatHappensNext className="border-b border-border" />
    </main>
  );
}

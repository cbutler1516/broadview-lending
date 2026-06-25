import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelSelectionGrid } from "@/components/funnel-selection-grid";
import { HomepageCtas } from "@/components/homepage-ctas";
import { BookingLink } from "@/components/booking-link";
import { WhatHappensNext } from "@/components/what-happens-next";
import { contentCategories } from "@/lib/content/hub";
import { brand, siteUrl } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("home");

const whyBroadview = [
  {
    title: "Technology Accelerates Understanding",
    body: "Your answers help us prepare quickly so the advisor conversation starts with context, not a blank intake script.",
  },
  {
    title: "People Create Confidence",
    body: "A real mortgage advisor reviews your information, answers questions, and helps you understand the trade-offs.",
  },
  {
    title: "Goal-First Guidance",
    body: "We start with what you want to accomplish, then discuss loan options only after the strategy is clear.",
  },
  {
    title: "Licensed & Transparent",
    body: `${brand.nmlsDisplay}. Licensed across multiple states with clear disclosures and Equal Housing commitment.`,
  },
];

const platformSteps = [
  {
    title: "Discover",
    body: "Tell us what you want your mortgage or home equity decision to make possible.",
  },
  {
    title: "Understand",
    body: "We ask only the details needed to understand your situation and prepare the conversation.",
  },
  {
    title: "Recommend",
    body: "You receive an initial strategy, not a generic product pitch or approval promise.",
  },
  {
    title: "Connect & Guide",
    body: "A real advisor walks through your options and helps you move forward with confidence.",
  },
];

const loanTypes = [
  "Conventional Purchase",
  "FHA Home Loans",
  "VA Loans",
  "Jumbo Mortgages",
  "Rate & Term Refinance",
  "Cash-Out Refinance",
  "Home Equity Solutions / HELOC",
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    name: brand.companyName,
    legalName: brand.legalEntity,
    description: brand.positioning.description,
    url: siteUrl,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    areaServed: ["United States", "Washington", "Seattle"],
    sameAs: Object.values(brand.social).map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="flex-1">
        <section className="border-b border-border bg-surface">
          <div className="section-container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-medium text-brand">{brand.positioning.tagline}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.08]">
                Every mortgage starts with a conversation. Every great mortgage starts with a strategy.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                Whether you&apos;re buying your first home, refinancing, or accessing
                your equity, we&apos;ll help you understand your options before
                recommending a loan.
              </p>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground">
                Technology helps us understand your situation quickly. People help you
                make the right decision.
              </p>
              <HomepageCtas location="hero" />
              <p className="mt-4 text-sm text-muted">{brand.trust.funnelDuration}</p>
            </div>
          </div>
        </section>

        <section id="funnels" className="py-16 md:py-20">
          <div className="section-container">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                What would you like to accomplish?
              </h2>
              <p className="mt-3 text-muted">
                Choose a goal so we can build a smarter mortgage strategy around the
                life decision behind the loan.
              </p>
            </div>
            <FunnelSelectionGrid />
          </div>
        </section>

        <section className="border-y border-border bg-surface-muted py-16 md:py-20">
          <div className="section-container">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                A Mortgage Strategy Platform, not another mortgage website
              </h2>
              <p className="mt-3 text-muted">
                People don&apos;t want a mortgage. They want a home, flexibility,
                financial freedom, or a trusted guide for a major decision.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyBroadview.map((item) => (
                <div key={item.title} className="card-elevated p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-container">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              The Broadview strategy flow
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {platformSteps.map((item) => (
                <div key={item.title}>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-16 md:py-20">
          <div className="section-container">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Loan options come after the strategy
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              We can help compare conventional, government, refinance, and home
              equity paths, but the conversation starts with your goal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {loanTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Mortgage education
                </h2>
                <p className="mt-3 max-w-xl text-muted">
                  Clear guides on buying, refinancing, VA and FHA loans, and Pacific
                  Northwest market insights.
                </p>
              </div>
              <Link href="/learn" className="btn-secondary">
                Visit Learn Hub
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {contentCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/learn#${cat.slug}`}
                  className="card-elevated block p-5"
                >
                  <h3 className="font-semibold">{cat.title}</h3>
                  <p className="mt-2 text-sm text-muted">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="border-t border-border py-16 md:py-24">
          <div className="section-container">
            <div className="card-elevated mx-auto max-w-3xl overflow-hidden">
              <div className="bg-brand px-8 py-12 text-center text-white md:px-12">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Ready to talk through your options?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-white/85">
                  Start with a personalized strategy assessment, or talk with a
                  licensed mortgage advisor serving Washington and nationwide borrowers.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#funnels"
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-white/90"
                  >
                    {brand.ctas.primary}
                  </Link>
                  <BookingLink
                    location="homepage_consultation_band"
                    className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {brand.ctas.secondary}
                  </BookingLink>
                </div>
              </div>
              <p className="px-6 py-4 text-center text-xs leading-relaxed text-muted md:px-8">
                {brand.disclaimers.consumerNotice} {brand.disclaimers.educationalNotice}
              </p>
            </div>
          </div>
        </section>
      </main>

      <WhatHappensNext className="border-t border-border bg-surface-muted" />
      <ComplianceFooter />
    </>
  );
}

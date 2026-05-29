import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelSelectionGrid } from "@/components/funnel-selection-grid";
import { HomepageCtas } from "@/components/homepage-ctas";
import { BookingLink } from "@/components/booking-link";
import { contentCategories } from "@/lib/content/hub";
import { brand, siteUrl } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("home");

const whyBroadview = [
  {
    title: "50+ Lending Partners",
    body: "As a mortgage broker and lender, we compare options across a broad network to help find competitive residential rates and terms.",
  },
  {
    title: "Purchase-First Strategy",
    body: "Built for homebuyers and homeowners — purchase, refinance, FHA, VA, jumbo, and HELOC paths tailored to your situation.",
  },
  {
    title: "Licensed & Transparent",
    body: `${brand.nmlsDisplay}. Licensed across multiple states with clear disclosures and Equal Housing commitment.`,
  },
  {
    title: "Human Guidance",
    body: "Your online strategy is the starting point — a licensed mortgage advisor helps you move from options to application.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Choose Your Goal",
    body: "Buy, refinance, access equity, or explore VA and FHA options.",
  },
  {
    step: "02",
    title: "Answer a Few Questions",
    body: "About 60 seconds of qualification questions — no credit pull to start.",
  },
  {
    step: "03",
    title: "Get Your Strategy",
    body: "See potential loan paths and a personalized next step — locked until you opt in.",
  },
  {
    step: "04",
    title: "Book a Strategy Call",
    body: "Talk with a mortgage advisor about programs, payments, and timeline.",
  },
];

const loanTypes = [
  "Conventional Purchase",
  "FHA Home Loans",
  "VA Loans",
  "Jumbo Mortgages",
  "Rate & Term Refinance",
  "Cash-Out Refinance",
  "HELOC / Home Equity",
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
              <p className="text-sm font-medium text-brand">
                {brand.legalEntity} · {brand.nmlsDisplay}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.08]">
                Find the right home loan strategy — not just a rate quote.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {brand.positioning.description} Serving homebuyers and homeowners
                in Washington, Seattle, and nationwide.
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
                What are you looking to do?
              </h2>
              <p className="mt-3 text-muted">
                Choose a path to see potential mortgage options. Qualification
                questions come first — contact info only when your strategy is ready.
              </p>
            </div>
            <FunnelSelectionGrid />
          </div>
        </section>

        <section className="border-y border-border bg-surface-muted py-16 md:py-20">
          <div className="section-container">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Residential mortgage expertise
              </h2>
              <p className="mt-3 text-muted">{brand.positioning.residentialFocus}</p>
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
              How it works
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((item) => (
                <div key={item.step}>
                  <span className="text-4xl font-light text-brand/30">{item.step}</span>
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
              Home loan options we help with
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Conventional, government, and equity solutions for primary residences —
              not private money or hard money lending.
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
                  Start with a 60-second strategy check, or book a call with a licensed
                  mortgage advisor serving Washington and nationwide borrowers.
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

      <ComplianceFooter />
    </>
  );
}

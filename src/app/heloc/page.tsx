import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { BookingLink } from "@/components/booking-link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { WhatHappensNext } from "@/components/what-happens-next";
import { HeroMedia } from "@/components/hero-media";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { TestimonialMediaSection } from "@/components/testimonial-media-section";
import { homeEquityBackgroundVideo, heygenTestimonials } from "@/lib/media/assets";
import { brand, siteUrl } from "@/lib/brand/config";
import {
  getHelocFunnelHref,
  helocGoalCards,
  homeEquityCopy,
} from "@/lib/heloc/content";

export const metadata: Metadata = {
  title: "Home Equity Solutions | HELOC Guidance",
  description:
    "Access your home equity with a real advisor by your side. Explore HELOC and cash-out refinance options with Broadview Lending.",
  openGraph: {
    title: "Home Equity Solutions | Broadview Lending",
    description:
      "Technology helps us understand your situation quickly. A real mortgage advisor helps you make the right decision.",
    url: `${siteUrl}/heloc`,
  },
};

const trustItems = [
  "A real person will review your information.",
  "Someone will call you and answer your questions.",
  "Someone will walk you through your home equity and mortgage options.",
  "No call-center feel, no pressure, and no obligation.",
];

const ownerOccupiedPath = [
  "Home improvements and repairs",
  "Debt consolidation and monthly cash-flow flexibility",
  "Emergency funds or future access to equity",
  "Education, ADU planning, or family support",
  "Keeping a current low first-mortgage rate",
];

const investorPath = [
  "Rental property equity review",
  "DSCR possibilities and investor structures",
  "Portfolio leverage and acquisition planning",
  "Cash-flow, reserves, and lien-position considerations",
];

export default function HelocHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `${brand.companyName} Home Equity Solutions`,
    url: `${siteUrl}/heloc`,
    description:
      "Human-first HELOC and home equity guidance for homeowners and real estate investors.",
    parentOrganization: {
      "@type": "Organization",
      name: brand.companyName,
    },
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
          <div className="section-container grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
            <div>
              <p className="text-sm font-medium text-brand">
                Home Equity Solutions by Broadview Lending
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.08]">
                Access your home equity with a real advisor by your side.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {homeEquityCopy.humanPromise}
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-foreground">
                You are starting a strategy conversation. Your answers help us
                prepare, and the real value comes from the conversation that follows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={getHelocFunnelHref("/heloc")} className="btn-primary">
                  {homeEquityCopy.primaryCta}
                </Link>
                <BookingLink
                  location="heloc_hub_hero"
                  funnelType="heloc"
                  className="btn-secondary"
                >
                  {homeEquityCopy.secondaryCta}
                </BookingLink>
              </div>
              <p className="mt-4 text-sm text-muted">{brand.trust.funnelDuration}</p>
            </div>

            <HeroMedia
              video={homeEquityBackgroundVideo}
              fallback={
                <aside className="card-elevated p-6 md:p-8">
                  <p className="text-sm font-medium text-brand">What happens next</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Smart digital intake, followed by human guidance.
                  </h2>
                  <div className="mt-5 space-y-3">
                    {trustItems.map((item) => (
                      <p
                        key={item}
                        className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-muted"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </aside>
              }
            />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-container">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-brand">Start with your goal</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                What would access to your home equity make possible?
              </h2>
              <p className="mt-3 text-muted">
                Choose the outcome you are hoping for, or go straight into the
                personalized strategy assessment.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {helocGoalCards.map((goal) => (
                <Link key={goal.href} href={goal.href} className="card-elevated block p-5">
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{goal.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface-muted py-16 md:py-20">
          <div className="section-container grid gap-8 lg:grid-cols-2">
            <div className="card-elevated p-6 md:p-8">
              <p className="text-sm font-medium text-brand">HELOC</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Flexible access without automatically replacing the first mortgage
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                A Home Equity Line of Credit is one possible strategy. It may help
                you access equity while keeping your existing first mortgage in
                place, which can matter if your current rate is favorable.
              </p>
            </div>
            <div className="card-elevated p-6 md:p-8">
              <p className="text-sm font-medium text-brand">Cash-Out Refinance</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                One new mortgage with cash back at closing
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                A cash-out refinance replaces your current mortgage with a new loan.
                It may make sense for larger equity needs, fixed-payment preference,
                or when the full refinance math works in your favor.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="section-container">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-brand">Owner-occupied path</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Homeowner-first by default.
                </h2>
                <p className="mt-4 text-muted">
                  Most equity conversations start with a primary residence and a
                  homeowner trying to improve cash flow, keep a low first mortgage,
                  remodel, fund education, build an ADU, or create flexibility.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {ownerOccupiedPath.map((item) => (
                    <li key={item} className="rounded-xl bg-surface-muted px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-brand">Investment path</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Investor guidance when the property or goal calls for it.
                </h2>
                <p className="mt-4 text-muted">
                  If the goal involves rentals or investment properties, the
                  conversation shifts to portfolio leverage, DSCR possibilities,
                  reserves, and cash-flow considerations.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {investorPath.map((item) => (
                    <li key={item} className="rounded-xl bg-surface-muted px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-16 md:py-20">
          <div className="section-container">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-brand">Trust</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Broadview wins with technology plus human advice.
              </h2>
              <p className="mt-4 text-muted">
                We are not trying to beat large online lenders by being more automated.
                Our digital tools help us understand your situation quickly, then a
                licensed mortgage advisor helps you make sense of your options.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item} className="card-elevated p-5">
                  <p className="text-sm leading-relaxed text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdvisorTrustSection
          heading="Your home equity decision deserves a real conversation."
          paragraphs={[
            "Your answers help us prepare. The real value comes from the conversation that follows.",
            "A Broadview advisor will personally review your information and walk through your home equity and mortgage options.",
          ]}
        />

        <TestimonialMediaSection
          eyebrow="Real stories"
          heading="Homeowners who explored their equity with guidance"
          subheading="We start with your goal, then explain the trade-offs before recommending a path."
          testimonials={heygenTestimonials}
          className="border-y border-border bg-surface-muted"
        />

        <WhatHappensNext className="border-y border-border bg-surface-muted" />

        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="card-elevated mx-auto max-w-3xl overflow-hidden">
              <div className="bg-brand px-8 py-12 text-center text-white md:px-12">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Ready to build your home equity strategy?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/85">
                  {homeEquityCopy.advisorReview}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href={getHelocFunnelHref("/heloc")}
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-white/90"
                  >
                    {homeEquityCopy.primaryCta}
                  </Link>
                  <BookingLink
                    location="heloc_hub_final"
                    funnelType="heloc"
                    className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {homeEquityCopy.secondaryCta}
                  </BookingLink>
                </div>
              </div>
              <ComplianceDisclaimer className="px-6 py-4 text-center md:px-8" />
            </div>
          </div>
        </section>
      </main>
      <ComplianceFooter />
    </>
  );
}

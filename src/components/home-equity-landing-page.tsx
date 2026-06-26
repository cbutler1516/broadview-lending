import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { WhatHappensNext } from "@/components/what-happens-next";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { brand } from "@/lib/brand/config";
import {
  getHelocFunnelHref,
  helocGoalCards,
  homeEquityCopy,
  type HelocLandingPage,
} from "@/lib/heloc/content";

type HomeEquityLandingPageProps = {
  page: HelocLandingPage;
};

function audienceCopy(audience: HelocLandingPage["audience"]) {
  if (audience === "investment") {
    return {
      title: "Built for investor conversations",
      body: "Investment and rental-property equity decisions should account for DSCR possibilities, portfolio leverage, reserves, and cash-flow durability.",
      items: [
        "Rental property equity review",
        "Investor strategy and DSCR discussion",
        "Cash-flow and reserve considerations",
      ],
    };
  }

  if (audience === "comparison") {
    return {
      title: "Compare before you choose",
      body: "A HELOC and cash-out refinance solve different problems. Broadview helps you understand both before choosing a path.",
      items: [
        "Current first-mortgage rate review",
        "HELOC and cash-out refinance trade-offs",
        "Advisor explanation of potential next steps",
      ],
    };
  }

  return {
    title: "Homeowner-first equity guidance",
    body: "Most homeowners are trying to improve cash flow, preserve a good first mortgage, renovate, or create flexibility. The first conversation starts there.",
    items: [
      "Home improvement and cash-flow flexibility",
      "Debt consolidation and emergency-fund planning",
      "Keep-your-rate HELOC strategy",
    ],
  };
}

export function HomeEquityLandingPage({ page }: HomeEquityLandingPageProps) {
  const funnelHref = getHelocFunnelHref(page.path);
  const pathCopy = audienceCopy(page.audience);

  return (
    <main className="flex-1">
      <CinematicHero
        theme="home-equity"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Home Equity", path: "/heloc" },
          { name: page.h1, path: page.path },
        ]}
        eyebrow={page.eyebrow}
        title={page.h1}
        subtitle={page.description}
        advisorPromise={homeEquityCopy.humanPromise}
        note={brand.trust.funnelDuration}
        ctas={[
          { label: page.primaryCta, href: funnelHref },
          {
            label: page.secondaryCta,
            booking: true,
            bookingLocation: `${page.slug}_hero`,
            bookingFunnelType: "heloc",
            variant: "secondary",
          },
        ]}
      />

      <section className="py-14 md:py-18">
        <div className="section-container grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text-sm font-medium text-brand">Your goal</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {page.goalPrompt}
            </h2>
            <p className="mt-4 text-muted">{homeEquityCopy.prepareConversation}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {page.benefits.map((benefit) => (
              <div key={benefit} className="card-elevated p-5">
                <p className="text-sm leading-relaxed text-muted">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted py-14 md:py-18">
        <div className="section-container grid gap-8 md:grid-cols-2">
          <div className="card-elevated p-6 md:p-8">
            <p className="text-sm font-medium text-brand">HELOC vs cash-out</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Why keeping your current first mortgage may matter
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              A HELOC may allow access to equity without replacing your existing
              first mortgage. A cash-out refinance replaces the first mortgage with a
              new loan. The right answer depends on your rate, loan balance, desired
              equity amount, payment goals, and eligibility.
            </p>
            <Link href="/heloc/heloc-vs-cash-out" className="btn-secondary mt-6">
              Compare HELOC vs Cash-Out
            </Link>
          </div>

          <div className="card-elevated p-6 md:p-8">
            <p className="text-sm font-medium text-brand">{pathCopy.title}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Guidance matched to the property and purpose.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{pathCopy.body}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {pathCopy.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="section-container">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand">More equity goals</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Choose the path that sounds most like your situation.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helocGoalCards.map((goal) => (
              <Link key={goal.href} href={goal.href} className="card-elevated block p-5">
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{goal.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14 md:py-18">
        <div className="section-container grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium text-brand">Broadview advisor promise</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Smart tools first. Human guidance next.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{homeEquityCopy.noPressure}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.advisorNotes.map((note) => (
              <div key={note} className="rounded-xl border border-border bg-surface-muted p-5">
                <p className="text-sm leading-relaxed text-muted">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="section-container">
          <h2 className="text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="card-elevated p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatHappensNext className="border-y border-border bg-surface-muted" />

      <section className="border-t border-border py-14 md:py-20">
        <div className="section-container">
          <div className="card-elevated mx-auto max-w-3xl overflow-hidden">
            <div className="bg-brand px-8 py-10 text-center text-white md:px-12">
              <h2 className="text-3xl font-semibold tracking-tight">
                Build your home equity strategy with a real advisor by your side.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                {homeEquityCopy.advisorReview}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={funnelHref}
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-white/90"
                >
                  {page.primaryCta}
                </Link>
                <BookingLink
                  location={`${page.slug}_final`}
                  funnelType="heloc"
                  className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {page.secondaryCta}
                </BookingLink>
              </div>
            </div>
            <ComplianceDisclaimer className="px-6 py-4 text-center md:px-8" />
          </div>
        </div>
      </section>
    </main>
  );
}

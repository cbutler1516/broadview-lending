import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/heroes/cinematic-hero";
import { BookingLink } from "@/components/booking-link";
import { INVEST_PATHS } from "@/lib/invest/content";
import { loanImages } from "@/lib/media/assets";
import { siteUrl } from "@/lib/brand/config";
import { CTA_NAVY } from "@/lib/ui/styles";

export const metadata: Metadata = {
  title: "Investor Financing | DSCR, Fix & Flip, Bridge & More",
  description:
    "Analyze the deal. Understand the financing. Build your strategy. Broadview helps real estate investors review DSCR, fix & flip, bridge, construction, BRRRR, investor HELOC, and commercial paths.",
  alternates: { canonical: `${siteUrl}/invest` },
  openGraph: { url: `${siteUrl}/invest` },
};

export default function InvestHubPage() {
  return (
    <>
      <main>
      <CinematicHero
        video={loanImages.rental}
        overlay="bottom-left"
        verticalPosition="upper-middle"
        minHeightClass="min-h-[72svh] sm:min-h-[80svh]"
        contentClassName="max-w-2xl"
      >
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/70 mb-5">
          Investor Financing
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.04] mb-6">
          Analyze the deal. Understand the financing. Build your strategy.
        </h1>
        <p className="text-lg text-white/75 leading-relaxed max-w-xl mb-8">
          Explore the numbers, compare financing paths, and review your plan
          with a Broadview advisor.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tools/investor-deal-analyzer"
            className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-slate-100 px-7 py-3.5 min-h-[52px] rounded-full text-sm font-semibold"
          >
            Analyze a Deal
            <ArrowRight className="w-4 h-4" />
          </Link>
          <BookingLink
            location="invest_hero"
            className="inline-flex items-center justify-center gap-2 border border-white/35 text-white hover:bg-white/10 px-7 py-3.5 min-h-[52px] rounded-full text-sm font-medium"
          >
            Talk With An Advisor
          </BookingLink>
        </div>
      </CinematicHero>

      <section
        id="analyze"
        className="scroll-mt-24 px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
            Financing Strategies
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.05] max-w-2xl mb-12">
            Find financing for your next project.
          </h2>
          <div className="grid gap-0 divide-y divide-slate-200/90 border-y border-slate-200/90">
            {INVEST_PATHS.map((path) => (
              <article
                key={path.id}
                id={path.id}
                className="scroll-mt-28 grid sm:grid-cols-12 gap-3 sm:gap-8 py-8"
              >
                <h3 className="sm:col-span-4 text-xl font-semibold text-navy-900 tracking-tight">
                  {path.title}
                </h3>
                <div className="sm:col-span-8">
                  <p className="text-slate-500 leading-relaxed mb-3">{path.description}</p>
                  <Link
                    href={path.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Explore {path.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tools"
        className="scroll-mt-24 px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
            Investor Tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-navy-900 mb-4">
            Explore the deal before you commit.
          </h2>
          <p className="text-slate-500 max-w-xl mb-10 leading-relaxed">
            Start with the live Investor Deal Analyzer. Use a sample or your own
            assumptions to explore financing, cash flow, and returns. No login required.
          </p>
          <Link href="/tools/investor-deal-analyzer" className={CTA_NAVY}>
            Open Deal Analyzer
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-6"><Link href="/tools" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">See all working tools</Link></p>
        </div>
      </section>
      </main>
    </>
  );
}

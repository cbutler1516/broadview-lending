import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/heroes/cinematic-hero";
import { BookingLink } from "@/components/booking-link";
import { INVEST_PATHS, INVEST_TOOLS } from "@/lib/invest/content";
import { commercialBackgroundVideo } from "@/lib/media/assets";
import { siteUrl } from "@/lib/brand/config";
import { CTA_NAVY } from "@/lib/ui/styles";

export const metadata: Metadata = {
  title: "Investor Financing | DSCR, Fix & Flip, Bridge & More",
  description:
    "Analyze the deal. Understand the financing. Build your strategy. Broadview helps real estate investors review DSCR, fix & flip, bridge, construction, BRRRR, investor HELOC, and commercial paths.",
  openGraph: { url: `${siteUrl}/invest` },
};

export default function InvestHubPage() {
  return (
    <>
      <main>
      <CinematicHero
        video={commercialBackgroundVideo}
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
          Broadview is a conventional mortgage advisory platform and a
          sophisticated investor financing desk. Start with the deal. An advisor
          helps structure the conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="#analyze"
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
            Investor paths Broadview can help you think through.
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
                    Continue
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
            Deal analysis, opening next.
          </h2>
          <p className="text-slate-500 max-w-xl mb-10 leading-relaxed">
            These tools will share one reusable deal-analysis engine. Calculators
            land here as they go live.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {INVEST_TOOLS.map((tool) => (
              <li
                key={tool.title}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-5"
              >
                <p className="font-semibold text-navy-900">{tool.title}</p>
                <p className="mt-1 text-sm text-slate-400">Coming soon</p>
              </li>
            ))}
          </ul>
          <Link href="/tools" className={CTA_NAVY}>
            View current tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      </main>
    </>
  );
}

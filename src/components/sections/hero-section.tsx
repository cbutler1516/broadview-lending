import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { CinematicHero } from "@/components/heroes/cinematic-hero";
import { CONTACT } from "@/lib/nav/constants";
import { HOMEPAGE_HERO } from "@/lib/homepage/content";

export function HeroSection() {
  return (
    <CinematicHero
      video={HOMEPAGE_HERO.video}
      overlay="bottom-left"
      verticalPosition="upper-middle"
      minHeightClass="min-h-[85svh] sm:min-h-[92svh] lg:min-h-[100svh]"
      contentClassName="max-w-[min(100%,43.75rem)] lg:max-w-[43.75rem]"
      extraOverlayClassName="bg-gradient-to-b from-navy-950/50 via-transparent to-transparent lg:hidden"
    >
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/70 mb-5 sm:mb-6">
        {HOMEPAGE_HERO.eyebrow}
      </p>

      <h1 className="text-[clamp(2.35rem,10vw,3.25rem)] lg:text-[clamp(3.1rem,4.2vw,4.6rem)] font-bold tracking-[-0.02em] text-white leading-[1.04] lg:leading-[1.05] mb-7">
        {HOMEPAGE_HERO.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <p className="text-base sm:text-lg text-white/75 leading-[1.65] max-w-[33.75rem] mb-8 sm:mb-9">
        {HOMEPAGE_HERO.subtitle}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <a
          href={HOMEPAGE_HERO.primaryHref}
          className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-slate-100 px-7 py-3.5 min-h-[52px] rounded-full text-sm font-semibold transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
        >
          {HOMEPAGE_HERO.primaryCta}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
        <BookingLink
          location="homepage_hero"
          className="inline-flex items-center justify-center gap-2 border border-white/35 text-white hover:bg-white/10 px-7 py-3.5 min-h-[52px] rounded-full text-sm font-medium transition-colors duration-200 ease-out"
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          Talk With An Advisor
        </BookingLink>
      </div>

      <Link
        href="#financing-paths"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-white/85 underline underline-offset-4 hover:text-white mb-5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Explore home loan options
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

      <p className="text-xs text-white/45 max-w-sm leading-relaxed">
        {HOMEPAGE_HERO.trustNote}
        <span className="hidden sm:inline"> · </span>
        <br className="sm:hidden" />
        <a
          href={CONTACT.phoneHref}
          className="text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded-sm"
        >
          {CONTACT.phone}
        </a>
      </p>
    </CinematicHero>
  );
}

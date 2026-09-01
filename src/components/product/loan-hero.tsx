"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { CinematicHero } from "@/components/heroes/cinematic-hero";
import { ProgramHighlightsPanel } from "@/components/product/program-highlights-panel";
import type { ProductCta, ProductHeroConfig } from "@/lib/product/types";

function CtaLink({ cta }: { cta: ProductCta }) {
  const isPrimary = cta.variant === "primary";
  const Icon = cta.icon === "calendar" ? Calendar : cta.icon === "arrow" ? ArrowRight : null;

  return (
    <Link
      href={cta.href}
      className={
        isPrimary
          ? "group inline-flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-slate-100 px-7 py-3.5 min-h-[52px] rounded-xl text-sm font-semibold transition-colors duration-200 ease-out w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          : "inline-flex items-center justify-center gap-2 border border-white/35 text-white hover:bg-white/10 px-7 py-3.5 min-h-[52px] rounded-xl text-sm font-medium transition-colors duration-200 ease-out w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      }
    >
      {Icon && cta.icon === "calendar" ? <Icon className="w-4 h-4" strokeWidth={2} /> : null}
      {cta.label}
      {Icon && cta.icon === "arrow" ? (
        <Icon
          className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
    </Link>
  );
}

export function LoanHero({ config }: { config: ProductHeroConfig }) {
  const highlights = config.programHighlights;
  const showHeroPanel = Boolean(highlights) && !highlights?.hideInHero;
  const chips = showHeroPanel ? [] : (config.trustChips?.slice(0, 4) ?? []);

  return (
    <CinematicHero
      video={config.video}
      overlay={config.heroOverlay ?? "bottom-left"}
      verticalPosition={config.heroVertical ?? "upper-middle"}
      minHeightClass={
        config.compact
          ? "min-h-[76svh] sm:min-h-[84svh]"
          : "min-h-[84svh] sm:min-h-[92svh]"
      }
      contentClassName="max-w-xl lg:max-w-2xl"
      aside={
        showHeroPanel && highlights ? <ProgramHighlightsPanel config={highlights} /> : undefined
      }
    >
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/65 mb-3.5">
        {config.eyebrow}
      </p>
      <h1 className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.1rem] xl:text-[3.5rem] font-bold tracking-[-0.03em] text-white leading-[1.02] mb-4">
        {config.headlineBefore}
        <span className="text-white">{config.headlineAccent}</span>
        {config.headlineAfter ?? ""}
      </h1>
      <p className="text-[15px] sm:text-lg text-white/72 leading-relaxed max-w-md mb-6">
        {config.subheadline}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-3.5">
        {config.ctas.map((cta) => (
          <CtaLink key={cta.label} cta={cta} />
        ))}
      </div>
      {config.trustNote ? (
        <p className="text-xs text-white/45 max-w-md leading-relaxed">{config.trustNote}</p>
      ) : null}
      {config.phone ? (
        <a
          href={config.phone.href}
          className="inline-block mt-2.5 text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 ease-out"
        >
          {config.phone.label}
        </a>
      ) : null}

      {chips.length > 0 ? (
        <ul
          aria-label="Program highlights"
          className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-2.5 max-w-lg"
        >
          {chips.map((chip) => (
            <li
              key={chip}
              className="text-[11px] sm:text-xs font-medium tracking-wide text-white/70"
            >
              <span className="text-teal-300/90 mr-1.5" aria-hidden="true">
                ·
              </span>
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </CinematicHero>
  );
}

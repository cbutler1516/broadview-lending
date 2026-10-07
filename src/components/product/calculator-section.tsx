"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { EDUCATIONAL_NOTE } from "@/lib/product/claims";
import type { CalculatorSectionConfig, ProductCta } from "@/lib/product/types";
import { CTA_NAVY } from "@/lib/ui/styles";

const BG = {
  white: "bg-white",
  slate: "bg-slate-50",
  warm: "bg-surface-warm",
} as const;

function PrimaryCta({ cta, trustNote }: { cta: ProductCta; trustNote?: string }) {
  return (
    <div className="mb-12 sm:mb-16">
      <Link href={cta.href} className={`group ${CTA_NAVY}`}>
        {cta.icon === "calendar" ? <Calendar className="w-4 h-4" /> : null}
        {cta.label}
        {cta.icon === "arrow" ? (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
        ) : null}
      </Link>
      {trustNote ? (
        <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-md">{trustNote}</p>
      ) : null}
    </div>
  );
}

export function CalculatorSection({ config }: { config: CalculatorSectionConfig }) {
  const bg = BG[config.background ?? "white"];
  const compact = config.compact ?? false;
  const reduceMotion = useReducedMotion();
  const editorialNote = config.editorialNote ?? EDUCATIONAL_NOTE;

  return (
    <section
      id="analyze"
      className={`${bg} scroll-mt-24 px-5 sm:px-8 lg:px-12 xl:px-16 ${compact ? "py-12 sm:py-16" : "py-18 sm:py-28"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl ${compact ? "mb-6" : "mb-10 sm:mb-14"}`}
        >
          {config.tag ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
              {config.tag}
            </p>
          ) : null}
          <h2 className={`${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl"} font-bold tracking-[-0.03em] text-navy-900 leading-[1.1] mb-4`}>
            {config.title}
          </h2>
          {config.description ? (
            <p className="text-base sm:text-lg text-slate-500 leading-[1.7] mb-3">
              {config.description}
            </p>
          ) : null}
          <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed italic">
            {editorialNote}
          </p>
        </motion.div>

        {!compact && config.primaryCta ? (
          <PrimaryCta cta={config.primaryCta} trustNote={config.primaryCtaTrustNote} />
        ) : null}

        {config.tools.length > 0 ? (
          <ul className="divide-y divide-slate-200/90 border-y border-slate-200/90">
            {config.tools.map((tool, i) => (
              <motion.li
                key={tool.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.12),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={tool.href}
                  className="group grid sm:grid-cols-12 gap-2 sm:gap-8 py-6 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-sm"
                >
                  <h3 className="sm:col-span-4 text-base sm:text-lg font-semibold text-navy-900 tracking-tight transition-colors duration-200 ease-out group-hover:text-teal-700">
                    {tool.title}
                  </h3>
                  <p className="sm:col-span-6 text-slate-500 text-sm sm:text-base leading-[1.7]">
                    {tool.description}
                  </p>
                  <span className="sm:col-span-2 sm:justify-self-end inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors duration-200 ease-out group-hover:text-teal-700 pt-1 sm:pt-0">
                    Open
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : null}

        {config.viewAllHref ? (
          <p className="mt-10">
            <Link
              href={config.viewAllHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-700 transition-colors duration-200 ease-out"
            >
              {config.viewAllLabel ?? "View all tools"} <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

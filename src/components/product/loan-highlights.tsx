"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LoanHighlightsConfig, ProductHighlightsLayout } from "@/lib/product/types";

const BG = {
  white: "bg-white",
  slate: "bg-slate-50",
  warm: "bg-surface-warm",
} as const;

export function LoanHighlights({
  config,
  layout = "editorial",
}: {
  config: LoanHighlightsConfig;
  layout?: ProductHighlightsLayout;
}) {
  const bg = BG[config.background ?? "white"];
  const reduceMotion = useReducedMotion();
  const compact = config.compact ?? false;
  const useComparison = layout === "editorial" && config.items.length >= 4;
  const featured = useComparison ? config.items.slice(0, 2) : [];
  const rest = useComparison ? config.items.slice(2) : config.items;

  if (layout === "band") {
    return (
      <section
        className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 ${compact ? "py-14 sm:py-18" : "py-16 sm:py-22"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mb-10 sm:mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
              {config.tag}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.08] mb-4">
              {config.title}
            </h2>
            <p className="text-[15px] sm:text-base text-slate-500 leading-[1.7]">{config.description}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-slate-200/90 pt-10">
            {config.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="block h-[2px] w-6 bg-teal-600/70 mb-3.5" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-navy-900 tracking-tight mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-[1.65]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === "inline") {
    return (
      <section
        className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 ${compact ? "py-16 sm:py-22" : "py-18 sm:py-28"}`}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-28 self-start"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
              {config.tag}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.08] mb-5">
              {config.title}
            </h2>
            <p className="text-base text-slate-500 leading-[1.7]">{config.description}</p>
          </motion.div>
          <ul className="lg:col-span-7 lg:col-start-6 space-y-0 divide-y divide-slate-200/90 border-y border-slate-200/90">
            {config.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="py-7 sm:py-8"
              >
                <h3 className="text-lg font-semibold text-navy-900 tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] text-slate-500 leading-[1.7]">{item.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 ${compact ? "py-16 sm:py-22 lg:py-24" : "py-18 sm:py-28"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
            {config.tag}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.05] mb-5 sm:mb-6">
            {config.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-[1.7] max-w-xl">
            {config.description}
          </p>
        </motion.div>

        {featured.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14">
            {featured.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-t-2 border-teal-600/70 pt-6 sm:pt-7"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-navy-900 tracking-tight leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] sm:text-base text-slate-500 leading-[1.7]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : null}

        {rest.length > 0 ? (
          <ul className="divide-y divide-slate-200/90 border-y border-slate-200/90">
            {rest.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid sm:grid-cols-12 gap-2 sm:gap-10 py-8 sm:py-11"
              >
                <h3 className="sm:col-span-4 text-lg sm:text-[1.3rem] font-semibold text-navy-900 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="sm:col-span-8 text-[15px] sm:text-base text-slate-500 leading-[1.7] max-w-xl">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

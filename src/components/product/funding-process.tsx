"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FundingProcessConfig } from "@/lib/product/types";

const BG = {
  white: "bg-white",
  slate: "bg-slate-50",
  warm: "bg-surface-warm",
} as const;

export function FundingProcess({ config }: { config: FundingProcessConfig }) {
  const bg = BG[config.background ?? "slate"];
  const compact = config.compact ?? false;
  const reduceMotion = useReducedMotion();

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
          {config.tag ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
              {config.tag}
            </p>
          ) : null}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.05] mb-5 sm:mb-6">
            {config.title}
          </h2>
          {config.description ? (
            <p className="text-base sm:text-lg text-slate-500 leading-[1.7] max-w-xl">
              {config.description}
            </p>
          ) : null}
        </motion.div>

        <ol className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent"
          />
          {config.steps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative grid grid-cols-[32px_1fr] sm:grid-cols-[40px_1fr] gap-5 sm:gap-8 py-7 sm:py-9 first:pt-0 last:pb-0"
            >
              <span className="relative z-[1] flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] sm:text-xs font-semibold tracking-wide text-navy-800 shadow-sm shadow-slate-900/5">
                {String(s.step).padStart(2, "0")}
              </span>
              <div
                className={`min-w-0 pt-0.5 sm:pt-1.5 ${
                  i < config.steps.length - 1
                    ? "border-b border-slate-200/80 pb-7 sm:pb-9"
                    : ""
                }`}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-navy-900 tracking-tight mb-2.5 sm:mb-3">
                  {s.title}
                </h3>
                <p className="text-[15px] sm:text-base text-slate-500 leading-[1.7] max-w-xl">
                  {s.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

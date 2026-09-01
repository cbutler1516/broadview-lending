"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProductPathCardsConfig } from "@/lib/product/types";

const BG = {
  white: "bg-white",
  slate: "bg-slate-50",
} as const;

function ComparisonBand({ config }: { config: ProductPathCardsConfig }) {
  const bg = BG[config.background ?? "white"];
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-20`} id="financing-paths">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-9 sm:mb-11"
        >
          {config.tag ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
              {config.tag}
            </p>
          ) : null}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.1] mb-3">
            {config.title}
          </h2>
          {config.description ? (
            <p className="text-base text-slate-500 leading-[1.7] max-w-xl">{config.description}</p>
          ) : null}
        </motion.div>

        <div className="grid md:grid-cols-3 border-t border-slate-200/90">
          {config.paths.map((path, i) => (
            <motion.div
              key={`${path.href}-${path.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                delay: reduceMotion ? 0 : i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`py-6 sm:py-7 pr-0 md:pr-8 ${
                i > 0 ? "md:border-l border-slate-200/90 md:pl-8" : ""
              } ${i > 0 ? "border-t md:border-t-0 border-slate-200/90" : ""}`}
            >
              <h3 className="text-lg font-semibold text-navy-900 tracking-tight mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-slate-500 leading-[1.65] mb-4">{path.description}</p>
              {path.facts && path.facts.length > 0 ? (
                <ul className="space-y-1.5 mb-5">
                  {path.facts.map((fact) => (
                    <li
                      key={fact}
                      className="text-[13px] text-slate-500 leading-snug pl-3 border-l border-teal-600/40"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Link
                href={path.href}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-teal-700 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-sm"
              >
                {path.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathRows({ config }: { config: ProductPathCardsConfig }) {
  const bg = BG[config.background ?? "white"];
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 lg:py-28`} id="financing-paths">
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

        <ul className="divide-y divide-slate-200/90 border-y border-slate-200/90">
          {config.paths.map((path, i) => (
            <motion.li
              key={`${path.href}-${path.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={path.href}
                className="group grid sm:grid-cols-12 gap-3 sm:gap-8 py-8 sm:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-sm"
              >
                <div className="sm:col-span-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-navy-900 tracking-tight transition-colors duration-200 ease-out group-hover:text-teal-700">
                    {path.title}
                  </h3>
                </div>
                <div className="sm:col-span-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <p className="text-[15px] sm:text-base text-slate-500 leading-[1.7] max-w-xl">
                    {path.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors duration-200 ease-out group-hover:text-teal-700 shrink-0">
                    {path.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductPathCards({ config }: { config: ProductPathCardsConfig }) {
  return config.layout === "band" ? <ComparisonBand config={config} /> : <PathRows config={config} />;
}

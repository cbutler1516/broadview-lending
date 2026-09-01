"use client";

import { motion, useReducedMotion } from "framer-motion";

export function EditorialPullQuote({
  quote,
  attribution,
  background = "warm",
}: {
  quote: string;
  attribution?: string;
  background?: "white" | "slate" | "warm" | "navy";
}) {
  const reduceMotion = useReducedMotion();
  const bg =
    background === "navy"
      ? "bg-navy-950 text-white"
      : background === "slate"
        ? "bg-slate-50 text-navy-900"
        : background === "white"
          ? "bg-white text-navy-900"
          : "bg-surface-warm text-navy-900";
  const mute = background === "navy" ? "text-white/55" : "text-slate-400";
  const mark = background === "navy" ? "text-teal-400/40" : "text-teal-600/25";

  return (
    <section className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-22 lg:py-24`}>
      <motion.figure
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <span
          aria-hidden="true"
          className={`block text-5xl sm:text-6xl font-serif leading-none mb-4 ${mark}`}
        >
          “
        </span>
        <blockquote className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium tracking-[-0.02em] leading-[1.35]">
          {quote}
        </blockquote>
        {attribution ? (
          <figcaption className={`mt-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] ${mute}`}>
            {attribution}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
}

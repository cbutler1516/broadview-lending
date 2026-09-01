"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProgramHighlightFact } from "@/lib/product/types";

export function QualificationSnapshot({
  eyebrow = "At a Glance",
  title,
  description,
  facts,
  background = "white",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  facts: ProgramHighlightFact[];
  background?: "white" | "slate" | "warm";
}) {
  const reduceMotion = useReducedMotion();
  const bg =
    background === "slate"
      ? "bg-slate-50"
      : background === "warm"
        ? "bg-surface-warm"
        : "bg-white";

  return (
    <section className={`${bg} px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-18 lg:py-20`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 sm:mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-3">
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.1] mb-3">
            {title}
          </h2>
          {description ? (
            <p className="text-base text-slate-500 leading-[1.7] max-w-xl">{description}</p>
          ) : null}
        </motion.div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 border-t border-slate-200/90 pt-8">
          {facts.slice(0, 6).map((fact, i) => (
            <motion.li
              key={fact.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.16),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pl-4 border-l border-slate-200"
            >
              <p className="text-base sm:text-lg font-semibold text-navy-900 tracking-tight mb-1">
                {fact.label}
              </p>
              {fact.detail ? (
                <p className="text-sm text-slate-500 leading-relaxed">{fact.detail}</p>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { LoanCtaConfig, ProductCta } from "@/lib/product/types";

function CtaButton({ cta }: { cta: ProductCta }) {
  const isPrimary = cta.variant === "primary";

  return (
    <Link
      href={cta.href}
      className={
        isPrimary
          ? "group inline-flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-slate-100 px-8 py-4 min-h-[52px] rounded-xl font-semibold text-sm transition-colors duration-200 ease-out w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          : "inline-flex items-center justify-center gap-2 border border-white/35 text-white hover:bg-white/10 px-8 py-4 min-h-[52px] rounded-xl font-medium text-sm transition-colors duration-200 ease-out w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      }
    >
      {cta.icon === "calendar" ? <Calendar className="w-4 h-4" /> : null}
      {cta.label}
      {cta.icon === "arrow" ? (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

export function LoanCTA({ config }: { config: LoanCtaConfig }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-navy-950">

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-white/50 mb-5">
            Next Step
          </p>
          <h2 className="text-[2.35rem] sm:text-5xl lg:text-[3.85rem] font-bold tracking-[-0.035em] text-white leading-[1.02] mb-6 sm:mb-8">
            {config.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/72 mb-10 sm:mb-12 max-w-xl leading-[1.65]">
            {config.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5">
            {config.ctas.map((cta) => (
              <CtaButton key={cta.label} cta={cta} />
            ))}
          </div>
          {config.trustNote ? (
            <p className="text-xs text-white/45 mt-7 max-w-md leading-relaxed">
              {config.trustNote}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

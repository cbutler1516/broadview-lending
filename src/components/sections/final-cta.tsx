"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { HOMEPAGE_CTA } from "@/lib/homepage/content";
import { SCENARIO_CTA } from "@/lib/nav/constants";

export function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[72svh] sm:min-h-[78svh] lg:min-h-[84svh] flex items-end sm:items-center overflow-hidden bg-navy-950">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <LivingArchitectureVideo
          asset={HOMEPAGE_CTA.video}
          bare
          overlay={false}
          rounded=""
          aspectClassName="absolute inset-0 h-full w-full"
          className="absolute inset-0"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/58 to-navy-950/28 sm:bg-gradient-to-r sm:from-navy-950/88 sm:via-navy-950/45 sm:to-navy-950/20" />

      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-20 sm:py-28 lg:py-32">
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
            {HOMEPAGE_CTA.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/72 mb-10 sm:mb-12 max-w-xl leading-[1.65]">
            {HOMEPAGE_CTA.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5">
            <Link
              href={SCENARIO_CTA.href}
              className="group inline-flex items-center justify-center gap-2 bg-white text-navy-900 hover:bg-slate-100 px-8 py-4 min-h-[52px] rounded-xl font-semibold text-sm transition-colors duration-200 ease-out w-full sm:w-auto"
            >
              {SCENARIO_CTA.longLabel}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
            <BookingLink
              location="homepage_final_cta"
              className="inline-flex items-center justify-center gap-2 border border-white/35 text-white hover:bg-white/10 px-8 py-4 min-h-[52px] rounded-xl font-medium text-sm transition-colors duration-200 ease-out w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              Talk With An Advisor
            </BookingLink>
          </div>
          <p className="text-xs text-white/45 mt-7 max-w-md leading-relaxed">
            {HOMEPAGE_CTA.trustNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

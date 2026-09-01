"use client";

import { FUNNEL_INTRO_COPY, FUNNEL_INTRO_PILLARS } from "@/lib/heloc-engine/brand-positioning";
import { motion, useReducedMotion } from "framer-motion";

export function FunnelIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-3 max-w-2xl text-center sm:mb-4 lg:mb-5 lg:max-w-3xl"
    >
      <ul className="mb-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500 sm:mb-3 sm:text-xs">
        {FUNNEL_INTRO_PILLARS.map((pillar) => (
          <li key={pillar} className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="h-1 w-1 rounded-full bg-teal-500" aria-hidden />
            {pillar}
          </li>
        ))}
      </ul>
      <h1 className="text-balance text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
        {FUNNEL_INTRO_COPY}
      </h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">~60 seconds · No obligation</p>
    </motion.div>
  );
}

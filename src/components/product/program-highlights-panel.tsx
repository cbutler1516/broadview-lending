"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProgramHighlightsConfig } from "@/lib/product/types";

export function ProgramHighlightsPanel({
  config,
  className = "",
}: {
  config: ProgramHighlightsConfig;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const facts = config.facts.slice(0, 5);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-white/15 bg-navy-950/55 backdrop-blur-md shadow-2xl shadow-black/25 p-5 sm:p-6 ${className}`}
    >
      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300/90 mb-1">
        {config.eyebrow ?? "Program Highlights"}
      </p>
      <p className="text-sm font-semibold text-white tracking-tight mb-4 pb-3 border-b border-white/10">
        {config.title}
      </p>
      <ul className="space-y-3">
        {facts.map((fact) => (
          <li key={fact.label} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/90"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white tracking-tight leading-snug">
                {fact.label}
              </p>
              {fact.detail ? (
                <p className="text-xs text-white/55 leading-relaxed mt-0.5">{fact.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

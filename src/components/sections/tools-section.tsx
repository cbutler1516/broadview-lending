"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_TOOLS } from "@/lib/homepage/content";
import { CTA_NAVY } from "@/lib/ui/styles";

export function ToolsSection() {
  const reduceMotion = useReducedMotion();
  const config = HOMEPAGE_TOOLS;

  return (
    <section className="bg-slate-50 px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-22 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 sm:mb-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
            {config.tag}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.05] mb-5 sm:mb-6">
            {config.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-[1.7] mb-3">
            {config.description}
          </p>
          <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed italic">
            {config.editorialNote}
          </p>
        </motion.div>

        <div className="mb-12 sm:mb-16">
          <Link href={config.viewAllHref} className={`group ${CTA_NAVY}`}>
            Open the tools
            <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
          </Link>
        </div>

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

        <p className="mt-10">
          <Link
            href={config.viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-teal-700 transition-colors duration-200 ease-out"
          >
            {config.viewAllLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

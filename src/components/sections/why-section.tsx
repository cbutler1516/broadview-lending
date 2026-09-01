"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HOMEPAGE_WHY } from "@/lib/homepage/content";

export function WhySection() {
  const { title, description, items } = HOMEPAGE_WHY;
  const reduceMotion = useReducedMotion();
  const lead = items.slice(0, 2);
  const rest = items.slice(2);

  return (
    <section className="bg-white px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.08] mb-4">
            {title}
          </h2>
          <p className="text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md">
            {description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0 pb-0 sm:pb-12 border-b-0 sm:border-b sm:border-slate-200/90">
          {lead.map((item, i) => (
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
              className={`py-8 border-b border-slate-200/90 sm:py-0 sm:border-b-0 ${
                i === 0 ? "sm:pr-6 sm:border-r sm:border-slate-200/90" : "sm:pl-6"
              }`}
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700/80 mb-3 sm:mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl sm:text-[1.7rem] font-semibold text-navy-900 tracking-tight leading-[1.15] mb-2 sm:mb-3 max-w-xs">
                {item.title}
              </h3>
              <p className="text-[15px] sm:text-base text-slate-500 leading-[1.7] max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <ul className="grid sm:grid-cols-3 gap-x-10 gap-y-0 pt-0 sm:pt-12">
          {rest.map((item, i) => (
            <motion.li
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                delay: reduceMotion ? 0 : i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-8 border-b border-slate-200/90 last:border-b-0 sm:py-0 sm:border-b-0"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 mb-3 sm:mb-2.5">
                {String(i + 3).padStart(2, "0")}
              </span>
              <h4 className="text-base font-semibold text-navy-800 tracking-tight mb-2 sm:mb-1.5">
                {item.title}
              </h4>
              <p className="text-sm text-slate-500 leading-[1.65]">{item.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

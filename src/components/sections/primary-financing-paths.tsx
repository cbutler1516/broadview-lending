"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import {
  PRIMARY_JOURNEYS,
  SECONDARY_PATHS,
  type JourneyPath,
} from "@/lib/homepage/content";

const EASE = [0.22, 1, 0.36, 1] as const;

function FinancingPathPanel({
  path,
  reduceMotion,
  delay = 0,
}: {
  path: JourneyPath;
  reduceMotion: boolean | null;
  delay?: number;
}) {
  return (
    <Link
      href={path.href}
      className={`group relative block min-h-[28rem] overflow-hidden isolate ${
        path.featured ? "sm:min-h-[70svh]" : "sm:min-h-[34rem] lg:min-h-[38rem]"
      }`}
    >
      <LivingArchitectureVideo
        asset={path.video}
        bare
        overlay={false}
        rounded=""
        aspectClassName="absolute inset-0 h-full w-full"
        className="absolute inset-0 transition-transform duration-[700ms] ease-out motion-reduce:transition-none group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/46 to-navy-950/10 transition-opacity duration-200 ease-out group-hover:from-navy-950/95" />
      <div className="absolute inset-0 flex items-end">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.28,
            delay: reduceMotion ? 0 : delay,
            ease: EASE,
          }}
          className={`w-full px-5 sm:px-8 pb-10 sm:pb-12 ${
            path.featured ? "lg:px-12 xl:px-16 lg:pb-20" : "lg:px-10 xl:px-12 lg:pb-14"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55 mb-3">
            {path.sequence} · {path.category}
          </p>
          <h3
            className={`text-3xl font-bold tracking-[-0.03em] text-white mb-4 ${
              path.featured ? "sm:text-5xl" : "sm:text-4xl"
            }`}
          >
            {path.title}
          </h3>
          <p className="text-white/70 text-base sm:text-lg max-w-md leading-relaxed mb-6">
            {path.description}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            {path.cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-1.5" />
          </span>
        </motion.div>
      </div>
    </Link>
  );
}

export function PrimaryFinancingPaths() {
  const reduceMotion = useReducedMotion();
  const [featured, ...rest] = PRIMARY_JOURNEYS;

  return (
    <section id="journeys" className="bg-white scroll-mt-24">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
            Primary Journeys
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.05]">
            Start with what you are trying to accomplish.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-3 sm:gap-4 lg:gap-0">
        {featured ? (
          <FinancingPathPanel path={featured} reduceMotion={reduceMotion} />
        ) : null}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-0">
          {rest.map((path, index) => (
            <FinancingPathPanel
              key={path.id}
              path={path}
              reduceMotion={reduceMotion}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 border-t border-slate-200/90">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3">
          {SECONDARY_PATHS.map((path) => (
            <Link key={path.href} href={path.href} className="group block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                Secondary
              </p>
              <h3 className="text-xl font-semibold text-navy-900 tracking-tight mb-2 group-hover:text-teal-700 transition-colors">
                {path.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">{path.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                Explore
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

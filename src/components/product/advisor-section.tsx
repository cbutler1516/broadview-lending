"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { CTA_PRIMARY } from "@/lib/ui/styles";
import type { AdvisorSectionConfig, ProductAdvisorVariant } from "@/lib/product/types";

function AdvisorCopy({
  config,
  className = "",
}: {
  config: AdvisorSectionConfig;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
        {config.eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.08] mb-5 sm:mb-6">
        {config.title}
      </h2>
      <p className="text-slate-500 text-base sm:text-lg leading-[1.7] mb-8 sm:mb-10">
        {config.description}
      </p>
      <ul className="space-y-3.5 mb-10">
        {config.benefits.map((benefit) => (
          <li
            key={benefit}
            className="text-sm sm:text-[15px] text-slate-600 leading-[1.65] pl-4 border-l border-slate-200"
          >
            {benefit}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Link href={config.primaryCta.href} className={`${CTA_PRIMARY} w-full sm:w-auto`}>
          {config.primaryCta.icon === "calendar" ? <Calendar className="w-4 h-4" /> : null}
          {config.primaryCta.label}
          {config.primaryCta.icon === "arrow" ? <ArrowRight className="w-4 h-4" /> : null}
        </Link>
        <a
          href={config.phoneHref}
          className="inline-flex items-center justify-center gap-2 text-navy-800 hover:text-teal-700 px-2 py-3.5 min-h-[48px] text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-lg"
        >
          <Phone className="w-4 h-4" />
          {config.phoneLabel}
        </a>
      </div>
      <Link
        href={config.secondaryLink.href}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-teal-700 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-sm"
      >
        {config.secondaryLink.label}
        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5" />
      </Link>
      {config.trustNote ? (
        <p className="text-xs text-slate-400 mt-5 leading-relaxed">{config.trustNote}</p>
      ) : null}
    </div>
  );
}

function AdvisorMedia({ config, className }: { config: AdvisorSectionConfig; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-navy-950 ${className ?? ""}`}>
      <LivingArchitectureVideo
        asset={config.video}
        bare
        overlay={false}
        rounded=""
        aspectClassName="absolute inset-0 h-full w-full"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
      <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white/80">
        {config.badge.text}
      </p>
    </div>
  );
}

export function AdvisorSection({
  config,
  variant = "standard",
}: {
  config: AdvisorSectionConfig;
  variant?: ProductAdvisorVariant;
}) {
  const reduceMotion = useReducedMotion();
  const imageOnRight = config.imageSide === "right";

  if (variant === "editorial") {
    return (
      <section className="relative overflow-hidden bg-navy-950 min-h-[70svh] sm:min-h-[78svh] flex items-end">
        <LivingArchitectureVideo
          asset={config.video}
          bare
          overlay={false}
          rounded=""
          aspectClassName="absolute inset-0 h-full w-full"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/55 to-navy-950/20" />
        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20 pt-24">
          <AdvisorCopy config={{ ...config, description: config.description }} className="max-w-xl [&_h2]:text-white [&_p]:text-white/70 [&_li]:text-white/75 [&_a]:text-white" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`min-h-[22rem] sm:min-h-[28rem] lg:min-h-[560px] ${
            imageOnRight ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"
          }`}
        >
          <AdvisorMedia config={config} className="h-full min-h-[22rem]" />
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={
            variant === "asymmetric"
              ? imageOnRight
                ? "lg:col-span-6 lg:order-1"
                : "lg:col-span-6 lg:col-start-7"
              : imageOnRight
                ? "lg:col-span-6 lg:order-1"
                : "lg:col-span-6 lg:col-start-7"
          }
        >
          <AdvisorCopy config={config} className="max-w-md" />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import type { ProductStoryConfig, ProductStoryTreatment } from "@/lib/product/types";

export function EditorialStoryBand({
  story,
  variant = "cinematic",
}: {
  story: ProductStoryConfig;
  variant?: Exclude<ProductStoryTreatment, "none">;
}) {
  const reduceMotion = useReducedMotion();
  const minHeight =
    variant === "portrait"
      ? "min-h-[56svh] sm:min-h-[68svh]"
      : variant === "asymmetric"
        ? "min-h-[48svh] sm:min-h-[58svh]"
        : "min-h-[52svh] sm:min-h-[64svh]";

  return (
    <section className={`relative ${minHeight} flex items-end overflow-hidden bg-navy-950`}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <LivingArchitectureVideo
          asset={story.video}
          bare
          overlay={false}
          rounded=""
          aspectClassName="absolute inset-0 h-full w-full"
          className="absolute inset-0"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/88 via-navy-950/30 to-transparent" />
      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16 pb-10 sm:pb-14">
        {story.caption ? (
          <p className="text-sm sm:text-base text-white/75 max-w-xl leading-relaxed">
            {story.caption}
          </p>
        ) : null}
        {story.fact ? (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            {story.fact.label} · {story.fact.value}
          </p>
        ) : null}
      </div>
    </section>
  );
}

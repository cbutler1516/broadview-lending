"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import type { MediaAsset } from "@/lib/media/assets";
import {
  cinematicContentPosition,
  cinematicOverlayClass,
  cinematicSideWash,
  type HeroOverlayDirection,
  type HeroVerticalPosition,
} from "@/lib/ui/hero";

export function CinematicHero({
  video,
  overlay = "bottom-left",
  verticalPosition = "upper-middle",
  minHeightClass = "min-h-[92svh] sm:min-h-[100svh]",
  contentClassName = "max-w-2xl",
  children,
  aside,
  extraOverlayClassName,
  className,
}: {
  video: MediaAsset;
  overlay?: HeroOverlayDirection;
  verticalPosition?: HeroVerticalPosition;
  minHeightClass?: string;
  contentClassName?: string;
  children: ReactNode;
  aside?: ReactNode;
  extraOverlayClassName?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const sideWash = cinematicSideWash(overlay);

  return (
    <section
      className={`relative ${minHeightClass} flex overflow-hidden bg-navy-950 ${className ?? ""}`}
    >
      <LivingArchitectureVideo
        asset={video}
        bare
        eager
        overlay={false}
        rounded=""
        aspectClassName="absolute inset-0 h-full w-full"
        className="absolute inset-0"
      />
      <div className={`absolute inset-0 ${cinematicOverlayClass(overlay)}`} />
      {sideWash ? <div className={`absolute inset-0 ${sideWash}`} /> : null}
      {extraOverlayClassName ? (
        <div className={`absolute inset-0 ${extraOverlayClassName}`} />
      ) : null}

      <div
        className={`relative w-full flex flex-col ${cinematicContentPosition(verticalPosition)} px-5 sm:px-8 lg:px-12 xl:px-16`}
      >
        <div className={`grid ${aside ? "lg:grid-cols-12 gap-10 items-start" : ""} w-full`}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`${aside ? "lg:col-span-7" : ""} ${contentClassName}`}
          >
            {children}
          </motion.div>
          {aside ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 }}
              className="lg:col-span-5 lg:justify-self-end w-full max-w-md lg:max-w-sm mt-8 lg:mt-4"
            >
              {aside}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

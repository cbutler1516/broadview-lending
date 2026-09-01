"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { CONTACT } from "@/lib/nav/constants";
import { HOMEPAGE_CTA } from "@/lib/homepage/content";

export function ConversationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[56svh] sm:min-h-[62svh] flex items-end overflow-hidden bg-navy-950">
      <LivingArchitectureVideo
        asset={HOMEPAGE_CTA.conversationVideo}
        bare
        overlay={false}
        rounded=""
        aspectClassName="absolute inset-0 h-full w-full"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/50 to-navy-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/25 to-transparent" />

      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20 pt-24 sm:pt-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55 mb-5">
            Our Philosophy
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.02] mb-6">
            Every strategy starts with a conversation.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-8">
            Technology helps us understand the situation faster. Human judgment
            decides how the financing should be structured.
          </p>
          <p className="text-sm text-white/55">
            Prefer to talk first?{" "}
            <a
              href={CONTACT.phoneHref}
              className="text-white/85 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              {CONTACT.phone}
            </a>
            {" · "}
            <Link
              href="/contact"
              className="text-white/85 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Meet a Broadview advisor
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

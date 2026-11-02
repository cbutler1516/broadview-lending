"use client";

import Link from "next/link";
import { getBookingUrl } from "@/lib/brand/booking";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "@/lib/nav/constants";

export function ConversationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 mb-5">
            Our Philosophy
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-navy-900 leading-[1.08] mb-6">
            Every strategy starts with a conversation.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
            You don’t need to have it all figured out. Tell us what you’re
            planning, and we’ll help you understand the options and next steps.
          </p>
          <p className="text-sm text-slate-600">
            Prefer to talk first?{" "}
            <a
              href={CONTACT.phoneHref}
              className="text-navy-900 underline underline-offset-4 hover:text-teal-700 transition-colors"
            >
              {CONTACT.phone}
            </a>
            {" · "}
            <Link
              href={getBookingUrl()}
              className="text-navy-900 underline underline-offset-4 hover:text-teal-700 transition-colors"
            >
              Meet a Broadview advisor
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

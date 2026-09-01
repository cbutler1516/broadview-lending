"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { BookingLink } from "@/components/booking-link";
import {
  CONTACT,
  SCENARIO_CTA,
  scenarioHrefForPath,
} from "@/lib/nav/constants";
import { clearStickyCtaHeight, setStickyCtaHeight } from "@/lib/layout/sticky-cta-offset";

export function StickyBottomCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const onFunnelPage = Boolean(pathname?.startsWith("/funnel"));
  const scenarioHref = scenarioHrefForPath(pathname);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 280);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function bindStickyBar(node: HTMLDivElement | null) {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node) {
      clearStickyCtaHeight();
      return;
    }
    const publish = () => setStickyCtaHeight(node.getBoundingClientRect().height);
    publish();
    observerRef.current = new ResizeObserver(publish);
    observerRef.current.observe(node);
  }

  return (
    <AnimatePresence>
      {visible && !onFunnelPage && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-navy-950/97 backdrop-blur-sm border-t border-white/[0.08] safe-area-bottom"
          ref={bindStickyBar}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <a
              href={CONTACT.phoneHref}
              className="hidden sm:flex items-center gap-2 text-white/65 text-sm font-medium hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 rounded-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              {CONTACT.phone}
            </a>

            <span className="hidden lg:block text-slate-500 text-sm">
              Have questions? A Broadview advisor can walk through it with you.
            </span>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href={CONTACT.phoneHref}
                className="sm:hidden flex items-center justify-center gap-2 text-white/75 min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors border border-white/15 hover:border-white/30"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={2} /> Call
              </a>
              <div className="flex-1 sm:flex-none min-w-0">
                <Link
                  href={scenarioHref}
                  className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white shadow-[0_8px_20px_rgba(26,86,219,0.28)] min-h-[48px] px-5 rounded-lg text-[15px] font-bold tracking-[-0.01em] transition-colors duration-200 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  {SCENARIO_CTA.label}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                </Link>
                <p className="mt-1 text-center text-[11px] font-medium text-white/55 sm:hidden">
                  About 60 seconds · no credit pull to start
                </p>
              </div>
              <BookingLink
                location="sticky_cta"
                className="hidden sm:flex items-center justify-center gap-2 text-white/65 hover:text-white min-h-[44px] px-5 rounded-lg text-sm font-medium"
              >
                <Calendar className="w-3.5 h-3.5" /> Talk With An Advisor
              </BookingLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

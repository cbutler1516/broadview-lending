"use client";

import { useEffect, useRef } from "react";
import { trackConversionEvent } from "@/lib/analytics/events";

type EngagementTrackerProps = {
  /** Logical content id (article slug, tool slug, landing path). */
  contentId: string;
  contentType: "article" | "calculator" | "landing";
};

const DEPTH_MARKERS = [25, 50, 75, 100];

/**
 * Measures scroll depth and time on page for content engagement analytics.
 * Renders nothing. Mount once per content page.
 */
export function EngagementTracker({
  contentId,
  contentType,
}: EngagementTrackerProps) {
  const firedDepths = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(0);
  const reportedTime = useRef(false);

  useEffect(() => {
    startTime.current = Date.now();
    firedDepths.current = new Set();
    reportedTime.current = false;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));

      for (const marker of DEPTH_MARKERS) {
        if (percent >= marker && !firedDepths.current.has(marker)) {
          firedDepths.current.add(marker);
          trackConversionEvent("scroll_depth", {
            contentId,
            contentType,
            depth: marker,
          });
          if (marker === 100 && contentType === "article") {
            trackConversionEvent("article_completed", { contentId });
          }
        }
      }
    }

    function reportTime() {
      if (reportedTime.current) return;
      reportedTime.current = true;
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds <= 0) return;
      trackConversionEvent("time_on_page", {
        contentId,
        contentType,
        seconds,
      });
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") reportTime();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", reportTime);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", reportTime);
      reportTime();
    };
  }, [contentId, contentType]);

  return null;
}

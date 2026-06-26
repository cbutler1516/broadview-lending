"use client";

import { useEffect, useRef } from "react";
import {
  trackConversionEvent,
  type AnalyticsEventName,
} from "@/lib/analytics/events";

type InViewTrackerProps = {
  event: AnalyticsEventName;
  metadata?: Record<string, string | number | boolean>;
};

/**
 * Fires a single analytics event the first time it scrolls into view. Renders an
 * invisible marker. Used for Strategy Snapshot / section-level visibility.
 */
export function InViewTracker({ event, metadata }: InViewTrackerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackConversionEvent(event, metadata);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // metadata is intentionally read once at mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return <span ref={ref} aria-hidden className="block h-0 w-0" />;
}

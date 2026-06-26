"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAttribution } from "@/lib/analytics/attribution";
import {
  deriveIntentFromCampaign,
  recordIntent,
  recordPageView,
} from "@/lib/intelligence/visitor";

/**
 * Platform-wide visitor profiler. Records page views and infers intent from the
 * path and campaign attribution. localStorage only — no backend, no PII.
 */
export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // Don't profile admin/internal routes.
    if (pathname.startsWith("/admin")) return;

    recordPageView(pathname);

    try {
      const attribution = getAttribution();
      const campaignIntent = deriveIntentFromCampaign(attribution.utmCampaign);
      if (campaignIntent !== "unknown") recordIntent(campaignIntent);
    } catch {
      // ignore
    }
  }, [pathname]);

  return null;
}

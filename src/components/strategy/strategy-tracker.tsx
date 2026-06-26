"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAttribution } from "@/lib/analytics/attribution";
import {
  deriveIntentFromCampaign,
  recordIntent,
  recordPageView,
} from "@/lib/intelligence/visitor";
import { recordStrategyPage } from "@/lib/strategy/workspace";

/**
 * Records browsing signals into the living strategy workspace and legacy visitor
 * profile. No PII. localStorage only.
 */
export function StrategyTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    recordPageView(pathname);
    recordStrategyPage(pathname);

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

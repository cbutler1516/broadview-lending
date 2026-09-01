"use client";

import { trackLeadFormStarted } from "@/lib/heloc-engine/analytics";
import { FUNNEL_VERSION } from "@/lib/heloc-engine/funnel-config";
import { useEffect, useRef } from "react";

export function FunnelPageTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    trackLeadFormStarted({
      source: "heloc-strategy-funnel",
      funnelVersion: FUNNEL_VERSION,
    });
  }, []);

  return null;
}

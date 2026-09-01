"use client";

import { trackEvent } from "@/lib/analytics/events";

const FUNNEL_TYPE = "heloc";

type Payload = Record<string, unknown> | undefined;

function toMetadata(payload: Payload): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!payload) return out;
  for (const [key, value] of Object.entries(payload)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      out[key] = value;
    }
  }
  return out;
}

export function trackLeadFormStarted(payload?: Payload): void {
  trackEvent({
    event: "funnel_started",
    funnelType: FUNNEL_TYPE,
    metadata: toMetadata(payload),
  });
}

export function trackLeadStepCompleted(
  step: number,
  stepId: string,
  payload?: Payload,
): void {
  trackEvent({
    event: "question_answered",
    funnelType: FUNNEL_TYPE,
    step: stepId,
    metadata: { ...toMetadata(payload), step },
  });
}

export function trackContactStepViewed(payload?: Payload): void {
  trackEvent({
    event: "lead_capture_viewed",
    funnelType: FUNNEL_TYPE,
    metadata: toMetadata(payload),
  });
}

export function trackLeadSubmittedWithRouting(
  routingTier: string | undefined,
  payload?: Payload,
): void {
  trackEvent({
    event: "results_viewed",
    funnelType: FUNNEL_TYPE,
    metadata: {
      ...toMetadata(payload),
      submitted: true,
      routingTier: routingTier ?? "standard",
    },
  });
}

export function trackPropertyOccupancySelected(payload?: Payload): void {
  trackEvent({
    event: "question_answered",
    funnelType: FUNNEL_TYPE,
    step: "occupancy",
    metadata: toMetadata(payload),
  });
}

/** Partial-lead progress events — Broadview has no partial endpoint; no-op. */
export function trackPartialLeadStarted(): void {}
export function trackPartialLeadUpdated(): void {}
export function trackPartialLeadAbandoned(): void {}

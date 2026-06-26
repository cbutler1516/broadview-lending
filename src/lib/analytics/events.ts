import {
  attributionToMetadata,
  getAttribution,
} from "@/lib/analytics/attribution";

export type AnalyticsEventName =
  | "funnel_started"
  | "question_answered"
  | "lead_capture_viewed"
  | "lead_submitted"
  | "results_viewed"
  | "realtor_referral_requested"
  | "homepage_cta_clicked"
  | "funnel_card_clicked"
  | "booking_cta_clicked"
  | "contact_page_viewed"
  | "phone_clicked"
  | "email_clicked"
  // Platform engagement + content events
  | "landing_page_viewed"
  | "article_viewed"
  | "article_completed"
  | "calculator_started"
  | "calculator_completed"
  | "tool_cta_clicked"
  | "advisor_cta_clicked"
  | "internal_link_clicked"
  | "video_engaged"
  | "scroll_depth"
  | "time_on_page"
  // Intelligence layer events
  | "strategy_snapshot_viewed"
  | "decision_guide_started"
  | "decision_guide_completed"
  | "comparison_viewed"
  | "advisor_insight_expanded"
  | "life_event_viewed"
  | "location_viewed";

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  funnelType?: string;
  leadId?: string;
  sessionId?: string;
  step?: string;
  metadata?: Record<string, string | number | boolean>;
};

const SESSION_KEY = "broadview_session_id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function createSubmissionId(): string {
  return crypto.randomUUID();
}

export async function trackEvent(payload: AnalyticsPayload) {
  const sessionId = payload.sessionId ?? getOrCreateSessionId();
  const attribution = getAttribution();

  const enrichedPayload: AnalyticsPayload = {
    ...payload,
    sessionId,
    metadata: {
      ...attributionToMetadata(attribution),
      ...(payload.metadata ?? {}),
    },
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("broadview-analytics", {
        detail: enrichedPayload,
      }),
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", enrichedPayload);
  }

  try {
    const { trackAnalyticsEvent } = await import("@/actions/submit-lead");
    await trackAnalyticsEvent(enrichedPayload);
  } catch {
    // Fail silently when analytics persistence is unavailable
  }
}

export function trackConversionEvent(
  event: AnalyticsEventName,
  metadata?: Record<string, string | number | boolean>,
  funnelType?: string,
) {
  void trackEvent({ event, funnelType, metadata });
}

/** Internal-linking analytics: every cross-page link can report its path. */
export function trackInternalLink(
  to: string,
  context: { from?: string; group?: string; label?: string } = {},
) {
  trackConversionEvent("internal_link_clicked", {
    to,
    ...(context.from ? { from: context.from } : {}),
    ...(context.group ? { group: context.group } : {}),
    ...(context.label ? { label: context.label } : {}),
  });
}

export function trackAdvisorCta(location: string, context?: string) {
  trackConversionEvent("advisor_cta_clicked", {
    location,
    ...(context ? { context } : {}),
  });
}

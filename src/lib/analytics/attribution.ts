export type AttributionData = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  capturedAt?: string;
  landingPath?: string;
};

const STORAGE_KEY = "broadview_attribution";

const PARAM_MAP: Record<string, keyof AttributionData> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
  gclid: "gclid",
  fbclid: "fbclid",
};

export function parseAttributionFromSearch(
  search: string,
  landingPath?: string,
): AttributionData | null {
  const params = new URLSearchParams(search);
  const attribution: AttributionData = {};
  let found = false;

  for (const [param, key] of Object.entries(PARAM_MAP)) {
    const value = params.get(param)?.trim();
    if (value) {
      attribution[key] = value;
      found = true;
    }
  }

  if (!found) return null;

  attribution.capturedAt = new Date().toISOString();
  if (landingPath) attribution.landingPath = landingPath;
  return attribution;
}

export function mergeAttribution(
  existing: AttributionData | null,
  incoming: AttributionData | null,
): AttributionData | null {
  if (!existing && !incoming) return null;
  return { ...(existing ?? {}), ...(incoming ?? {}) };
}

export function readStoredAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}

export function storeAttribution(data: AttributionData): AttributionData {
  if (typeof window === "undefined") return data;

  const merged = mergeAttribution(readStoredAttribution(), data) ?? data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function captureAttributionFromWindow(): AttributionData | null {
  if (typeof window === "undefined") return null;

  const incoming = parseAttributionFromSearch(
    window.location.search,
    window.location.pathname,
  );

  if (incoming) {
    return storeAttribution(incoming);
  }

  return readStoredAttribution();
}

export function getAttribution(): AttributionData {
  return captureAttributionFromWindow() ?? readStoredAttribution() ?? {};
}

export function attributionToMetadata(
  attribution: AttributionData,
): Record<string, string> {
  const metadata: Record<string, string> = {};
  if (attribution.utmSource) metadata.utmSource = attribution.utmSource;
  if (attribution.utmMedium) metadata.utmMedium = attribution.utmMedium;
  if (attribution.utmCampaign) metadata.utmCampaign = attribution.utmCampaign;
  if (attribution.utmContent) metadata.utmContent = attribution.utmContent;
  if (attribution.utmTerm) metadata.utmTerm = attribution.utmTerm;
  if (attribution.gclid) metadata.gclid = attribution.gclid;
  if (attribution.fbclid) metadata.fbclid = attribution.fbclid;
  if (attribution.landingPath) metadata.landingPath = attribution.landingPath;
  return metadata;
}

export function appendAttributionToFormData(formData: FormData) {
  const attribution = getAttribution();
  if (attribution.utmSource) formData.set("utmSource", attribution.utmSource);
  if (attribution.utmMedium) formData.set("utmMedium", attribution.utmMedium);
  if (attribution.utmCampaign) formData.set("utmCampaign", attribution.utmCampaign);
  if (attribution.utmContent) formData.set("utmContent", attribution.utmContent);
  if (attribution.utmTerm) formData.set("utmTerm", attribution.utmTerm);
  if (attribution.gclid) formData.set("gclid", attribution.gclid);
  if (attribution.fbclid) formData.set("fbclid", attribution.fbclid);
}

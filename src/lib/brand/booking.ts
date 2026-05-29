const CONTACT_FALLBACK = "/contact";

export function getBookingUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (configured) return configured;
  return CONTACT_FALLBACK;
}

export function isExternalBookingUrl(url: string = getBookingUrl()): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function getBookingLinkProps(url: string = getBookingUrl()) {
  if (isExternalBookingUrl(url)) {
    return {
      href: url,
      target: "_blank" as const,
      rel: "noopener noreferrer" as const,
    };
  }
  return { href: url };
}

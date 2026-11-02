export const BOOKING_URL = "https://viato.ai/book/u/christopher-butler";

export function getBookingUrl(): string {
  return "/contact";
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

"use client";

import Link from "next/link";
import { getBookingLinkProps, getBookingUrl } from "@/lib/brand/booking";
import { trackConversionEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";

type BookingLinkProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
  location?: string;
  funnelType?: string;
  onClick?: () => void;
};

export function BookingLink({
  children,
  className,
  label = "Book Strategy Call",
  location = "unknown",
  funnelType,
  onClick,
}: BookingLinkProps) {
  const href = getBookingUrl();
  const linkProps = getBookingLinkProps(href);

  function handleClick() {
    trackConversionEvent("booking_cta_clicked", { label, location }, funnelType);
    onClick?.();
  }

  if (linkProps.href.startsWith("http")) {
    return (
      <a
        {...linkProps}
        onClick={handleClick}
        className={cn(className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={linkProps.href} onClick={handleClick} className={cn(className)}>
      {children}
    </Link>
  );
}

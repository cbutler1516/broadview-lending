"use client";

import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { BookingLink } from "@/components/booking-link";
import { trackConversionEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";

type HomepageCtasProps = {
  location?: string;
  className?: string;
};

export function HomepageCtas({ location = "hero", className }: HomepageCtasProps) {
  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <Link
        href="/#funnels"
        onClick={() =>
          trackConversionEvent("homepage_cta_clicked", {
            cta: "primary",
            label: brand.ctas.primary,
            location,
          })
        }
        className="btn-primary px-8 py-3.5 text-base"
      >
        {brand.ctas.primary}
      </Link>
      <BookingLink
        location={`${location}_secondary`}
        className="btn-secondary px-8 py-3.5 text-base"
      >
        {brand.ctas.secondary}
      </BookingLink>
    </div>
  );
}

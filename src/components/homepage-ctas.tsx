"use client";

import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { BookingLink } from "@/components/booking-link";
import { trackConversionEvent } from "@/lib/analytics/events";

type HomepageCtasProps = {
  location?: string;
};

export function HomepageCtas({ location = "hero" }: HomepageCtasProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

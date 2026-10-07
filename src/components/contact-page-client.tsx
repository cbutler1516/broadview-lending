"use client";

import { useEffect } from "react";
import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { BookingLink } from "@/components/booking-link";
import { ContactLink } from "@/components/contact-link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { trackConversionEvent } from "@/lib/analytics/events";
import { getBookingUrl } from "@/lib/brand/booking";
import { APPLICATION_CTA } from "@/lib/nav/constants";

export function ContactPageClient() {
  const hasBookingDestination = getBookingUrl() !== "/contact";
  useEffect(() => {
    trackConversionEvent("contact_page_viewed", { location: "contact_page" });
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-brand">Personal guidance</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        Let’s talk about your next move.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Talk with a licensed mortgage advisor about purchase, refinance, VA, FHA,
        jumbo, or home equity options. We&apos;ll review your goals and outline
        potential next steps — with no obligation.
      </p>

      <div className="mt-8 space-y-4">
        {hasBookingDestination && <BookingLink
          location="contact_page_primary"
          className="btn-primary w-full py-3.5 text-center text-base"
        >
          {brand.ctas.secondary}
        </BookingLink>}

        <div className="rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="text-lg font-semibold">What can we help you with?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Choose your goal to prepare an advisor conversation.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Buying a home", href: "/funnel/purchase" },
              { label: "Refinancing", href: "/funnel/refinance" },
              { label: "Accessing home equity", href: "/funnel/heloc" },
              { label: "Investment financing", href: "/funnel/investment" },
            ].map((path) => <Link key={path.href} href={path.href} className="btn-secondary flex min-h-12 items-center justify-center text-center">{path.label}</Link>)}
          </div>
        </div>

        <div className="rounded-2xl border border-brand/15 bg-brand-light/40 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Ready to apply?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Go directly to Broadview’s online loan application. It’s separate from requesting an advisor conversation.</p>
          <a href={APPLICATION_CTA.href} className="btn-primary mt-4 flex min-h-12 items-center justify-center">Apply Online</a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactLink
            href={brand.contact.phoneHref}
            type="phone"
            location="contact_page"
            className="card-elevated block p-5 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted">Phone</p>
            <p className="mt-2 font-semibold">{brand.contact.phone}</p>
          </ContactLink>
          <ContactLink
            href={brand.contact.emailHref}
            type="email"
            location="contact_page"
            className="card-elevated block p-5 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-muted">Email</p>
            <p className="mt-2 font-semibold">{brand.contact.email}</p>
          </ContactLink>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-surface-muted p-5">
        <ComplianceDisclaimer />
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {brand.disclaimers.educationalNotice}
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/#journeys" className="btn-secondary">
          {brand.ctas.primary}
        </Link>
      </div>
    </div>
  );
}

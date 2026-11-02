"use client";

import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { brand } from "@/lib/brand/config";
import { ContactLink } from "@/components/contact-link";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { trackConversionEvent } from "@/lib/analytics/events";
import { BOOKING_URL } from "@/lib/brand/booking";

const CALENDAR_URL = `${BOOKING_URL}/broadview-planning-call`;

function initializeCalendar() {
  const bookingWindow = window as typeof window & {
    ViatoBooking?: { scan: () => void };
  };
  bookingWindow.ViatoBooking?.scan();
}

export function ContactPageClient() {
  useEffect(() => {
    trackConversionEvent("contact_page_viewed", { location: "contact_page" });
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src="/brand/chris-butler-headshot-even-tone.webp"
          alt="Chris Butler, your Broadview Lending mortgage advisor"
          width={112}
          height={112}
          className="h-28 w-28 rounded-2xl object-cover"
        />
        <div>
          <p className="text-sm font-medium text-brand">A real conversation. A clear next step.</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Talk with Chris.</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            Have a mortgage question? Give me a call. Whether you&apos;re buying,
            refinancing, or exploring a HELOC, we can talk through your options.
            No appointment needed to reach out.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-brand/20 bg-brand-light/40 p-6">
          <h2 className="text-xl font-semibold">Call Chris</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">The simplest way to connect. If I&apos;m on another call, leave a message and I&apos;ll get back to you.</p>
          <ContactLink href={brand.contact.phoneHref} type="phone" location="contact_page_primary" className="btn-primary mt-5 flex min-h-12 items-center justify-center text-center">
            {brand.contact.phone}
          </ContactLink>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold">Send an email</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Prefer to write it out? Send me your question and we&apos;ll take it from there.</p>
          <ContactLink href={brand.contact.emailHref} type="email" location="contact_page" className="mt-5 inline-block break-all text-sm font-semibold text-brand underline underline-offset-4">
            {brand.contact.email}
          </ContactLink>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold">Book a quick call</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Want a time set aside for you? Choose a 15-minute phone conversation below.</p>
          <a href="#calendar" className="btn-secondary mt-5 flex min-h-12 items-center justify-center text-center" onClick={() => trackConversionEvent("booking_cta_clicked", { label: "See available times", location: "contact_page" })}>
            See available times
          </a>
        </div>
      </div>

      <section id="calendar" aria-labelledby="calendar-heading" className="mt-12 scroll-mt-28">
        <h2 id="calendar-heading" className="text-2xl font-semibold">Choose a time to talk.</h2>
        <p className="mt-2 text-muted">Selected weekday appointments, 9:30 a.m.–3 p.m. Pacific. The calendar shows available times in your selected time zone.</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white">
          <div data-viato-booking={CALENDAR_URL} data-title="Book a 15-minute phone call with Chris Butler" data-height="700" />
        </div>
        <Script src="https://viato.ai/embed/booking.js" strategy="afterInteractive" onReady={initializeCalendar} />
        <p className="mt-3 text-sm text-muted">
          Prefer a separate window?{" "}
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4" onClick={() => trackConversionEvent("booking_cta_clicked", { label: "Open scheduling calendar", location: "contact_page_fallback" })}>Open the scheduling calendar</a>.
          {" "}Can&apos;t find a time? Call or email me directly.
        </p>
      </section>

      <div className="mt-10 rounded-xl border border-border bg-surface-muted p-5">
        <ComplianceDisclaimer />
        <p className="mt-3 text-xs leading-relaxed text-muted">{brand.disclaimers.educationalNotice}</p>
      </div>
    </div>
  );
}
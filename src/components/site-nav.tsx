"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { BookingLink } from "@/components/booking-link";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/funnel/purchase" },
  { label: "Refinance", href: "/funnel/refinance" },
  { label: "VA", href: "/funnel/va" },
  { label: "FHA", href: "/funnel/fha" },
  { label: "HELOC", href: "/funnel/heloc" },
  { label: "Learn", href: "/learn" },
];

type SiteNavProps = {
  className?: string;
};

export function SiteNav({ className }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-surface/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="section-container flex h-16 items-center justify-between gap-4">
        <BrandLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <BookingLink location="nav_desktop" className="btn-primary ml-2 py-2.5 text-sm">
            Book Call
          </BookingLink>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border p-2 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            {open ? (
              <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.6l4.3-4.3a1 1 0 1 1 1.4 1.4L11.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L8.6 10 4.3 5.7a1 1 0 0 1 0-1.4Z" />
            ) : (
              <path d="M3 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3Zm0 6a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3Zm0 6a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3Z" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface lg:hidden">
          <nav className="section-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                {link.label}
              </Link>
            ))}
            <BookingLink
              location="nav_mobile"
              className="btn-primary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              Book Call
            </BookingLink>
          </nav>
        </div>
      )}
    </header>
  );
}

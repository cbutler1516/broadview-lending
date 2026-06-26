"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { BookingLink } from "@/components/booking-link";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Refinance", href: "/refinance" },
  { label: "Home Equity", href: "/heloc" },
  { label: "Commercial", href: "/commercial" },
  { label: "Guides", href: "/guides" },
  { label: "Tools", href: "/tools" },
  { label: "Learn", href: "/learn" },
];

type SiteNavProps = {
  className?: string;
};

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ className }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 border-b border-border/70 bg-surface/85 backdrop-blur-xl",
        className,
      )}
    >
      <div className="section-container flex h-16 items-center justify-between gap-6 lg:h-20">
        <BrandLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors",
                  active
                    ? "bg-brand-light text-brand"
                    : "text-muted hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <BookingLink
            location="nav_desktop"
            className="btn-primary ml-3 px-5 py-2.5 text-sm"
          >
            Book Call
          </BookingLink>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border p-2.5 text-foreground transition-colors hover:bg-surface-muted lg:hidden"
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
        <div className="border-t border-border bg-surface/95 backdrop-blur-xl lg:hidden">
          <nav className="section-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors",
                    active
                      ? "bg-brand-light text-brand"
                      : "text-foreground hover:bg-surface-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <BookingLink
              location="nav_mobile"
              className="btn-primary mt-3 text-center"
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

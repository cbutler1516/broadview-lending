"use client";

import Link from "next/link";
import { trackInternalLink } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  group?: string;
  label?: string;
  prefetch?: boolean;
};

/**
 * Internal link that reports cross-page navigation for the internal-linking
 * analytics surface. Use for related-content and contextual links.
 */
export function TrackedLink({
  href,
  children,
  className,
  group,
  label,
  prefetch,
}: TrackedLinkProps) {
  const isExternal = href.startsWith("http");

  function handleClick() {
    trackInternalLink(href, {
      group,
      label,
      from: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}

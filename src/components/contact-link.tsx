"use client";

import { trackConversionEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";

type ContactLinkProps = {
  href: string;
  type: "phone" | "email";
  children: React.ReactNode;
  className?: string;
  location?: string;
};

export function ContactLink({
  href,
  type,
  children,
  className,
  location = "unknown",
}: ContactLinkProps) {
  return (
    <a
      href={href}
      onClick={() =>
        trackConversionEvent(
          type === "phone" ? "phone_clicked" : "email_clicked",
          { location },
        )
      }
      className={cn(className)}
    >
      {children}
    </a>
  );
}

"use client";

import { useStrategy } from "@/components/strategy/strategy-provider";
import { getWelcomeMessage } from "@/lib/strategy/cta";
import { cn } from "@/lib/utils/cn";

type AdaptiveBannerProps = {
  className?: string;
};

export function AdaptiveBanner({ className }: AdaptiveBannerProps) {
  const { workspace } = useStrategy();
  const message = getWelcomeMessage(workspace);

  if (!message) return null;

  return (
    <div
      className={cn(
        "border-b border-brand/15 bg-brand-light/60 px-5 py-3 text-center text-sm font-medium text-foreground backdrop-blur-sm scroll-reveal",
        className,
      )}
    >
      Welcome back. {message}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useStrategy } from "@/components/strategy/strategy-provider";
import { getEvolvingCta } from "@/lib/strategy/cta";
import { cn } from "@/lib/utils/cn";

type EvolvingCtaProps = {
  className?: string;
  showSecondary?: boolean;
  secondaryHref?: string;
};

export function EvolvingCta({
  className,
  showSecondary = true,
  secondaryHref = "/contact",
}: EvolvingCtaProps) {
  const { workspace } = useStrategy();
  const cta = getEvolvingCta(workspace);

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Link href={cta.href} className="btn-primary">
        {cta.primary}
      </Link>
      {showSecondary && (
        <Link href={secondaryHref} className="btn-secondary">
          {cta.secondary}
        </Link>
      )}
    </div>
  );
}

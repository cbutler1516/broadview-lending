"use client";

import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { trackConversionEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";

export type FunnelCardData = {
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  href: string;
};

type FunnelCardProps = {
  funnel: FunnelCardData;
  className?: string;
};

export function FunnelCard({ funnel, className }: FunnelCardProps) {
  const isExternal = funnel.href.startsWith("http");

  function handleClick() {
    trackConversionEvent(
      "funnel_card_clicked",
      { funnel: funnel.type, title: funnel.title },
      funnel.type,
    );
  }

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-xl"
          aria-hidden
        >
          {funnel.icon}
        </span>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted">
          ~60 sec
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold tracking-tight">{funnel.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{funnel.subtitle}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
        {brand.ctas.funnelStart}
        <span aria-hidden>→</span>
      </span>
    </>
  );

  const classNames = cn(
    "card-elevated group block p-6 transition-transform hover:-translate-y-0.5 md:p-7",
    className,
  );

  if (isExternal) {
    return (
      <a
        href={funnel.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={classNames}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={funnel.href} onClick={handleClick} className={classNames}>
      {content}
    </Link>
  );
}

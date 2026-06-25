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

const iconStroke = "h-7 w-7";

const goalIcons: Record<string, React.ReactNode> = {
  purchase: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9.5V19h12V9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 19v-4.5h4V19" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  refinance: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M5 9a7 7 0 0 1 12-3l2 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19 4v4h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19 15a7 7 0 0 1-12 3l-2-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 20v-4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  heloc: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 15.5h6M9 12.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  va: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M12 3.5 5 6v5.5c0 4 3 6.8 7 8 4-1.2 7-4 7-8V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  fha: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 9.5V19h12V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  jumbo: (
    <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
      <path
        d="M3 10 12 4l9 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 9.5V19h14V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M16.5 6.5 19 4M19 4v2.6M19 4h-2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg viewBox="0 0 24 24" fill="none" className={iconStroke} aria-hidden>
    <path
      d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

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
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
        {goalIcons[funnel.type] ?? fallbackIcon}
      </span>
      <div className="mt-6">
        <h3 className="text-lg font-semibold tracking-tight">{funnel.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{funnel.subtitle}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {brand.ctas.funnelStart}
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </>
  );

  const classNames = cn(
    "card-elevated group flex flex-col p-6 hover:-translate-y-1 md:p-7",
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

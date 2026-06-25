import { cn } from "@/lib/utils/cn";

type TrustBadgeRowProps = {
  className?: string;
};

type TrustBadge = {
  label: string;
  detail: string;
  icon: React.ReactNode;
};

const iconClass = "h-5 w-5";

const badges: TrustBadge[] = [
  {
    label: "Real People. Real Guidance.",
    detail: "A licensed advisor reviews your information personally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M12 12.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M5 19.25a7 7 0 0 1 14 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Clear Answers. No Call Centers.",
    detail: "Talk with someone who knows your situation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-4 3.5V15H7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "No Obligation. Just Options.",
    detail: "Understand your choices before deciding anything.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M9.5 12.5 11 14l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 4.5 5 7v5c0 4 3 6.5 7 7.5 4-1 7-3.5 7-7.5V7l-7-2.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "We're With You Every Step.",
    detail: "From first question to closing, you are not on your own.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="m4.5 12.5 4 4 11-11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TrustBadgeRow({ className }: TrustBadgeRowProps) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-start gap-3 rounded-2xl border border-border bg-surface/70 px-4 py-3.5 text-left shadow-[var(--shadow-soft)] backdrop-blur-sm"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
            {badge.icon}
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-foreground">
              {badge.label}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">
              {badge.detail}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils/cn";

const stroke = {
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type GoalIconProps = {
  name: string;
  className?: string;
};

export function GoalIcon({ name, className }: GoalIconProps) {
  const cls = cn("h-7 w-7", className);
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "refresh":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M5 9a7 7 0 0 1 12-3l2 2M19 4v4h-4M19 15a7 7 0 0 1-12 3l-2-2M5 20v-4h4" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "equity":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 10.5 12 4l8 6.5" stroke="currentColor" {...stroke} />
          <path d="M6 9.5V19h12V9.5M9 15.5h6M9 12.5h6" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 20V8l8-4 8 4v12M8 20v-6h8v6M10 10h1M13 10h1M10 14h1M13 14h1" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" {...stroke} />
          <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "key":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <circle cx="8" cy="15" r="4" stroke="currentColor" {...stroke} />
          <path d="m11.5 11.5 8.5-8.5M16 5l3 3" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "arrow-up":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M12 19V5M7 10l5-5 5 5" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M12 3.5 5 6v5.5c0 4 3 6.8 7 8 4-1.2 7-4 7-8V6l-7-2.5Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" {...stroke} />
          <path d="M18 12h4v4h-4a2 2 0 0 1 0-4Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="m12 3 2.2 6.8H21l-5.5 4 2.1 6.7L12 17l-5.6 3.5 2.1-6.7L3 9.8h6.8L12 3Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "trend-down":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 16h16M8 12l4 4 4-4" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "cash":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" {...stroke} />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "unlock":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M7 11V8a5 5 0 0 1 9.5-2M6 11h12v9H6V11Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="m12 3 8 4.5v7L12 19l-8-4.5v-7L12 3Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M7 16V4M7 4 4 7M7 4l3 3M17 8v12M17 20l3-3M17 20l-3-3" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "hammer":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="m14 4 6 6M8 10l6 6M4 20l4-1 1-4-6-6-5 5 6 6Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "home-plus":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 10.5 12 4l8 6.5V19H4v-8.5Z" stroke="currentColor" {...stroke} />
          <path d="M16 14v6M13 17h6" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 9h16v10H4V9Z" stroke="currentColor" {...stroke} />
          <path d="M9 9V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M5 5h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5V5ZM19 5h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7V5Z" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "shield-heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M12 3.5 5 6v5.5c0 4 3 6.8 7 8 4-1.2 7-4 7-8V6l-7-2.5Z" stroke="currentColor" {...stroke} />
          <path d="M12 10v4M10 12h4" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15V7" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "flow":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 12h6l-2-2m2 2-2 2M20 12h-6l2-2m-2 2 2 2" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "expand":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "bridge":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M4 16h16M6 16V9a6 6 0 0 1 12 0v7" stroke="currentColor" {...stroke} />
        </svg>
      );
    case "office":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path d="M6 20V6l6-3 6 3v14M9 20v-4h6v4" stroke="currentColor" {...stroke} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" {...stroke} />
        </svg>
      );
  }
}

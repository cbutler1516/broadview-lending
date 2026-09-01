type SiteNavProps = {
  className?: string;
  variant?: "default" | "strategy";
};

/** Site chrome now lives in `SiteChrome`. Kept as a no-op so existing pages stay untouched. */
export function SiteNav({}: SiteNavProps) {
  return null;
}

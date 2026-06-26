import Link from "next/link";

type SeoLinksProps = {
  routes: { label: string; href: string }[];
};

/**
 * Preserves SEO internal linking without exposing product-card grids to users.
 * Crawlers can follow these links; visually de-emphasized for humans.
 */
export function SeoLinks({ routes }: SeoLinksProps) {
  if (routes.length === 0) return null;

  return (
    <nav
      aria-label="Related programs and resources"
      className="border-t border-border py-8"
    >
      <div className="section-container">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Explore programs
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="text-sm text-muted underline-offset-2 hover:text-brand hover:underline"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

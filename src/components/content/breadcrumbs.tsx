import Link from "next/link";
import { breadcrumbSchema, jsonLdString } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";

export type Crumb = { name: string; path: string };

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumbSchema(items)),
        }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="font-medium text-foreground">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-foreground">
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

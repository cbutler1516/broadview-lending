import Link from "next/link";
import { enabledMedia, isPlayable, type MediaAsset } from "@/lib/media/assets";
import { cn } from "@/lib/utils/cn";

type TestimonialMediaSectionProps = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  testimonials?: MediaAsset[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

/**
 * Reusable HeyGen / testimonial foundation. Renders only enabled media. If
 * nothing is enabled, the section renders nothing (no empty state).
 */
export function TestimonialMediaSection({
  eyebrow = "Real stories",
  heading = "Real people. Real guidance.",
  subheading,
  testimonials = [],
  ctaHref,
  ctaLabel,
  className,
}: TestimonialMediaSectionProps) {
  const items = enabledMedia(testimonials);
  if (items.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {subheading}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="card-elevated flex flex-col p-6">
              {isPlayable(item) ? (
                <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-border bg-surface-muted">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="none"
                    poster={item.poster || undefined}
                    aria-label={item.alt}
                  >
                    <source src={item.src} />
                  </video>
                </div>
              ) : null}

              {item.quote && (
                <blockquote className="text-base leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              )}

              <figcaption className="mt-4 flex items-center gap-2 text-sm">
                {item.attribution && (
                  <span className="font-semibold">{item.attribution}</span>
                )}
                {item.role && (
                  <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted">
                    {item.role === "advisor" ? "Advisor" : "Client"}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {ctaHref && ctaLabel && (
          <div className="mt-10 text-center">
            <Link href={ctaHref} className="btn-primary">
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { heroVideoForTheme, type HeroTheme, type MediaAsset } from "@/lib/media/assets";
import { cn } from "@/lib/utils/cn";

export type HeroCta = {
  label: string;
  /** Internal/external link target. Omit when this is a booking CTA. */
  href?: string;
  /** Render as the advisor booking CTA instead of a link. */
  booking?: boolean;
  bookingLocation?: string;
  bookingFunnelType?: string;
  variant?: "primary" | "secondary";
};

type CinematicHeroProps = {
  /** Explicit asset, or resolve one from a page theme. */
  video?: MediaAsset;
  theme?: HeroTheme;
  breadcrumbs?: { name: string; path: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Optional secondary line (advisor promise / human-first reassurance). */
  advisorPromise?: React.ReactNode;
  /** Small print under the CTAs (e.g. funnel duration, reading time). */
  note?: React.ReactNode;
  ctas?: HeroCta[];
  size?: "sm" | "md" | "lg";
  /** Extra content rendered below the CTAs (rare — e.g. homepage CTA cluster). */
  children?: React.ReactNode;
  className?: string;
};

const sizeToMinH: Record<NonNullable<CinematicHeroProps["size"]>, string> = {
  sm: "min-h-[360px] md:min-h-[440px]",
  md: "min-h-[420px] md:min-h-[520px]",
  lg: "min-h-[480px] md:min-h-[600px]",
};

function HeroButton({ cta }: { cta: HeroCta }) {
  const className = cta.variant === "secondary" ? "btn-secondary" : "btn-primary";
  if (cta.booking) {
    return (
      <BookingLink
        location={cta.bookingLocation ?? "cinematic_hero"}
        funnelType={cta.bookingFunnelType}
        className={className}
      >
        {cta.label}
      </BookingLink>
    );
  }
  return (
    <Link href={cta.href ?? "#"} className={className}>
      {cta.label}
    </Link>
  );
}

/**
 * Shared cinematic hero used across every ecosystem. A single full-bleed video
 * sits behind the content (object-cover, autoplay/muted/loop, lazy, reduced-
 * motion aware, graceful gradient fallback). A light Apple-style overlay system
 * keeps the page premium and the CTAs dominant.
 */
export function CinematicHero({
  video,
  theme,
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  advisorPromise,
  note,
  ctas,
  size = "md",
  children,
  className,
}: CinematicHeroProps) {
  const asset = video ?? (theme ? heroVideoForTheme(theme) : undefined);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-surface",
        className,
      )}
    >
      {/* Full-background video layer */}
      <LivingArchitectureVideo
        asset={asset}
        bare
        eager
        aspectClassName="absolute inset-0 h-full w-full"
        rounded="rounded-none"
        className="absolute inset-0 -z-20"
        fallback={
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 80% 0%, var(--brand-light) 0%, rgba(255,255,255,0) 60%), linear-gradient(160deg, var(--surface) 0%, var(--surface-muted) 100%)",
            }}
          />
        }
      />

      {/* Premium light overlay: white side scrim for text readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.9) 36%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.15) 84%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Soft blue tint + subtle vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 88% 12%, rgba(26,86,219,0.12) 0%, rgba(26,86,219,0) 60%), radial-gradient(130% 120% at 50% 45%, rgba(8,15,40,0) 62%, rgba(8,15,40,0.10) 100%)",
        }}
      />
      {/* Bottom fade into page content */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 md:h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--surface) 100%)",
        }}
      />

      <div
        className={cn(
          "section-container relative z-10 flex flex-col py-10 md:py-14",
          sizeToMinH[size],
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        <div className="mt-auto max-w-3xl pt-14 md:pt-20">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
          {advisorPromise && (
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground">
              {advisorPromise}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {ctas.map((cta) => (
                <HeroButton key={cta.label} cta={cta} />
              ))}
            </div>
          )}
          {note && <p className="mt-4 text-sm text-muted">{note}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

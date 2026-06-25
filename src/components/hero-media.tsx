import { isPlayable, type MediaAsset } from "@/lib/media/assets";
import { cn } from "@/lib/utils/cn";

type HeroMediaProps = {
  /** Optional background/feature video. Rendered only when enabled + src exists. */
  video?: MediaAsset;
  /** Elegant fallback shown when no video is available. */
  fallback: React.ReactNode;
  className?: string;
};

/**
 * Tasteful hero media slot. When a video asset is enabled and has a usable src,
 * it autoplays muted/looping with a poster fallback and lazy loading. Otherwise
 * it renders the existing elegant fallback visual so the page never looks empty
 * and never ships broken media.
 */
export function HeroMedia({ video, fallback, className }: HeroMediaProps) {
  if (isPlayable(video)) {
    return (
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-border shadow-[var(--shadow-card)]",
          className,
        )}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={video.poster || undefined}
          aria-label={video.alt}
        >
          <source src={video.src} />
        </video>
      </div>
    );
  }

  return <>{fallback}</>;
}

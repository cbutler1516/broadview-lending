import { type MediaAsset } from "@/lib/media/assets";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";

type HeroMediaProps = {
  /** Optional background/feature video. Rendered only when enabled + src exists. */
  video?: MediaAsset;
  /** Elegant fallback shown when no video is available or motion is blocked. */
  fallback: React.ReactNode;
  className?: string;
  /** Optional glass caption rendered over the video. */
  caption?: string;
  /** Aspect ratio of the media frame. */
  aspectClassName?: string;
  /** Hero slots are above the fold by default. */
  eager?: boolean;
  /** Premium frame glow (on by default for hero usage). */
  glow?: boolean;
  /** Darkening gradient for readability (auto-on when a caption is present). */
  overlay?: boolean;
};

/**
 * Tasteful hero media slot. Delegates to the hardened LivingArchitectureVideo
 * (lazy-load, reduced-motion aware, graceful fallback) while preserving the
 * existing elegant fallback visual so the page never ships broken media.
 */
export function HeroMedia({
  video,
  fallback,
  className,
  caption,
  aspectClassName,
  eager = true,
  glow = true,
  overlay,
}: HeroMediaProps) {
  return (
    <LivingArchitectureVideo
      asset={video}
      fallback={fallback}
      className={className}
      caption={caption}
      aspectClassName={aspectClassName}
      eager={eager}
      glow={glow}
      overlay={overlay ?? Boolean(caption)}
    />
  );
}

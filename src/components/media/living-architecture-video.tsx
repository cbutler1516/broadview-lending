"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { isPlayable, type MediaAsset } from "@/lib/media/assets";
import { cn } from "@/lib/utils/cn";

type LivingArchitectureVideoProps = {
  /** Backgrounds are still images unless motion is explicitly requested. */
  playback?: "still" | "motion";
  /** Motion asset. Rendered only when enabled, has a src, and motion is allowed. */
  asset?: MediaAsset;
  /** Static fallback shown when the video can't or shouldn't play. */
  fallback?: React.ReactNode;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Aspect ratio of the media frame (prevents layout shift). */
  aspectClassName?: string;
  /** Rounded corners for the frame. */
  rounded?: string;
  /** Add a darkening gradient for text readability over the video. */
  overlay?: boolean;
  /** Premium frame: soft shadow + subtle blue glow. */
  glow?: boolean;
  /** Optional glass caption rendered over the video. */
  caption?: string;
  /** Hint that the media is above the fold (loads sooner, smaller margin). */
  eager?: boolean;
  /** Ambient mode: no border/shadow/glow frame (for background motion). */
  bare?: boolean;
};

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** True when motion should be suppressed (reduced-motion, Save-Data, slow net). */
function isMotionBlocked(): boolean {
  if (typeof window === "undefined") return true;
  const reduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  const saveData = conn?.saveData === true;
  const slow =
    typeof conn?.effectiveType === "string" &&
    /(slow-2g|2g|3g)/.test(conn.effectiveType);
  return Boolean(reduced || saveData || slow);
}

function BrandedFallback({ alt }: { alt?: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--brand-light)_0%,var(--surface)_65%)]"
      role="img"
      aria-label={alt ?? "Broadview Lending"}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#2f6bf0_0%,var(--brand-blue)_55%,var(--brand-blue-dark)_100%)] text-lg font-semibold text-white shadow-[0_10px_24px_rgba(26,86,219,0.3)]">
        BL
      </span>
    </div>
  );
}

/**
 * Hardened "Living Architecture" motion layer.
 *
 * - autoplay / muted / loop / playsInline, no controls
 * - lazy-loads via IntersectionObserver; pauses when offscreen
 * - respects prefers-reduced-motion and Save-Data / slow connections
 * - falls back to a static branded card on block or error
 * - fixed aspect ratio frame → no cumulative layout shift
 * - preload="metadata" and deferred src → does not block LCP
 */
export function LivingArchitectureVideo(props: LivingArchitectureVideoProps) {
  if (props.playback === "motion") return <MotionVideo {...props} />;

  const { asset, fallback, className, aspectClassName = "aspect-[4/3]",
    rounded = "rounded-[1.25rem]", overlay, caption, eager, bare } = props;
  const imageSrc = asset?.enabled ? (asset.type === "image" ? asset.src : asset.poster) : undefined;

  if (!imageSrc && fallback) return <div className={cn("relative", className)}>{fallback}</div>;

  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden", aspectClassName, rounded,
        !bare && "border border-border shadow-[var(--shadow-card)]")}>
        {imageSrc ? (
          <Image src={imageSrc} alt={asset?.posterAlt ?? asset?.alt ?? ""} fill
            sizes="100vw" loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined} className="object-cover" />
        ) : <BrandedFallback alt={asset?.alt} />}
        {overlay && <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />}
        {caption && <p className="absolute inset-x-4 bottom-4 rounded-xl bg-navy-950/80 p-4 text-sm text-white">{caption}</p>}
      </div>
    </div>
  );
}

function MotionVideo({
  asset,
  fallback,
  className,
  aspectClassName = "aspect-[4/3]",
  rounded = "rounded-[1.25rem]",
  overlay = false,
  glow = false,
  caption,
  eager = false,
  bare = false,
}: LivingArchitectureVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);
  const [previousSrc, setPreviousSrc] = useState<string | undefined>(undefined);
  const [crossfading, setCrossfading] = useState(false);
  const [readySrc, setReadySrc] = useState<string | undefined>(undefined);

  // Lazy-load + visibility tracking. Capability detection happens inside the
  // (async) observer callback so we never call setState synchronously in an
  // effect body.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && isMotionBlocked()) {
          setBlocked(true);
          observer.disconnect();
          return;
        }
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: eager ? "0px" : "300px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  // Pause when offscreen, play when visible.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || blocked || !shouldLoad) return;
    if (inView) {
      void v.play().catch((error: unknown) => {
        // Scrolling away can interrupt a pending play request; that is not a
        // playback failure and must not permanently disable the video.
        if (!(error instanceof DOMException && error.name === "AbortError")) setBlocked(true);
      });
    } else {
      v.pause();
    }
  }, [inView, shouldLoad, blocked]);

  const playable = isPlayable(asset);
  const nextSrc = shouldLoad && playable ? asset!.src : undefined;

  useEffect(() => {
    if (!nextSrc || blocked) return;
    let timer: number | undefined;
    void Promise.resolve().then(() => {
      setActiveSrc((prev) => {
        if (!prev) return nextSrc;
        if (prev === nextSrc) return prev;
        setPreviousSrc(prev);
        setCrossfading(true);
        timer = window.setTimeout(() => {
          setPreviousSrc(undefined);
          setCrossfading(false);
        }, 700);
        return nextSrc;
      });
    });
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [nextSrc, blocked]);

  const useFallback = !playable || blocked;

  // When motion is blocked/unavailable and the caller supplied its own elegant
  // fallback, render it naturally (no forced aspect/border) to preserve layout.
  if (useFallback && fallback && !asset?.poster) {
    return <div className={cn("relative", className)}>{fallback}</div>;
  }

  const frame = (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        aspectClassName,
        rounded,
        !bare && "border border-border shadow-[var(--shadow-card)]",
      )}
    >
      {asset?.poster && (
        <Image
          src={asset.poster}
          alt={asset.posterAlt ?? asset.alt}
          fill
          sizes="100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
      )}
      {useFallback ? (
        !asset?.poster && <BrandedFallback alt={asset?.alt} />
      ) : (
        <>
          {previousSrc && crossfading && (
            <video
              className="video-crossfade-out absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-hidden
              src={previousSrc}
            />
          )}
          <video
            ref={videoRef}
            className={cn(
              "h-full w-full object-cover",
              asset!.poster && "relative transition-opacity duration-500 motion-reduce:transition-none",
              asset!.poster && readySrc !== activeSrc && "opacity-0",
              bare && previousSrc && crossfading && "video-crossfade-in absolute inset-0",
            )}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-label={asset!.alt}
            src={activeSrc}
            onPlaying={() => setReadySrc(activeSrc)}
            onError={() => setBlocked(true)}
          />
          {overlay && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,40,0)_40%,rgba(8,15,40,0.5)_100%)]"
            />
          )}
          {caption && (
            <div className="pointer-events-none absolute inset-x-4 bottom-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-sm font-medium leading-snug text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                  {caption}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (bare || !glow) {
    return <div className={cn("relative", className)}>{frame}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(26,86,219,0.28) 0%, rgba(26,86,219,0) 70%)",
        }}
      />
      {frame}
    </div>
  );
}

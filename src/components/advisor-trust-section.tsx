import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { HeroMedia } from "@/components/hero-media";
import {
  advisorIntroVideo,
  advisorPhotos,
  isViewable,
  type MediaAsset,
} from "@/lib/media/assets";
import { cn } from "@/lib/utils/cn";

type AdvisorTrustSectionProps = {
  className?: string;
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  /** Optional advisor intro video; falls back to photo, then placeholder. */
  video?: MediaAsset;
  /** Optional advisor photo; falls back to a clean branded placeholder. */
  photo?: MediaAsset;
};

const defaultParagraphs = [
  "Your answers help us prepare. The real value comes from the conversation that follows.",
  "A Broadview advisor will personally review your information and walk through your options.",
];

/**
 * Human trust section reinforcing real people and real guidance. Renders clean
 * branded placeholders today and seamlessly upgrades to advisor video/photo
 * once those media assets are enabled in src/lib/media/assets.ts.
 */
export function AdvisorTrustSection({
  className,
  eyebrow = "Real people. Real guidance.",
  heading = "Before we recommend a loan, we want to understand your goal.",
  paragraphs = defaultParagraphs,
  video,
  photo,
}: AdvisorTrustSectionProps) {
  const photoAsset = photo ?? advisorPhotos[0];

  const placeholder = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-border bg-[linear-gradient(160deg,var(--brand-light)_0%,#ffffff_70%)] shadow-[var(--shadow-card)]">
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <BrandLogo variant="mark" href="" className="h-14 w-auto" />
        <p className="max-w-xs text-sm font-medium text-foreground">
          A licensed Broadview advisor — ready to review your information personally.
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted shadow-[var(--shadow-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Real guidance, not a call center
        </span>
      </div>
    </div>
  );

  const visual = isViewable(photoAsset) ? (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-border shadow-[var(--shadow-card)]">
      <Image
        src={photoAsset.src}
        alt={photoAsset.alt}
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover"
      />
    </div>
  ) : (
    placeholder
  );

  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="section-container grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl md:leading-[1.12]">
            {heading}
          </h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>

        <HeroMedia video={video ?? advisorIntroVideo} fallback={visual} />
      </div>
    </section>
  );
}

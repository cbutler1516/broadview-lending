import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  variant?: "header" | "full" | "mark";
  href?: string | false;
  showParent?: boolean;
};

export function BrandLogo({
  className,
  variant = "header",
  href = "/",
}: BrandLogoProps) {
  // Display the supplied artwork unchanged, cropping only the outer canvas.
  const artworkWidth = 1284;
  const artworkHeight = 174;
  const image = (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden align-middle max-w-full",
        variant === "full" ? "w-56" : "h-5 sm:h-8",
        className,
      )}
      style={{ aspectRatio: `${artworkWidth} / ${artworkHeight}` }}
    >
      <Image
        src={brand.logos.fullLogoPath}
        alt={`${brand.companyName} powered by ${brand.parentCompany}`}
        width={2048}
        height={642}
        sizes={variant === "mark" ? "560px" : "(max-width: 639px) 320px, 500px"}
        loading={variant === "header" ? "eager" : "lazy"}
        className="absolute max-w-none"
        style={{
          width: `${(2048 / artworkWidth) * 100}%`,
          height: "auto",
          left: `${(-389 / artworkWidth) * 100}%`,
          top: `${(-219 / artworkHeight) * 100}%`,
        }}
      />
    </span>
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      aria-label={`${brand.companyName} home`}
      className="group inline-flex shrink-0 flex-col justify-center"
    >
      {image}
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand/config";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  variant?: "header" | "full" | "mark";
  href?: string;
};

export function BrandLogo({
  className,
  variant = "header",
  href = "/",
}: BrandLogoProps) {
  if (variant === "header") {
    const image = (
      <>
        <Image
          src={brand.logos.headerLogoPath}
          alt={`${brand.companyName} powered by ${brand.parentCompany}`}
          width={780}
          height={235}
          priority
          className={cn("hidden h-10 w-auto sm:block lg:h-12", className)}
        />
        <Image
          src={brand.logos.mobileLogoPath}
          alt={brand.companyName}
          width={240}
          height={227}
          priority
          className={cn("block h-9 w-auto sm:hidden", className)}
        />
      </>
    );

    if (!href) return image;

    return (
      <Link
        href={href}
        aria-label={`${brand.companyName} home`}
        className="group inline-flex shrink-0 flex-col justify-center"
      >
        {image}
        <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.14em] text-muted/80 lg:block">
          Powered by {brand.parentCompany}
        </span>
      </Link>
    );
  }

  const logo = {
    full: {
      src: brand.logos.fullLogoPath,
      width: 884,
      height: 495,
      className: "h-auto w-auto",
    },
    mark: {
      src: brand.logos.markPath,
      width: 240,
      height: 227,
      className: "h-10 w-auto",
    },
  }[variant];

  const image = (
    <Image
      src={logo.src}
      alt={
        variant === "full"
          ? `${brand.companyName} powered by ${brand.parentCompany}`
          : brand.companyName
      }
      width={logo.width}
      height={logo.height}
      priority
      className={cn(logo.className, className)}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  );
}

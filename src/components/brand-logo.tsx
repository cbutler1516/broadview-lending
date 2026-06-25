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
          className={cn("hidden h-11 w-auto sm:block", className)}
        />
        <Image
          src={brand.logos.mobileLogoPath}
          alt={brand.companyName}
          width={240}
          height={227}
          priority
          className={cn("block h-10 w-auto sm:hidden", className)}
        />
      </>
    );

    if (!href) return image;

    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {image}
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

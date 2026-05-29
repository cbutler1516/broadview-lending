import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  variant?: "full" | "mark";
  href?: string;
};

export function BrandLogo({
  className,
  variant = "full",
  href = "/",
}: BrandLogoProps) {
  const src =
    variant === "mark"
      ? "/brand/broadview-mark.svg"
      : "/brand/broadview-logo.svg";
  const width = variant === "mark" ? 36 : 180;
  const height = variant === "mark" ? 36 : 32;

  const image = (
    <Image
      src={src}
      alt="Broadview Lending"
      width={width}
      height={height}
      priority
      className={cn("h-auto w-auto", className)}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  );
}

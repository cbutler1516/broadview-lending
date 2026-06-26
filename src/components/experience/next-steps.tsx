import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type NextStepsProps = {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
};

/** Minimal forward-motion CTA pair — one headline section, one action. */
export function NextSteps({ primary, secondary, className }: NextStepsProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:justify-center", className)}>
      <Link href={primary.href} className="btn-primary">
        {primary.label}
      </Link>
      {secondary && (
        <Link href={secondary.href} className="btn-secondary">
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

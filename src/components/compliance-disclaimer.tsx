import { brand } from "@/lib/brand/config";
import { cn } from "@/lib/utils/cn";

type ComplianceDisclaimerProps = {
  variant?: "inline" | "block";
  className?: string;
};

export function ComplianceDisclaimer({
  variant = "block",
  className,
}: ComplianceDisclaimerProps) {
  const text = `${brand.disclaimers.short} ${brand.disclaimers.resultsEligibility}`;

  if (variant === "inline") {
    return <span className={cn("text-muted", className)}>{text}</span>;
  }

  return (
    <p className={cn("text-xs leading-relaxed text-muted", className)}>
      {text}
    </p>
  );
}

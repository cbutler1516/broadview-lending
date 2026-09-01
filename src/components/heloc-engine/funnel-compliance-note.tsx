import { FUNNEL_COMPLIANCE_DISCLAIMER } from "@/lib/heloc-engine/compliance";
import { cn } from "@/lib/utils/cn";

type FunnelComplianceNoteProps = {
  className?: string;
};

export function FunnelComplianceNote({ className }: FunnelComplianceNoteProps) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-slate-400", className)}>
      {FUNNEL_COMPLIANCE_DISCLAIMER}
    </p>
  );
}

"use client";

import { LiveStrategyPanel } from "@/components/funnel/live-strategy-panel";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";

type FunnelLayoutProps = {
  children: React.ReactNode;
  panel: {
    sections: BuilderSectionState[];
    goal?: string;
    propertyAddress?: string;
    estimatedEquity?: string;
    timeline?: string;
    options?: string[];
    advisorNotes?: string[];
    conversationTopics?: string[];
    phaseLabel: string;
    creditProfileCaptured?: boolean;
    cashTargetCaptured?: boolean;
    contactCaptured?: boolean;
    equityFocused?: boolean;
  };
};

export function FunnelLayout({ children, panel }: FunnelLayoutProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-12">
      <div className="min-w-0">{children}</div>
      <div className="hidden lg:sticky lg:top-24 lg:block">
        <LiveStrategyPanel {...panel} />
      </div>
      <details className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface lg:hidden">
        <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
          Your strategy so far
        </summary>
        <LiveStrategyPanel {...panel} compact />
      </details>
    </div>
  );
}

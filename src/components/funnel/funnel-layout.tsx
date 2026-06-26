"use client";

import { useState } from "react";
import { LiveStrategyPanel } from "@/components/funnel/live-strategy-panel";
import { cn } from "@/lib/utils/cn";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";

type FunnelLayoutProps = {
  children: React.ReactNode;
  panel: {
    sections: BuilderSectionState[];
    goal?: string;
    estimatedEquity?: string;
    timeline?: string;
    options?: string[];
    advisorNotes?: string[];
    conversationTopics?: string[];
    phaseLabel: string;
  };
};

export function FunnelLayout({ children, panel }: FunnelLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-12">
        <div className="min-w-0">{children}</div>

        <div className="hidden lg:block lg:sticky lg:top-24">
          <LiveStrategyPanel
            sections={panel.sections}
            goal={panel.goal}
            estimatedEquity={panel.estimatedEquity}
            timeline={panel.timeline}
            options={panel.options}
            advisorNotes={panel.advisorNotes}
            conversationTopics={panel.conversationTopics}
            phaseLabel={panel.phaseLabel}
          />
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
        {!mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="mx-auto mb-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-5 py-2.5 text-sm font-semibold shadow-lg backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-brand" />
            Your Strategy
          </button>
        )}
        <div
          className={cn(
            "rounded-t-[1.75rem] border border-b-0 border-white/30 bg-white/90 shadow-[0_-12px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-transform duration-500 ease-out",
            mobileOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex justify-center pt-3">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="h-1 w-10 rounded-full bg-border"
              aria-label="Close strategy panel"
            />
          </div>
          <LiveStrategyPanel
            compact
            sections={panel.sections}
            goal={panel.goal}
            estimatedEquity={panel.estimatedEquity}
            timeline={panel.timeline}
            options={panel.options}
            advisorNotes={panel.advisorNotes}
            conversationTopics={panel.conversationTopics}
            phaseLabel={panel.phaseLabel}
          />
        </div>
        {mobileOpen && (
          <button
            type="button"
            aria-label="Dismiss"
            className="fixed inset-0 -z-10 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

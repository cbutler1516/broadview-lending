"use client";

import { ChrisInsight } from "@/components/strategy/chris-insight";
import { PersonalizedRecommendations } from "@/components/intelligence/personalized-recommendations";
import { cn } from "@/lib/utils/cn";

type EcosystemStrategyStripProps = {
  className?: string;
};

export function EcosystemStrategyStrip({ className }: EcosystemStrategyStripProps) {
  return (
    <section className={cn("border-t border-border py-12 md:py-16", className)}>
      <div className="section-container space-y-10">
        <ChrisInsight />
        <PersonalizedRecommendations limit={3} />
      </div>
    </section>
  );
}

"use client";

import { AdaptiveBanner } from "@/components/strategy/adaptive-banner";
import { ChrisInsight } from "@/components/strategy/chris-insight";
import { EvolvingCta } from "@/components/strategy/evolving-cta";
import { PersonalizedRecommendations } from "@/components/intelligence/personalized-recommendations";

export function HomeStrategyLayer() {
  return (
    <>
      <AdaptiveBanner />
      <section className="border-t border-border py-12 md:py-16">
        <div className="section-container space-y-10">
          <ChrisInsight seed="homepage" />
          <PersonalizedRecommendations
            heading="Continue your strategy"
            intro="Based on what you've explored so far."
            limit={3}
          />
        </div>
      </section>
      <section className="border-t border-border py-16 md:py-20">
        <div className="section-container text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ready for a real conversation?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            A licensed advisor reviews your strategy and walks through options with you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center">
            <EvolvingCta secondaryHref="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}

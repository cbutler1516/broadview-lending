"use client";

import { useMemo, useState } from "react";
import { LiveStrategyPanel } from "@/components/funnel/live-strategy-panel";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { heroVideoForTheme } from "@/lib/media/assets";
import { labelForGoalValue } from "@/lib/funnels/goal-entry";
import type { BuilderSectionState } from "@/lib/funnels/strategy-builder";
import { cn } from "@/lib/utils/cn";

type GoalOption = {
  value: string;
  label: string;
};

type HomeEquityGoalHeroProps = {
  options: GoalOption[];
  initialGoal?: string;
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
  onPreview: (value: string) => void;
  onSelect: (value: string) => void;
};

const goalDetails: Record<
  string,
  { title: string; body: string; icon: string; headline: string }
> = {
  "remodel-home": {
    title: "Remodel My Home",
    body: "Turn equity into a more useful, comfortable space.",
    icon: "⌂",
    headline: "Plan a smarter way to fund your remodel.",
  },
  "consolidate-debt": {
    title: "Pay Off Debt",
    body: "Simplify payments and understand the trade-offs.",
    icon: "◌",
    headline: "Compare ways to create more monthly breathing room.",
  },
  "buy-another-home": {
    title: "Purchase Another Property",
    body: "Explore using equity for your next move.",
    icon: "＋",
    headline: "See how equity could support another property.",
  },
  "purchase-investment-property": {
    title: "Invest",
    body: "Evaluate leverage, reserves, and long-term flexibility.",
    icon: "▴",
    headline: "Build a cleaner investment property strategy.",
  },
  "business-opportunity": {
    title: "Grow My Business",
    body: "Review capital options without rushing the structure.",
    icon: "◇",
    headline: "Explore business capital with a repayment plan.",
  },
  education: {
    title: "Education",
    body: "Create a plan for tuition or family education goals.",
    icon: "✦",
    headline: "Map education funding without guesswork.",
  },
  "emergency-funds": {
    title: "Emergency Funds",
    body: "Build flexibility before you need it.",
    icon: "●",
    headline: "Create a safer source of backup liquidity.",
  },
  "not-sure": {
    title: "I'm Not Sure Yet",
    body: "Start with clarity. We’ll narrow it down together.",
    icon: "⌁",
    headline: "Start with your situation, not a product.",
  },
};

const primaryGoalOrder = [
  "remodel-home",
  "consolidate-debt",
  "buy-another-home",
  "purchase-investment-property",
  "business-opportunity",
  "education",
  "emergency-funds",
  "not-sure",
];

function optionFor(value: string) {
  return (
    goalDetails[value] ?? {
      title: labelForGoalValue(value),
      body: "Build a strategy around what matters most.",
      icon: "·",
      headline: "Let’s build your home equity strategy.",
    }
  );
}

export function HomeEquityGoalHero({
  options,
  initialGoal,
  panel,
  onPreview,
  onSelect,
}: HomeEquityGoalHeroProps) {
  const [activeGoal, setActiveGoal] = useState(initialGoal);
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>();
  const active = activeGoal ? optionFor(activeGoal) : undefined;

  const heroOptions = useMemo(
    () =>
      primaryGoalOrder
        .filter((value) => options.some((option) => option.value === value))
        .map((value) => ({
          value,
          ...optionFor(value),
        })),
    [options],
  );

  function choose(value: string) {
    setActiveGoal(value);
    setSelectedGoal(value);
    onPreview(value);
    window.setTimeout(() => onSelect(value), 260);
  }

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-surface">
        <LivingArchitectureVideo
          asset={heroVideoForTheme("home-equity")}
          bare
          eager
          aspectClassName="absolute inset-0 h-full w-full"
          rounded="rounded-none"
          className="absolute inset-0 -z-20"
          fallback={
            <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-light)_0%,var(--surface)_70%)]" />
          }
        />

        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_42%,rgba(255,255,255,0.42)_74%,rgba(255,255,255,0.12)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_88%_12%,rgba(26,86,219,0.14)_0%,rgba(26,86,219,0)_62%)]"
        />

        <div className="section-container grid min-h-[calc(100svh-4rem)] gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:py-12">
          <div className="max-w-4xl">
            <div className="funnel-step-enter max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                Home Equity Strategy
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.02]">
                {active?.headline ??
                  "What would you like your home equity to help you accomplish?"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                Let&apos;s understand your goals first. A Broadview advisor will
                help determine which financing strategy fits your situation.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroOptions.map((option) => {
                const selected = selectedGoal === option.value;
                const activeCard = activeGoal === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onMouseEnter={() => setActiveGoal(option.value)}
                    onFocus={() => setActiveGoal(option.value)}
                    onClick={() => choose(option.value)}
                    className={cn(
                      "home-equity-goal-card group min-h-[156px] rounded-[1.5rem] bg-white/72 p-5 text-left shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300",
                      "hover:-translate-y-1 hover:bg-white/86 hover:shadow-[0_22px_54px_rgba(26,86,219,0.16)]",
                      activeCard && "bg-white/90 ring-1 ring-brand/20",
                      selected && "scale-[0.985] ring-2 ring-brand/30",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-xl font-semibold text-brand transition-all duration-300",
                        activeCard && "bg-brand text-white shadow-[0_12px_28px_rgba(26,86,219,0.28)]",
                      )}
                    >
                      {option.icon}
                    </span>
                    <span className="mt-5 block text-lg font-semibold tracking-tight text-foreground">
                      {option.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">
                      {option.body}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <LiveStrategyPanel
              sections={panel.sections}
              goal={panel.goal}
              estimatedEquity={panel.estimatedEquity}
              timeline={panel.timeline}
              options={panel.options}
              advisorNotes={panel.advisorNotes}
              conversationTopics={panel.conversationTopics}
              phaseLabel={panel.phaseLabel}
              className="bg-white/68"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/80 py-5">
        <div className="section-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm text-muted">
          <span className="font-semibold tracking-[0.18em] text-brand">★★★★★</span>
          <span>Families helped</span>
          <span>Licensed mortgage advisors</span>
          <span>No credit pull to start</span>
        </div>
      </section>
    </>
  );
}

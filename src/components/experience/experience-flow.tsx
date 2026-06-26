"use client";

import { useState } from "react";
import { GoalSelector, isExperienceGoal } from "@/components/experience/goal-selector";
import { ConversationPreview } from "@/components/experience/conversation-preview";
import { StrategyPreview } from "@/components/experience/strategy-preview";
import type { ExperienceConfig } from "@/lib/experience/types";
import { platformGoals } from "@/lib/experience/goals";
import { recordGoal, type StrategyJourney } from "@/lib/strategy/workspace";

type ExperienceFlowProps = {
  config?: ExperienceConfig;
  /** Platform-level goals for homepage */
  platform?: boolean;
  context: string;
};

function journeyForGoal(
  goal: (typeof platformGoals)[number],
  config?: ExperienceConfig,
): StrategyJourney {
  if (config?.theme) return config.theme as StrategyJourney;
  const map: Record<string, StrategyJourney> = {
    buy: "buy",
    refinance: "refinance",
    "home-equity": "home-equity",
    commercial: "commercial",
  };
  return map[goal.id] ?? "unknown";
}

export function ExperienceFlow({ config, platform, context }: ExperienceFlowProps) {
  const goals = platform ? platformGoals : (config?.goals ?? []);
  const [selected, setSelected] = useState<(typeof goals)[number] | null>(null);

  function handleSelect(goal: (typeof goals)[number] | null) {
    setSelected(goal);
    if (goal) {
      recordGoal({
        id: goal.id,
        title: goal.title,
        journey: journeyForGoal(goal, config),
      });
    }
  }

  return (
    <>
      <GoalSelector
        goals={goals}
        context={context}
        onSelect={handleSelect}
        columns={platform ? 3 : goals.length > 6 ? 3 : 2}
      />

      {selected && isExperienceGoal(selected) && config && (
        <>
          <ConversationPreview
            topics={selected.discuss ?? []}
            className="border-t border-border"
          />
          <StrategyPreview
            goal={selected}
            funnelHref={config.funnelHref}
            bookingLocation={`${context}_preview`}
            funnelType={config.funnelType}
          />
        </>
      )}
    </>
  );
}

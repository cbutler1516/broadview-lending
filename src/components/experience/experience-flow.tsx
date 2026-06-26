"use client";

import { useState } from "react";
import { GoalSelector, isExperienceGoal } from "@/components/experience/goal-selector";
import { ConversationPreview } from "@/components/experience/conversation-preview";
import { StrategyPreview } from "@/components/experience/strategy-preview";
import type { ExperienceConfig } from "@/lib/experience/types";
import { platformGoals } from "@/lib/experience/goals";

type ExperienceFlowProps = {
  config?: ExperienceConfig;
  /** Platform-level goals for homepage */
  platform?: boolean;
  context: string;
};

export function ExperienceFlow({ config, platform, context }: ExperienceFlowProps) {
  const goals = platform ? platformGoals : (config?.goals ?? []);
  const [selected, setSelected] = useState<(typeof goals)[number] | null>(null);

  return (
    <>
      <GoalSelector
        goals={goals}
        context={context}
        onSelect={setSelected}
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

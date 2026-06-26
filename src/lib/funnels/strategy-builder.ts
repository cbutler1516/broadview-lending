import type { FunnelDefinition, FunnelQuestion, FunnelType } from "@/lib/funnels/types";
import { getActiveQuestions } from "@/lib/funnels/config";
import { labelForGoalValue } from "@/lib/funnels/goal-entry";

export type BuilderSection = "goal" | "home" | "timeline" | "options" | "strategy";

export type SectionStatus = "complete" | "active" | "preparing" | "waiting";

export type BuilderSectionState = {
  id: BuilderSection;
  label: string;
  status: SectionStatus;
  detail?: string;
};

const sectionLabels: Record<BuilderSection, string> = {
  goal: "Goal",
  home: "Home",
  timeline: "Timeline",
  options: "Options",
  strategy: "Strategy",
};

const questionSections: Record<string, BuilderSection> = {
  equityGoal: "goal",
  goalDetail: "goal",
  refinanceGoal: "goal",
  purchaseOrRefinance: "goal",
  purchasePrice: "home",
  downPayment: "home",
  estimatedPropertyValue: "home",
  mortgageBalance: "home",
  desiredEquityAmount: "home",
  homeValue: "home",
  currentBalance: "home",
  propertyType: "home",
  occupancy: "home",
  currentRate: "home",
  timeline: "timeline",
  creditScore: "options",
  veteran: "options",
  firstTimeHomebuyer: "options",
  workingWithRealtor: "options",
  militaryStatus: "options",
  firstUseVa: "options",
};

const timelineLabels: Record<string, string> = {
  "0-30-days": "Within 30 days",
  "1-3-months": "1 – 3 months",
  "3-6-months": "3 – 6 months",
  "6-plus-months": "6+ months",
  exploring: "Just exploring",
};

export function formatTimeline(value?: string): string | undefined {
  if (!value) return undefined;
  return timelineLabels[value] ?? value.replace(/-/g, " ");
}

function parseCurrency(value?: string): number {
  if (!value) return 0;
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatCurrency(value: number): string {
  if (value <= 0) return "";
  return `$${Math.round(value).toLocaleString()}`;
}

export function getQuestionSection(questionId: string): BuilderSection {
  return questionSections[questionId] ?? "options";
}

export function getPhaseLabel(
  currentSection: BuilderSection | null,
  hasResult: boolean,
): string {
  if (hasResult) return "Your Strategy Snapshot";
  switch (currentSection) {
    case "goal":
      return "Building Your Strategy";
    case "home":
      return "Preparing Your Options";
    case "timeline":
      return "Learning About Your Goals";
    case "options":
      return "Almost Ready";
    case "strategy":
      return "Final Details";
    default:
      return "Building Your Strategy";
  }
}

function isQuestionAnswered(
  question: FunnelQuestion,
  answers: Record<string, string>,
): boolean {
  const value = answers[question.id];
  return Boolean(value?.trim());
}

function sectionDetail(
  section: BuilderSection,
  answers: Record<string, string>,
  funnelType: FunnelType,
): string | undefined {
  switch (section) {
    case "goal": {
      const goal =
        answers.equityGoal ?? answers.refinanceGoal ?? answers.purchaseOrRefinance;
      return goal ? labelForGoalValue(goal) : undefined;
    }
    case "home": {
      const equity = computeEstimatedEquity(answers);
      if (equity) return `Est. ${equity} available`;
      const price = parseCurrency(answers.purchasePrice ?? answers.homeValue);
      if (price) return formatCurrency(price);
      return undefined;
    }
    case "timeline":
      return formatTimeline(answers.timeline);
    case "options":
      return answers.creditScore
        ? answers.creditScore.replace(/-/g, " – ")
        : undefined;
    case "strategy":
      return funnelType === "heloc" ? "Preparing" : "Preparing";
    default:
      return undefined;
  }
}

export function computeEstimatedEquity(
  answers: Record<string, string>,
): string | undefined {
  const value = parseCurrency(
    answers.estimatedPropertyValue ?? answers.homeValue,
  );
  const balance = parseCurrency(answers.mortgageBalance ?? answers.currentBalance);
  if (!value || !balance) return undefined;
  const available = Math.max(0, value * 0.8 - balance);
  return formatCurrency(available);
}

export function computeBuilderSections(
  definition: FunnelDefinition,
  answers: Record<string, string>,
  currentQuestionId?: string,
  hasResult = false,
): BuilderSectionState[] {
  const activeQuestions = getActiveQuestions(definition, answers);
  const currentSection = currentQuestionId
    ? getQuestionSection(currentQuestionId)
    : null;

  const sections: BuilderSection[] = [
    "goal",
    "home",
    "timeline",
    "options",
    "strategy",
  ];

  return sections.map((id) => {
    const sectionQuestions = activeQuestions.filter(
      (q) => getQuestionSection(q.id) === id,
    );
    const allAnswered =
      sectionQuestions.length > 0 &&
      sectionQuestions.every((q) => isQuestionAnswered(q, answers));
    const anyAnswered = sectionQuestions.some((q) =>
      isQuestionAnswered(q, answers),
    );
    const isActive = currentSection === id;

    let status: SectionStatus = "waiting";
    if (id === "strategy") {
      if (hasResult) status = "complete";
      else if (allAnswered || (anyAnswered && !currentQuestionId))
        status = "preparing";
      else if (isActive) status = "preparing";
    } else if (allAnswered) {
      status = "complete";
    } else if (isActive) {
      status = "active";
    } else if (anyAnswered) {
      status = "preparing";
    }

    let detail = sectionDetail(id, answers, definition.type);
    if (id === "home" && status === "active" && !detail) {
      detail = "Estimating equity…";
    }
    if (id === "strategy" && status === "preparing") {
      detail = "Preparing";
    }
    if (id === "timeline" && status === "waiting") {
      detail = "Waiting";
    }
    if (id === "options" && status === "waiting") {
      detail = "Waiting";
    }

    return {
      id,
      label: sectionLabels[id],
      status,
      detail: status === "complete" && id === "goal" && detail ? `✓ ${detail}` : detail,
    };
  });
}

export function getAnswerLabel(
  question: FunnelQuestion,
  value: string,
): string {
  const option = question.options?.find((o) => o.value === value);
  return option?.label ?? value;
}

export function getConversationTopics(
  definition: FunnelDefinition,
  answers: Record<string, string>,
): string[] {
  const topics: string[] = [];
  if (answers.equityGoal) {
    topics.push(`How equity may support ${labelForGoalValue(answers.equityGoal).toLowerCase()}`);
  }
  if (answers.refinanceGoal) {
    topics.push(`Whether ${labelForGoalValue(answers.refinanceGoal).toLowerCase()} fits your timeline`);
  }
  const equity = computeEstimatedEquity(answers);
  if (equity) topics.push(`Estimated available equity of ${equity}`);
  if (answers.timeline) topics.push("Timeline and next steps");
  if (answers.creditScore) topics.push("Credit profile and structure options");
  if (answers.propertyType || answers.occupancy) {
    topics.push("Property type and occupancy");
  }
  if (topics.length === 0) {
    topics.push("Your goals and timeline", "Options worth comparing", "Questions before any recommendation");
  }
  return topics.slice(0, 4);
}

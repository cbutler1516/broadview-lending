import type { StrategyWorkspace } from "@/lib/strategy/workspace";

export type ProgressPhase = {
  label: string;
  percent: number;
};

export function getProgressPhase(ws: StrategyWorkspace): ProgressPhase {
  const p = ws.progress;
  if (p < 20) return { label: "Getting Oriented", percent: Math.max(p, 8) };
  if (p < 45) return { label: "Understanding Options", percent: p };
  if (p < 70) return { label: "Strategy Taking Shape", percent: p };
  return { label: "Ready to Discuss", percent: p };
}

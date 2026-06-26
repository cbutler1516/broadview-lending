import type { StrategyJourney } from "@/lib/strategy/workspace";

export type ChrisInsight = {
  body: string;
  context?: StrategyJourney[];
};

export const chrisInsights: ChrisInsight[] = [
  {
    body: "One thing I tell nearly every first-time buyer: the monthly payment you’re comfortable with matters more than the number on the pre-approval letter.",
    context: ["buy"],
  },
  {
    body: "Before refinancing, I always ask what prompted the question. Sometimes the answer isn’t a new loan — it’s a different structure.",
    context: ["refinance"],
  },
  {
    body: "Home equity isn’t free money. It’s a tool — and the best use depends on whether you want to keep your first mortgage rate.",
    context: ["home-equity"],
  },
  {
    body: "VA buyers often focus on the rate. I focus on whether they’re using their benefit in a way that still fits their long-term plan.",
    context: ["va", "buy"],
  },
  {
    body: "Commercial financing starts with the exit. If we can’t explain how the loan gets repaid, we’re not ready to recommend a structure.",
    context: ["commercial"],
  },
  {
    body: "The comparison that helps most people isn’t HELOC vs cash-out on paper — it’s what each option does to your payment five years from now.",
    context: ["home-equity", "refinance"],
  },
  {
    body: "I’d rather someone leave a call with clarity and no loan than rush into the wrong product because the website made it feel urgent.",
  },
];

export function pickChrisInsight(input: {
  journey?: StrategyJourney;
  seed?: string;
}): ChrisInsight {
  const pool = chrisInsights.filter(
    (i) => !i.context?.length || (input.journey && i.context.includes(input.journey)),
  );
  const list = pool.length > 0 ? pool : chrisInsights;
  const seed = input.seed ?? "0";
  const idx =
    seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % list.length;
  return list[idx]!;
}

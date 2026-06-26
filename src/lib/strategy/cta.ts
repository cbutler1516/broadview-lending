import type { StrategyWorkspace } from "@/lib/strategy/workspace";

export function getEvolvingCta(ws: StrategyWorkspace): {
  primary: string;
  secondary: string;
  href: string;
} {
  if (ws.progress >= 70) {
    return {
      primary: "Schedule My Strategy Session",
      secondary: "Review My Plan",
      href: ws.goal?.journey === "home-equity" ? "/funnel/heloc" : "/funnel/purchase",
    };
  }
  if (ws.progress >= 45) {
    return {
      primary: "Talk Through My Options",
      secondary: "See My Next Step",
      href: "/#start",
    };
  }
  if (ws.progress >= 20) {
    return {
      primary: "Continue Building My Strategy",
      secondary: "See My Next Step",
      href: "/#start",
    };
  }
  return {
    primary: "Continue Building My Strategy",
    secondary: "Explore Your Options",
    href: "/#start",
  };
}

export function getWelcomeMessage(ws: StrategyWorkspace): string | null {
  if (!ws.goal && ws.visits < 2) return null;
  if (ws.goal) {
    return `Still planning ${ws.goal.title.toLowerCase()}? Continue your strategy.`;
  }
  if (ws.homeEquityInterest) {
    return "Still exploring your home equity options? Pick up where you left off.";
  }
  if (ws.refinanceInterest) {
    return "Still thinking about refinancing? Continue your strategy.";
  }
  if (ws.commercialInterest) {
    return "Still planning your commercial strategy? Continue where you left off.";
  }
  if (ws.visits >= 2) {
    return "Welcome back. Continue building your mortgage strategy.";
  }
  return null;
}

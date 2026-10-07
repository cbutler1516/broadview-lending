import { academyLessons } from "../content/academy";
import { brand } from "../brand/config";

export type GuideResource = { title: string; href: string; summary: string; keywords: string };
export const guideResources: GuideResource[] = [
  { title: "Realtor Academy", href: "/learn/realtor-academy", summary: "Six practical agent playbooks, checklists, conversation starters, and a weekly action plan.", keywords: "realtor agent academy outreach client leads prospecting deals marketing weekly" },
  { title: "Homebuyer Learning Center", href: "/learn/homebuyer-center", summary: "Clear guides to payment comfort, offers, seller credits, and deciding whether buying fits your plans.", keywords: "homebuyer homeowner education learn first home" },
  { title: "Offer Comparison", href: "/tools/offer-comparison", summary: "Compare two fixed-rate purchase scenarios using your price, rate, down payment, eligible costs, and credits. No future rate or price predictions.", keywords: "offer price seller credit points concession payment compare calculator" },
  { title: "Affordability Planner", href: "/tools/affordability-planner", summary: "Start with a comfortable payment and review the purchase-price assumptions with an advisor.", keywords: "budget afford affordability payment buying calculator" },
  { title: "Investor Deal Analyzer", href: "/tools/investor-deal-analyzer", summary: "Use your own rental and expense assumptions to estimate cash flow, DSCR and returns. Realtor / Agent mode creates a client presentation.", keywords: "invest investor rental dscr brrrr flip cash flow realtor agent presentation report" },
  { title: "Cash-Out vs HELOC", href: "/tools/cash-out-vs-heloc", summary: "Compare home equity borrowing structures and their costs using your own assumptions.", keywords: "homeowner equity heloc cash refinance debt renovation" },
  { title: "Talk with a Broadview advisor", href: "/contact", summary: `Request personal guidance or find the direct application link. The office number is ${brand.contact.phone}.`, keywords: "human contact advisor apply application arive phone help rate quote approval" },
  ...academyLessons.map((lesson) => ({ title: lesson.title, href: `/learn/${lesson.slug}`, summary: lesson.summary, keywords: `${lesson.audience} ${lesson.slug.replaceAll("-", " ")} ${lesson.checklist.join(" ")}` })),
];

export function findGuideResources(message: string): GuideResource[] {
  const tokens = [...new Set(message.toLowerCase().match(/[a-z]{3,}/g) ?? [])].filter((word) => !["the", "and", "with", "what", "how", "can", "for", "that", "this", "have", "you", "would", "about"].includes(word));
  const ranked = guideResources.map((resource, index) => ({ resource, index, score: tokens.reduce((score, token) => score + (`${resource.title} ${resource.keywords}`.toLowerCase().includes(token) ? 2 : resource.summary.toLowerCase().includes(token) ? 1 : 0), 0) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
  return ranked.length ? ranked.slice(0, 3).map((item) => item.resource) : guideResources.slice(0, 2);
}

export function sensitiveMessage(message: string): boolean {
  return /\b\d{3}[- ]\d{2}[- ]\d{4}\b|\b\d{9,}\b|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b(?:ssn|social security|bank account|routing number|password)\b/i.test(message);
}

export function resourceAnswer(message: string) {
  const resources = findGuideResources(message);
  const normalized = message.toLowerCase();
  const answer = sensitiveMessage(message)
    ? "Please leave out personal identifiers, account details, passwords, and private client information. Use Broadview’s application portal or speak with an advisor for sensitive financial details."
    : /\b(rate quote|today.s rate|current rate|approved|approval|qualify|guarantee)\b/.test(normalized)
      ? "I can point you to educational resources, but I cannot quote live rates, determine eligibility, or promise financing or returns. A Broadview advisor can review your specific situation."
      : `Here is a useful place to start: ${resources[0].summary} These resources are educational, not a personalized financing recommendation.`;
  return { mode: "resources" as const, answer, resources: sensitiveMessage(message) ? [guideResources[6]] : resources };
}

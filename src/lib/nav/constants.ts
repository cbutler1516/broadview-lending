import { brand } from "@/lib/brand/config";

export const NAV_PRIMARY_CTA_LABEL = "Explore Your Options";

export const SCENARIO_CTA = {
  label: "Explore Your Options",
  href: "/#journeys",
  longLabel: "Explore Your Options",
} as const;

export type NavChild = { href: string; label: string };

export const NAV_BUY = {
  label: "Buy",
  href: "/buy",
  children: [
    { href: "/buy", label: "Purchase" },
    { href: "/buy/first-time-homebuyer", label: "First-Time Buyer" },
    { href: "/buy/conventional-loans", label: "Conventional" },
    { href: "/buy/fha-loans", label: "FHA" },
    { href: "/buy/va-loans", label: "VA" },
    { href: "/buy/jumbo-loans", label: "Jumbo" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_REFINANCE = {
  label: "Refinance",
  href: "/refinance",
  children: [
    { href: "/refinance/rate-and-term-refinance", label: "Rate / Term" },
    { href: "/refinance/cash-out-refinance", label: "Cash-Out" },
    { href: "/refinance/fha-streamline", label: "FHA Streamline" },
    { href: "/refinance/va-irrrl", label: "VA IRRRL" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_HOME_EQUITY = {
  label: "Home Equity",
  href: "/heloc",
  children: [
    { href: "/heloc", label: "HELOC" },
    { href: "/heloc/home-equity-loan", label: "Home Equity Loan" },
    { href: "/heloc/heloc-vs-cash-out", label: "Cash Access" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_INVEST = {
  label: "Invest",
  href: "/invest",
  children: [
    { href: "/invest/dscr", label: "DSCR" },
    { href: "/invest/fix-and-flip", label: "Fix & Flip" },
    { href: "/invest/bridge", label: "Bridge" },
    { href: "/invest/new-construction", label: "New Construction" },
    { href: "/invest/brrrr", label: "BRRRR" },
    { href: "/invest/investor-heloc", label: "Investor HELOC" },
    { href: "/invest/multifamily", label: "Multifamily / Commercial" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
] as const;

export const PRODUCT_FUNNEL_ROUTES: Record<string, string> = {
  "/buy": "/funnel/purchase",
  "/refinance": "/funnel/refinance",
  "/heloc": "/funnel/heloc",
  "/invest": "/invest#analyze",
  "/invest/investor-heloc": "/funnel/heloc",
  "/commercial": "/invest/multifamily#analyze",
  "/tools": "/tools",
};

export function scenarioHrefForPath(pathname: string | null | undefined): string {
  if (!pathname) return SCENARIO_CTA.href;
  if (pathname.startsWith("/funnel/heloc") || pathname.startsWith("/heloc")) {
    return "/funnel/heloc";
  }
  if (pathname.startsWith("/funnel/refinance") || pathname.startsWith("/refinance")) {
    return "/funnel/refinance";
  }
  if (pathname.startsWith("/funnel/")) {
    return pathname;
  }
  if (pathname.startsWith("/buy")) return "/funnel/purchase";
  if (pathname.startsWith("/invest/investor-heloc")) return "/funnel/heloc";
  if (pathname.startsWith("/invest")) return `${pathname}#analyze`;
  if (pathname.startsWith("/commercial")) return "/invest/multifamily#analyze";
  return PRODUCT_FUNNEL_ROUTES[pathname] ?? SCENARIO_CTA.href;
}

export const CONTACT = brand.contact;
export const SITE_NAME = brand.companyName;

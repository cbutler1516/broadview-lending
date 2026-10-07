import { brand } from "@/lib/brand/config";

export const NAV_PRIMARY_CTA_LABEL = "Explore My Loan Options";

/** Direct application destination; never append lead or scenario data. */
export const APPLICATION_CTA = {
  label: "Apply",
  href: "https://broadviewlending.my1003app.com/1585236/register?time=1791233747222",
} as const;

export const SCENARIO_CTA = {
  label: "Explore My Loan Options",
  href: "/#journeys",
  longLabel: "Explore My Loan Options",
} as const;

export type NavChild = { href: string; label: string };

export const NAV_BUY = {
  label: "Buy",
  href: "/buy",
  children: [
    { href: "/buy", label: "Explore buying a home" },
    { href: "/buy/first-time-homebuyer", label: "First-Time Buyer" },
    { href: "/buy/conventional-loans", label: "Conventional" },
    { href: "/buy/fha-loans", label: "FHA" },
    { href: "/buy/va-loans", label: "VA" },
    { href: "/buy/jumbo-loans", label: "Jumbo" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_REFINANCE = {
  label: "Refinance & Equity",
  href: "/refinance",
  children: [
    { href: "/refinance", label: "Explore refinancing options" },
    { href: "/refinance/cash-out-refinance", label: "Cash-Out" },
    { href: "/heloc", label: "HELOC" },
    { href: "/heloc/home-equity-loan", label: "Home Equity Loan" },
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
    { href: "/invest", label: "Explore all investor options" },
    { href: "/invest/dscr", label: "DSCR" },
    { href: "/invest/fix-and-flip", label: "Fix & Flip" },
    { href: "/invest/bridge", label: "Bridge" },
    { href: "/invest/multifamily", label: "Multifamily / Commercial" },
  ],
} as const satisfies { label: string; href: string; children: readonly NavChild[] };

export const NAV_TOOLS = {
  label: "Tools", href: "/tools", children: [
    { label: "Find the right tool", href: "/tools" },
    { label: "Affordability Planner", href: "/tools/affordability-planner" },
    { label: "Offer Comparison", href: "/tools/offer-comparison" },
    { label: "Cash-Out vs HELOC", href: "/tools/cash-out-vs-heloc" },
    { label: "Investor Deal Analyzer", href: "/tools/investor-deal-analyzer" },
  ],
} as const;
export const NAV_EDUCATION = {
  label: "Education", href: "/learn", children: [
    { label: "Education Home", href: "/learn" },
    { label: "Realtor Academy", href: "/learn/realtor-academy" },
    { label: "Homebuyer Learning Center", href: "/learn/homebuyer-center" },
    { label: "Market Notes & Blog", href: "/blog" },
  ],
} as const;
export const NAV_LINKS: readonly NavChild[] = [
  { label: "Completed Deals", href: "/completed-financing" },
];

export const NAV_RESOURCES = {
  label: "Resources", href: "/learn", children: [
    { label: "Calculators & Tools", href: "/tools" },
    { label: "Homebuyer Education", href: "/learn/homebuyer-center" },
    { label: "Realtor Academy", href: "/learn/realtor-academy" },
    { label: "Market Notes & Blog", href: "/blog" },
    { label: "Explore all education", href: "/learn" },
  ],
} as const;

export const PRODUCT_FUNNEL_ROUTES: Record<string, string> = {
  "/buy": "/funnel/purchase",
  "/buy/first-time-homebuyer": "/funnel/first-time-homebuyer",
  "/buy/fha-loans": "/funnel/fha",
  "/buy/va-loans": "/funnel/va",
  "/refinance": "/funnel/refinance",
  "/heloc": "/funnel/heloc",
  "/invest": "/tools/investor-deal-analyzer",
  "/invest/investor-heloc": "/funnel/heloc",
  "/commercial": "/tools/investor-deal-analyzer",
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
  if (pathname.startsWith("/buy")) return PRODUCT_FUNNEL_ROUTES[pathname] ?? "/funnel/purchase";
  if (pathname.startsWith("/invest/investor-heloc")) return "/funnel/heloc";
  if (pathname.startsWith("/invest") || pathname.startsWith("/commercial")) return "/tools/investor-deal-analyzer";
  return PRODUCT_FUNNEL_ROUTES[pathname] ?? SCENARIO_CTA.href;
}

export const CONTACT = brand.contact;
export const SITE_NAME = brand.companyName;

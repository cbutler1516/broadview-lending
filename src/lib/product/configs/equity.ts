import { HELOC_PRODUCT } from "@/lib/product/configs/heloc-homebridge";
export { HELOC_PRODUCT };
import {
  advisorSection,
  calculatorSection,
  conventionalProcess,
  finalCta,
  productHero,
} from "@/lib/product/shared";
import type { ProductDefinition } from "@/lib/product/types";

const EQUITY_TOOLS = [
  {
    icon: "calculator" as const,
    title: "Cash-Out vs HELOC",
    description: "Compare keeping your mortgage with a HELOC against a cash-out refinance.",
    href: "/tools/cash-out-vs-heloc",
  },
  {
    icon: "layers" as const,
    title: "Home Equity Strategy",
    description: "A short experience that prepares your advisor to review equity options.",
    href: "/funnel/heloc",
  },
];

export const HOME_EQUITY_LOAN_PRODUCT: ProductDefinition = {
  slug: "home-equity-loan",
  path: "/heloc/home-equity-loan",
  group: "equity",
  title: "Home Equity Loan",
  description:
    "Home equity loan guidance from Broadview — a defined second-lien conversation when a lump sum and payment may fit better than a HELOC.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Home Equity", path: "/heloc" },
    { name: "Home Equity Loan", path: "/heloc/home-equity-loan" },
  ],
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "inline",
    },
    hero: productHero(
      "equity",
      {
        eyebrow: "Home Equity Loan",
        headlineBefore: "Home equity loans. ",
        headlineAccent: "Plan your next move.",
        subheadline:
          "A home equity loan is a closed-end second — useful when you know the amount and want a payment, not a revolving line.",
        chips: ["Second-lien conversation", "Advisor review", "Compared with HELOC and cash-out"],
      },
      {
        facts: {
          title: "When a loan may fit better than a line",
          facts: [
            { label: "Known amount", detail: "A project or payoff with a defined number" },
            { label: "Payment preference", detail: "A scheduled payment instead of a revolving draw" },
            { label: "Keep first mortgage", detail: "Can sit behind a rate you want to preserve" },
            { label: "Advisor comparison", detail: "Still compared with HELOC and cash-out" },
          ],
        },
      },
    ),
    highlights: {
      tag: "Home Equity Loan",
      title: "Not a HELOC. Not a cash-out. A third structure.",
      description: "We use this page to explain the difference — then an advisor confirms what belongs in your situation.",
      compact: true,
      items: [
        { icon: "fileText", title: "Closed-end second", description: "You borrow a set amount and repay it on a schedule." },
        { icon: "layers", title: "Behind the first mortgage", description: "The existing first loan can stay in place." },
        { icon: "handshake", title: "Compared, not sold", description: "If a HELOC or cash-out is cleaner, we will say so." },
      ],
    },
    calculators: calculatorSection("equity", EQUITY_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("equity"),
    related: [
      { href: "/heloc", label: "HELOC", description: "Flexible access instead of a lump sum." },
      { href: "/refinance/cash-out-refinance", label: "Cash-Out", description: "If replacing the first mortgage is cleaner." },
      { href: "/heloc/heloc-vs-cash-out", label: "Cash Access", description: "HELOC versus cash-out." },
    ],
    faq: {
      title: "Home equity loan FAQ",
      items: [
        {
          question: "How is a home equity loan different from a HELOC?",
          answer:
            "A home equity loan is typically a fixed amount with a scheduled payment. A HELOC is revolving. Broadview compares both against the use of funds and the first mortgage.",
        },
        {
          question: "Is a home equity loan the same as cash-out refinance?",
          answer:
            "No. Cash-out replaces the first mortgage. A home equity loan usually sits behind it. That distinction is the core of the advisor conversation.",
        },
      ],
    },
    cta: finalCta("equity", {
      title: "Explore a home equity loan conversation.",
      description: "Start the equity experience so an advisor can compare a loan, a HELOC, and cash-out.",
    }),
  },
};

export const EQUITY_PRODUCTS = [HELOC_PRODUCT, HOME_EQUITY_LOAN_PRODUCT];

import {
  advisorSection,
  calculatorSection,
  conventionalProcess,
  finalCta,
  productHero,
  videoForGroup,
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

export const HELOC_PRODUCT: ProductDefinition = {
  slug: "heloc",
  path: "/heloc",
  group: "equity",
  title: "HELOC & Home Equity Options",
  description:
    "Explore HELOC and home-equity options with Broadview. Start online, then a licensed advisor reviews the details before recommendations.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Home Equity", path: "/heloc" },
  ],
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "editorial",
      advisorVariant: "asymmetric",
      story: {
        video: videoForGroup("equity"),
        caption: "Equity is a strategy — not a product sheet.",
      },
    },
    hero: productHero(
      "equity",
      {
        eyebrow: "Home Equity",
        headlineBefore: "HELOC and home equity options. ",
        headlineAccent: "Start with your goal.",
        subheadline:
          "HELOC, home equity loan, or cash-out. Start with the reason you need the funds — then compare structure.",
        chips: ["Advisor-led", "Keep or replace the first mortgage", "About 60 seconds to start"],
      },
      {
        facts: {
          title: "Orientation, not approval",
          facts: [
            { label: "HELOC", detail: "Flexible access that can sit behind the first mortgage" },
            { label: "Home equity loan", detail: "A fixed second-lien conversation" },
            { label: "Cash-out", detail: "Replace the first mortgage and take equity at closing" },
            { label: "Advisor review", detail: "Goal, payment, and lien position before a product" },
          ],
        },
      },
    ),
    paths: {
      tag: "Equity Paths",
      title: "Two structures. One review.",
      layout: "band",
      paths: [
        {
          title: "HELOC",
          description: "Revolving access that can preserve a first-mortgage rate you already like.",
          href: "/heloc",
          cta: "You are here",
        },
        {
          title: "Home Equity Loan",
          description: "A closed-end second with a defined amount and payment.",
          href: "/heloc/home-equity-loan",
          cta: "Explore",
        },
        {
          title: "Cash-Out Refinance",
          description: "Replace the first mortgage if that is the cleaner structure.",
          href: "/refinance/cash-out-refinance",
          cta: "Compare",
        },
      ],
    },
    highlights: {
      tag: "Home Equity",
      title: "Use the house. Do not treat it like a product sheet.",
      description: "Remodel, reserves, another home, or investment planning — the goal changes the structure.",
      compact: true,
      items: [
        { icon: "layers", title: "Keep the first mortgage when it still works", description: "A HELOC can sit behind a rate you do not want to give up." },
        { icon: "wallet", title: "Match structure to the use of funds", description: "A remodel draw is a different conversation than a lump-sum payoff." },
        { icon: "shield", title: "Say the risk plainly", description: "Home-equity debt is secured by the house. We do not soften that." },
        { icon: "handshake", title: "Advisor before a draw", description: "The online experience prepares the review. It is not an approval." },
      ],
    },
    calculators: calculatorSection("equity", EQUITY_TOOLS),
    process: conventionalProcess("How an equity review works"),
    advisor: advisorSection("equity"),
    related: [
      { href: "/heloc/home-equity-loan", label: "Home Equity Loan", description: "A fixed second-lien conversation." },
      { href: "/heloc/heloc-vs-cash-out", label: "Cash Access", description: "HELOC versus cash-out." },
      { href: "/invest/investor-heloc", label: "Investor HELOC", description: "Equity on investment property." },
      { href: "/heloc/home-improvement", label: "Home Improvement", description: "If the goal is a remodel." },
    ],
    faq: {
      title: "HELOC FAQ",
      items: [
        {
          question: "What can I use a HELOC for?",
          answer:
            "Common conversations include home improvements, reserves, debt restructuring, another purchase, or investment planning. An advisor reviews purpose and payment impact together.",
        },
        {
          question: "Will this replace my current mortgage?",
          answer:
            "Not always. A HELOC may sit behind the first mortgage. A cash-out refinance replaces it. Broadview helps compare both.",
        },
        {
          question: "Can I start online?",
          answer:
            "Yes. The Home Equity Strategy Experience takes a few minutes and helps your advisor prepare. It is not a loan approval.",
        },
      ],
    },
    cta: finalCta("equity", {
      title: "Explore your equity options.",
      description: "Start with the goal. A Broadview advisor reviews whether a HELOC, home equity loan, or cash-out belongs in the discussion.",
    }),
  },
};

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

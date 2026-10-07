import {
  advisorSection,
  calculatorSection,
  conventionalProcess,
  finalCta,
  productHero,
  videoForGroup,
} from "@/lib/product/shared";
import type { ProductDefinition } from "@/lib/product/types";

const REFI_TOOLS = [
  {
    icon: "calculator" as const,
    title: "Cash-Out vs HELOC",
    description: "Compare keeping your mortgage with a HELOC against a cash-out refinance.",
    href: "/tools/cash-out-vs-heloc",
  },
  {
    icon: "layers" as const,
    title: "Home Equity Strategy",
    description: "If the goal is cash access, start with the equity experience.",
    href: "/funnel/heloc",
  },
];

function refiCrumbs(name: string, path: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Refinance", path: "/refinance" },
    { name, path },
  ];
}

export const REFINANCE_HUB_PRODUCT: ProductDefinition = {
  slug: "refinance",
  path: "/refinance",
  group: "refinance",
  title: "Mortgage Refinance Options",
  description:
    "Rate-and-term, cash-out, FHA Streamline, and VA IRRRL conversations — reviewed with a Broadview advisor.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Refinance", path: "/refinance" },
  ],
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "inline",
      story: { video: videoForGroup("refinance"), caption: "Refinance is a structure decision, not a rate headline." },
    },
    hero: productHero("refinance", {
      eyebrow: "Refinance",
      headlineBefore: "Mortgage refinancing. ",
      headlineAccent: "See what makes sense for you.",
      subheadline:
        "Rate-and-term, cash-out, streamline, or IRRRL. Start with the goal, then decide whether refinancing is even the right conversation.",
      chips: ["Advisor-led", "Rate, cash-out, streamline, IRRRL", "No credit pull to start"],
    }),
    paths: {
      tag: "Refinance Paths",
      title: "Four conversations. One advisor desk.",
      layout: "band",
      paths: [
        {
          title: "Rate & Term",
          description: "Change the rate or term without taking cash out.",
          href: "/refinance/rate-and-term-refinance",
          cta: "Explore",
        },
        {
          title: "Cash-Out",
          description: "Replace the first mortgage and access equity in one structure.",
          href: "/refinance/cash-out-refinance",
          cta: "Explore",
        },
        {
          title: "FHA Streamline & VA IRRRL",
          description: "Narrower paths if you already have FHA or VA financing.",
          href: "/refinance/fha-streamline",
          cta: "Explore streamline",
        },
      ],
    },
    highlights: {
      tag: "Why Refinance Carefully",
      title: "The payment is not the whole story.",
      description: "Closing costs, break-even, cash access, and keeping a first-mortgage rate all belong in the same conversation.",
      compact: true,
      items: [
        { icon: "refreshCw", title: "Rate and term", description: "A cleaner payment or a shorter horizon — without taking cash." },
        { icon: "wallet", title: "Cash-out vs HELOC", description: "Replacing the first mortgage is not the only way to use equity." },
        { icon: "fileText", title: "Streamline paths", description: "FHA Streamline and VA IRRRL are narrower conversations." },
      ],
    },
    calculators: calculatorSection("refinance", REFI_TOOLS),
    process: conventionalProcess("How a refinance review works"),
    advisor: advisorSection("refinance"),
    related: [
      { href: "/refinance/rate-and-term-refinance", label: "Rate & Term", description: "Change the rate or term without taking cash." },
      { href: "/refinance/cash-out-refinance", label: "Cash-Out", description: "Replace the first mortgage and access equity." },
      { href: "/heloc", label: "HELOC", description: "If you want to keep the first mortgage." },
    ],
    faq: {
      title: "Refinance FAQ",
      items: [
        {
          question: "Should I refinance just because rates moved?",
          answer:
            "Not automatically. Break-even, remaining term, cash needs, and the current first-mortgage structure all matter. An advisor helps you think it through.",
        },
        {
          question: "Is cash-out the same as a HELOC?",
          answer:
            "No. Cash-out replaces the first mortgage. A HELOC can sit behind it. Broadview compares both when the goal is access to equity.",
        },
      ],
    },
    cta: finalCta("refinance", {
      title: "Ready to review a refinance path?",
      description: "Start with the goal. An advisor will help you understand whether refinancing is the right conversation.",
    }),
  },
};

export const RATE_TERM_PRODUCT: ProductDefinition = {
  slug: "rate-and-term-refinance",
  path: "/refinance/rate-and-term-refinance",
  group: "refinance",
  title: "Rate-and-Term Refinance",
  description:
    "Rate-and-term refinance strategy with Broadview — change rate or term without taking cash out, reviewed by an advisor.",
  breadcrumbs: refiCrumbs("Rate & Term", "/refinance/rate-and-term-refinance"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "band",
      story: { video: videoForGroup("refinance"), caption: "A rate-and-term refinance should earn its closing costs." },
    },
    hero: productHero("refinance", {
      eyebrow: "Rate & Term",
      headlineBefore: "Rate-and-term refinancing. ",
      headlineAccent: "Review your next step.",
      subheadline:
        "Change the rate or the term. Keep the conversation about structure — not a headline rate.",
      chips: ["No cash-out", "Advisor review", "Break-even conversation"],
    }),
    highlights: {
      tag: "Rate & Term",
      title: "Refinance only if the structure improves.",
      description: "We review payment, term, mortgage insurance, and how long you plan to keep the loan.",
      compact: true,
      items: [
        { icon: "clock", title: "Break-even", description: "Closing costs only make sense if you will be in the loan long enough." },
        { icon: "refreshCw", title: "Term choice", description: "A lower payment can cost more interest over a longer horizon." },
        { icon: "shield", title: "Keep what already works", description: "Sometimes the current first mortgage is the better structure." },
        { icon: "handshake", title: "Advisor confirmation", description: "We will say so if refinancing is not the right discussion." },
      ],
    },
    calculators: calculatorSection("refinance", REFI_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("refinance"),
    related: [
      { href: "/refinance/cash-out-refinance", label: "Cash-Out", description: "If you also need equity." },
      { href: "/refinance/fha-streamline", label: "FHA Streamline", description: "If you already have an FHA loan." },
      { href: "/refinance/va-irrrl", label: "VA IRRRL", description: "If you already have a VA loan." },
    ],
    faq: {
      title: "Rate-and-term FAQ",
      items: [
        {
          question: "What is a rate-and-term refinance?",
          answer:
            "It changes the rate and/or term of the first mortgage without taking substantial cash out. Broadview reviews whether the new structure is actually better.",
        },
        {
          question: "Can I remove mortgage insurance this way?",
          answer:
            "Sometimes. It depends on value, loan balance, and program. That is part of the advisor conversation — not a website promise.",
        },
      ],
    },
    cta: finalCta("refinance", {
      title: "Review a rate-and-term refinance.",
      description: "Start the strategy experience so an advisor can compare staying put versus refinancing.",
    }),
  },
};

export const CASH_OUT_PRODUCT: ProductDefinition = {
  slug: "cash-out-refinance",
  path: "/refinance/cash-out-refinance",
  group: "refinance",
  title: "Cash-Out Refinance",
  description:
    "Cash-out refinance versus HELOC — Broadview helps you compare replacing the first mortgage with keeping it.",
  breadcrumbs: refiCrumbs("Cash-Out", "/refinance/cash-out-refinance"),
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "editorial",
      showQualificationSnapshot: true,
      storyTreatment: "none",
    },
    hero: productHero(
      "refinance",
      {
        eyebrow: "Cash-Out",
        headlineBefore: "Cash-out refinancing. ",
        headlineAccent: "Compare your equity options.",
        subheadline:
          "Replacing the first mortgage is one path. A HELOC may keep a rate you already like. We compare both.",
        chips: ["Cash-out vs HELOC", "Advisor comparison", "Educational first"],
      },
      {
        facts: {
          title: "Compare before you replace the first mortgage",
          facts: [
            { label: "Cash-out refinance", detail: "New first mortgage, equity taken at closing" },
            { label: "HELOC", detail: "Flexible access that can sit behind the current loan" },
            { label: "Goal first", detail: "Remodel, debt, reserves, or another purchase" },
            { label: "Advisor review", detail: "Payment, risk, and timeline before a product" },
          ],
        },
      },
    ),
    highlights: {
      tag: "Cash-Out",
      title: "The first mortgage is part of the decision.",
      description: "If the current rate is strong, replacing it can be the more expensive way to use equity.",
      compact: true,
      items: [
        { icon: "wallet", title: "Why you need the cash", description: "Remodel, consolidation, reserves, or another property change the structure." },
        { icon: "layers", title: "HELOC alternative", description: "Keeping the first mortgage is often the cleaner conversation." },
        { icon: "shield", title: "Secured-debt risk", description: "Cash-out and HELOC both put the home at risk. We say that plainly." },
        { icon: "handshake", title: "One advisor desk", description: "Refinance and home-equity paths stay in the same review." },
      ],
    },
    calculators: calculatorSection("refinance", REFI_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("refinance"),
    related: [
      { href: "/heloc", label: "HELOC", description: "Keep the first mortgage and access equity." },
      { href: "/heloc/heloc-vs-cash-out", label: "Cash Access", description: "Side-by-side comparison." },
      { href: "/refinance/rate-and-term-refinance", label: "Rate & Term", description: "If you do not need cash out." },
    ],
    faq: {
      title: "Cash-out refinance FAQ",
      items: [
        {
          question: "Is cash-out better than a HELOC?",
          answer:
            "Neither is automatically better. Cash-out replaces the first mortgage. A HELOC can preserve it. Broadview compares both against your goal and rate.",
        },
        {
          question: "Can I use cash-out for another property?",
          answer:
            "Sometimes that is the conversation — including investor paths. An advisor reviews occupancy, liens, and whether a different product belongs in the discussion.",
        },
      ],
    },
    cta: finalCta("refinance", {
      title: "Compare cash-out with keeping your rate.",
      description: "Start the refinance strategy, or explore equity if you want to leave the first mortgage in place.",
    }),
  },
};

export const FHA_STREAMLINE_PRODUCT: ProductDefinition = {
  slug: "fha-streamline",
  path: "/refinance/fha-streamline",
  group: "refinance",
  title: "FHA Streamline Refinance",
  description:
    "FHA Streamline refinance guidance from Broadview — a narrower path if you already have an FHA loan.",
  breadcrumbs: refiCrumbs("FHA Streamline", "/refinance/fha-streamline"),
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "inline",
    },
    hero: productHero(
      "refinance",
      {
        eyebrow: "FHA Streamline",
        headlineBefore: "FHA Streamline refinance. ",
        headlineAccent: "Review your existing FHA loan.",
        subheadline:
          "Streamline is not a shortcut around judgment. An advisor confirms whether it is even the right conversation.",
        chips: ["Existing FHA loan", "Advisor review", "Educational first"],
      },
      {
        facts: {
          hideInHero: true,
          title: "Streamline orientation",
          facts: [
            { label: "Existing FHA loan", detail: "This path starts from a loan you already have" },
            { label: "Net benefit", detail: "The new structure still has to be worth the change" },
            { label: "Advisor confirmation", detail: "Eligibility is reviewed, not assumed" },
          ],
        },
      },
    ),
    highlights: {
      tag: "FHA Streamline",
      title: "Less documentation is not less judgment.",
      description: "We review whether streamline, conventional refinance, or staying put is the better discussion.",
      compact: true,
      items: [
        { icon: "fileText", title: "Existing FHA first", description: "This path only belongs in the conversation if you already have FHA financing." },
        { icon: "clock", title: "Net tangible benefit", description: "A simpler process still has to improve the structure." },
        { icon: "handshake", title: "Advisor gate", description: "We will not treat streamline as an automatic yes." },
      ],
    },
    calculators: calculatorSection("refinance", REFI_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("refinance"),
    related: [
      { href: "/buy/fha-loans", label: "FHA Purchase", description: "If you are buying with FHA." },
      { href: "/refinance/rate-and-term-refinance", label: "Rate & Term", description: "A broader refinance conversation." },
      { href: "/refinance/va-irrrl", label: "VA IRRRL", description: "The VA analog if you have a VA loan." },
    ],
    faq: {
      title: "FHA Streamline FAQ",
      items: [
        {
          question: "Do I qualify for FHA Streamline automatically?",
          answer:
            "No. You typically need an existing FHA loan and a benefit to refinancing. Broadview reviews on-time payment history and whether the new structure is worth it.",
        },
        {
          question: "Is streamline always less documentation?",
          answer:
            "It can be a narrower file. An advisor still confirms what the investor and program require for your situation.",
        },
      ],
    },
    cta: finalCta("refinance", {
      title: "Review an FHA Streamline conversation.",
      description: "Start the refinance strategy so an advisor can confirm whether streamline applies.",
    }),
  },
};

export const VA_IRRRL_PRODUCT: ProductDefinition = {
  slug: "va-irrrl",
  path: "/refinance/va-irrrl",
  group: "refinance",
  title: "VA IRRRL Refinance",
  description:
    "VA Interest Rate Reduction Refinance Loan guidance from Broadview — for homeowners who already have a VA loan.",
  breadcrumbs: refiCrumbs("VA IRRRL", "/refinance/va-irrrl"),
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "band",
    },
    hero: productHero(
      "refinance",
      {
        eyebrow: "VA IRRRL",
        headlineBefore: "VA IRRRL refinancing. ",
        headlineAccent: "Explore your next step.",
        subheadline:
          "IRRRL is a specific refinance conversation — not a general VA purchase path. An advisor confirms fit.",
        chips: ["Existing VA loan", "Advisor review", "Educational first"],
      },
      {
        facts: {
          hideInHero: true,
          title: "IRRRL orientation",
          facts: [
            { label: "Existing VA loan", detail: "This is not a first-time VA purchase path" },
            { label: "Rate or term improvement", detail: "The new loan still has to earn the change" },
            { label: "Advisor confirmation", detail: "Occupancy and benefit are reviewed together" },
          ],
        },
      },
    ),
    highlights: {
      tag: "VA IRRRL",
      title: "A benefit path, still reviewed by a person.",
      description: "We compare IRRRL with staying put or a different refinance if the structure does not improve.",
      compact: true,
      items: [
        { icon: "shield", title: "Existing VA loan", description: "IRRRL starts from a VA loan you already have." },
        { icon: "refreshCw", title: "Rate reduction conversation", description: "The name is not a guarantee. The numbers still have to work." },
        { icon: "handshake", title: "Advisor confirmation", description: "Occupancy and benefit tests are not website checkboxes." },
        { icon: "fileText", title: "Different from VA purchase", description: "Buying with VA is a separate page and conversation." },
      ],
    },
    calculators: calculatorSection("refinance", REFI_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("refinance"),
    related: [
      { href: "/buy/va-loans", label: "VA Purchase", description: "If you are buying with VA." },
      { href: "/refinance/fha-streamline", label: "FHA Streamline", description: "The FHA analog if you have an FHA loan." },
      { href: "/refinance/rate-and-term-refinance", label: "Rate & Term", description: "A broader refinance conversation." },
    ],
    faq: {
      title: "VA IRRRL FAQ",
      items: [
        {
          question: "What does IRRRL stand for?",
          answer:
            "Interest Rate Reduction Refinance Loan. It is a VA streamline refinance for some existing VA loans. Broadview reviews whether it applies to your loan.",
        },
        {
          question: "Can I take cash out with IRRRL?",
          answer:
            "IRRRL is generally not a cash-out path. If you need equity, we compare other refinance or HELOC conversations instead of forcing IRRRL.",
        },
      ],
    },
    cta: finalCta("refinance", {
      title: "Review a VA IRRRL conversation.",
      description: "Start the refinance strategy. An advisor confirms whether IRRRL is the path to discuss.",
    }),
  },
};

export const REFINANCE_PRODUCTS = [
  REFINANCE_HUB_PRODUCT,
  RATE_TERM_PRODUCT,
  CASH_OUT_PRODUCT,
  FHA_STREAMLINE_PRODUCT,
  VA_IRRRL_PRODUCT,
];

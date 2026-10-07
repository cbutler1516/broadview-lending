import { REALTOR_NOTE } from "@/lib/product/claims";
import {
  advisorSection,
  calculatorSection,
  finalCta,
  investorProcess,
  productHero,
  videoForGroup,
} from "@/lib/product/shared";
import type { ProductDefinition } from "@/lib/product/types";

const DEAL_TOOLS = [
  {
    icon: "calculator" as const,
    title: "Deal analysis",
    description: "Run the Investor Deal Analyzer — one shared engine for financing, cash flow, and returns.",
    href: "/tools/investor-deal-analyzer",
  },
  {
    icon: "layers" as const,
    title: "Current tools",
    description: "Affordability and equity tools that are live today.",
    href: "/tools",
  },
];

function investCrumbs(name: string, path: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Invest", path: "/invest" },
    { name, path },
  ];
}

export const DSCR_PRODUCT: ProductDefinition = {
  slug: "dscr",
  path: "/invest/dscr",
  group: "invest",
  title: "DSCR Rental Financing",
  description:
    "Analyze the rental. Understand DSCR financing. Build the strategy with a Broadview advisor — purchase or refinance conversations for investors.",
  breadcrumbs: investCrumbs("DSCR", "/invest/dscr"),
  page: {
    artDirection: {
      composition: "analytical",
      highlightsLayout: "inline",
      storyTreatment: "asymmetric",
      story: {
        video: videoForGroup("invest"),
        caption: "Rental financing structured around property cash flow.",
        fact: { label: "Focus", value: "DSCR · rental cash flow" },
      },
    },
    hero: productHero(
      "invest",
      {
        eyebrow: "DSCR Rental",
        headlineBefore: "DSCR rental loans. ",
        headlineAccent: "Start with the property.",
        subheadline:
          "Debt-service coverage conversations for investors who buy or refinance income property. An advisor reviews the deal — not just a ratio.",
        chips: ["Purchase and refinance", "Advisor desk", "Realtor-ready framing"],
      },
      {
        path: "/invest/dscr",
        facts: {
          title: "Built for rental investors",
          facts: [
            { label: "Purchase & refinance", detail: "Dedicated conversations for each transaction type" },
            { label: "Cash-flow first", detail: "The property’s ability to support the debt is the starting point" },
            { label: "Advisor review", detail: "DSCR is orientation — not a website approval" },
            { label: "Partner framing", detail: REALTOR_NOTE },
          ],
        },
      },
    ),
    highlights: {
      tag: "DSCR",
      title: "Cash flow is the language of the deal.",
      description: "We use DSCR as a way to talk about the rental — then an advisor confirms what the full picture requires.",
      compact: true,
      items: [
        { icon: "trendingUp", title: "Property cash flow", description: "Rent, expenses, and vacancy — before personal income becomes the whole story." },
        { icon: "building2", title: "Purchase or refinance", description: "Buying a rental and refinancing a hold are different conversations." },
        { icon: "users", title: "Realtor / partner framing", description: "Agents can use this page to present an opportunity without inventing a financing story." },
        { icon: "handshake", title: "Advisor confirmation", description: "A ratio on a napkin is not a loan decision." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/dscr" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/dscr" }),
    pullQuote: {
      quote: "Analyze the deal. Understand the financing. Build the strategy.",
      attribution: "Broadview investor desk",
      background: "navy",
    },
    related: [
      { href: "/invest/brrrr", label: "BRRRR", description: "If refinance is step four of a larger sequence." },
      { href: "/invest/investor-heloc", label: "Investor HELOC", description: "Equity on an investment property." },
      { href: "/invest/multifamily", label: "Multifamily / Commercial", description: "Larger assets and entity conversations." },
    ],
    faq: {
      title: "DSCR FAQ",
      items: [
        {
          question: "What is DSCR financing?",
          answer:
            "DSCR conversations focus on whether the property’s income can support the debt. Broadview uses that as orientation. An advisor still reviews the full deal.",
        },
        {
          question: "Can a realtor use this with a client?",
          answer:
            "Yes — as a way to frame the opportunity. There is no separate realtor portal yet. The same advisor desk reviews the financing.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a DSCR deal.",
      description: "Start with the rental. An advisor helps you understand whether DSCR, another investor path, or a conventional conversation fits.",
    }, { path: "/invest/dscr" }),
  },
};

export const FIX_FLIP_PRODUCT: ProductDefinition = {
  slug: "fix-and-flip",
  path: "/invest/fix-and-flip",
  group: "invest",
  title: "Fix & Flip Financing",
  description:
    "Analyze the flip. Understand acquisition and renovation financing. Build the exit strategy with a Broadview advisor.",
  breadcrumbs: investCrumbs("Fix & Flip", "/invest/fix-and-flip"),
  page: {
    artDirection: {
      composition: "active",
      highlightsLayout: "editorial",
      advisorVariant: "asymmetric",
      storyTreatment: "cinematic",
      story: {
        video: videoForGroup("invest"),
        caption: "Acquisition and renovation strategy for investors who buy, improve, and exit.",
      },
    },
    hero: productHero("invest", {
      eyebrow: "Fix & Flip",
      headlineBefore: "Fix-and-flip financing. ",
      headlineAccent: "Plan the purchase and renovation.",
      subheadline:
        "Acquisition and renovation conversations for investors. An advisor reviews budget, timeline, and takeout — not just a purchase price.",
      chips: ["Acquisition + rehab", "Advisor desk", "Exit-aware"],
    }, { path: "/invest/fix-and-flip" }),
    highlights: {
      tag: "Fix & Flip",
      title: "The renovation is part of the financing conversation.",
      description: "We review basis, rehab, and how you plan to exit before treating this like a simple purchase.",
      compact: true,
      items: [
        { icon: "building2", title: "Acquisition", description: "What you pay, and what the property can become." },
        { icon: "layers", title: "Rehab budget", description: "Scope and contingency belong in the same review as the loan structure." },
        { icon: "refreshCw", title: "Exit", description: "Sale, refinance, or hold — the takeout changes the conversation." },
        { icon: "users", title: "Partner framing", description: "Agents can present a flip opportunity without overselling the financing." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/fix-and-flip" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/fix-and-flip" }),
    pullQuote: {
      quote: "A flip is a project. The financing has to respect the project.",
      background: "warm",
    },
    related: [
      { href: "/invest/bridge", label: "Bridge", description: "If timing is the constraint." },
      { href: "/invest/brrrr", label: "BRRRR", description: "If the plan is hold and refinance." },
      { href: "/invest/dscr", label: "DSCR", description: "If it becomes a rental." },
    ],
    faq: {
      title: "Fix & flip FAQ",
      items: [
        {
          question: "Do you finance the purchase and the rehab?",
          answer:
            "That is the conversation — structure depends on the project. Broadview reviews acquisition, rehab, and exit with an advisor. This page does not approve a loan.",
        },
        {
          question: "Is this the same as a homeowner renovation loan?",
          answer:
            "No. This page is for investment projects. Owner-occupied renovation is a different conversation on the home-equity side.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a flip.",
      description: "Bring the deal. An advisor helps you understand the financing path before you chase a product name.",
    }, { path: "/invest/fix-and-flip" }),
  },
};

export const BRIDGE_PRODUCT: ProductDefinition = {
  slug: "bridge",
  path: "/invest/bridge",
  group: "invest",
  title: "Bridge Financing",
  description:
    "Analyze the timing gap. Understand bridge financing. Build the takeout strategy with a Broadview advisor.",
  breadcrumbs: investCrumbs("Bridge", "/invest/bridge"),
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "band",
      advisorVariant: "editorial",
    },
    hero: productHero(
      "invest",
      {
        eyebrow: "Bridge",
        headlineBefore: "Investor bridge loans. ",
        headlineAccent: "Plan for the next step.",
        subheadline:
          "Short-term capital conversations for acquisitions, gaps, and refinance exits. The takeout is part of the first discussion.",
        chips: ["Timing-aware", "Advisor desk", "Exit first"],
      },
      {
        path: "/invest/bridge",
        facts: {
          hideInHero: true,
          title: "Bridge orientation",
          facts: [
            { label: "Hold period", detail: "How long the capital is actually needed" },
            { label: "Takeout", detail: "Sale, refinance, or another exit" },
            { label: "Property", detail: "What is being acquired or transitioned" },
            { label: "Advisor review", detail: "Bridge is not a default product" },
          ],
        },
      },
    ),
    highlights: {
      tag: "Bridge",
      title: "Start with the exit.",
      description: "A bridge conversation without a takeout is just an expensive pause.",
      compact: true,
      items: [
        { icon: "clock", title: "Duration", description: "How long you need the capital — and what happens if it slips." },
        { icon: "refreshCw", title: "Takeout", description: "Refinance, sale, or another path has to be credible." },
        { icon: "briefcase", title: "Use of funds", description: "Acquisition, gap, or transition — the reason changes the structure." },
        { icon: "handshake", title: "Advisor judgment", description: "We will not treat bridge as a way to skip a real plan." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/bridge" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/bridge" }),
    related: [
      { href: "/invest/fix-and-flip", label: "Fix & Flip", description: "If rehab and exit are the plan." },
      { href: "/invest/new-construction", label: "New Construction", description: "If the project is being built." },
      { href: "/invest/dscr", label: "DSCR", description: "If the takeout is a rental refinance." },
    ],
    faq: {
      title: "Bridge FAQ",
      items: [
        {
          question: "What is bridge financing?",
          answer:
            "A short-term conversation for a timing gap — buying before selling, closing a refinance, or transitioning a property. Broadview reviews the exit as carefully as the entry.",
        },
        {
          question: "Is bridge the same as hard money?",
          answer:
            "People use those words loosely. We describe the deal and the hold period instead of leaning on private-lending slogans.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a bridge scenario.",
      description: "Start with timing and takeout. An advisor helps you understand whether bridge is the right conversation.",
    }, { path: "/invest/bridge" }),
  },
};

export const CONSTRUCTION_PRODUCT: ProductDefinition = {
  slug: "new-construction",
  path: "/invest/new-construction",
  group: "invest",
  title: "New Construction Financing",
  description:
    "Analyze the project. Understand construction financing. Build the draw and takeout strategy with a Broadview advisor.",
  breadcrumbs: investCrumbs("New Construction", "/invest/new-construction"),
  page: {
    artDirection: {
      composition: "active",
      highlightsLayout: "inline",
      storyTreatment: "portrait",
      story: {
        video: videoForGroup("invest"),
        caption: "Ground-up and substantial rebuild strategy, discussed around the project.",
      },
    },
    hero: productHero("invest", {
      eyebrow: "New Construction",
      headlineBefore: "New construction financing. ",
      headlineAccent: "Build a clear plan.",
      subheadline:
        "Ground-up and substantial rebuild conversations. Draws, budget, and takeout are reviewed together with an advisor.",
      chips: ["Project-aware", "Advisor desk", "Draw conversations"],
    }, { path: "/invest/new-construction" }),
    highlights: {
      tag: "Construction",
      title: "Budget, draws, and takeout — one conversation.",
      description: "We do not treat construction as a purchase loan with a longer closing.",
      compact: true,
      items: [
        { icon: "building2", title: "Scope", description: "Ground-up versus substantial rebuild changes the discussion." },
        { icon: "layers", title: "Draws", description: "How capital is released as the project moves." },
        { icon: "refreshCw", title: "Takeout", description: "Sale, rental refinance, or hold after completion." },
        { icon: "users", title: "Partners", description: "Builders and agents can sit in the same review without a separate portal." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/new-construction" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/new-construction" }),
    related: [
      { href: "/invest/bridge", label: "Bridge", description: "If timing is the constraint." },
      { href: "/invest/fix-and-flip", label: "Fix & Flip", description: "If rehab and resale are the plan." },
      { href: "/invest/multifamily", label: "Multifamily / Commercial", description: "Larger assets after completion." },
    ],
    faq: {
      title: "Construction FAQ",
      items: [
        {
          question: "Do you finance ground-up construction?",
          answer:
            "That is a conversation we can have. Structure depends on the project, experience, and takeout. An advisor reviews it — this page does not commit to a loan.",
        },
        {
          question: "Is this for a primary residence build?",
          answer:
            "This page is the investor construction path. Owner-occupied construction is a different conversation. Tell us the occupancy first.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a construction project.",
      description: "Bring the scope and the takeout. An advisor helps you understand the financing conversation.",
    }, { path: "/invest/new-construction" }),
  },
};

export const BRRRR_PRODUCT: ProductDefinition = {
  slug: "brrrr",
  path: "/invest/brrrr",
  group: "invest",
  title: "BRRRR Financing Strategy",
  description:
    "Analyze the BRRRR sequence. Understand each financing step. Build the strategy with a Broadview advisor.",
  breadcrumbs: investCrumbs("BRRRR", "/invest/brrrr"),
  page: {
    artDirection: {
      composition: "analytical",
      highlightsLayout: "editorial",
      storyTreatment: "cinematic",
      story: {
        video: videoForGroup("invest"),
        caption: "Buy, rehab, rent, refinance, repeat — modeled as a sequence, not a single product.",
      },
    },
    hero: productHero("invest", {
      eyebrow: "BRRRR",
      headlineBefore: "BRRRR financing strategy. ",
      headlineAccent: "Plan each stage.",
      subheadline:
        "Buy, rehab, rent, refinance, repeat. Broadview helps you see which financing conversation belongs at each step.",
      chips: ["Sequence-aware", "Advisor desk", "Refinance last, not first"],
    }, { path: "/invest/brrrr" }),
    highlights: {
      tag: "BRRRR",
      title: "Each letter is a different financing conversation.",
      description: "We will not collapse BRRRR into one loan name.",
      compact: true,
      items: [
        { icon: "building2", title: "Buy + rehab", description: "Often a fix-and-flip or bridge conversation first." },
        { icon: "trendingUp", title: "Rent", description: "Stabilization is what makes a refinance discussable." },
        { icon: "refreshCw", title: "Refinance", description: "DSCR or another rental path — after the property can support it." },
        { icon: "layers", title: "Repeat", description: "The next acquisition should not assume the last refinance already happened." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/brrrr" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/brrrr" }),
    pullQuote: {
      quote: "BRRRR fails when someone finances step five before step two is real.",
      background: "slate",
    },
    related: [
      { href: "/invest/fix-and-flip", label: "Fix & Flip", description: "The buy-and-rehab conversation." },
      { href: "/invest/dscr", label: "DSCR", description: "The rental refinance conversation." },
      { href: "/invest/bridge", label: "Bridge", description: "If timing sits between the steps." },
    ],
    faq: {
      title: "BRRRR FAQ",
      items: [
        {
          question: "Do you have a BRRRR loan?",
          answer:
            "BRRRR is a sequence, not a product. Broadview helps you understand which financing conversation belongs at each step — then an advisor reviews the deal.",
        },
        {
          question: "When does the refinance happen?",
          answer:
            "After the property is rented and the numbers can support a rental conversation. We will not treat refinance as guaranteed.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a BRRRR sequence.",
      description: "Map the steps first. An advisor helps you understand the financing at each one.",
    }, { path: "/invest/brrrr" }),
  },
};

export const INVESTOR_HELOC_PRODUCT: ProductDefinition = {
  slug: "investor-heloc",
  path: "/invest/investor-heloc",
  group: "invest",
  title: "Investor HELOC",
  description:
    "Home-equity strategy for rental and investment property — using Broadview’s HELOC experience, reviewed by an advisor.",
  breadcrumbs: investCrumbs("Investor HELOC", "/invest/investor-heloc"),
  page: {
    artDirection: {
      composition: "decisive",
      highlightsLayout: "inline",
      advisorVariant: "standard",
    },
    hero: productHero(
      "invest",
      {
        eyebrow: "Investor HELOC",
        headlineBefore: "Investor HELOC options. ",
        headlineAccent: "Explore your property equity.",
        subheadline:
          "A HELOC conversation on rental or investment property. Occupancy, liens, and use of funds stay in the same advisor review.",
        chips: ["Investment property", "Existing HELOC experience", "Advisor desk"],
      },
      {
        path: "/invest/investor-heloc",
        funnel: "/funnel/heloc",
        facts: {
          hideInHero: true,
          title: "Investor equity orientation",
          facts: [
            { label: "Occupancy", detail: "Investment property is a different conversation than a primary HELOC" },
            { label: "Use of funds", detail: "Reserves, rehab, or another acquisition" },
            { label: "First mortgage", detail: "Keeping versus replacing still matters" },
            { label: "Advisor review", detail: "Uses the existing Broadview HELOC experience" },
          ],
        },
      },
    ),
    highlights: {
      tag: "Investor HELOC",
      title: "Same equity tools. Different occupancy conversation.",
      description: "This page connects investor intent to Broadview’s existing home-equity review — it does not invent a new engine.",
      compact: true,
      items: [
        { icon: "wallet", title: "Investment occupancy", description: "Rental and investment property change eligibility and structure." },
        { icon: "layers", title: "Existing HELOC experience", description: "The live equity funnel is the current next step." },
        { icon: "users", title: "Partner framing", description: "Agents can discuss equity as dry powder without promising a line." },
      ],
    },
    calculators: calculatorSection("invest", [
      ...DEAL_TOOLS,
      {
        icon: "layers",
        title: "Home Equity Strategy",
        description: "The live Broadview HELOC experience — start here while the deal engine is built.",
        href: "/funnel/heloc",
      },
    ], { path: "/invest/investor-heloc", funnel: "/funnel/heloc" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/investor-heloc", funnel: "/funnel/heloc" }),
    related: [
      { href: "/heloc", label: "Primary HELOC", description: "If the property is owner-occupied." },
      { href: "/heloc/investment-property", label: "Investment Property Equity", description: "Existing equity landing." },
      { href: "/invest/dscr", label: "DSCR", description: "If the property is a rental." },
    ],
    faq: {
      title: "Investor HELOC FAQ",
      items: [
        {
          question: "Can I get a HELOC on a rental?",
          answer:
            "Sometimes that is the conversation. Occupancy, liens, and investor guidelines matter. Start the equity experience or talk with an advisor — this page is not an approval.",
        },
        {
          question: "Is this different from a primary-residence HELOC?",
          answer:
            "Yes. Investment occupancy changes the review. Broadview keeps both conversations on the same advisor desk.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Explore investor equity.",
      description: "Start the HELOC strategy experience or talk with an advisor about the investment property.",
    }, { path: "/invest/investor-heloc", funnel: "/funnel/heloc" }),
  },
};

export const MULTIFAMILY_PRODUCT: ProductDefinition = {
  slug: "multifamily",
  path: "/invest/multifamily",
  group: "invest",
  title: "Multifamily and Commercial Financing",
  description:
    "Analyze the asset. Understand multifamily and commercial financing. Build the strategy with a Broadview advisor.",
  breadcrumbs: investCrumbs("Multifamily / Commercial", "/invest/multifamily"),
  page: {
    artDirection: {
      composition: "institutional",
      highlightsLayout: "inline",
      advisorVariant: "standard",
      storyTreatment: "asymmetric",
      story: {
        video: videoForGroup("invest"),
        caption: "Stabilized and value-add conversations for larger assets.",
        fact: { label: "Typical focus", value: "Multifamily · mixed-use · commercial" },
      },
    },
    hero: productHero(
      "invest",
      {
        eyebrow: "Multifamily / Commercial",
        headlineBefore: "Multifamily and commercial loans. ",
        headlineAccent: "Start with the asset.",
        subheadline:
          "Multifamily, mixed-use, and commercial investment conversations. NOI, occupancy, and entity structure — reviewed with an advisor.",
        chips: ["Institutional tone", "Advisor desk", "Partner-ready"],
      },
      {
        path: "/invest/multifamily",
        facts: {
          title: "Commercial orientation",
          facts: [
            { label: "Asset type", detail: "Multifamily, mixed-use, or commercial" },
            { label: "Stabilized vs value-add", detail: "The business plan changes the conversation" },
            { label: "Entity", detail: "How the investment is held matters" },
            { label: "Advisor review", detail: "Starts with a conversation, not an online approval" },
          ],
        },
      },
    ),
    highlights: {
      tag: "Commercial",
      title: "Treat the asset like a business.",
      description: "We discuss income, tenancy, and structure — then an advisor helps you understand which capital conversation fits.",
      compact: true,
      items: [
        { icon: "building2", title: "Asset", description: "Unit mix, tenancy, and physical condition." },
        { icon: "trendingUp", title: "Income", description: "NOI and occupancy — orientation, not a quoted rate." },
        { icon: "briefcase", title: "Entity", description: "How the investment is held belongs in the first review." },
        { icon: "users", title: "Sponsors and partners", description: "Brokers and operators can frame the opportunity with the same desk." },
      ],
    },
    calculators: calculatorSection("invest", DEAL_TOOLS, { path: "/invest/multifamily" }),
    process: investorProcess(),
    advisor: advisorSection("invest", { path: "/invest/multifamily" }),
    pullQuote: {
      quote: "Commercial conversations should sound like underwriting — not a retail pitch.",
      background: "navy",
    },
    related: [
      { href: "/invest/dscr", label: "DSCR", description: "Smaller rental conversations." },
      { href: "/invest/bridge", label: "Bridge", description: "If timing is the constraint." },
      { href: "/commercial", label: "Commercial hub", description: "Existing commercial entry." },
      { href: "/contact", label: "Contact", description: "Talk through a larger asset." },
    ],
    faq: {
      title: "Multifamily / commercial FAQ",
      items: [
        {
          question: "Do you finance apartment buildings?",
          answer:
            "Multifamily is a conversation we can have. Size, occupancy, and business plan matter. Start by talking with an advisor — there is no online commercial approval in this sprint.",
        },
        {
          question: "Is this the same as a 1–4 unit DSCR loan?",
          answer:
            "No. Smaller rentals often belong on the DSCR page. This page is for larger or more commercial assets.",
        },
      ],
    },
    cta: finalCta("invest", {
      title: "Analyze a commercial deal.",
      description: "Bring the asset and the plan. An advisor helps you understand the financing conversation.",
    }, { path: "/invest/multifamily" }),
  },
};

export const COMMERCIAL_PRODUCT: ProductDefinition = {
  ...MULTIFAMILY_PRODUCT,
  slug: "commercial",
  path: "/commercial",
  canonicalPath: "/invest/multifamily",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Invest", path: "/invest" },
    { name: "Multifamily / Commercial", path: "/commercial" },
  ],
};

export const INVEST_PRODUCTS = [
  DSCR_PRODUCT,
  FIX_FLIP_PRODUCT,
  BRIDGE_PRODUCT,
  CONSTRUCTION_PRODUCT,
  BRRRR_PRODUCT,
  INVESTOR_HELOC_PRODUCT,
  MULTIFAMILY_PRODUCT,
  COMMERCIAL_PRODUCT,
];

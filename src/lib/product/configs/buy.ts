import {
  advisorSection,
  calculatorSection,
  conventionalProcess,
  finalCta,
  productHero,
  videoForGroup,
} from "@/lib/product/shared";
import type { ProductDefinition } from "@/lib/product/types";

const BUY_TOOLS = [
  {
    icon: "calculator" as const,
    title: "Affordability Planner",
    description: "Start with a comfortable payment and see the home price it supports.",
    href: "/tools/affordability-planner",
  },
  {
    icon: "layers" as const,
    title: "Home Equity Strategy",
    description: "If you already own, review equity options in a short advisor-ready experience.",
    href: "/funnel/heloc",
  },
];

function buyCrumbs(name: string, path: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name, path },
  ];
}

export const PURCHASE_PRODUCT: ProductDefinition = {
  slug: "purchase",
  path: "/buy",
  group: "buy",
  title: "Home Purchase Loans & Mortgage Options",
  description:
    "Start with the home you want to buy. Broadview helps you understand conventional, FHA, VA, and jumbo paths with a licensed advisor.",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Purchase", path: "/buy" },
  ],
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "editorial",
      advisorVariant: "standard",
      story: {
        video: videoForGroup("buy"),
        caption: "A purchase strategy starts with the life you are building — then the financing.",
      },
    },
    hero: productHero("buy", {
      eyebrow: "Home Purchase",
      headlineBefore: "Home purchase loans. ",
      headlineAccent: "A plan built around you.",
      subheadline:
        "First home, move-up, or a more complex purchase — start with the goal, then build the financing around your life.",
      chips: ["Advisor-led guidance", "Conventional, FHA, VA, Jumbo", "No credit pull to start"],
    }),
    paths: {
      tag: "Purchase Paths",
      title: "Choose the conversation closest to your situation.",
      layout: "band",
      paths: [
        {
          title: "First-Time Buyer",
          description: "Confidence, down-payment options, and a plan before you write an offer.",
          href: "/buy/first-time-homebuyer",
          cta: "Explore",
        },
        {
          title: "Conventional",
          description: "Standard purchase financing with a strategy conversation first.",
          href: "/buy/conventional-loans",
          cta: "Explore",
        },
        {
          title: "FHA, VA & Jumbo",
          description: "Program-specific paths when eligibility or loan size changes the discussion.",
          href: "/buy/fha-loans",
          cta: "Explore FHA",
        },
      ],
    },
    highlights: {
      tag: "How Broadview Helps",
      title: "Human mortgage strategy, not a product menu.",
      description: "A licensed advisor reviews your goal, timing, and trade-offs before recommendations.",
      compact: true,
      items: [
        {
          icon: "handshake",
          title: "Start with the goal",
          description: "We map first-time, move-up, military, and jumbo conversations around what you are trying to do.",
        },
        {
          icon: "layers",
          title: "See the real trade-offs",
          description: "Down payment, monthly comfort, mortgage insurance, and timeline — explained in plain language.",
        },
        {
          icon: "shield",
          title: "Prepared, not pressured",
          description: "A short strategy experience gathers context so the first call already has substance.",
        },
        {
          icon: "fileText",
          title: "Clarity before a loan product",
          description: "Conventional, FHA, VA, and jumbo stay distinct until an advisor helps you compare them.",
        },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("buy"),
    pullQuote: {
      quote: "I’d rather someone leave a call with clarity than rush into the wrong product because the website made it feel urgent.",
      attribution: "Broadview advisor guidance",
      background: "warm",
    },
    related: [
      { href: "/buy/first-time-homebuyer", label: "First-Time Buyer", description: "Guidance for a first purchase." },
      { href: "/buy/conventional-loans", label: "Conventional", description: "Standard purchase financing." },
      { href: "/buy/va-loans", label: "VA Loans", description: "Veteran and active-duty purchase paths." },
      { href: "/invest", label: "Investor Financing", description: "When the property is an investment." },
    ],
    faq: {
      title: "Purchase financing FAQ",
      items: [
        {
          question: "Where should I start if I want to buy a home?",
          answer:
            "Start with the goal, then a short strategy experience. A Broadview advisor reviews affordability, timing, and program fit before any recommendation.",
        },
        {
          question: "Do I need to choose a loan product first?",
          answer:
            "No. Conventional, FHA, VA, and jumbo are paths we compare after we understand your down payment, occupancy, and timeline.",
        },
        {
          question: "Will this pull my credit?",
          answer:
            "Starting the strategy experience does not require a credit pull. An advisor explains when a credit review would actually be useful.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Ready to think through the purchase?",
      description: "Start with your goal. A Broadview advisor will help you understand which financing paths may fit.",
    }),
  },
};

export const FIRST_TIME_PRODUCT: ProductDefinition = {
  slug: "first-time-homebuyer",
  path: "/buy/first-time-homebuyer",
  group: "buy",
  title: "First-Time Homebuyer Loans & Guidance",
  description:
    "First-home guidance from Broadview — down payment options, program fit, and a licensed advisor before you write an offer.",
  breadcrumbs: buyCrumbs("First-Time Buyer", "/buy/first-time-homebuyer"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "inline",
      story: { video: videoForGroup("buy"), caption: "A first purchase should feel prepared, not rushed." },
    },
    hero: productHero(
      "buy",
      {
        eyebrow: "First-Time Buyer",
        headlineBefore: "First-time homebuyer loans. ",
        headlineAccent: "Guidance at every step.",
        subheadline:
          "Down payment, monthly comfort, and program options — reviewed with an advisor before the offer.",
        chips: ["Advisor-led", "FHA, conventional, and VA conversations", "About 60 seconds to start"],
      },
      { funnel: "/funnel/first-time-homebuyer" },
    ),
    highlights: {
      tag: "First Home",
      title: "The first purchase is a strategy conversation.",
      description: "We help you understand what you can comfortably do — then which programs may support it.",
      compact: true,
      items: [
        {
          icon: "wallet",
          title: "Start with a payment you can live with",
          description: "Affordability comes before a listing price or a product name.",
        },
        {
          icon: "landmark",
          title: "Compare assistance and program paths",
          description: "FHA, conventional, and VA may all be worth discussing depending on eligibility.",
        },
        {
          icon: "handshake",
          title: "An advisor before the offer",
          description: "Write from a clearer position — not a last-minute product guess.",
        },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS, { funnel: "/funnel/first-time-homebuyer" }),
    process: conventionalProcess(),
    advisor: advisorSection("buy", { funnel: "/funnel/first-time-homebuyer" }),
    related: [
      { href: "/buy", label: "Purchase", description: "All home-buying paths." },
      { href: "/buy/fha-loans", label: "FHA", description: "Lower down-payment conversations." },
      { href: "/buy/va-loans", label: "VA", description: "If you may have veteran eligibility." },
    ],
    faq: {
      title: "First-time buyer FAQ",
      items: [
        {
          question: "How much do I need to buy a first home?",
          answer:
            "It depends on the program, market, and monthly comfort. Broadview starts with payment and down-payment reality, then an advisor reviews options.",
        },
        {
          question: "Is FHA always the first-time buyer loan?",
          answer:
            "No. Conventional or VA may be a better conversation depending on credit, down payment, and occupancy. We compare paths instead of defaulting to one product.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Start your first-home strategy.",
      description: "A short experience prepares the advisor conversation — no pressure to pick a product first.",
    }, { funnel: "/funnel/first-time-homebuyer" }),
  },
};

export const CONVENTIONAL_PRODUCT: ProductDefinition = {
  slug: "conventional-loans",
  path: "/buy/conventional-loans",
  group: "buy",
  title: "Conventional Home Loans",
  description:
    "Conventional purchase strategy with Broadview — advisor guidance on down payment, mortgage insurance, and monthly structure.",
  breadcrumbs: buyCrumbs("Conventional", "/buy/conventional-loans"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "band",
      story: { video: videoForGroup("buy"), caption: "Conventional financing, reviewed as a strategy." },
    },
    hero: productHero("buy", {
      eyebrow: "Conventional",
      headlineBefore: "Conventional home loans. ",
      headlineAccent: "Personal guidance.",
      subheadline:
        "A standard purchase path — still reviewed around your down payment, reserves, and the life you are planning.",
      chips: ["Advisor review", "Purchase strategy", "Educational first"],
    }),
    highlights: {
      tag: "Conventional",
      title: "A familiar structure. A more careful conversation.",
      description: "We explain PMI, down-payment trade-offs, and when another program may belong in the discussion.",
      compact: true,
      items: [
        { icon: "fileText", title: "Documented income", description: "W-2 and standard documentation conversations, reviewed with context." },
        { icon: "wallet", title: "Down payment trade-offs", description: "How much you put down changes monthly cost and mortgage insurance." },
        { icon: "shield", title: "Occupancy matters", description: "Primary residence conversations stay distinct from investment property." },
        { icon: "handshake", title: "Advisor confirmation", description: "Eligibility is never assumed from a website form." },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("buy"),
    related: [
      { href: "/buy", label: "Purchase", description: "All buying paths." },
      { href: "/buy/jumbo-loans", label: "Jumbo", description: "When loan size changes the conversation." },
      { href: "/refinance/rate-and-term-refinance", label: "Rate & Term", description: "If you already own." },
    ],
    faq: {
      title: "Conventional loan FAQ",
      items: [
        {
          question: "What is a conventional loan?",
          answer:
            "A conventional mortgage is not government-insured. Broadview uses it as one purchase or refinance path — compared against FHA, VA, or jumbo when those conversations fit.",
        },
        {
          question: "Do I avoid mortgage insurance with conventional?",
          answer:
            "Not always. Down payment and loan structure determine whether mortgage insurance is part of the discussion. An advisor explains the trade-off.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Review a conventional purchase path.",
      description: "Start the strategy experience, then talk through structure with an advisor.",
    }),
  },
};

export const FHA_PRODUCT: ProductDefinition = {
  slug: "fha-loans",
  path: "/buy/fha-loans",
  group: "buy",
  title: "FHA Home Loans",
  description:
    "FHA purchase guidance from Broadview — flexible down-payment conversations reviewed by a licensed advisor.",
  breadcrumbs: buyCrumbs("FHA", "/buy/fha-loans"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "inline",
      story: { video: videoForGroup("buy"), caption: "FHA is a path — not an automatic recommendation." },
    },
    hero: productHero(
      "buy",
      {
        eyebrow: "FHA",
        headlineBefore: "FHA home loans. ",
        headlineAccent: "Explore your options.",
        subheadline:
          "Lower down-payment structure can be useful. An advisor still reviews whether FHA, conventional, or another path fits.",
        chips: ["Advisor-led", "First-time and repeat buyers", "Educational comparison"],
      },
      { funnel: "/funnel/fha" },
    ),
    highlights: {
      tag: "FHA",
      title: "Flexible entry. Still a strategy decision.",
      description: "We discuss mortgage insurance, occupancy, and when conventional may be cleaner later.",
      compact: true,
      items: [
        { icon: "wallet", title: "Down-payment flexibility", description: "FHA can support a lower cash-to-close conversation." },
        { icon: "refreshCw", title: "Later refinance options", description: "Streamline conversations exist if you later want to revisit structure." },
        { icon: "handshake", title: "Advisor comparison", description: "We do not default to FHA just because it is familiar." },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS, { funnel: "/funnel/fha" }),
    process: conventionalProcess(),
    advisor: advisorSection("buy", { funnel: "/funnel/fha" }),
    related: [
      { href: "/buy/first-time-homebuyer", label: "First-Time Buyer", description: "If this is your first purchase." },
      { href: "/refinance/fha-streamline", label: "FHA Streamline", description: "If you already have an FHA loan." },
      { href: "/buy/conventional-loans", label: "Conventional", description: "Compare a standard path." },
    ],
    faq: {
      title: "FHA loan FAQ",
      items: [
        {
          question: "Is FHA only for first-time buyers?",
          answer:
            "No. Repeat buyers may still discuss FHA. Occupancy, credit, and down payment determine whether it belongs in the conversation.",
        },
        {
          question: "Can I refinance an FHA loan later?",
          answer:
            "Possibly. FHA Streamline is one later conversation. Broadview reviews whether streamline, conventional refinance, or staying put is the better discussion.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Talk through an FHA path.",
      description: "Start the strategy experience so an advisor can compare FHA against other purchase options.",
    }, { funnel: "/funnel/fha" }),
  },
};

export const VA_PRODUCT: ProductDefinition = {
  slug: "va-loans",
  path: "/buy/va-loans",
  group: "buy",
  title: "VA Home Loans",
  description:
    "VA purchase and refinance conversations for eligible veterans and active-duty buyers, reviewed with a Broadview advisor.",
  breadcrumbs: buyCrumbs("VA", "/buy/va-loans"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "editorial",
      story: { video: videoForGroup("buy"), caption: "VA eligibility deserves a careful, human review." },
    },
    hero: productHero(
      "buy",
      {
        eyebrow: "VA",
        headlineBefore: "VA home loans. ",
        headlineAccent: "Guidance for your next move.",
        subheadline:
          "Eligibility, occupancy, and entitlement are not website checkboxes. A Broadview advisor walks through the real conversation.",
        chips: ["Advisor-led", "Purchase and IRRRL conversations", "No product-first pitch"],
      },
      { funnel: "/funnel/va" },
    ),
    highlights: {
      tag: "VA",
      title: "Benefit-aware guidance. Human confirmation.",
      description: "We discuss zero-down conversations, funding fee context, and when IRRRL may matter later.",
      compact: true,
      items: [
        { icon: "shield", title: "Eligibility first", description: "Service history and occupancy frame whether VA belongs in the discussion." },
        { icon: "wallet", title: "Cash-to-close conversations", description: "VA can change how little cash a purchase requires — still reviewed case by case." },
        { icon: "refreshCw", title: "IRRRL later", description: "A streamline refinance conversation if you already have a VA loan." },
        { icon: "handshake", title: "Advisor, not a form", description: "Entitlement and residual income are confirmed with a person." },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS, { funnel: "/funnel/va" }),
    process: conventionalProcess(),
    advisor: advisorSection("buy", { funnel: "/funnel/va" }),
    related: [
      { href: "/buy", label: "Purchase", description: "All buying paths." },
      { href: "/refinance/va-irrrl", label: "VA IRRRL", description: "If you already have a VA loan." },
      { href: "/buy/first-time-homebuyer", label: "First-Time Buyer", description: "If this is also a first purchase." },
    ],
    faq: {
      title: "VA loan FAQ",
      items: [
        {
          question: "Do I automatically qualify for a VA loan?",
          answer:
            "No. Eligibility, occupancy, residual income, and property standards all matter. Broadview starts the conversation, then an advisor confirms details.",
        },
        {
          question: "What is a VA IRRRL?",
          answer:
            "An Interest Rate Reduction Refinance Loan is a streamline path for some existing VA loans. See the VA IRRRL page if you already have VA financing.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Start a VA strategy conversation.",
      description: "Share the goal first. An advisor helps you understand whether VA is the right path to discuss.",
    }, { funnel: "/funnel/va" }),
  },
};

export const JUMBO_PRODUCT: ProductDefinition = {
  slug: "jumbo-loans",
  path: "/buy/jumbo-loans",
  group: "buy",
  title: "Jumbo Home Loans",
  description:
    "Jumbo and high-balance purchase strategy with Broadview — advisor guidance when loan size changes the conversation.",
  breadcrumbs: buyCrumbs("Jumbo", "/buy/jumbo-loans"),
  page: {
    artDirection: {
      composition: "advisory",
      highlightsLayout: "band",
      advisorVariant: "asymmetric",
      story: { video: videoForGroup("buy"), caption: "Larger purchases still start with a human review." },
    },
    hero: productHero("buy", {
      eyebrow: "Jumbo",
      headlineBefore: "Jumbo home loans. ",
      headlineAccent: "A plan for a larger purchase.",
      subheadline:
        "High-balance and jumbo purchases need a calmer conversation about reserves, structure, and timing.",
      chips: ["Advisor-led", "High-balance conversations", "Educational first"],
    }),
    highlights: {
      tag: "Jumbo",
      title: "A larger number still needs a clear plan.",
      description: "We review reserves, occupancy, and whether jumbo or high-balance conforming is the real discussion.",
      compact: true,
      items: [
        { icon: "landmark", title: "Loan-size threshold", description: "Jumbo and high-balance conforming are different conversations." },
        { icon: "layers", title: "Reserves and documentation", description: "Larger loans usually require a more complete picture." },
        { icon: "handshake", title: "Advisor structure", description: "We do not quote a product off a listing price alone." },
        { icon: "building2", title: "Property complexity", description: "Unique homes and condo projects can change what is discussable." },
      ],
    },
    calculators: calculatorSection("buy", BUY_TOOLS),
    process: conventionalProcess(),
    advisor: advisorSection("buy"),
    related: [
      { href: "/buy/conventional-loans", label: "Conventional", description: "If conforming may still fit." },
      { href: "/buy", label: "Purchase", description: "All buying paths." },
      { href: "/refinance/rate-and-term-refinance", label: "Refinance", description: "If you already own a higher-balance loan." },
    ],
    faq: {
      title: "Jumbo loan FAQ",
      items: [
        {
          question: "What makes a loan jumbo?",
          answer:
            "Loan amount relative to conforming limits. Limits vary by market. Broadview confirms the threshold with you instead of assuming it from a website.",
        },
        {
          question: "Is jumbo only for luxury homes?",
          answer:
            "No. High-cost markets can push a typical home into jumbo territory. The conversation is about structure, not lifestyle branding.",
        },
      ],
    },
    cta: finalCta("buy", {
      title: "Review a jumbo purchase conversation.",
      description: "Start with the goal and price range. An advisor helps you understand the financing path.",
    }),
  },
};

export const BUY_PRODUCTS = [
  PURCHASE_PRODUCT,
  FIRST_TIME_PRODUCT,
  CONVENTIONAL_PRODUCT,
  FHA_PRODUCT,
  VA_PRODUCT,
  JUMBO_PRODUCT,
];

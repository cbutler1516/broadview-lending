export type ContentCategory = {
  slug: string;
  title: string;
  description: string;
};

export const contentCategories: ContentCategory[] = [
  {
    slug: "home-buying",
    title: "Home Buying",
    description: "Guides for navigating the purchase process with confidence.",
  },
  {
    slug: "first-time-homebuyers",
    title: "First-Time Homebuyers",
    description: "Programs, tips, and strategies for your first purchase.",
  },
  {
    slug: "va-loans",
    title: "VA Loans",
    description: "Benefits, eligibility, and strategies for veterans.",
  },
  {
    slug: "fha-loans",
    title: "FHA Loans",
    description: "Flexible options for buyers with lower down payments.",
  },
  {
    slug: "refinancing",
    title: "Refinancing",
    description: "Rate, term, and cash-out refinance strategies.",
  },
  {
    slug: "helocs",
    title: "HELOCs",
    description: "Access home equity without refinancing your first mortgage.",
  },
  {
    slug: "mortgage-tips",
    title: "Mortgage Tips",
    description: "Practical advice for smarter mortgage decisions.",
  },
  {
    slug: "seattle-market",
    title: "Seattle Market",
    description: "Local insights for Pacific Northwest homebuyers.",
  },
  {
    slug: "housing-market-updates",
    title: "Housing Market Updates",
    description: "Trends, rates, and market conditions.",
  },
];

export type ContentArticle = {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  external?: boolean;
};

export const featuredArticles: ContentArticle[] = [
  {
    title: "How Much Home Can You Afford?",
    category: "Home Buying",
    excerpt: "A practical framework for setting your purchase budget before you start shopping.",
    href: "/learn/home-buying",
  },
  {
    title: "VA Loan Benefits Explained",
    category: "VA Loans",
    excerpt: "Zero down, no PMI, and flexible credit — here's what VA financing offers.",
    href: "/learn/va-loans",
  },
  {
    title: "FHA vs Conventional: Which Is Right for You?",
    category: "FHA Loans",
    excerpt: "Compare down payment, credit, and long-term cost differences.",
    href: "/learn/fha-loans",
  },
  {
    title: "When Does a Refinance Make Sense?",
    category: "Refinancing",
    excerpt: "Break-even math, rate environments, and cash-out strategies.",
    href: "/learn/refinancing",
  },
  {
    title: "HELOC vs Cash-Out Refinance",
    category: "HELOCs",
    excerpt: "Two ways to access equity — understand the tradeoffs.",
    href: "/learn/helocs",
  },
  {
    title: "Seattle Housing Market Outlook",
    category: "Seattle Market",
    excerpt: "Local trends affecting buyers and refinancers in the Pacific Northwest.",
    href: "https://www.broadviewlending.com/blog",
    external: true,
  },
];

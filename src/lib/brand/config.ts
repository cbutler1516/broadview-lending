export type LicensedState = {
  name: string;
  abbreviation: string;
};

export type LoanOfficer = {
  name: string;
  title: string;
  nmlsId: string;
  states?: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export const brand = {
  companyName: "Broadview Lending",
  legalEntity: "Broadview Lending powered by Barrett Financial LLC",
  parentCompany: "Barrett Financial Group",
  websiteUrl: "https://www.broadviewlending.com",
  nmlsId: "181106",
  nmlsDisplay: "NMLS #181106",

  contact: {
    phone: "(206) 555-0100",
    phoneHref: "tel:+12065550100",
    email: "info@broadviewlending.com",
    emailHref: "mailto:info@broadviewlending.com",
  },

  ctas: {
    primary: "Check My Mortgage Options",
    secondary: "Book a Strategy Call",
    funnelStart: "Get Started",
    seeStrategy: "See My Strategy",
    bookConsultation: "Book a Strategy Call",
  },

  trust: {
    leadCapture:
      "No spam. No obligation. Just a personalized mortgage strategy.",
    funnelDuration: "Takes about 60 seconds · No credit pull to start",
    equalHousing: "Equal Housing Opportunity",
  },

  disclaimers: {
    short:
      "This is not a loan approval or commitment to lend.",
    consumerNotice:
      "This is not a commitment to lend. All loans are subject to credit approval, underwriting guidelines, and property eligibility.",
    educationalNotice:
      "Information provided through this website is for educational and pre-qualification purposes only and does not constitute a loan offer or rate lock.",
    resultsEligibility:
      "Final eligibility depends on full application, credit, income, assets, property, and underwriting review.",
    resultsPrefix: "Based on the information you provided,",
    resultsProgramsPrefix: "Potential options may include",
  },

  licensing: {
    summary:
      "Broadview Lending is a licensed mortgage lender. Licensing, loan availability, and product eligibility vary by state, loan program, borrower qualifications, and investor guidelines.",
    licensedStates: [
      { name: "Arizona", abbreviation: "AZ" },
      { name: "California", abbreviation: "CA" },
      { name: "Colorado", abbreviation: "CO" },
      { name: "Florida", abbreviation: "FL" },
      { name: "Georgia", abbreviation: "GA" },
      { name: "Idaho", abbreviation: "ID" },
      { name: "Nevada", abbreviation: "NV" },
      { name: "Oregon", abbreviation: "OR" },
      { name: "Texas", abbreviation: "TX" },
      { name: "Utah", abbreviation: "UT" },
      { name: "Washington", abbreviation: "WA" },
    ] as LicensedState[],
    loanOfficers: [
      {
        name: "Broadview Lending Team",
        title: "Mortgage Advisor",
        nmlsId: "NMLS #181106",
        states: ["WA", "CA", "AZ", "OR", "ID"],
      },
    ] as LoanOfficer[],
  },

  social: {
    facebook: {
      label: "Facebook",
      href: "https://www.facebook.com/broadviewlending",
    },
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/broadviewlending",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/broadviewlending",
    },
    youtube: {
      label: "YouTube",
      href: "https://www.youtube.com/@broadviewlending",
    },
  } satisfies Record<string, SocialLink>,

  legal: {
    privacy: "/privacy",
    terms: "/terms",
    disclosures: "/disclosures",
  },

  tcpa: {
    version: "2026-05-28-v1",
    consentText:
      "I agree to receive calls, emails, and text messages from Broadview Lending regarding mortgage products and services. Message and data rates may apply. Consent is not a condition of obtaining credit.",
  },

  positioning: {
    tagline: "Smarter residential mortgage strategy starts here.",
    description:
      "A modern mortgage strategy platform for purchase, refinance, FHA, VA, jumbo, and home equity lending — built around your goals, not a one-size-fits-all rate quote.",
    residentialFocus:
      "Broadview Lending specializes in residential home loans for buyers and homeowners nationwide, with strong expertise across Washington State and the Pacific Northwest.",
  },
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? brand.websiteUrl;

// Backward-compatible exports used across the codebase
export const companyLicensing = {
  companyName: brand.companyName,
  legalEntity: brand.legalEntity,
  companyNmlsId: brand.nmlsDisplay,
  equalHousingText: brand.trust.equalHousing,
  licensingSummary: brand.licensing.summary,
  consumerNotice: brand.disclaimers.consumerNotice,
};

export const licensedStates = brand.licensing.licensedStates;
export const loanOfficers = brand.licensing.loanOfficers;
export const complianceLinks = brand.legal;

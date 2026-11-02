import { advisorSection, productHero } from "@/lib/product/shared";
import { HOMEBRIDGE_HELOC } from "@/lib/heloc/homebridge";
import type { ProductCta, ProductDefinition } from "@/lib/product/types";

const applicationCta: ProductCta = {
  label: HOMEBRIDGE_HELOC.label,
  href: HOMEBRIDGE_HELOC.href,
  variant: "primary",
  icon: "arrow",
};
const ctas: ProductCta[] = [applicationCta, {
  label: "Talk With Chris First", href: "/contact", variant: "secondary", icon: "calendar",
}];

export const HELOC_PRODUCT: ProductDefinition = {
  slug: "heloc",
  path: "/heloc",
  group: "equity",
  title: "Digital HELOC | Online Prequalification",
  description: "Explore your home equity with Broadview Lending. Start digital HELOC prequalification through Homebridge's HELIX platform, with personal guidance from Chris Butler.",
  breadcrumbs: [{ name: "Home", path: "/" }, { name: "HELOC", path: "/heloc" }],
  page: {
    artDirection: { composition: "advisory", highlightsLayout: "band", advisorVariant: "asymmetric", showQualificationSnapshot: false },
    hero: {
      ...productHero("equity", {
        eyebrow: "Broadview Lending · Digital HELOC",
        headlineBefore: "Your home equity. ",
        headlineAccent: "Your next move.",
        subheadline: "A streamlined online start, with Chris Butler in your corner. Explore a home equity line of credit through Homebridge's HELIX digital platform, with Broadview Lending as your guide.",
        chips: ["Digital application", "Soft-pull prequalification", "Personal guidance from Chris"],
      }),
      ctas,
      trustNote: HOMEBRIDGE_HELOC.notice,
    },
    highlights: {
      tag: "Digital Convenience. Personal Guidance.",
      title: "Move forward with less back-and-forth.",
      description: "Start online when it suits you. Get help from Chris when you need it. One application path from this page to Homebridge.",
      compact: true,
      items: [
        { icon: "fileText", title: "An online start", description: "HELIX uses digital verification where available; some applications need additional documents or manual review." },
        { icon: "shield", title: "Soft pull to prequalify", description: "A hard credit pull follows with your consent if you accept a prequalified offer and continue." },
        { icon: "layers", title: "Keep your first mortgage in view", description: "A HELOC generally sits alongside your existing mortgage rather than replacing it. Compare the combined payment and costs." },
        { icon: "handshake", title: "Chris is a call away", description: "You do not have to figure it out alone. Talk through your plans with Chris Butler at Broadview Lending." },
      ],
    },
    process: {
      tag: "Getting Started",
      title: "Start online. Know what happens next.",
      description: "Broadview is your point of contact. Homebridge provides the HELIX application and reviews your financing request.",
      compact: false,
      steps: [
        { icon: "fileSearch", step: "1", title: "Start your digital HELOC", description: "Use the button below to open Chris's Homebridge link. Follow the prompts to provide your information and review the disclosures." },
        { icon: "fileText", step: "2", title: "Explore your prequalification", description: "Prequalification begins with a soft credit inquiry. Review any offer before choosing to continue." },
        { icon: "handshake", step: "3", title: "Complete the review", description: "If you proceed, Homebridge obtains your consent for a hard inquiry and completes its review. Closing and funding depend on eligibility, verification, and applicable waiting periods." },
      ],
    },
    advisor: {
      ...advisorSection("equity"),
      video: { id: "heloc-chris-butler", title: "Chris Butler", src: "/brand/chris-butler-headshot-even-tone.webp", alt: "Chris Butler, your Broadview Lending mortgage advisor", type: "image", placement: "advisor-photo", enabled: true },
      badge: { label: "Broadview Lending", text: "Christopher Butler · NMLS #1585236" },
      title: "Chris Butler. Here to help you decide.",
      description: "An online application is convenient. A conversation can help you decide whether borrowing against your home makes sense for your plans.",
      benefits: ["Talk through your goal and budget.", "Compare a HELOC with other financing options.", "Ask questions before making a commitment."],
      primaryCta: applicationCta,
      secondaryLink: { label: "Talk With Chris First", href: "/contact" },
      trustNote: HOMEBRIDGE_HELOC.notice,
    },
    faq: {
      title: "Questions before you start",
      items: [
        { question: "Is this Broadview Lending or Homebridge?", answer: "Chris Butler at Broadview Lending is your point of contact for guidance. The digital HELOC application uses Homebridge's HELIX platform. Our buttons open Chris's Homebridge link, where Homebridge's application disclosures and privacy terms apply." },
        { question: "Will a HELOC replace my current mortgage?", answer: "A HELOC generally adds a separate debt secured by your home without replacing your first mortgage. A cash-out refinance replaces the first mortgage. Compare the total costs and payments before deciding." },
        { question: "What should I compare before accepting an offer?", answer: "Review the interest rate and whether it can change, all fees, required draws, and how payments work during the draw and repayment periods. HELOCs commonly have variable rates, so payments can change. The terms in your actual disclosures govern your offer." },
        { question: "Is it only a soft credit pull?", answer: "Only the prequalification stage uses a soft pull. If you accept a prequalified offer and continue, Homebridge obtains your consent for a hard pull, which may affect your credit score." },
        { question: "How fast can I get funds?", answer: "The digital process helps streamline the steps, but there is no guaranteed funding date. Timing depends on your application, required documents, property review, and applicable waiting periods. Ask Chris about timing for your situation." },
        { question: "What should I know before borrowing?", answer: "Your home secures the debt, so failure to repay can lead to foreclosure. Review fees, initial draw requirements, and the full repayment schedule. Consolidating other debt into a HELOC moves that debt onto your home; it does not erase it." },
        { question: "Does starting an application guarantee approval?", answer: "No. Approval, available amounts, and terms depend on credit review, property eligibility, underwriting, and program availability. This is not a commitment to lend." },
      ],
    },
    cta: {
      title: "Your next move starts here.",
      description: "Start your digital HELOC with Broadview Lending's guidance. Continue to Homebridge through Chris's application link.",
      ctas,
      trustNote: HOMEBRIDGE_HELOC.notice,
    },
  },
};

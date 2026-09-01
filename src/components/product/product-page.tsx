import { AdvisorSection } from "@/components/product/advisor-section";
import { CalculatorSection } from "@/components/product/calculator-section";
import { EditorialPullQuote } from "@/components/product/editorial-pull-quote";
import { EditorialStoryBand } from "@/components/product/editorial-story-band";
import { FundingProcess } from "@/components/product/funding-process";
import { LoanCTA } from "@/components/product/loan-cta";
import { LoanFAQ } from "@/components/product/loan-faq";
import { LoanHero } from "@/components/product/loan-hero";
import { LoanHighlights } from "@/components/product/loan-highlights";
import { ProductPathCards } from "@/components/product/product-path-cards";
import { QualificationSnapshot } from "@/components/product/qualification-snapshot";
import { RelatedProducts } from "@/components/product/related-products";
import type {
  ProductArtDirection,
  ProductComposition,
  ProductPageConfig,
} from "@/lib/product/types";

type ScaffoldBlock =
  | "paths"
  | "highlights"
  | "calculators"
  | "advisor"
  | "process"
  | "story"
  | "qualification"
  | "quote"
  | "resources"
  | "faq"
  | "cta";

const SCAFFOLDS: Record<ProductComposition, ScaffoldBlock[]> = {
  advisory: [
    "paths",
    "highlights",
    "calculators",
    "process",
    "advisor",
    "quote",
    "story",
    "resources",
    "faq",
    "cta",
  ],
  active: [
    "story",
    "highlights",
    "calculators",
    "advisor",
    "process",
    "quote",
    "resources",
    "faq",
    "cta",
  ],
  analytical: [
    "paths",
    "highlights",
    "calculators",
    "process",
    "quote",
    "story",
    "resources",
    "faq",
    "cta",
  ],
  decisive: [
    "qualification",
    "highlights",
    "calculators",
    "advisor",
    "process",
    "resources",
    "faq",
    "cta",
  ],
  institutional: [
    "highlights",
    "calculators",
    "story",
    "advisor",
    "quote",
    "process",
    "resources",
    "faq",
    "cta",
  ],
};

const DEFAULT_ART: ProductArtDirection = {
  composition: "advisory",
  storyTreatment: "cinematic",
  showQualificationSnapshot: true,
  showPullQuote: true,
  advisorVariant: "standard",
  highlightsLayout: "editorial",
  density: "compact",
};

export function ProductPage({ config }: { config: ProductPageConfig }) {
  const art: ProductArtDirection = { ...DEFAULT_ART, ...config.artDirection };
  const story = art.story;
  const storyTreatment =
    art.storyTreatment ??
    (art.composition === "analytical" || art.composition === "institutional"
      ? "asymmetric"
      : art.composition === "decisive"
        ? "none"
        : "cinematic");
  const qualificationFacts = config.hero?.programHighlights?.facts.slice(0, 5);
  const allowedSections = new Set(
    config.sectionOrder ?? ["paths", "highlights", "calculators", "advisor", "process"],
  );

  const scaffold = SCAFFOLDS[art.composition].filter((block) => {
    if (block === "story") return storyTreatment !== "none" && Boolean(story);
    if (block === "qualification") {
      return (
        (art.showQualificationSnapshot ?? true) &&
        Boolean(qualificationFacts && qualificationFacts.length > 0)
      );
    }
    if (block === "quote") return (art.showPullQuote ?? true) && Boolean(config.pullQuote);
    if (block === "resources") return Boolean(config.related && config.related.length > 0);
    if (block === "faq") return Boolean(config.faq);
    if (block === "cta") return Boolean(config.cta);
    return allowedSections.has(block);
  });

  const renderBlock = (block: ScaffoldBlock) => {
    switch (block) {
      case "paths":
        return config.paths ? <ProductPathCards key="paths" config={config.paths} /> : null;
      case "highlights":
        return config.highlights ? (
          <LoanHighlights
            key="highlights"
            config={config.highlights}
            layout={art.highlightsLayout ?? "editorial"}
          />
        ) : null;
      case "calculators":
        return config.calculators ? (
          <CalculatorSection key="calculators" config={config.calculators} />
        ) : null;
      case "advisor":
        return config.advisor ? (
          <AdvisorSection
            key="advisor"
            variant={art.advisorVariant ?? "standard"}
            config={config.advisor}
          />
        ) : null;
      case "process":
        return config.process ? <FundingProcess key="process" config={config.process} /> : null;
      case "story":
        return story ? (
          <EditorialStoryBand
            key="story"
            story={story}
            variant={storyTreatment === "none" ? "cinematic" : storyTreatment}
          />
        ) : null;
      case "qualification":
        return qualificationFacts?.length ? (
          <QualificationSnapshot
            key="qualification"
            eyebrow="Qualification Snapshot"
            title="A quick orientation for this path"
            description="Use this as context — a Broadview advisor confirms structure against your situation."
            facts={qualificationFacts}
            background={art.composition === "decisive" ? "warm" : "slate"}
          />
        ) : null;
      case "quote":
        return config.pullQuote ? (
          <EditorialPullQuote
            key="quote"
            quote={config.pullQuote.quote}
            attribution={config.pullQuote.attribution}
            background={config.pullQuote.background}
          />
        ) : null;
      case "resources":
        return config.related ? (
          <RelatedProducts key="resources" links={config.related} />
        ) : null;
      case "faq":
        return config.faq ? (
          <LoanFAQ key="faq" title={config.faq.title} items={config.faq.items} />
        ) : null;
      case "cta":
        return config.cta ? <LoanCTA key="cta" config={config.cta} /> : null;
      default:
        return null;
    }
  };

  return (
    <>
      {config.hero ? <LoanHero config={config.hero} /> : null}
      {scaffold.map((block) => renderBlock(block))}
    </>
  );
}

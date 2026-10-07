import { getArticle } from "@/lib/content/knowledge";
import type { ProductGroup, ProductRelatedLink } from "@/lib/product/types";

// Pillar's product + education pattern, using Broadview's existing guides.
const GUIDE_SLUGS: Record<ProductGroup, string[]> = {
  buy: ["how-much-home-can-you-afford", "understanding-down-payments", "fha-vs-conventional"],
  refinance: ["when-does-refinancing-make-sense", "heloc-vs-cash-out-refinance", "how-mortgage-rates-work"],
  equity: ["heloc-vs-cash-out-refinance", "debt-consolidation-strategies", "using-home-equity-to-invest"],
  invest: ["using-home-equity-to-invest", "how-mortgage-rates-work", "heloc-vs-cash-out-refinance"],
};

export function productResources(group: ProductGroup): ProductRelatedLink[] {
  return GUIDE_SLUGS[group].flatMap((slug) => {
    const article = getArticle(slug);
    return article ? [{ href: `/learn/${article.slug}`, label: article.title, description: article.seo.description }] : [];
  });
}

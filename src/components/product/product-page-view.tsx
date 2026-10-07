import type { Metadata } from "next";
import { MortgagePlanningLinks } from "@/components/content/mortgage-planning-links";
import { ProductPage } from "@/components/product/product-page";
import { siteUrl } from "@/lib/brand/config";
import type { ProductDefinition } from "@/lib/product/types";
import { productResources } from "@/lib/product/resources";
import {
  faqSchema,
  financialProductSchema,
  jsonLdString,
} from "@/lib/seo/schema";

export function productMetadata(product: ProductDefinition): Metadata {
  const url = `${siteUrl}${product.canonicalPath ?? product.path}`;
  const image = product.page.hero?.video;
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description: product.description,
      url,
      type: "website",
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
  };
}

export function ProductPageView({ product }: { product: ProductDefinition }) {
  const faqs = product.page.faq?.items ?? [];
  const category =
    product.group === "invest"
      ? "Investment Property Financing"
      : product.group === "equity"
        ? "Home Equity"
        : "Mortgage";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            financialProductSchema({
              name: product.title,
              description: product.description,
              path: product.canonicalPath ?? product.path,
              category,
            }),
            ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
          ),
        }}
      />
      <ProductPage config={{ ...product.page, breadcrumbs: product.breadcrumbs, resources: productResources(product.group) }} />
      {(product.path === "/buy" || product.path === "/refinance") && <MortgagePlanningLinks />}
    </>
  );
}

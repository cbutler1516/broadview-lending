import type { Metadata } from "next";
import { ProductPage } from "@/components/product/product-page";
import { siteUrl } from "@/lib/brand/config";
import type { ProductDefinition } from "@/lib/product/types";
import {
  breadcrumbSchema,
  faqSchema,
  financialProductSchema,
  jsonLdString,
} from "@/lib/seo/schema";

export function productMetadata(product: ProductDefinition): Metadata {
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${siteUrl}${product.path}`,
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
              path: product.path,
              category,
            }),
            breadcrumbSchema(product.breadcrumbs),
            ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
          ),
        }}
      />
      <ProductPage config={product.page} />
    </>
  );
}

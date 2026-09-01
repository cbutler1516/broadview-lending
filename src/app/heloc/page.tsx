import type { Metadata } from "next";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { HELOC_PRODUCT } from "@/lib/product/configs/equity";

export const metadata: Metadata = productMetadata(HELOC_PRODUCT);

export default function HelocPage() {
  return <ProductPageView product={HELOC_PRODUCT} />;
}

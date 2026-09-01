import type { Metadata } from "next";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { COMMERCIAL_PRODUCT } from "@/lib/product/configs/invest";

export const metadata: Metadata = productMetadata(COMMERCIAL_PRODUCT);

export default function CommercialPage() {
  return <ProductPageView product={COMMERCIAL_PRODUCT} />;
}

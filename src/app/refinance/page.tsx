import type { Metadata } from "next";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { REFINANCE_HUB_PRODUCT } from "@/lib/product/configs/refinance";

export const metadata: Metadata = productMetadata(REFINANCE_HUB_PRODUCT);

export default function RefinancePage() {
  return <ProductPageView product={REFINANCE_HUB_PRODUCT} />;
}

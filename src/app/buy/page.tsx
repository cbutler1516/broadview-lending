import type { Metadata } from "next";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { PURCHASE_PRODUCT } from "@/lib/product/configs/buy";

export const metadata: Metadata = productMetadata(PURCHASE_PRODUCT);

export default function BuyPage() {
  return <ProductPageView product={PURCHASE_PRODUCT} />;
}

import { BUY_PRODUCTS } from "@/lib/product/configs/buy";
import { EQUITY_PRODUCTS } from "@/lib/product/configs/equity";
import { INVEST_PRODUCTS } from "@/lib/product/configs/invest";
import { REFINANCE_PRODUCTS } from "@/lib/product/configs/refinance";
import type { ProductDefinition } from "@/lib/product/types";

export const PRODUCT_DEFINITIONS: ProductDefinition[] = [
  ...BUY_PRODUCTS,
  ...REFINANCE_PRODUCTS,
  ...EQUITY_PRODUCTS,
  ...INVEST_PRODUCTS,
];

const BY_PATH = new Map(PRODUCT_DEFINITIONS.map((product) => [product.path, product]));

export function getProductByPath(path: string): ProductDefinition | undefined {
  return BY_PATH.get(path);
}

export function getProductBySlug(
  group: ProductDefinition["group"],
  slug: string,
): ProductDefinition | undefined {
  return PRODUCT_DEFINITIONS.find((product) => product.group === group && product.slug === slug);
}

export function getProductsByGroup(group: ProductDefinition["group"]): ProductDefinition[] {
  return PRODUCT_DEFINITIONS.filter((product) => product.group === group);
}

export {
  BUY_PRODUCTS,
  EQUITY_PRODUCTS,
  INVEST_PRODUCTS,
  REFINANCE_PRODUCTS,
};

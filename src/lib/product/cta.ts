import type { DealEngineMode, ProductCta, ProductGroup } from "@/lib/product/types";

export const PRODUCT_CTA_LABEL = {
  buy: "Start My Strategy",
  refinance: "Start My Strategy",
  equity: "Explore My Equity",
  invest: "Analyze a Deal",
} as const satisfies Record<ProductGroup, string>;

/**
 * Existing destinations only. Investor hrefs stay on {path}#analyze.
 * `mode` is reserved for the shared Property / Deal Engine — do not fork
 * investor / realtor / consumer into separate engines.
 */
export function productPrimaryHref(
  group: ProductGroup,
  options?: { path?: string; funnel?: string; mode?: DealEngineMode },
): string {
  switch (group) {
    case "buy":
      return options?.funnel ?? "/funnel/purchase";
    case "refinance":
      return options?.funnel ?? "/funnel/refinance";
    case "equity":
      return options?.funnel ?? "/funnel/heloc";
    case "invest":
      void options?.mode;
      if (options?.funnel) return options.funnel;
      return options?.path ? `${options.path}#analyze` : "/invest#analyze";
  }
}

export function productCtas(
  group: ProductGroup,
  options?: { path?: string; funnel?: string },
): ProductCta[] {
  return [
    {
      label: PRODUCT_CTA_LABEL[group],
      href: productPrimaryHref(group, options),
      variant: "primary",
      icon: "arrow",
    },
    {
      label: "Talk With An Advisor",
      href: "/contact",
      variant: "secondary",
      icon: "calendar",
    },
  ];
}

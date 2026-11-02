import { getBookingUrl } from "@/lib/brand/booking";
import type { DealEngineMode, ProductCta, ProductGroup } from "@/lib/product/types";

export const PRODUCT_CTA_LABEL = {
  buy: "Explore My Loan Options",
  refinance: "Explore My Loan Options",
  equity: "Explore My Equity",
  invest: "Analyze a Deal",
} as const satisfies Record<ProductGroup, string>;

/**
 * Existing destinations only. Investor CTAs open the live shared analyzer.
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
      return "/tools/investor-deal-analyzer";
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
      href: getBookingUrl(),
      variant: "secondary",
      icon: "calendar",
    },
  ];
}

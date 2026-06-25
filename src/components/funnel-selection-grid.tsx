import { brand } from "@/lib/brand/config";
import { FunnelCard, type FunnelCardData } from "./funnel-card";

const goalCards: FunnelCardData[] = [
  {
    type: "purchase",
    title: "Buy a Home",
    subtitle:
      "Understand what's possible for your price range, down payment, and timeline.",
    icon: "",
    href: "/funnel/purchase",
  },
  {
    type: "refinance",
    title: "Refinance",
    subtitle:
      "Explore whether a lower rate, shorter term, or cash-out may fit your goals.",
    icon: "",
    href: "/funnel/refinance",
  },
  {
    type: "heloc",
    title: "Home Equity",
    subtitle:
      "Put your equity to work for renovations, debt, or your next move.",
    icon: "",
    href: "/heloc",
  },
  {
    type: "va",
    title: "VA Loans",
    subtitle:
      "Review VA purchase or refinance options for eligible veterans and service members.",
    icon: "",
    href: "/funnel/va",
  },
  {
    type: "fha",
    title: "FHA Loans",
    subtitle:
      "See whether flexible down payment and credit options may work for you.",
    icon: "",
    href: "/funnel/fha",
  },
  {
    type: "jumbo",
    title: "Jumbo Loans",
    subtitle:
      "Financing strategies for higher loan amounts above conforming limits.",
    icon: "",
    href: "/funnel/purchase",
  },
];

export function FunnelSelectionGrid() {
  return (
    <div>
      <p className="mb-6 text-sm font-medium text-muted">
        {brand.trust.funnelDuration}
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {goalCards.map((funnel) => (
          <FunnelCard key={funnel.title} funnel={funnel} />
        ))}
      </div>
    </div>
  );
}

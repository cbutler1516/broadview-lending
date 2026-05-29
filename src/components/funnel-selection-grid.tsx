import { residentialFunnelDefinitions } from "@/lib/funnels/config";
import { brand } from "@/lib/brand/config";
import { FunnelCard, type FunnelCardData } from "./funnel-card";

const residentialCards: FunnelCardData[] = residentialFunnelDefinitions.map(
  ({ type, title, subtitle, icon, href }) => ({
    type,
    title,
    subtitle,
    icon,
    href,
  }),
);

export function FunnelSelectionGrid() {
  return (
    <div>
      <p className="mb-6 text-sm text-muted">{brand.trust.funnelDuration}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {residentialCards.map((funnel) => (
          <FunnelCard key={funnel.type} funnel={funnel} />
        ))}
      </div>
    </div>
  );
}

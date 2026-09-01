import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Briefcase,
  Calculator,
  Clock,
  DollarSign,
  FileSearch,
  FileText,
  Globe,
  Handshake,
  Landmark,
  Layers,
  MessageSquare,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export const PRODUCT_ICONS = {
  building2: Building2,
  briefcase: Briefcase,
  calculator: Calculator,
  clock: Clock,
  dollarSign: DollarSign,
  fileSearch: FileSearch,
  fileText: FileText,
  globe: Globe,
  handshake: Handshake,
  landmark: Landmark,
  layers: Layers,
  messageSquare: MessageSquare,
  refreshCw: RefreshCw,
  shield: Shield,
  trendingUp: TrendingUp,
  users: Users,
  wallet: Wallet,
} as const satisfies Record<string, LucideIcon>;

export type ProductIconName = keyof typeof PRODUCT_ICONS;

export function resolveProductIcon(name: ProductIconName): LucideIcon {
  return PRODUCT_ICONS[name];
}

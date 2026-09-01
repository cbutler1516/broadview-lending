import type {
  CreditScoreRangeId,
  EquityAccessRangeId,
  MortgageBalanceRangeId,
  PropertyValueRangeId,
} from "@/lib/heloc-engine/funnel-ranges";
import type { PropertyOccupancyId } from "@/lib/heloc-engine/property-occupancy";

export type { PropertyOccupancyId } from "@/lib/heloc-engine/property-occupancy";

export type PropertyTypeId =
  | "single-family"
  | "condo"
  | "two-to-four-unit"
  | "other"
  | "duplex"
  | "triplex"
  | "fourplex"
  | "str-vacation"
  | "duplex-triplex-fourplex"
  | "small-multifamily"
  | "fourplex-plus"
  | "townhome"
  | "str-airbnb";

export type EquityStrategy = "rental_property" | "primary_residence";

export type RoutingTier = "fast_track" | "standard" | "review" | "nurture";

export type LeadQualityTier = "hot" | "warm" | "nurture" | "incomplete";

export type LeadFunnelData = {
  propertyOccupancy: PropertyOccupancyId | "";
  propertyType: PropertyTypeId | "";
  propertyValueRange: PropertyValueRangeId | "";
  mortgageBalanceRange: MortgageBalanceRangeId | "";
  equityAccessRange: EquityAccessRangeId | "";
  creditScoreRange: CreditScoreRangeId | "";
  propertyCount: string;
  fundingTimeline: string;
  propertyRented: string;
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  googlePlaceId: string;
  propertyFormattedAddress: string;
  propertyValue: number | null;
  mortgageBalance: number | null;
  desiredCashAmount: number | null;
  estimatedEquity: number | null;
  estimatedHeloc: number | null;
  estimatedHelocLow: number | null;
  estimatedHelocHigh: number | null;
  avmSource: string;
  propertySqft: number | null;
  propertyBeds: number | null;
  propertyBaths: number | null;
  propertyYearBuilt: number | null;
  propertyLatitude: number | null;
  propertyLongitude: number | null;
  estimatedRent: number | null;
  propertyValueLow: number | null;
  propertyValueHigh: number | null;
  mortgageBalanceLow: number | null;
  mortgageBalanceHigh: number | null;
  lastSaleDate: string;
  lastSalePrice: number | null;
  recordedMortgageAmount: number | null;
  actualMortgageBalance: number | null;
  useMortgageEstimate: boolean;
  fundingGoal: string;
  ownershipType: string;
  funnelStepCompleted: number;
  targetCltvPercent: number;
  investorScore: number | null;
  confidenceRating: string;
  valuationLastUpdated: string;
  creditScoreEstimate: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tcpaConsent: boolean;
  marketingOptIn: boolean;
};

export type LeadSubmitResult = {
  success: boolean;
  id?: string;
  routingTier?: RoutingTier;
  error?: string;
};

export type CheckOptionsPrefill = Partial<
  Pick<
    LeadFunnelData,
    | "propertyType"
    | "propertyValueRange"
    | "mortgageBalanceRange"
    | "equityAccessRange"
    | "creditScoreRange"
    | "propertyValue"
    | "mortgageBalance"
    | "desiredCashAmount"
    | "estimatedEquity"
  >
> & {
  equityStrategy?: EquityStrategy;
  propertyOccupancy?: PropertyOccupancyId;
};

export function isEquityStrategy(value: string | null | undefined): value is EquityStrategy {
  return value === "rental_property" || value === "primary_residence";
}

/** Display formatting only. Do not put deal math here. */

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const moneyPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatDealMoney(value: number | null, precise = false): string {
  if (value === null) return "—";
  return (precise ? moneyPrecise : money).format(value);
}

export function formatDealPercent(value: number | null, digits = 2): string {
  if (value === null) return "—";
  return `${value.toFixed(digits)}%`;
}

export function formatDealRatio(value: number | null, digits = 2): string {
  if (value === null) return "—";
  return value.toFixed(digits);
}

export function parseDealNumber(value: string): number | undefined {
  const trimmed = value.trim().replace(/[$,%\s]/g, "");
  if (trimmed === "" || trimmed === "-" || trimmed === ".") return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

import { monthlyPrincipalAndInterest, roundMoney } from "../deal-engine/math";

export const offerFields = [
  { key: "price", label: "Purchase price ($)", required: true },
  { key: "downPercent", label: "Down payment (%)", required: true },
  { key: "rate", label: "Interest rate assumption (%)", required: true },
  { key: "years", label: "Loan term (years)", required: true },
  { key: "closingCosts", label: "Eligible closing costs, excluding points ($)" },
  { key: "points", label: "Discount points / upfront loan costs ($)" },
  { key: "sellerCredit", label: "Seller credit toward eligible costs ($)" },
  { key: "taxes", label: "Property taxes per month ($)" },
  { key: "insurance", label: "Homeowners insurance per month ($)" },
  { key: "hoa", label: "HOA dues per month ($)" },
  { key: "mortgageInsurance", label: "Mortgage insurance per month ($)" },
] as const;
export type OfferField = typeof offerFields[number]["key"];
export type OfferInputs = Record<OfferField, string>;
export function emptyOffer(): OfferInputs {
  return { price: "", downPercent: "", rate: "", years: "30", closingCosts: "", points: "", sellerCredit: "", taxes: "", insurance: "", hoa: "", mortgageInsurance: "" };
}
export function evaluateOffer(input: OfferInputs) {
  const errors: string[] = [];
  const values = {} as Record<OfferField, number>;
  for (const field of offerFields) {
    const raw = input[field.key].trim();
    const value = raw === "" ? 0 : Number(raw);
    if (("required" in field && field.required && !raw) || !Number.isFinite(value) || value < 0 || value > 1e9) {
      errors.push(`Enter a valid ${field.label.toLowerCase()}.`);
    }
    values[field.key] = value;
  }
  if (values.price <= 0) errors.push("Purchase price must be greater than zero.");
  if (values.downPercent > 100) errors.push("Down payment cannot exceed 100%.");
  if (values.rate > 30) errors.push("Use an annual interest rate between 0% and 30%.");
  if (!Number.isInteger(values.years) || values.years < 1 || values.years > 40) errors.push("Use a whole loan term between 1 and 40 years.");
  if (values.sellerCredit > values.closingCosts + values.points) errors.push("The credit exceeds entered eligible costs. Confirm allowable use with your lender.");
  if (errors.length) return { errors: [...new Set(errors)], result: null };
  const downPayment = roundMoney(values.price * values.downPercent / 100);
  const loanAmount = roundMoney(values.price - downPayment);
  const principalAndInterest = monthlyPrincipalAndInterest(loanAmount, values.rate, values.years);
  if (principalAndInterest === null || !Number.isFinite(principalAndInterest)) return { errors: ["These assumptions could not be calculated."], result: null };
  return { errors: [], result: {
    downPayment, loanAmount, principalAndInterest,
    enteredMonthlyCosts: roundMoney(principalAndInterest + values.taxes + values.insurance + values.hoa + values.mortgageInsurance),
    acquisitionCash: roundMoney(downPayment + values.closingCosts + values.points - values.sellerCredit),
    omittedCosts: offerFields.filter((field) => !("required" in field) && input[field.key].trim() === "").map((field) => field.label),
  } };
}
export function compareOffers(a: NonNullable<ReturnType<typeof evaluateOffer>["result"]>, b: NonNullable<ReturnType<typeof evaluateOffer>["result"]>) {
  return { monthlyDifference: roundMoney(b.enteredMonthlyCosts - a.enteredMonthlyCosts), cashDifference: roundMoney(b.acquisitionCash - a.acquisitionCash) };
}

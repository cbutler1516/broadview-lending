import records from '@/content/completed-deals.json';

export type CompletedDeal = {
  id: string;
  purpose: 'Purchase' | 'Refinance';
  helocByAmount: boolean;
  state: string;
  year: number;
  month: number;
  roundedLoanAmount: number;
  roundedImpliedValue: number;
};

// This file imports only the allowlisted, rounded public projection, never the private CSV.
export const completedDeals: CompletedDeal[] = records.map((record): CompletedDeal => {
  if (record.purpose !== 'Purchase' && record.purpose !== 'Refinance') throw new Error('Invalid completed-deal purpose');
  return { ...record, purpose: record.purpose };
}).sort((a, b) => b.year - a.year || b.month - a.month || a.id.localeCompare(b.id));

export function dealFundingDate(deal: CompletedDeal) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(deal.year, deal.month - 1, 1)));
}

export const dealCurrency = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value);

export function dealImage(deal: CompletedDeal) {
  return `/images/deals/${deal.id}.webp`;
}

export function selectDeals(purpose?: string, state?: string) {
  return completedDeals.filter(deal => (!purpose || deal.purpose === purpose) && (!state || deal.state === state));
}

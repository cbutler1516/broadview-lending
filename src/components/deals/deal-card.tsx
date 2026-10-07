import Image from 'next/image';
import { dealCurrency, dealImage, dealFundingDate, type CompletedDeal } from '@/lib/completed-deals';

export function DealCard({ deal }: { deal: CompletedDeal }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-labelledby={`${deal.id}-title`}>
      <figure>
        <div className="relative aspect-video bg-slate-100">
          <Image src={dealImage(deal)} alt={`AI-generated fictional home illustration for financing in ${deal.state}; not the financed property`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </figure>
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">{deal.helocByAmount ? 'HELOC' : deal.purpose}</p>
        <p className="mt-2 text-xs text-slate-500">Funded <time dateTime={`${deal.year}-${String(deal.month).padStart(2, '0')}`}>{dealFundingDate(deal)}</time></p>
        <h2 id={`${deal.id}-title`} className="mt-3 text-xl font-semibold tracking-tight text-navy-950">{deal.state} {deal.helocByAmount ? 'HELOC' : deal.purpose.toLowerCase()}</h2>
        <p className="mt-5 text-sm text-slate-500">Approximate loan amount</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-navy-950">{dealCurrency(deal.roundedLoanAmount)}</p>
        <details className="mt-5 border-t border-slate-100 pt-1">
          <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium text-brand focus-visible:outline-2 focus-visible:outline-brand">Value context</summary>
          <p className="text-sm text-slate-600">Approximate value implied by LTV</p>
          <p className="mt-1 text-lg font-semibold text-navy-900">{dealCurrency(deal.roundedImpliedValue)}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">Calculated from the recorded loan amount and loan-to-value ratio. Not a verified purchase price, appraisal, or current market value. Figures rounded to the nearest $25,000.</p>
        </details>
      </div>
    </article>
  );
}

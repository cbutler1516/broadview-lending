import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { DealCard } from '@/components/deals/deal-card';
import { completedDeals, selectDeals } from '@/lib/completed-deals';

type Query = { purpose?: string; state?: string; page?: string };
type Props = { searchParams: Promise<Query> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  return {
    title: 'Completed Financing | Purchases & Refinances',
    description: 'Explore selected completed purchase and refinance financing, with rounded historical figures and privacy-conscious illustrations.',
    alternates: { canonical: '/completed-financing' },
    ...(query.purpose || query.state || query.page ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: 'Completed Financing | Broadview Lending', url: '/completed-financing', images: ['/images/deals/deal-001.webp'] },
  };
}

export default async function CompletedFinancingPage({ searchParams }: Props) {
  const query = await searchParams;
  const states = [...new Set(completedDeals.map(deal => deal.state))].sort();
  const purpose = ['Purchase', 'Refinance'].find(value => value === query.purpose);
  const state = states.find(value => value === query.state);
  const deals = selectDeals(purpose, state);
  const totalPages = Math.max(1, Math.ceil(deals.length / 12));
  const requestedPage = Number(query.page ?? 1);
  const page = Number.isSafeInteger(requestedPage) ? Math.max(1, Math.min(totalPages, requestedPage)) : 1;
  const visible = deals.slice((page - 1) * 12, page * 12);
  const href = (nextPurpose?: string, nextPage = 1) => {
    const params = new URLSearchParams({ ...(nextPurpose ? { purpose: nextPurpose } : {}), ...(state ? { state } : {}), ...(nextPage > 1 ? { page: String(nextPage) } : {}) });
    return `/completed-financing${params.size ? `?${params}` : ''}`;
  };
  return (
    <main className="bg-white">
      <header className="border-b border-slate-200 bg-slate-50 py-9 sm:py-12">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Completed financing', path: '/completed-financing' }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand">Completed financing</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-5xl">Different homes.<br />Different next chapters.</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-600">A selection of recently completed deals. Real financing history, with personal details kept private.</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">All images are AI-generated illustrations, not the financed properties. Locations are state-only and financial figures are rounded.</p>
        </Container>
      </header>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 py-7">
          <nav aria-label="Financing purpose" className="flex flex-wrap gap-2">
            {[undefined, 'Purchase', 'Refinance'].map(item => (
              <Link key={item ?? 'all'} href={href(item)} aria-current={purpose === item ? 'page' : undefined} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${purpose === item ? 'border-navy-950 bg-navy-950 text-white' : 'border-slate-200 text-slate-600 hover:border-brand'}`}>
                {item === 'Purchase' ? 'Purchases' : item === 'Refinance' ? 'Refinances' : 'All financing'} <span>({selectDeals(item, state).length})</span>
              </Link>
            ))}
          </nav>
          <form action="/completed-financing" method="get" className="flex flex-wrap items-end gap-2">
            {purpose && <input type="hidden" name="purpose" value={purpose} />}
            <label className="text-xs font-medium text-slate-600">Location<select name="state" defaultValue={state ?? ''} className="mt-1 block min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-navy-950"><option value="">All states</option>{states.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
            <button type="submit" className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-navy-950 hover:border-brand">Filter</button>
          </form>
        </div>
        <section aria-label="Completed loans" className="pb-10">
          <p className="mb-5 text-sm text-slate-500">{deals.length ? `Showing ${(page - 1) * 12 + 1}–${Math.min(page * 12, deals.length)} of ${deals.length} examples` : 'No examples match these filters.'}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map(deal => <DealCard key={deal.id} deal={deal} />)}</div>
          {!deals.length && <Link href="/completed-financing" className="inline-flex min-h-11 items-center text-brand underline">Clear filters</Link>}
          {totalPages > 1 && <nav aria-label="Completed financing pages" className="mt-9 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">{page > 1 ? <Link href={href(purpose, page - 1)} className="inline-flex min-h-11 items-center font-semibold text-brand">← Previous</Link> : <span />}<span className="text-sm text-slate-500">Page {page} of {totalPages}</span>{page < totalPages ? <Link href={href(purpose, page + 1)} className="inline-flex min-h-11 items-center font-semibold text-brand">Next →</Link> : <span />}</nav>}
        </section>
        <details className="mb-10 rounded-xl border border-slate-200 p-5">
          <summary className="cursor-pointer py-2 text-sm font-semibold text-navy-950">How to read these examples</summary>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-slate-600">
            <p>Loans with original amounts below $150,000 are labeled HELOC using Broadview’s portfolio classification rule, rather than a verified product field in the export. Purchase and refinance filters retain the recorded loan purpose.</p>
            <p>Loan amounts and implied values are rounded to the nearest $25,000. The implied value is calculated using the original loan amount divided by its recorded LTV as a decimal. It is not a verified purchase price, appraised value, or current market value. The result depends on the supplied loan amount matching the basis of the recorded LTV.</p>
            <p>Illustrations are fictional and do not establish the actual property’s appearance, type, condition, or amenities. Funding dates show month and year only. Names, street addresses, ZIP codes, funding days and exact LTVs are not included.</p>
            <p>These are historical examples, not offers or guarantees of similar results. Historical locations do not represent current lending availability. Current licensing, loan programs and eligibility requirements apply.</p>
            <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-loan-to-value-ratio-and-how-does-it-relate-to-my-costs-en-121/" className="inline-flex min-h-11 items-center text-brand underline underline-offset-4">Learn about LTV from the CFPB ↗</a>
          </div>
        </details>
        <section className="mb-16 rounded-2xl bg-navy-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold tracking-tight">Your plans deserve their own conversation.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">Tell us what you have in mind. We’ll help you explore the next step.</p>
          <Link href="/contact" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-navy-950">Talk with an advisor →</Link>
        </section>
      </Container>
    </main>
  );
}

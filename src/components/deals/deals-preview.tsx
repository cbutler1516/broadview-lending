import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { DealCard } from '@/components/deals/deal-card';
import { completedDeals } from '@/lib/completed-deals';

export function DealsPreview() {
  // Show a small cross-section; the complete archive lives on its own page.
  const purchase = completedDeals.find(deal => deal.purpose === 'Purchase');
  const refinance = completedDeals.find(deal => deal.purpose === 'Refinance');
  const other = completedDeals.find(deal => deal !== purchase && deal !== refinance && deal.state !== purchase?.state);
  const featured = [purchase, refinance, other].filter(deal => deal !== undefined);
  return (
    <section className="bg-white py-14 sm:py-20" aria-labelledby="completed-financing-title">
      <Container>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Completed financing</p>
            <h2 id="completed-financing-title" className="mt-3 text-3xl font-semibold tracking-tight text-navy-950">A look at loans we’ve helped complete.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">Purchase and refinance examples, shared with privacy in mind.</p>
          </div>
          <Link href="/completed-financing" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">Explore completed financing →</Link>
        </div>
        <p className="mb-5 text-xs leading-relaxed text-slate-500">All images are AI-generated illustrations, not the financed properties. Financial figures are rounded.</p>
        <div className="grid gap-6 md:grid-cols-3">{featured.map(deal => <DealCard key={deal.id} deal={deal} />)}</div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Past transactions do not guarantee future financing.</p>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_LOAN_PATHS, PRIMARY_JOURNEYS } from "@/lib/homepage/content";
import { loanImages } from "@/lib/media/assets";

export function PrimaryFinancingPaths() {
  return (
    <section id="journeys" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Your next move</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-5xl">Different plans.<br />Personal guidance.</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">Start with what matters to you. We’ll help you think through the financing.</p>
        </header>
        <div className="grid gap-10 md:grid-cols-3 md:gap-7">
          {PRIMARY_JOURNEYS.map((path) => (
            <Link key={path.id} href={path.href} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image src={path.video.src} alt={path.video.alt} fill sizes="(min-width: 1280px) 366px, (min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.025]" />
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-semibold tracking-tight text-navy-950">{path.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">{path.description}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">{path.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div id="financing-paths" className="mt-12 scroll-mt-28 border-t border-slate-200 pt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Looking for a specific loan?</p>
          <nav aria-label="Home loan options" className="mt-3 flex flex-wrap gap-x-7 gap-y-1">
            {HOMEPAGE_LOAN_PATHS.paths.map((path) => <Link key={path.href} href={path.href} className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-navy-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand">{path.title}<ArrowRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" /></Link>)}
          </nav>
        </div>
        <Link href="/refinance" className="group mt-10 grid overflow-hidden rounded-2xl bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand sm:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[16/9] sm:aspect-auto sm:min-h-64"><Image src={loanImages.refinance.src} alt={loanImages.refinance.alt} fill sizes="(min-width: 1280px) 520px, (min-width: 640px) 45vw, 100vw" className="object-cover" /></div>
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Already at home?</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">A fresh look at your mortgage.</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">Compare your current loan with your options today, including costs and how long you plan to stay.</p>
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">Explore refinancing<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </Link>
        <p className="mt-5 text-xs leading-relaxed text-slate-500">Property imagery is illustrative, not actual listings or financed properties.</p>
      </div>
    </section>
  );
}

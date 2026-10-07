import Image from "next/image";
import { LoanPlaybookLinks } from "@/components/loan-playbook-links";
import { BookingLink } from "@/components/booking-link";
import { ContactLink } from "@/components/contact-link";
import { brand } from "@/lib/brand/config";

export function WhySection() {
  return (
    <section id="meet-chris" aria-labelledby="meet-chris-heading" className="bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:gap-16">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100">
          <Image src="/brand/chris-butler-headshot-even-tone.webp" alt="Chris Butler, Broadview Lending mortgage advisor" width={768} height={768} sizes="(max-width: 767px) 100vw, 384px" className="h-auto w-full" />
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Why Broadview · Meet Chris</p>
          <h2 id="meet-chris-heading" className="text-3xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-4xl">Real estate experience.<br />Personal mortgage guidance.</h2>
          <p className="mt-5 text-lg font-semibold text-navy-950">Chris Butler</p>
          <p className="mt-1 text-sm text-slate-500">Branch Manager · Senior Loan Originator · NMLS #1585236</p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">Raised in Bellevue, Washington, Chris attended the University of Washington before building a career in real estate and finance. His work with Butler Property Group included property renovations, townhomes, and new construction—experience he brings to conversations with homebuyers and investors today.</p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">Chris founded Broadview Lending with a focus on personal guidance and a simpler mortgage experience. Whether you’re buying a first home, refinancing, or considering an investment, the conversation starts with your goals and questions.</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookingLink location="homepage_why" className="inline-flex min-h-12 items-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-navy-950 hover:bg-slate-50">Talk with Chris</BookingLink>
            <ContactLink href={brand.contact.emailHref} type="email" location="homepage_why" className="inline-flex min-h-11 items-center break-all text-sm font-medium text-brand underline underline-offset-4">{brand.contact.email}</ContactLink>
          </div>
          <LoanPlaybookLinks />
        </div>
      </div>
    </section>
  );
}

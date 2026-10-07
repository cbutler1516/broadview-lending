import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LearningPaths() {
  return <div className="grid gap-6 md:grid-cols-2">
    {[
      { href: "/learn/realtor-academy", title: "For real estate professionals", label: "Realtor Academy", image: "/images/blog/rental.webp", alt: "Illustrative residential investment property", body: "Turn financing questions into useful client conversations. Playbooks, comparison tools, and a practical plan for the week." },
      { href: "/learn/homebuyer-center", title: "For homebuyers & homeowners", label: "Homebuyer Learning Center", image: "/images/blog/neighborhood.webp", alt: "Illustrative neighborhood with welcoming homes", body: "Understand the trade-offs before your next move. Payment comfort, offer strategy, equity, and the questions worth asking." },
    ].map((path) => <Link key={path.href} href={path.href} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
      <div className="relative aspect-[16/7]"><Image src={path.image} alt={path.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
      <div className="p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-brand">{path.title}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-900">{path.label}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">{path.body}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">Explore your learning path <ArrowRight className="h-4 w-4" aria-hidden /></span></div>
    </Link>)}
  </div>;
}

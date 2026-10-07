import type { Metadata } from "next";
import Link from "next/link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { TrackedLink } from "@/components/tracked-link";
import { getCalculator } from "@/lib/content/calculators";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Strategy Tools | Homebuyers, Homeowners & Real Estate Professionals",
  description: "Working tools for payment comfort, offer comparisons, home equity, rental analysis and Realtor client presentations.",
  openGraph: { url: `${siteUrl}/tools` },
};

const groups = [
  { id: "homebuyers", eyebrow: "For homebuyers & homeowners", title: "Your home. Your numbers.", description: "Choose a question. Try a sample or enter your own numbers.", slugs: ["affordability-planner", "offer-comparison", "cash-out-vs-heloc"], href: "/learn/homebuyer-center", education: "Homebuyer guides" },
  { id: "realtors", eyebrow: "For investors & real estate professionals", title: "Does the deal make sense?", description: "Explore a property's cash flow and financing. Agent mode adds a client presentation. The home tools above work for your clients, too.", slugs: ["investor-deal-analyzer"], href: "/learn/realtor-academy", education: "Realtor Academy" },
];

const toolQuestions: Record<string, string> = {
  "affordability-planner": "What home budget feels comfortable?",
  "offer-comparison": "How do these two offers compare?",
  "cash-out-vs-heloc": "Which equity option fits my plans?",
  "investor-deal-analyzer": "What could this property earn?",
};

export default function ToolsPage() {
  return <main>
    <CinematicHero size="sm" theme="tools" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }]}
      eyebrow="Broadview Strategy Tools" title="A little clarity before your next move."
      subtitle="Four practical tools. Sample scenarios included. No login required."
      ctas={[{ label: "Choose a tool", href: "#homebuyers" }]} />
    <div className="section-container space-y-16 py-14 md:py-20">
      {groups.map((group) => <section id={group.id} key={group.id} className="scroll-mt-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">{group.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{group.title}</h2>
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">{group.description}</p>
        <div className={`mt-6 grid gap-5 ${group.slugs.length > 1 ? "md:grid-cols-3" : "max-w-2xl"}`}>
          {group.slugs.map((slug) => {
            const tool = getCalculator(slug);
            if (!tool || tool.status !== "live") return null;
            return <TrackedLink key={slug} href={`/tools/${slug}`} group="tools_hub" label={tool.title} className="card-elevated group flex flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">{tool.title}</p>
              <h3 className="mt-3 flex-1 text-xl font-semibold group-hover:text-brand">{toolQuestions[slug] ?? tool.tagline}</h3>
              <span className="mt-6 text-sm font-semibold text-brand">Open tool →</span>
            </TrackedLink>;
          })}
        </div>
        <Link href={group.href} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">{group.education} →</Link>
      </section>)}
      <section className="rounded-2xl border border-border bg-surface-muted p-7">
        <h2 className="text-xl font-semibold">Want help with the results?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Results are estimates based on the information you enter, not an offer, approval, appraisal, or guarantee of returns. No tool predicts future rates or automatically submits a loan application.</p>
        <Link href="/contact" className="btn-primary mt-5">Review my assumptions with an advisor</Link>
      </section>
    </div>
  </main>;
}

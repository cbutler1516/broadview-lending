import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_TOOLS } from "@/lib/homepage/content";

export function ToolsSection() {
  const config = HOMEPAGE_TOOLS;
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">A little clarity</p>
          <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-navy-950 sm:text-4xl">Explore the numbers.<br />Find your starting point.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600">Try a sample or use your own numbers. No login, no pressure.</p>
          <Link href={config.viewAllHref} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-brand">{config.viewAllLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {config.tools.filter(tool => tool.href !== "/funnel/heloc").map(tool => (
              <li key={tool.href}>
                <Link href={tool.href} className="group flex items-center justify-between gap-6 rounded-sm py-6 focus-visible:outline-2 focus-visible:outline-brand">
                  <div><h3 className="text-lg font-semibold tracking-tight text-navy-950 group-hover:text-brand">{tool.title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{tool.description}</p></div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">{config.editorialNote}</p>
        </div>
      </div>
    </section>
  );
}

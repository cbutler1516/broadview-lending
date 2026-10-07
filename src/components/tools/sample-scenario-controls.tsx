"use client";

import { SAMPLE_NOTICE } from "@/lib/tools/sample-scenarios";

export function SampleScenarioControls({ active, onLoad, onClear, onRestore, description }: {
  active: boolean;
  onLoad: () => void;
  onClear: () => void;
  onRestore?: () => void;
  description: string;
}) {
  return <section aria-label="Sample scenario" className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-2xl">
        <h2 className="text-base font-semibold text-navy-900">{active ? "You’re exploring a sample" : "Want to see how it works?"}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 print:hidden">
        <button type="button" onClick={onLoad} className="btn-secondary min-h-11">{active ? "Reload sample" : "Load sample"}</button>
        {active && <button type="button" onClick={onClear} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-navy-900">Clear sample</button>}
        {active && onRestore && <button type="button" onClick={onRestore} className="min-h-11 rounded-xl px-3 text-sm font-semibold text-brand underline underline-offset-4">Restore previous inputs</button>}
      </div>
    </div>
    <p role="status" className="mt-3 text-xs leading-relaxed text-slate-600">{active ? SAMPLE_NOTICE : "Loads fictional inputs and results. Your previous inputs can be restored while you stay on this page."}</p>
  </section>;
}

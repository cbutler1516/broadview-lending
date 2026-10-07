"use client";

import { useState } from "react";

export function LessonPractice({ title, items, conversationStarter }: {
  title: string; items: string[]; conversationStarter: string;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(conversationStarter);
      setStatus("Copied. Personalize it before sharing.");
    } catch {
      setStatus("Select and copy the wording below.");
    }
  }
  return (
    <section className="mt-10 rounded-2xl border border-brand/20 bg-brand-light/40 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-xs text-muted">A working checklist for this visit. No account or saved client data.</p>
      <div className="mt-4 space-y-2">
        {items.map((item) => <label key={item} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl bg-white p-3 text-sm leading-relaxed">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-blue-600" checked={checked.includes(item)}
            onChange={(e) => setChecked((current) => e.target.checked ? [...current, item] : current.filter((entry) => entry !== item))} />
          <span>{item}</span>
        </label>)}
      </div>
      <h3 className="mt-6 font-semibold">A conversation starter</h3>
      <p className="mt-3 select-text rounded-xl border border-border bg-white p-4 text-sm leading-relaxed">{conversationStarter}</p>
      <button type="button" onClick={copy} className="btn-secondary mt-4 min-h-11 print:hidden">Copy conversation starter</button>
      <p role="status" className="mt-2 text-xs text-muted">{status}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">Adapt this wording to the situation. Agent outreach should follow permission, brokerage, fair-housing, advertising, and applicable communication requirements.</p>
    </section>
  );
}

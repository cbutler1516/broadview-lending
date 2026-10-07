"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { X, ArrowUp, MessageCircle } from "lucide-react";
import { APPLICATION_CTA } from "@/lib/nav/constants";
import type { GuideResource } from "@/lib/assistant/resources";

type Message = { role: "user" | "assistant"; content: string; resources?: GuideResource[]; mode?: string };
const starters = ["I’m a Realtor. How can I help more clients?", "Does buying when rates feel high make sense?", "Help me compare a seller credit and a price reduction", "How do I evaluate a rental property?"];

export default function GuidePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [aiAvailable, setAiAvailable] = useState(false);
  const [allowAI, setAllowAI] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const sending = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/guide", { signal: controller.signal, cache: "no-store" }).then((r) => r.json()).then((data) => setAiAvailable(data.mode === "ai")).catch(() => {});
    return () => { controller.abort(); request.current?.abort(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => {
    if (open && conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight;
  }, [messages, pending, open]);

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
    if (event.key !== "Tab") return;
    const focusable = panel.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), textarea, input:not(:disabled)');
    if (!focusable?.length) return;
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  async function send(text: string) {
    const message = text.trim();
    if (!message || sending.current || message.length > 800) return;
    sending.current = true; setPending(true); setError(""); setInput("");
    const history = messages.slice(-4).map(({ role, content }) => ({ role, content: content.slice(0, 1500) }));
    setMessages((current) => [...current, { role: "user" as const, content: message }].slice(-19));
    const controller = new AbortController(); request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/guide", { method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal, body: JSON.stringify({ message, history, allowAI: aiAvailable && allowAI }) });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== "string") throw new Error(typeof data.error === "string" ? data.error : "Please try again, or contact an advisor.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer, resources: Array.isArray(data.resources) ? data.resources.filter((r: GuideResource) => typeof r.href === "string" && r.href.startsWith("/") && !r.href.startsWith("//")) : [], mode: data.mode }]);
      if (data.notice) setError(data.notice);
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "AbortError" ? failure.message : "The guide took too long. Please try again or contact an advisor.");
      setInput(message);
    } finally { window.clearTimeout(timeout); sending.current = false; setPending(false); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void send(input); }
  if (!open) return null;
  return <div className="fixed inset-0 z-[90] print:hidden">
    <button type="button" onClick={onClose} aria-label="Dismiss Broadview Guide" tabIndex={-1} className="absolute inset-0 bg-navy-950/25" />
    <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="guide-title" aria-describedby="guide-disclosure" onKeyDown={keyboard}
      className="absolute inset-x-3 bottom-3 flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[410px]">
      <header className="flex items-center gap-3 border-b border-slate-200 px-5 py-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-white"><MessageCircle className="h-5 w-5" aria-hidden /></span><div className="flex-1"><h2 id="guide-title" className="font-semibold text-navy-950">Broadview Guide</h2><p className="text-xs text-slate-500">{aiAvailable && allowAI ? "AI education assistant" : "Resource guide · not live AI"}</p></div><button ref={closeButton} type="button" onClick={onClose} aria-label="Close Broadview Guide" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500"><X className="h-5 w-5" /></button></header>
      <div ref={conversation} className="min-h-0 flex-1 overflow-y-auto px-5 py-5" style={{ maxHeight: "min(46dvh, 390px)" }}>
        <p className="text-sm leading-relaxed text-slate-700">A useful next step for your home, your investment, or your client. What would you like to think through?</p>
        <p id="guide-disclosure" className="mt-2 text-xs leading-relaxed text-slate-500">Educational help, not a human loan officer or a loan decision. Don’t share personal identifiers, account numbers, documents, or private client information.</p>
        {messages.length === 0 && <div className="mt-4 grid gap-2">{starters.map((starter) => <button disabled={pending} key={starter} type="button" onClick={() => void send(starter)} className="min-h-11 rounded-xl border border-slate-200 px-3 py-3 text-left text-sm text-navy-900 hover:bg-slate-50">{starter}</button>)}</div>}
        <div role="log" aria-label="Guide conversation" aria-live="polite" aria-relevant="additions" className="mt-4 space-y-4">{messages.map((message, index) => <div key={index} className={message.role === "user" ? "ml-5 rounded-2xl bg-blue-50 p-4" : "rounded-2xl border border-slate-200 p-4"}><p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{message.role === "user" ? "You" : message.mode === "ai" ? "AI response" : "From Broadview’s resource library"}</p><p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{message.content}</p>{message.resources?.map((resource) => <Link onClick={onClose} key={resource.href} href={resource.href} className="mt-3 block rounded-xl border border-slate-200 p-3 text-sm font-semibold text-brand hover:bg-slate-50">{resource.title} →</Link>)}</div>)}</div>
        {pending && <p role="status" className="mt-4 text-sm text-slate-500">{allowAI && aiAvailable ? "Preparing an educational answer…" : "Finding useful resources…"}</p>}
        {error && <p role="alert" className="mt-3 text-sm text-amber-800">{error}</p>}
      </div>
      <div className="border-t border-slate-200 px-5 py-4">
        {aiAvailable && <label className="mb-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600"><input type="checkbox" checked={allowAI} onChange={(e) => setAllowAI(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" /><span>Use AI answers. My questions and recent chat will be sent to OpenAI. Provider retention may apply. <a className="underline" href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noopener noreferrer">Data details (new tab)</a>. Leave unchecked for resource-only help.</span></label>}
        <form onSubmit={submit} className="flex gap-2"><label className="sr-only" htmlFor="guide-question">Ask a general question</label><textarea id="guide-question" value={input} onChange={(e) => setInput(e.target.value)} maxLength={800} rows={2} enterKeyHint="send" placeholder="Ask a general question…" className="input-field min-w-0 flex-1 resize-none text-sm" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(input); } }} /><button type="submit" disabled={pending || !input.trim()} aria-label="Send question" className="flex min-h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white disabled:opacity-40"><ArrowUp className="h-5 w-5" /></button></form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs"><Link href="/contact" onClick={onClose} className="inline-flex min-h-9 items-center font-semibold text-brand">Talk to an advisor</Link><a href={APPLICATION_CTA.href} className="inline-flex min-h-9 items-center font-semibold text-brand">Apply Online</a><button type="button" disabled={pending} onClick={() => { setMessages([]); setInput(""); setError(""); }} className="min-h-9 underline text-slate-500 disabled:opacity-40">Clear chat</button></div>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-500">No rates, eligibility decisions, or guaranteed outcomes. Chat is not a lead request. <Link href="/privacy" onClick={onClose} className="underline">Privacy</Link></p>
      </div>
    </div>
  </div>;
}

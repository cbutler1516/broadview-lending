import type { Metadata } from "next";
import { DealEngineDemo } from "@/components/deal-engine/deal-engine-demo";

export const metadata: Metadata = {
  title: "Deal Engine Demo",
  robots: { index: false, follow: false },
};

export default function DealEngineDemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Property / Deal Engine</h1>
      <p className="text-sm text-slate-600 mb-8">
        Internal verification only. Enter numbers to run the shared engine. Estimates are
        educational — not a quote, approval, or commitment to lend.
      </p>
      <DealEngineDemo />
    </main>
  );
}

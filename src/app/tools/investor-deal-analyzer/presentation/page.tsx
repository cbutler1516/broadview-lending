import type { Metadata } from "next";
import { ClientAnalysisHost } from "@/components/tools/client-analysis-host";

export const metadata: Metadata = {
  title: "Client Analysis",
  description:
    "Client-ready investment presentation based on the assumptions entered in the Investor Deal Analyzer. Educational estimates only — not an approval or commitment to lend.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams?: Promise<{ id?: string }>;
};

export default async function ClientAnalysisPresentationPage({ searchParams }: PageProps) {
  const query = searchParams ? await searchParams : {};
  const scenarioId = typeof query.id === "string" && query.id.trim() ? query.id.trim() : undefined;

  return (
    <main className="flex-1 bg-slate-50 print:bg-white">
      <section className="px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-14 print:px-0 print:py-0">
        <ClientAnalysisHost scenarioId={scenarioId} />
      </section>
    </main>
  );
}

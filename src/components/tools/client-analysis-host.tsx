"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClientAnalysisPresentation } from "@/components/tools/client-analysis-presentation";
import { DEAL_ANALYZER_PATH } from "@/lib/tools/investor-deal-analyzer";
import {
  buildClientAnalysisView,
  clearClientAnalysisDraft,
} from "@/lib/tools/client-analysis";
import { useClientAnalysisDraft } from "@/lib/tools/use-client-analysis-draft";

export function ClientAnalysisHost({ scenarioId }: { scenarioId?: string }) {
  const router = useRouter();
  const draft = useClientAnalysisDraft();

  const view = useMemo(
    () =>
      draft
        ? buildClientAnalysisView({
            ...draft,
            scenarioId: scenarioId || draft.scenarioId,
          })
        : null,
    [draft, scenarioId],
  );

  function startAnother() {
    clearClientAnalysisDraft();
    router.push(`${DEAL_ANALYZER_PATH}#analyzer`);
  }

  if (draft === undefined) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-slate-500">Preparing client analysis…</p>
      </div>
    );
  }

  if (!view) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
          Client analysis
        </p>
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-navy-900 mb-3">
          No scenario to present
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Create a client analysis from the Investor Deal Analyzer. A future saved
          scenario can open here by ID without changing this page.
        </p>
        <Link
          href={`${DEAL_ANALYZER_PATH}#analyzer`}
          className="inline-flex items-center justify-center min-h-11 px-5 rounded-xl bg-navy-900 text-white text-sm font-semibold"
        >
          Back to Analysis
        </Link>
      </div>
    );
  }

  return <ClientAnalysisPresentation view={view} onStartAnother={startAnother} />;
}

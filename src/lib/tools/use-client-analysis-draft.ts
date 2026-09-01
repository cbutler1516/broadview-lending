"use client";

import { useSyncExternalStore } from "react";
import {
  loadClientAnalysisDraft,
  type ClientAnalysisDraft,
} from "@/lib/tools/client-analysis";

/** undefined = hydrating; null = no saved draft; object = restored draft. */
export type ClientAnalysisDraftState = ClientAnalysisDraft | null | undefined;

export function useClientAnalysisDraft(): ClientAnalysisDraftState {
  return useSyncExternalStore(
    () => () => {},
    () => loadClientAnalysisDraft(),
    () => undefined,
  );
}

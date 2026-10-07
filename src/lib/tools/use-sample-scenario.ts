"use client";

import { useState } from "react";

/** Keep the pre-demo inputs in memory so loading an example is reversible. */
export function useSampleScenario<T>(initialSample = false) {
  const [state, setState] = useState<{ isSample: boolean; previous: T | null }>({ isSample: initialSample, previous: null });
  return {
    isSample: state.isSample,
    canRestore: state.previous !== null,
    load(current: T) {
      setState((previous) => ({ isSample: true, previous: previous.isSample ? previous.previous : current }));
    },
    restore(apply: (previous: T) => void) {
      if (state.previous === null) return;
      apply(state.previous);
      setState({ isSample: false, previous: null });
    },
    clear() { setState({ isSample: false, previous: null }); },
  };
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  emptyWorkspace,
  readWorkspace,
  type StrategyWorkspace,
} from "@/lib/strategy/workspace";

type StrategyContextValue = {
  workspace: StrategyWorkspace;
  refresh: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const StrategyContext = createContext<StrategyContextValue | null>(null);

export function StrategyProvider({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<StrategyWorkspace>(emptyWorkspace);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(() => {
    setWorkspace(readWorkspace());
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => refresh());
    function onStrategy(e: Event) {
      setWorkspace((e as CustomEvent<StrategyWorkspace>).detail);
    }
    function onStorage(e: StorageEvent) {
      if (e.key === "broadview_strategy") refresh();
    }
    window.addEventListener("broadview:strategy", onStrategy);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("broadview:strategy", onStrategy);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({
      workspace,
      refresh,
      open,
      setOpen,
      toggle: () => setOpen((v) => !v),
    }),
    [workspace, refresh, open],
  );

  return (
    <StrategyContext.Provider value={value}>{children}</StrategyContext.Provider>
  );
}

export function useStrategy() {
  const ctx = useContext(StrategyContext);
  if (!ctx) {
    throw new Error("useStrategy must be used within StrategyProvider");
  }
  return ctx;
}

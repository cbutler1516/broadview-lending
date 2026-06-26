"use client";

import { usePathname } from "next/navigation";
import { StrategyProvider } from "@/components/strategy/strategy-provider";
import { StrategyTracker } from "@/components/strategy/strategy-tracker";
import { StrategyWorkspace } from "@/components/strategy/strategy-workspace";

type StrategyShellProps = {
  children: React.ReactNode;
};

/**
 * Global living strategy layer — memory, progress, workspace UI.
 */
export function StrategyShell({ children }: StrategyShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <StrategyProvider>
      {!isAdmin && <StrategyTracker />}
      {children}
      {!isAdmin && <StrategyWorkspace />}
    </StrategyProvider>
  );
}

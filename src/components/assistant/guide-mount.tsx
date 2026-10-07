"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

// Adapted from Pillar's EmmaMount/EmmaLauncher: a small launcher and a deferred panel.
const GuidePanel = dynamic(() => import("./guide-panel"), { ssr: false });
export function GuideMount() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOnce, setOpenedOnce] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const hidden = pathname?.startsWith("/admin") || pathname?.startsWith("/funnel/") || pathname?.includes("/presentation") || pathname?.startsWith("/internal/");
  if (hidden) return null;
  function close() { setOpen(false); launcher.current?.focus(); }
  return <>
    <button ref={launcher} type="button" aria-label="Open Broadview Guide" aria-haspopup="dialog" aria-expanded={open}
      onClick={() => { setOpenedOnce(true); setOpen(true); }}
      style={{ bottom: "calc(var(--broadview-sticky-cta-height, 0px) + 1rem + env(safe-area-inset-bottom, 0px))" }}
      className="fixed right-4 z-[45] flex h-12 items-center gap-2 rounded-full bg-navy-950 px-4 text-sm font-semibold text-white shadow-lg ring-1 ring-white/25 hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 print:hidden sm:right-6">
      <MessageCircle className="h-5 w-5" aria-hidden /><span className="hidden sm:inline">Ask Broadview</span>
    </button>
    {openedOnce && <GuidePanel open={open} onClose={close} />}
  </>;
}

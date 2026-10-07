"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StickyBottomCTA } from "@/components/layout/sticky-bottom-cta";
import { GuideMount } from "@/components/assistant/guide-mount";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only print:hidden focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="pt-16 lg:pt-[72px] flex-1 print:pt-0">
        {children}
      </div>
      <Footer />
      <StickyBottomCTA />
      <GuideMount />
    </>
  );
}

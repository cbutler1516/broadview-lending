import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { ContactPageClient } from "@/components/contact-page-client";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <div className="section-container">
          <ContactPageClient />
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

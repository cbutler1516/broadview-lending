import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { brand } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("terms");

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <div className="section-container prose prose-slate max-w-3xl">
          <h1>Terms of Use</h1>
          <p className="lead text-muted">
            By accessing {brand.companyName}, you agree to these Terms of Use.
          </p>

          <h2>Educational Purpose</h2>
          <p>
            Information provided through this website, including funnel results, scores,
            and program recommendations, is for educational and pre-qualification purposes
            only. It does not constitute a loan offer, rate lock, or commitment to lend.
          </p>

          <h2>Eligibility</h2>
          <p>
            All loans are subject to credit approval, underwriting guidelines, property
            eligibility, and investor requirements. Program availability varies by state.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            You agree to provide accurate information. Broadview Lending is not
            responsible for outcomes based on incomplete or inaccurate submissions.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content, branding, and technology on this site are owned by or licensed
            to {brand.legalEntity}. Unauthorized use is prohibited.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Broadview Lending shall not be
            liable for any indirect, incidental, or consequential damages arising from
            use of this website.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by applicable federal and state laws. Disputes
            shall be resolved in the jurisdiction where Broadview Lending is licensed
            to operate.
          </p>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

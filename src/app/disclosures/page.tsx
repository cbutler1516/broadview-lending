import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { brand, licensedStates, loanOfficers } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("disclosures");

export default function DisclosuresPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <div className="section-container prose prose-slate max-w-3xl">
          <h1>Disclosures</h1>

          <h2>Company Information</h2>
          <p>
            {brand.legalEntity}
            <br />
            {brand.nmlsDisplay}
          </p>

          <h2>Equal Housing Opportunity</h2>
          <p>{brand.trust.equalHousing}</p>

          <h2>Licensing</h2>
          <p>{brand.licensing.summary}</p>
          <p>
            Licensed states:{" "}
            {licensedStates.map((s) => `${s.name} (${s.abbreviation})`).join(", ")}
          </p>

          <h2>Loan Officers</h2>
          <ul>
            {loanOfficers.map((lo) => (
              <li key={lo.nmlsId}>
                {lo.name} — {lo.title} — {lo.nmlsId}
              </li>
            ))}
          </ul>

          <h2>Important Notice</h2>
          <p>{brand.disclaimers.consumerNotice}</p>
          <p>
            APR, payment estimates, and savings projections are illustrative only.
            Actual terms depend on credit profile, property type, occupancy, loan amount,
            and market conditions at the time of application.
          </p>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

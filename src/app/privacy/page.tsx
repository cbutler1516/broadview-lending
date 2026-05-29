import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { brand } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <div className="section-container prose prose-slate max-w-3xl">
          <h1>Privacy Policy</h1>
          <p className="lead text-muted">
            {brand.legalEntity} (&quot;Broadview Lending,&quot; &quot;we,&quot;
            &quot;us&quot;) respects your privacy. This policy describes how we collect,
            use, and protect information submitted through this website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you use our mortgage strategy funnels, we may collect your name,
            email address, phone number, and responses to qualification questions.
            We also collect technical data such as browser type, device information,
            and referral source.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To generate personalized mortgage strategy recommendations</li>
            <li>To contact you about mortgage products and services you requested</li>
            <li>To sync leads with our CRM and marketing automation systems</li>
            <li>To improve our website, funnels, and user experience</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>

          <h2>Communications &amp; TCPA Consent</h2>
          <p>
            By providing your mobile phone number and checking the consent box, you
            agree to receive calls, emails, and text messages from Broadview Lending
            regarding mortgage products and services. Message and data rates may apply.
            Consent is not a condition of obtaining credit. You may opt out at any time.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We may share information with service providers, CRM platforms, lending
            partners, and Realtors when you request a referral. We do not sell your
            personal information.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical safeguards
            to protect your information. No method of transmission over the Internet
            is 100% secure.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact Broadview Lending through our
            website at broadviewlending.com.
          </p>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}

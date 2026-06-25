import Image from "next/image";
import Link from "next/link";
import {
  brand,
  companyLicensing,
  complianceLinks,
  licensedStates,
  loanOfficers,
} from "@/lib/brand/config";
import { ContactLink } from "@/components/contact-link";
import { BrandLogo } from "@/components/brand-logo";

export function ComplianceFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="section-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo
              variant="full"
              className="h-auto max-h-28 w-auto max-w-56 object-contain"
            />
            <p className="mt-4 text-sm text-muted">{companyLicensing.legalEntity}</p>
            <p className="mt-1 text-sm text-muted">{companyLicensing.companyNmlsId}</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
              <Image
                src="/brand/equal-housing.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden
                className="opacity-70"
              />
              {companyLicensing.equalHousingText}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Licensing</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {companyLicensing.licensingSummary}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Licensed states:{" "}
              {licensedStates.map((s) => s.abbreviation).join(", ")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Contact</p>
            <ul className="mt-2 space-y-2 text-sm text-muted">
              <li>
                <ContactLink
                  href={brand.contact.phoneHref}
                  type="phone"
                  location="footer"
                  className="hover:text-foreground"
                >
                  {brand.contact.phone}
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={brand.contact.emailHref}
                  type="email"
                  location="footer"
                  className="hover:text-foreground"
                >
                  {brand.contact.email}
                </ContactLink>
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold">Loan Officers</p>
            <ul className="mt-2 space-y-2">
              {loanOfficers.map((lo) => (
                <li key={lo.nmlsId} className="text-sm text-muted">
                  {lo.name} · {lo.title} · {lo.nmlsId}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Legal & Social</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href={complianceLinks.privacy} className="text-muted hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={complianceLinks.terms} className="text-muted hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href={complianceLinks.disclosures} className="text-muted hover:text-foreground">
                  Disclosures
                </Link>
              </li>
            </ul>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.values(brand.social).map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted">
            {companyLicensing.consumerNotice} {brand.disclaimers.educationalNotice}
          </p>
          <p className="mt-3 text-xs text-muted">
            © {new Date().getFullYear()} {companyLicensing.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

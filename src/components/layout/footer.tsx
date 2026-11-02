import { HOMEBRIDGE_HELOC } from "@/lib/heloc/homebridge";
import Image from "next/image";
import { LoanPlaybookLinks } from "@/components/loan-playbook-links";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import {
  brand,
  companyLicensing,
  complianceLinks,
  licensedStates,
} from "@/lib/brand/config";
import {
  CONTACT,
  APPLICATION_CTA,
  NAV_BUY,
  NAV_HOME_EQUITY,
  NAV_INVEST,
  SITE_NAME,
} from "@/lib/nav/constants";

const footerSections = [
  {
    title: "Buy & Refinance",
    links: [
      ...NAV_BUY.children.slice(0, 4),
      { label: "Refinance", href: "/refinance" },
      { label: "Cash-Out", href: "/refinance/cash-out-refinance" },
    ],
  },
  {
    title: "Home Equity",
    links: [...NAV_HOME_EQUITY.children, { label: "Investment Property", href: "/heloc/investment-property" }],
  },
  {
    title: "Invest",
    links: NAV_INVEST.children,
  },
  {
    title: "Next Step",
    links: [
      { label: "Apply Online", href: APPLICATION_CTA.href },
      { label: "Explore Your Options", href: "/#journeys" },
      { label: "Tools", href: "/tools" },
      { label: "Education", href: "/learn" },
      { label: "Realtor Academy", href: "/learn/realtor-academy" },
      { label: "Homebuyer Learning Center", href: "/learn/homebuyer-center" },
      { label: "Blog", href: "/blog" },
      { label: "Completed financing", href: "/completed-financing" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer({ helocApplication = false }: { helocApplication?: boolean }) {
  return (
    <footer className="bg-navy-950 text-slate-300 pb-20 lg:pb-6 print:hidden">
      <Container>
        <div className="py-16 sm:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link href="/" aria-label={`${SITE_NAME} home`} className="mb-5 inline-flex min-h-[44px] items-center rounded-lg bg-white p-3">
              <BrandLogo
                variant="full"
                href={false}
                className="w-48"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              Premium conventional mortgage advisory and sophisticated investor
              financing — prepared by technology, decided with a real advisor.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-xs">
              {companyLicensing.legalEntity} · {companyLicensing.companyNmlsId}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={CONTACT.phoneHref}
                className="flex min-h-[44px] items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-500" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex min-h-[44px] items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-500" />
                {CONTACT.email}
              </a>
            </div>
            <LoanPlaybookLinks dark />
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em] mb-4">
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={`${link.href}-${helocApplication && link.href === APPLICATION_CTA.href ? HOMEBRIDGE_HELOC.label : link.label}`}>
                    <Link
                      href={helocApplication && link.href === APPLICATION_CTA.href ? HOMEBRIDGE_HELOC.href : link.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white focus-visible:underline rounded-sm"
                    >
                      {helocApplication && link.href === APPLICATION_CTA.href ? HOMEBRIDGE_HELOC.label : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-navy-800 flex flex-col gap-4">
          <p className="text-slate-300 text-xs leading-relaxed break-words">
            Christopher Butler | NMLS #1585236 | Barrett Financial Group, L.L.C. | NMLS #181106 | 2701 East Insight Way, Suite 150, Chandler, AZ 85286 | AZ 0904774 | CA 60DBO-46052 &amp; 41DBO-148702 Licensed by Dept. of Financial Protection &amp; Innovation under the California Residential Mortgage Lending Act. Loans made or arranged pursuant to a California Financing Law License | CO | FL MLD1880 | IL | MI | OR | TX view complaint policy at{" "}
            <a href="https://barrettfinancial.com/texas-complaint" className="underline underline-offset-2 hover:text-white">barrettfinancial.com/texas-complaint</a>
            {" "}| WA MB-181106 | Equal Housing Opportunity | Equal Housing Lender | This is not a commitment to lend. All loans are subject to credit approval. |{" "}
            <a href="https://nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/181106" className="underline underline-offset-2 hover:text-white">nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/181106</a>
          </p>
          <p className="text-slate-500 text-xs leading-relaxed max-w-4xl">
            {companyLicensing.licensingSummary} Licensed states:{" "}
            {licensedStates.map((state) => state.abbreviation).join(", ")}.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed max-w-4xl">
            {companyLicensing.consumerNotice} {brand.disclaimers.educationalNotice}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
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
            <div className="flex flex-wrap gap-6 text-xs text-slate-500">
              <Link href={complianceLinks.privacy} className="inline-flex min-h-[44px] items-center hover:text-slate-300">
                Privacy
              </Link>
              <Link href={complianceLinks.terms} className="inline-flex min-h-[44px] items-center hover:text-slate-300">
                Terms
              </Link>
              <Link href={complianceLinks.disclosures} className="inline-flex min-h-[44px] items-center hover:text-slate-300">
                Disclosures
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

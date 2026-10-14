import { brand } from "@/lib/brand/config";

const socialLinks = [brand.social.instagram, brand.social.tiktok, brand.social.youtube, brand.social.facebook, brand.social.linkedin];

function SocialIcon({ platform }: { platform: (typeof socialLinks)[number]["label"] }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
      {platform === "Facebook" && <><circle cx="12" cy="12" r="12" fill="#1877F2" /><path fill="white" d="M13.5 24v-9h3l.5-3.5h-3.5V9.3c0-1 .3-1.8 1.8-1.8h1.9V4.4a23 23 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.5H6.5V15h3.2v9z" /></>}
      {platform === "TikTok" && <>
        <path fill="#25F4EE" transform="translate(-.7 .7)" d="M16 2h-3.4v13.5a2.8 2.8 0 1 1-2.4-2.8V9.2a6.2 6.2 0 1 0 5.8 6.2V8.6a8.4 8.4 0 0 0 5 1.6V6.8A5 5 0 0 1 16 2z" />
        <path fill="#FE2C55" transform="translate(.7 -.3)" d="M16 2h-3.4v13.5a2.8 2.8 0 1 1-2.4-2.8V9.2a6.2 6.2 0 1 0 5.8 6.2V8.6a8.4 8.4 0 0 0 5 1.6V6.8A5 5 0 0 1 16 2z" />
        <path fill="#111" d="M16 2h-3.4v13.5a2.8 2.8 0 1 1-2.4-2.8V9.2a6.2 6.2 0 1 0 5.8 6.2V8.6a8.4 8.4 0 0 0 5 1.6V6.8A5 5 0 0 1 16 2z" />
      </>}
      {platform === "YouTube" && <><rect x="0" y="4" width="24" height="16" rx="5" fill="#FF0000" /><path d="m10 8 6 4-6 4z" fill="white" /></>}
      {platform === "LinkedIn" && <><rect width="24" height="24" rx="2" fill="#0A66C2" /><circle cx="5.5" cy="5.5" r="1.8" fill="white" /><path fill="white" d="M4 9h3v11H4zm5 0h3v1.5c.6-1 1.6-1.8 3.3-1.8 3.2 0 4.2 2 4.2 5V20h-3v-5.6c0-1.6-.3-2.8-1.9-2.8-1.7 0-2.6 1.1-2.6 3.1V20H9z" /></>}
      {platform === "Instagram" && <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="#C135C8" strokeWidth="2.3" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="#E1306C" strokeWidth="2.3" />
        <circle cx="18" cy="6" r="1.3" fill="#833AB4" />
        <path d="M3 17a5 5 0 0 0 5 4h8a5 5 0 0 0 5-4" fill="none" stroke="#F77737" strokeWidth="2.3" strokeLinecap="round" />
      </>}
    </svg>
  );
}

export function LoanPlaybookLinks({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-6 border-t border-current/15 pt-5">
      <p className={`text-sm font-semibold ${dark ? "text-white" : "text-navy-950"}`}>
        Follow Chris · The Loan Playbook
      </p>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
        The Loan Playbook is Chris Butler’s social media persona—plain-English takes on home loans and real estate.
      </p>
      <ul aria-label="The Loan Playbook social accounts" className="mt-4 flex flex-wrap gap-3">
        {socialLinks.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" title={label}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "ring-white/15 focus-visible:outline-white" : "ring-slate-200 focus-visible:outline-brand"}`}>
              <SocialIcon platform={label} />
              <span className="sr-only">{label} — The Loan Playbook (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

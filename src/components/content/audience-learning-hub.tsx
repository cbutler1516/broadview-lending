import Link from "next/link";
import { getBookingUrl } from "@/lib/brand/booking";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { academyArticles } from "@/lib/content/academy";
import { LessonPractice } from "@/components/content/lesson-practice";
import { breadcrumbSchema, jsonLdString } from "@/lib/seo/schema";

export function AudienceLearningHub({ audience }: { audience: "realtor" | "homebuyer" }) {
  const realtor = audience === "realtor";
  const title = realtor ? "Realtor Academy" : "Homebuyer Learning Center";
  const path = realtor ? "/learn/realtor-academy" : "/learn/homebuyer-center";
  const breadcrumbs = [{ name: "Home", path: "/" }, { name: "Education", path: "/learn" }, { name: title, path }];
  const articles = academyArticles.filter((article) => article.audience === audience);
  const resources = realtor ? [
    { href: "/tools/investor-deal-analyzer", title: "Analyze a rental & present it to a client", body: "Use Realtor / Agent mode for an assumption-based client presentation." },
    { href: "/tools/offer-comparison", title: "Compare two offer structures", body: "Show how price, financing, and eligible credits affect cash and payment." },
    { href: "/tools/affordability-planner", title: "Start with the client’s comfortable payment", body: "Prepare a more focused search before a buyer chooses a price." },
  ] : [
    { href: "/tools/affordability-planner", title: "What payment feels comfortable?", body: "Work backward from your budget, rather than a maximum loan amount." },
    { href: "/tools/offer-comparison", title: "Which offer fits your plans?", body: "Compare payment and upfront cash without predicting future rates." },
    { href: "/tools/cash-out-vs-heloc", title: "How could you use your home equity?", body: "Compare borrowing structures and their trade-offs." },
  ];
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema(breadcrumbs)) }} />
    <CinematicHero size="sm" theme={realtor ? "commercial" : "buy"} breadcrumbs={breadcrumbs}
      eyebrow={title} title={realtor ? "Be the person with a useful next step." : "A confident next move starts with clear choices."}
      subtitle={realtor ? "Practical playbooks, working tools, and advisor support for helping clients move forward—without the market hype." : "Understand your payment, compare your options, and prepare for a conversation that puts your life and budget first."}
      ctas={[{ label: realtor ? "Explore the playbooks" : "Explore the guides", href: "#lessons" }, { label: "Open the tools", href: "#working-tools", variant: "secondary" }]} />
    <div className="section-container space-y-16 py-14 md:py-20">
      <section id="working-tools" className="scroll-mt-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Learn it. Use it.</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tools for the conversation in front of you.</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{resources.map((resource) => <Link key={resource.href} href={resource.href} className="card-elevated group p-6"><h3 className="text-lg font-semibold group-hover:text-brand">{resource.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{resource.body}</p><span className="mt-5 block text-sm font-semibold text-brand">Open tool →</span></Link>)}</div>
      </section>
      <section id="lessons" className="scroll-mt-28"><p className="text-xs font-semibold uppercase tracking-widest text-brand">{realtor ? "The field guide" : "Your learning path"}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">{realtor ? "Useful ideas. Something to do with each one." : "Big decisions, explained in plain language."}</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{articles.map((article, index) => <Link key={article.slug} href={`/learn/${article.slug}`} className="card-elevated group p-6"><p className="text-xs font-semibold text-brand">{String(index + 1).padStart(2, "0")} · {article.readingTime} read · Working checklist</p><h3 className="mt-3 text-xl font-semibold group-hover:text-brand">{article.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{article.summary}</p><span className="mt-5 block text-sm font-semibold text-brand">{realtor ? "Open playbook" : "Read the guide"} →</span></Link>)}</div></section>
      {realtor && <div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-widest text-brand">Your week, made useful</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Five small actions. Better-prepared conversations.</h2><p className="mt-4 text-muted leading-relaxed">Use this as a repeatable starting point. No promise of leads or closings—just specific ways to be helpful. Your checklist stays in this visit only.</p><Link href="/learn/a-week-of-useful-agent-outreach" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-brand">Read the weekly playbook →</Link></div><LessonPractice title="This week’s action plan" items={["Monday: Ask a past client what has changed.", "Tuesday: Compare one real offer or rental scenario.", "Wednesday: Review an open question with a lender.", "Thursday: Share one relevant guide with permission.", "Friday: Confirm next steps and honor any opt-outs."]} conversationStarter="What is the biggest question standing between you and your next move? I can help you find the right resource or arrange a financing conversation." /></div>}
      <section className="rounded-2xl bg-navy-950 p-7 text-white sm:p-10"><h2 className="text-2xl font-semibold">{realtor ? "Bring us the question you’re trying to solve." : "You don’t need all the answers to get started."}</h2><p className="mt-4 max-w-2xl text-white/75 leading-relaxed">{realtor ? "Ask Broadview to help review a financing scenario, compare assumptions, or prepare a client conversation. Any joint marketing or event support requires a separate compliance review." : "A Broadview advisor can help connect the numbers to your goals. Your guided strategy request is separate from a loan application."}</p><Link href={getBookingUrl()} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-navy-950">Talk with Broadview</Link></section>
      <p className="text-xs leading-relaxed text-muted">Educational resources only. No guaranteed financing, savings, returns, or transactions. {realtor ? "The Academy is not accredited continuing education." : "Buying is not always preferable to waiting or renting; individual circumstances matter."} <Link className="underline" href={realtor ? "/learn/homebuyer-center" : "/learn/realtor-academy"}>Explore the other learning path.</Link></p>
    </div>
  </main>;
}

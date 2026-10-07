import type { KnowledgeArticle } from "./knowledge";

const buyingSource = { label: "CFPB: Buying a house", href: "https://www.consumerfinance.gov/owning-a-home/" };
const creditSource = { label: "CFPB: Points and lender credits", href: "https://www.consumerfinance.gov/ask-cfpb/how-should-i-use-lender-credits-and-points-also-called-discount-points-en-136/" };
const concessionSource = { label: "NAR: Seller concessions", href: "https://www.nar.realtor/the-facts/consumer-guide-seller-concessions" };

type Lesson = {
  slug: string;
  audience: "realtor" | "homebuyer";
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  checklist: string[];
  starter: string;
  tool: string;
  sources: { label: string; href: string }[];
};

export const academyLessons: Lesson[] = [
  {
    slug: "reconnect-with-buyers", audience: "realtor", title: "Give a paused buyer a useful reason to reconnect.",
    summary: "Lead with a changed assumption—not a prediction about rates. A fresh budget or a specific property comparison gives a past client something useful to consider.",
    sections: [
      { heading: "Start with permission, not pressure", body: ["Review the clients who asked you to stay in touch. Sort by their stated goals and timing, not personal characteristics. Ask whether their budget, plans, or interest in moving has changed.", "A slower search is not a failed search. Some clients will be better served by waiting. Make that an acceptable answer."] },
      { heading: "Bring one concrete comparison", body: ["Choose a relevant listing and compare its all-in payment and estimated cash to close with the client’s own comfort level. Use a current lender quote rather than an advertised rate.", "Ask Broadview to review the financing assumptions before presenting them as available options. Do not promise a lower future rate or an automatic refinance."] },
      { heading: "Make follow-up specific", body: ["Offer a short conversation about what changed, then agree on a next step: a new search, a financing review, or a later check-in. Respect opt-outs and brokerage outreach policies."] },
    ],
    checklist: ["Choose five clients who welcome a check-in.", "Ask what has changed since their last search.", "Prepare one payment-and-cash comparison.", "Agree on a next step or a pause."],
    starter: "Would a fresh look at your budget and a couple of relevant homes be helpful? We can compare the numbers without assuming you need to move right now.",
    tool: "affordability-planner", sources: [buyingSource],
  },
  {
    slug: "help-investors-screen-a-rental", audience: "realtor", title: "Help an investor see the deal behind the listing.",
    summary: "Investors can be a useful audience to serve, but a quieter market does not automatically make a rental a good deal. Start with documented income, realistic expenses, and financing assumptions.",
    sections: [
      { heading: "Find the investor’s actual criteria", body: ["Ask about the property types, areas, budget, reserves, and management responsibilities they are comfortable with. Their experience and available cash matter more than the label ‘investor’.", "Do not steer clients toward or away from neighborhoods based on protected characteristics. Compare property-level economics and the client’s stated needs."] },
      { heading: "Separate known numbers from assumptions", body: ["Use existing leases or clearly identified market research for rent. Include taxes, insurance, vacancy, maintenance, management, and HOA costs. Verify leases, condition, rental restrictions, and local rules before relying on a projection.", "Run a lower-rent or higher-expense scenario. A positive estimate is not a guaranteed return, and DSCR financing still requires lender review."] },
      { heading: "Present the questions, too", body: ["Use Realtor / Agent mode in the Deal Analyzer to create a client presentation. Explain where each input came from, what remains unverified, and what your client should discuss with their lender and other advisers."] },
    ],
    checklist: ["Write down the client’s buy criteria.", "Document the source of rent and expense inputs.", "Run a downside case in the analyzer.", "List the assumptions that need verification."],
    starter: "This property may be worth a closer look. Let’s separate the verified numbers from the assumptions and see how the cash flow changes if expenses rise.",
    tool: "investor-deal-analyzer", sources: [buyingSource],
  },
  {
    slug: "refresh-a-stale-listing", audience: "realtor", title: "Give a stale listing a financing conversation.",
    summary: "Price is only one part of an offer. A seller credit may address a buyer’s upfront cash needs, while a price reduction changes the purchase economics. Compare both before choosing a strategy.",
    sections: [
      { heading: "Diagnose before changing the message", body: ["Review showing feedback, competing listings, condition, and local comparable sales with the seller. Financing cannot fix an unrealistic price or a property problem."] },
      { heading: "Compare two real offer structures", body: ["Ask the lender to model a lower purchase price and a seller-credit structure using the same buyer assumptions. A credit generally applies to allowable costs, not a buyer’s down payment or unrestricted cash back.", "Permitted concessions depend on the loan, occupancy, transaction, and applicable rules. Have the lender and appropriate real estate professionals verify the structure before writing or promoting terms."] },
      { heading: "Keep public messaging honest", body: ["Describe a credit as negotiable and subject to agreement and lender review. Do not advertise a teaser payment without the required context and disclosures. Have your brokerage review financing-related marketing."] },
    ],
    checklist: ["Review feedback and comparable listings.", "Compare price reduction versus eligible seller credit.", "Ask the lender to verify the structure.", "Get seller and brokerage approval for revised messaging."],
    starter: "Would it help to compare a price adjustment with a contribution toward eligible buyer costs? They solve different problems, and we can review the trade-offs before choosing.",
    tool: "offer-comparison", sources: [concessionSource, creditSource],
  },
  {
    slug: "prepare-a-more-useful-open-house", audience: "realtor", title: "Make your next open house more useful.",
    summary: "Give visitors a practical way to think about the home: its ongoing costs, their financing questions, and a clear next step. A hypothetical payment is not a personalized loan quote.",
    sections: [
      { heading: "Prepare a property-cost worksheet", body: ["Gather verified taxes, HOA information, known special assessments, and relevant property details. Label insurance and financing figures as estimates unless you have a suitable current quote.", "Offer the same helpful resources to every visitor. Avoid assumptions about someone’s finances, household, or eligibility based on appearance or personal characteristics."] },
      { heading: "Invite a conversation rather than demand a form", body: ["Ask what the visitor wants to understand about the home. Offer an affordability worksheet or advisor introduction, with their permission. Do not collect financial documents or sensitive identifiers at an open house."] },
      { heading: "Coordinate without referral promises", body: ["Ask Broadview about a property-specific financing review or educational conversation. Any co-marketing, cost sharing, or event support needs an appropriate compliance review; never exchange benefits for referrals."] },
    ],
    checklist: ["Verify property costs and flag unknowns.", "Prepare a short list of financing questions.", "Offer a permission-based follow-up.", "Have any joint event or marketing arrangement reviewed."],
    starter: "Would you like a worksheet for comparing the monthly costs of this home with another one? An advisor can help verify the financing assumptions.",
    tool: "affordability-planner", sources: [buyingSource, { label: "CFPB: RESPA referral and promotional activity rules", href: "https://www.consumerfinance.gov/rules-policy/regulations/1024/14/" }],
  },
  {
    slug: "prepare-an-offer-with-your-lender", audience: "realtor", title: "Bring the lender into the offer conversation earlier.",
    summary: "A useful offer conversation puts payment, cash to close, timing, and contingencies on the same page. A financing review can uncover questions before they become contract surprises.",
    sections: [
      { heading: "Build a short scenario brief", body: ["With the client’s permission, share the property, target price, down payment range, requested credits, and intended timing through approved channels. Keep Social Security numbers and financial documents out of ordinary email or chat."] },
      { heading: "Ask about the trade-offs", body: ["Compare all-in payment, upfront costs, and available reserves for each offer. Ask whether property condition, condo requirements, occupancy, or a sale contingency could affect the financing discussion.", "A worksheet is not underwriting approval. Do not waive financing or inspection protections just because an estimate looks comfortable; discuss the risks with the client and appropriate professionals."] },
      { heading: "Confirm who does what next", body: ["Agree on the documents, quote review, and contract questions that still need attention. Only represent timelines or financing terms that the responsible parties have actually confirmed."] },
    ],
    checklist: ["Obtain permission for the lender introduction.", "Summarize the property and offer assumptions.", "Compare payment, cash and reserves.", "Identify unresolved conditions before signing."],
    starter: "Before we choose the offer structure, let’s have your lender compare the payment and cash needed. We’ll also identify what still needs review.",
    tool: "offer-comparison", sources: [buyingSource, concessionSource],
  },
  {
    slug: "a-week-of-useful-agent-outreach", audience: "realtor", title: "A week of useful outreach, not more noise.",
    summary: "Build a repeatable week around five useful actions: listen, compare, review, educate, and follow up. Measure the conversations you help—not promises of guaranteed deals.",
    sections: [
      { heading: "Monday and Tuesday: listen, then compare", body: ["Reconnect with a small group of clients who welcome contact. Ask what has changed. For one interested client, prepare a payment or rental comparison using their current goals rather than a generic market pitch."] },
      { heading: "Wednesday and Thursday: prepare and educate", body: ["Bring one unresolved scenario to your lender: an offer with credits, a move-up purchase, or a rental with thin cash flow. Ask for the next question to resolve, not a promise to approve.", "Share one relevant educational resource with permission. Add a sentence about why it matters to that client. Follow brokerage, advertising, fair-housing, and outreach requirements."] },
      { heading: "Friday: close the loop", body: ["Record agreed next steps in your own approved system. Thank clients who replied, honor those who want to pause, and identify one lesson to carry into next week."] },
    ],
    checklist: ["Listen to five permission-based client updates.", "Prepare one comparison that answers a real question.", "Review one scenario with a lender.", "Share one useful guide.", "Confirm next steps and honor opt-outs."],
    starter: "I’m putting together a few practical resources this week. Is there a homebuying or investment question you’d like help thinking through?",
    tool: "offer-comparison", sources: [buyingSource],
  },
  {
    slug: "buying-when-rates-feel-high", audience: "homebuyer", title: "Higher rates, better deal? Look at both sides.",
    summary: "Higher mortgage rates do not make a home a bargain. In some local markets, fewer competing buyers may create negotiating room—but only a sustainable payment and a sound property make the opportunity useful.",
    sections: [
      { heading: "Look for evidence, not a slogan", body: ["Ask your agent about comparable sales, days on market, price changes, and seller flexibility for the homes you are considering. National headlines cannot tell you whether a particular seller will negotiate."] },
      { heading: "Price and payment are different questions", body: ["A lower price can still produce a higher payment when borrowing costs rise. Compare taxes, insurance, HOA dues, mortgage insurance, maintenance, and the cash left after closing—not just principal and interest.", "Use the offer comparison with actual assumptions from your search. It does not predict future prices or tell you whether to buy."] },
      { heading: "Make today’s loan work on its own", body: ["Treat a possible refinance as an option, not a rescue plan. Future rates, your income and credit, the property value, closing costs, and lender rules can all affect whether refinancing is available or worthwhile.", "Waiting or continuing to rent can be the stronger choice if the purchase would strain your monthly budget or emergency savings."] },
    ],
    checklist: ["Review local property evidence with your agent.", "Compare two offers with the same cost categories.", "Keep a reserve for repairs and life changes.", "Check that the payment works without a future refinance."],
    starter: "Can we compare the payment, cash to close, and reserves for these two homes using a rate I could actually consider today?",
    tool: "offer-comparison", sources: [buyingSource, creditSource],
  },
  {
    slug: "seller-credit-or-price-reduction", audience: "homebuyer", title: "A lower price or help with closing costs?", 
    summary: "A price reduction and a seller credit are not interchangeable. One changes the price you pay; the other may reduce eligible upfront costs. The better fit depends on your cash, payment, and loan structure.",
    sections: [
      { heading: "Know which problem you are solving", body: ["If the challenge is cash at closing, an eligible seller credit may help. If the price is too high for the property or your plans, a credit does not make that concern disappear."] },
      { heading: "Ask what the credit can cover", body: ["Have your lender confirm allowable costs and limits for your transaction before negotiating a credit. Do not assume it can cover your down payment or turn into cash back.", "Seller credits and lender credits are different. A rate-linked lender credit commonly trades a higher rate for lower upfront costs. Ask for complete, comparable quotes."] },
      { heading: "Compare the whole offer", body: ["Look at price, estimated monthly costs, cash required, and remaining savings together. Include any points and fees in the comparison. A credit only matters if the seller agrees and the financing structure permits it."] },
    ],
    checklist: ["Name the constraint: price, payment, or cash.", "Ask the lender to confirm eligible costs.", "Compare complete offers, including points and fees.", "Keep money aside after closing."],
    starter: "Would a price reduction or a credit toward eligible costs help more in my situation? Please show the cash and payment difference.",
    tool: "offer-comparison", sources: [concessionSource, creditSource],
  },
  {
    slug: "ready-to-buy-or-better-to-wait", audience: "homebuyer", title: "Ready to buy—or better to wait?", 
    summary: "Readiness is about the life and budget you have, not predicting the bottom of the market. A home should fit your plans, monthly expenses, and ability to handle surprises.",
    sections: [
      { heading: "Start with a comfortable monthly number", body: ["Include your other debts, everyday spending, savings goals, and the ongoing costs of ownership. The largest loan a lender might consider is not automatically the amount you should borrow."] },
      { heading: "Give your savings a job after closing", body: ["Plan for moving, repairs, and an emergency buffer. Buying with no room for a damaged appliance or an income interruption can turn a manageable payment into a difficult month."] },
      { heading: "Let your time horizon count", body: ["If you may move soon or your income is uncertain, renting longer can preserve flexibility. If buying fits your life, compare actual homes and actual costs rather than waiting for a headline to make the decision for you.", "An advisor can explain financing options; you decide which trade-offs fit your life. Ask a housing counselor or other independent adviser for additional perspective when helpful."] },
    ],
    checklist: ["Write down a comfortable total housing budget.", "Set aside post-closing savings.", "Discuss likely life changes and your time horizon.", "Compare buying with continuing to rent."],
    starter: "I’d like to understand a comfortable purchase budget—not just a maximum loan amount. Can we include the costs and savings I want to protect?",
    tool: "affordability-planner", sources: [buyingSource],
  },
  {
    slug: "refinancing-is-an-option-not-a-plan", audience: "homebuyer", title: "A future refinance is a possibility, not a promise.",
    summary: "Choose a mortgage you can manage today. A later refinance may help, but it depends on future pricing, your finances, the property, and the cost of replacing the loan.",
    sections: [
      { heading: "A lower rate is only part of the picture", body: ["A refinance can involve closing costs, a new loan term, and another eligibility review. A smaller monthly payment can also come from extending repayment, which may increase total interest."] },
      { heading: "Ask for the break-even conversation", body: ["Compare costs paid now with the estimated monthly savings and how long you expect to keep the loan. Ask which costs are true financing costs and which are prepaids or escrow funding.", "Compare more than one time horizon. Selling, refinancing again, or changing the loan term can change the result."] },
      { heading: "Keep the original purchase sustainable", body: ["Do not rely on a future refinance to make an unaffordable purchase comfortable. If the payment only works after an assumed rate drop, revisit the price, down payment, timing, or decision to buy."] },
    ],
    checklist: ["Check that today’s payment fits.", "Request a full cost comparison before refinancing.", "Compare remaining term and new term.", "Treat any future rate reduction as uncertain."],
    starter: "If we revisit refinancing later, can we compare the total costs and time horizon as well as the monthly savings?",
    tool: "affordability-planner", sources: [creditSource, buyingSource],
  },
];

export const academyArticles: KnowledgeArticle[] = academyLessons.map((lesson) => ({
  slug: lesson.slug, category: lesson.audience === "realtor" ? "realtor-academy" : "buying",
  audience: lesson.audience, title: lesson.title, summary: lesson.summary,
  intro: lesson.summary, readingTime: "3 min", updated: "2026-10-05",
  eyebrow: lesson.audience === "realtor" ? "Realtor Academy · Field Notes" : "Homebuyer Learning Center",
  sections: lesson.sections, keyTakeaways: lesson.checklist,
  practice: { title: "Put it into practice", items: lesson.checklist, conversationStarter: lesson.starter },
  sources: lesson.sources,
  faqs: [{ question: "Can Broadview help me apply this to a real situation?", answer: "Yes. Request an advisor conversation to discuss your goals and the assumptions you want to verify. Tools and educational materials are not loan offers or guarantees of financing or results." }],
  related: {
    articles: academyLessons.filter((other) => other.audience === lesson.audience && other.slug !== lesson.slug).slice(0, 3).map((other) => other.slug),
    calculators: [lesson.tool], funnels: [lesson.audience === "realtor" ? "investment" : "purchase"],
  },
  seo: { title: lesson.title, description: lesson.summary },
}));

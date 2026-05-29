/**
 * Production QA — run with: npx tsx scripts/qa-production.ts
 */
import { getFunnelDefinition, getActiveQuestions } from "../src/lib/funnels/config";
import { generateFunnelResult } from "../src/lib/scoring/engine";
import {
  createSessionToken,
  verifySessionToken,
  verifyAdminPassword,
} from "../src/lib/admin/session";
import { parseAttributionFromSearch } from "../src/lib/analytics/attribution";
import { submitLeadInputSchema } from "../src/lib/leads/schema";
import { brand } from "../src/lib/brand/config";
import { tcpaConsentText } from "../src/lib/compliance/tcpa";

process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "qa-test-password";

type QaResult = { name: string; pass: boolean; detail?: string };

const results: QaResult[] = [];

function check(name: string, pass: boolean, detail?: string) {
  results.push({ name, pass, detail });
  const icon = pass ? "PASS" : "FAIL";
  console.log(`[${icon}] ${name}${detail ? ` — ${detail}` : ""}`);
}

const funnelFixtures: Record<string, Record<string, string>> = {
  purchase: {
    purchasePrice: "$450,000",
    downPayment: "$45,000",
    creditScore: "700-739",
    firstTimeHomebuyer: "yes",
    veteran: "no",
    workingWithRealtor: "no",
    timeline: "1-3-months",
  },
  refinance: {
    currentBalance: "$320,000",
    homeValue: "$500,000",
    currentRate: "6.5%",
    refinanceGoal: "lower-payment",
    creditScore: "740+",
    propertyType: "primary",
  },
  heloc: {
    propertyValue: "$550,000",
    mortgageBalance: "$300,000",
    desiredEquityAccess: "$75,000",
    creditScore: "700-739",
    occupancy: "primary",
    propertyType: "single-family",
  },
  va: {
    militaryStatus: "veteran",
    firstUseVa: "yes",
    purchaseOrRefinance: "purchase",
    purchasePrice: "$400,000",
    creditScore: "660-699",
    timeline: "3-6-months",
  },
  fha: {
    purchasePrice: "$350,000",
    downPayment: "$12,000",
    creditScore: "660-699",
    timeline: "1-3-months",
  },
};

console.log("\n=== Funnel QA ===\n");

for (const [type, answers] of Object.entries(funnelFixtures)) {
  const def = getFunnelDefinition(type);
  if (!def) {
    check(`${type}: definition exists`, false);
    continue;
  }

  const active = getActiveQuestions(def, answers);
  const unanswered = def.questions.filter(
    (q) =>
      (!q.condition || q.condition(answers)) &&
      q.required !== false &&
      !answers[q.id],
  );

  check(
    `${type}: all required questions answerable`,
    unanswered.length === 0,
    unanswered.map((q) => q.id).join(", ") || `${active.length} steps`,
  );

  const result = generateFunnelResult(type as "purchase", answers);
  check(
    `${type}: generates result with grade`,
    Boolean(result.leadGrade && result.recommendedPrograms.length > 0),
    `grade=${result.leadGrade}`,
  );
}

console.log("\n=== Lead Capture / TCPA QA ===\n");

const submissionId = crypto.randomUUID();
const leadPayload = {
  submissionId,
  firstName: "QA",
  lastName: "Tester",
  email: "qa@example.com",
  phone: "5551234567",
  tcpaConsent: true as const,
  funnelType: "purchase" as const,
  answers: funnelFixtures.purchase,
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "qa-test",
};

const parsed = submitLeadInputSchema.safeParse(leadPayload);
check("Lead schema accepts valid payload", parsed.success);
check(
  "TCPA text matches brand config",
  tcpaConsentText === brand.tcpa.consentText,
);
check(
  "NMLS consistent in brand config",
  brand.nmlsDisplay === "NMLS #181106" &&
    brand.licensing.loanOfficers.every((lo) => lo.nmlsId === "NMLS #181106"),
);

console.log("\n=== Attribution QA ===\n");

const attribution = parseAttributionFromSearch(
  "?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=abc123&fbclid=xyz",
  "/funnel/purchase",
);
check(
  "UTM params parsed",
  attribution?.utmSource === "google" &&
    attribution?.utmMedium === "cpc" &&
    attribution?.gclid === "abc123" &&
    attribution?.fbclid === "xyz",
);

console.log("\n=== Admin Session QA ===\n");

const token = createSessionToken();
check("Session token created", Boolean(token));
check("Session token verifies", verifySessionToken(token ?? undefined));
check("Invalid password rejected", !verifyAdminPassword("wrong-password"));
check("Valid password accepted", verifyAdminPassword("qa-test-password"));

console.log("\n=== Compliance Copy QA ===\n");

check(
  "Results disclaimer includes not a loan approval",
  brand.disclaimers.short.toLowerCase().includes("not a loan approval"),
);
check(
  "Equal Housing in brand trust",
  brand.trust.equalHousing === "Equal Housing Opportunity",
);

console.log("\n=== Summary ===\n");
const passed = results.filter((r) => r.pass).length;
const failed = results.filter((r) => !r.pass);
console.log(`${passed}/${results.length} checks passed`);
if (failed.length > 0) {
  console.log("\nFailed:");
  failed.forEach((f) => console.log(`  - ${f.name}: ${f.detail ?? ""}`));
  process.exit(1);
}

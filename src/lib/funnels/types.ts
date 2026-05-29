export type FunnelType =
  | "purchase"
  | "refinance"
  | "heloc"
  | "va"
  | "fha"
  | "first-time-homebuyer"
  | "investment"
  | "commercial";

export type QuestionType =
  | "single-select"
  | "currency"
  | "percentage"
  | "text";

export type FunnelQuestion = {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
  required?: boolean;
  condition?: (answers: Record<string, string>) => boolean;
};

export type FunnelDefinition = {
  type: FunnelType;
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  questions: FunnelQuestion[];
};

export type FunnelAnswers = Record<string, string>;

export type LeadGrade = "A+" | "A" | "B" | "C" | "D";

export type RecommendedProgram =
  | "conventional"
  | "fha"
  | "va"
  | "jumbo"
  | "heloc"
  | "cash-out-refi"
  | "rate-term-refi"
  | "down-payment-assistance";

export type FunnelResult = {
  funnelType: FunnelType;
  mortgageOpportunityScore: number;
  readinessScore: number;
  urgencyScore: number;
  leadQualityScore: number;
  agentReferralScore: number;
  leadGrade: LeadGrade;
  recommendedPrograms: RecommendedProgram[];
  recommendedNextStep: string;
  summary: string;
  highlights: string[];
  estimatedLoanAmount?: number;
  creditTier?: string;
  tags: string[];
};

export type RealtorReferralChoice = "yes" | "no" | "already-working";

export type LeadPayload = {
  leadId?: string;
  submissionId?: string;
  sessionId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tcpaConsent: boolean;
  tcpaConsentVersion: string;
  tcpaConsentText?: string;
  tcpaConsentAt?: string;
  ipAddress?: string;
  userAgent?: string;
  funnelType: FunnelType;
  answers: FunnelAnswers;
  result: FunnelResult;
  realtorReferral?: RealtorReferralChoice;
  leadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
};

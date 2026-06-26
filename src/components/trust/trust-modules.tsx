import type { Faq } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

/**
 * Reusable Human Trust Layer modules. Each renders sensible default copy and
 * accepts overrides, so they can appear throughout the platform.
 */

// ----------------------------------------------------------- Advisor Notes
type AdvisorNotesProps = {
  notes?: string[];
  eyebrow?: string;
  title?: string;
  className?: string;
};

const defaultAdvisorNotes = [
  "We'll start with your goal, not a loan product.",
  "We'll explain the trade-offs in plain language.",
  "We'll only recommend a path once it actually fits.",
];

export function AdvisorNotes({
  notes = defaultAdvisorNotes,
  eyebrow = "What we'd discuss together",
  title = "Notes from your advisor",
  className,
}: AdvisorNotesProps) {
  return (
    <section className={cn("section-container", className)}>
      <div className="card-elevated p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {notes.map((note) => (
            <li
              key={note}
              className="flex items-start gap-3 rounded-xl bg-surface-muted px-4 py-3 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand"
              >
                ✓
              </span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// --------------------------------------------------------- Questions We Hear
type QuestionsWeHearProps = {
  items?: Faq[];
  title?: string;
  className?: string;
};

const defaultQuestions: Faq[] = [
  {
    question: "Will this hurt my credit?",
    answer:
      "Starting a strategy assessment does not affect your credit. A formal application later involves a credit check, which we'll explain before it happens.",
  },
  {
    question: "Am I obligated to anything?",
    answer:
      "No. This is a conversation about your options, not a commitment. You decide if and when to move forward.",
  },
  {
    question: "Will I get handed to a call center?",
    answer:
      "No. A licensed Broadview advisor personally reviews your information and follows up with you.",
  },
];

export function QuestionsWeHear({
  items = defaultQuestions,
  title = "Questions we hear every day",
  className,
}: QuestionsWeHearProps) {
  return (
    <section className={cn("section-container", className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.question} className="card-elevated p-5">
            <p className="font-semibold">{item.question}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------------- Before You Decide
type BeforeYouDecideProps = {
  points?: string[];
  title?: string;
  className?: string;
};

const defaultBeforeYouDecide = [
  "Understand your true monthly cost, not just the rate.",
  "Know your break-even before paying any costs.",
  "Keep healthy reserves after closing.",
  "Compare at least two strategies side by side.",
];

export function BeforeYouDecide({
  points = defaultBeforeYouDecide,
  title = "Before you decide",
  className,
}: BeforeYouDecideProps) {
  return (
    <section className={cn("section-container", className)}>
      <div className="rounded-2xl border border-border bg-surface-muted p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-muted">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ------------------------------------------------------------- Strategy Tips
type StrategyTipsProps = {
  tips?: string[];
  title?: string;
  className?: string;
};

const defaultTips = [
  "The best down payment balances payment, cash, and reserves.",
  "A low first-mortgage rate is worth protecting.",
  "Refinancing is about break-even, not the rate alone.",
];

export function StrategyTips({
  tips = defaultTips,
  title = "Strategy tips",
  className,
}: StrategyTipsProps) {
  return (
    <section className={cn("section-container", className)}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {tips.map((tip, i) => (
          <div key={tip} className="card-elevated p-5">
            <span className="text-2xl font-light text-brand/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

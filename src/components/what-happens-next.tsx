import { cn } from "@/lib/utils/cn";

type WhatHappensNextProps = {
  className?: string;
  compact?: boolean;
};

const steps = [
  {
    step: "01",
    title: "Complete your personalized assessment.",
    body: "Tell us about your goals, timeline, and the details that help us understand the decision in front of you.",
  },
  {
    step: "02",
    title: "A mortgage advisor personally reviews your information.",
    body: "Our technology prepares the conversation. It never replaces it.",
  },
  {
    step: "03",
    title: "We reach out to answer questions and discuss your options.",
    body: "You will not be handed off to a call center or left alone to interpret generic results.",
  },
  {
    step: "04",
    title: "Together we shape the strategy that fits your goals.",
    body: "We will explain the trade-offs before recommending a loan path.",
  },
  {
    step: "05",
    title: "If you're ready, we guide you through to closing.",
    body: "Move forward with clarity, confidence, and a real person beside you.",
  },
];

const circleBase =
  "flex shrink-0 items-center justify-center rounded-full font-semibold text-white";
const circleGradient =
  "bg-[linear-gradient(180deg,#2f6bf0_0%,var(--brand-blue)_55%,var(--brand-blue-dark)_100%)] shadow-[0_8px_18px_rgba(26,86,219,0.28)]";

export function WhatHappensNext({ className, compact = false }: WhatHappensNextProps) {
  if (compact) {
    return (
      <section className={cn(className)}>
        <div className="px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            What Happens Next
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            A real advisor reviews your information and reaches out personally.
          </h3>
          <ol className="mt-5 space-y-3">
            {steps.map((item, i) => (
              <li key={item.step} className="flex items-start gap-3">
                <span className={cn(circleBase, circleGradient, "mt-0.5 h-7 w-7 text-xs")}>
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {item.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
            What Happens Next
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.1]">
            A real advisor reviews your information — then guides you from here.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Technology prepares the conversation. People make the difference. Here is
            exactly what to expect after you share your goals.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <ol className="relative grid grid-cols-5 gap-6">
            {steps.map((item) => (
              <li key={item.step} className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    circleBase,
                    circleGradient,
                    "h-16 w-16 text-lg ring-4 ring-background",
                  )}
                >
                  {item.step}
                </span>
                <h3 className="mt-6 text-[15px] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile vertical timeline */}
        <ol className="mt-12 space-y-7 lg:hidden">
          {steps.map((item, i) => (
            <li key={item.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={cn(circleBase, circleGradient, "h-12 w-12 text-base")}>
                  {item.step}
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-border" aria-hidden />
                )}
              </div>
              <div className="pb-1">
                <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

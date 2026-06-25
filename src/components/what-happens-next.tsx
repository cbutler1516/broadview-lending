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
    title: "We'll contact you to answer questions and discuss your options.",
    body: "You will not be handed off to a call center or left alone to interpret generic results.",
  },
  {
    step: "04",
    title: "Together we'll determine the financing strategy that best fits your goals.",
    body: "We will explain the trade-offs before recommending a loan path.",
  },
  {
    step: "05",
    title: "If you're ready, we'll guide you through the process to closing.",
    body: "Move forward with clarity, confidence, and a real person beside you.",
  },
];

export function WhatHappensNext({ className, compact = false }: WhatHappensNextProps) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-brand">What Happens Next</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            From discovery to guidance, you are not on your own.
          </h2>
          {!compact && (
            <p className="mt-4 text-muted">
              Broadview is built around a simple progression: discover, understand,
              recommend, connect, and guide.
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map((item) => (
            <div key={item.step} className="card-elevated p-5">
              <span className="text-3xl font-light text-brand/30">{item.step}</span>
              <h3 className="mt-3 text-sm font-semibold leading-snug">
                {item.title}
              </h3>
              {!compact && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

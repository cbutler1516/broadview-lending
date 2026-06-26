import { BookingLink } from "@/components/booking-link";
import { cn } from "@/lib/utils/cn";

type DiscussTopic = { title: string; body: string };

type WhatWeDiscussProps = {
  topics?: DiscussTopic[];
  heading?: string;
  intro?: string;
  sourceId?: string;
  className?: string;
};

const defaultTopics: DiscussTopic[] = [
  {
    title: "Monthly payment comfort",
    body: "Not the maximum you qualify for — the number that fits your life.",
  },
  {
    title: "Future plans",
    body: "How long you expect to stay and what's next for you.",
  },
  {
    title: "Cash reserves",
    body: "Keeping a healthy cushion after closing, not just at it.",
  },
  {
    title: "Equity strategy",
    body: "Whether to use, preserve, or grow your home equity.",
  },
  {
    title: "Timeline",
    body: "What needs to happen, and by when, to hit your goal.",
  },
  {
    title: "Income stability",
    body: "How your income is structured and documented.",
  },
];

/**
 * Replaces "Apply Now" with a human preview of what a strategy call covers.
 */
export function WhatWeDiscuss({
  topics = defaultTopics,
  heading = "Here's what we'd discuss together",
  intro = "A strategy call isn't a sales pitch. It's a conversation about your goals — here's what we'd actually talk through.",
  sourceId = "page",
  className,
}: WhatWeDiscussProps) {
  return (
    <section className={cn("section-container", className)}>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 text-muted">{intro}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.title} className="card-elevated p-5">
            <p className="font-semibold">{topic.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{topic.body}</p>
          </div>
        ))}
      </div>

      <BookingLink location={`what_we_discuss_${sourceId}`} className="btn-primary mt-8">
        Talk With A Mortgage Advisor
      </BookingLink>
    </section>
  );
}

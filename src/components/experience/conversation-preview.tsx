import { cn } from "@/lib/utils/cn";

type ConversationPreviewProps = {
  topics: string[];
  heading?: string;
  className?: string;
};

/**
 * Human preview of what a strategy call covers — replaces "Apply Now" energy.
 */
export function ConversationPreview({
  topics,
  heading = "Here's what we'd discuss together",
  className,
}: ConversationPreviewProps) {
  if (topics.length === 0) return null;

  return (
    <section className={cn("py-12 md:py-14", className)}>
      <div className="section-container">
        <div className="mx-auto max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {heading}
          </h2>
          <ul className="mt-6 space-y-3">
            {topics.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

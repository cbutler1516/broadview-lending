import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const defaultSteps = [
  { step: "1", title: "What are you trying to accomplish?", body: "Start with the goal — not the product." },
  { step: "2", title: "Let's understand your situation.", body: "A few thoughtful questions prepare the conversation." },
  { step: "3", title: "Here's what we'd discuss together.", body: "Trade-offs, options, and questions — before any recommendation." },
  { step: "4", title: "Build your strategy.", body: "Personalized guidance — never a generic pitch." },
  { step: "5", title: "Talk with a Broadview advisor.", body: "A licensed advisor walks through it with you." },
];

type DiscoveryJourneyProps = {
  className?: string;
  funnelHref?: string;
  funnelLabel?: string;
};

/**
 * The signature 5-step discovery flow — goal-first, not product-first.
 */
export function DiscoveryJourney({
  className,
  funnelHref = "/#start",
  funnelLabel = "Build Your Strategy",
}: DiscoveryJourneyProps) {
  return (
    <section className={cn("py-14 md:py-18", className)}>
      <div className="section-container">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            How guidance works
          </h2>
          <p className="mt-2 text-muted">Five steps. One human conversation at the end.</p>
        </div>

        <ol className="mt-10 space-y-0">
          {defaultSteps.map((item, i) => (
            <li key={item.step} className="relative flex gap-5 pb-10 last:pb-0">
              {i < defaultSteps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[1.125rem] top-10 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand/30 to-transparent"
                />
              )}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand">
                {item.step}
              </span>
              <div className="pt-0.5">
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Link href={funnelHref} className="btn-primary">
            {funnelLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

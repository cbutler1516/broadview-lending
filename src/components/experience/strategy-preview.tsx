import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import type { ExperienceGoal } from "@/lib/experience/types";
import { cn } from "@/lib/utils/cn";

type StrategyPreviewProps = {
  goal: ExperienceGoal;
  funnelHref: string;
  bookingLocation: string;
  funnelType?: string;
  className?: string;
};

/**
 * Educational preview shown after goal selection — clarity, not qualification.
 */
export function StrategyPreview({
  goal,
  funnelHref,
  bookingLocation,
  funnelType,
  className,
}: StrategyPreviewProps) {
  return (
    <section className={cn("border-t border-border bg-surface py-14 md:py-16", className)}>
      <div className="section-container">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            For your goal
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {goal.title}
          </h2>
          {goal.strategyPreview && (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {goal.strategyPreview}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={goal.href} className="btn-primary">
              Continue
            </Link>
            <Link href={funnelHref} className="btn-secondary">
              Build Your Strategy
            </Link>
            <BookingLink
              location={bookingLocation}
              funnelType={funnelType}
              className="btn-secondary"
            >
              Talk With An Advisor
            </BookingLink>
          </div>
        </div>
      </div>
    </section>
  );
}

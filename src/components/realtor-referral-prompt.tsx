"use client";

type RealtorReferralPromptProps = {
  onSelect: (choice: "yes" | "no" | "already-working") => void;
};

export function RealtorReferralPrompt({ onSelect }: RealtorReferralPromptProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="card-elevated p-6 md:p-8">
        <p className="text-sm font-medium text-brand">One more question</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Would you like to be connected with a trusted local Realtor?
        </h2>
        <p className="mt-2 text-muted">
          We work with experienced agents who understand the mortgage process.
        </p>

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={() => onSelect("yes")}
            className="rounded-xl border border-border px-4 py-4 text-left text-sm font-medium transition-colors hover:border-brand hover:bg-brand-light"
          >
            Yes, connect me with a Realtor
          </button>
          <button
            type="button"
            onClick={() => onSelect("already-working")}
            className="rounded-xl border border-border px-4 py-4 text-left text-sm font-medium transition-colors hover:border-brand hover:bg-brand-light"
          >
            I&apos;m already working with someone
          </button>
          <button
            type="button"
            onClick={() => onSelect("no")}
            className="rounded-xl border border-border px-4 py-4 text-left text-sm font-medium transition-colors hover:border-brand hover:bg-brand-light"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

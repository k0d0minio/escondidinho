import { cn } from "@/lib/utils";

/** Brass hairline with a small diamond at its centre — the house divider. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <span className="rule-gold w-16 sm:w-24" />
      <span className="block size-1.5 rotate-45 border border-gold/70" />
      <span className="rule-gold w-16 sm:w-24" />
    </div>
  );
}

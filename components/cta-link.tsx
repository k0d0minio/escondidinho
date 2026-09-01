import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "outline" | "ghost";
};

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants = {
  solid: "bg-gold text-primary-foreground hover:bg-gold-bright",
  outline:
    "border border-gold/60 text-gold hover:border-gold hover:bg-gold/10 hover:text-gold-bright",
  ghost: "text-gold hover:text-gold-bright",
};

export function CtaLink({
  variant = "outline",
  className,
  ...props
}: CtaLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

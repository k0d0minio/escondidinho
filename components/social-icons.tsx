import type { ComponentProps } from "react";

/* Lucide dropped brand glyphs, so these two are drawn in-house. */

export function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.4 21.5v-7.1h2.7l.4-3h-3.1V9.2c0-.9.3-1.5 1.6-1.5h1.6V5a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4v2.5H7.6v3h2.6v7.1h3.2Z" />
    </svg>
  );
}

export function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
      {...props}
    >
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "fr"],
  defaultLocale: "pt",
  // PT lives at "/", EN at "/en", FR at "/fr" — mirrors the old site's URLs.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

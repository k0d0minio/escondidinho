import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

const PATHS = [
  "/",
  "/menu",
  "/bar",
  "/equipa",
  "/reservar",
  "/privacidade",
  "/acessibilidade",
];

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? (prefix ? "" : "/") : path;
  return `${site.url}${prefix}${suffix}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
      ),
    },
  }));
}

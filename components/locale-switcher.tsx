"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div
      className="flex items-center gap-1 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase"
      aria-label={t("label")}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="text-border">/</span>}
          <button
            type="button"
            disabled={l === locale}
            aria-label={t(l)}
            aria-current={l === locale ? "true" : undefined}
            onClick={() =>
              // @ts-expect-error params match the current pathname's dynamic segments
              router.replace({ pathname, params }, { locale: l })
            }
            className={cn(
              "px-1 py-1 transition-colors",
              l === locale
                ? "cursor-default text-gold-bright"
                : "text-muted-foreground hover:text-gold-bright",
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

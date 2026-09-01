import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/cta-link";
import { Ornament } from "@/components/ornament";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="shell flex min-h-svh flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 text-5xl md:text-6xl">{t("title")}</h1>
      <Ornament className="mt-8" />
      <p className="mt-8 max-w-md text-muted-foreground">{t("body")}</p>
      <CtaLink href="/" variant="outline" className="mt-10">
        {t("cta")}
      </CtaLink>
    </div>
  );
}

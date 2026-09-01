import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");

  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;
  const sections = [
    ["collectTitle", "collect"],
    ["useTitle", "use"],
    ["storeTitle", "store"],
    ["rightsTitle", "rights"],
    ["changesTitle", "changes"],
  ] as const;

  return (
    <div className="pb-24 md:pb-32">
      <PageHero eyebrow={t("updated")} title={t("title")} />
      <div className="shell max-w-2xl space-y-10">
        <p className="leading-relaxed text-muted-foreground">
          {t("sections.intro", { legalName: site.legalName })}
        </p>
        {sections.map(([titleKey, bodyKey]) => (
          <section key={titleKey}>
            <h2 className="display text-2xl">{t(`sections.${titleKey}`)}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(`sections.${bodyKey}`, {
                privacyEmail: site.privacyEmail,
                address,
              })}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

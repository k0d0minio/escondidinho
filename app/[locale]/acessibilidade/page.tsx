import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.accessibility" });
  return { title: t("title") };
}

export default async function AccessibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.accessibility");

  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;

  return (
    <div className="pb-24 md:pb-32">
      <PageHero eyebrow={site.name} title={t("title")} />
      <div className="shell max-w-2xl space-y-10">
        <p className="leading-relaxed text-muted-foreground">
          {t("sections.intro", { legalName: site.legalName })}
        </p>
        <section>
          <h2 className="display text-2xl">{t("sections.commitmentTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t("sections.commitment")}
          </p>
        </section>
        <section>
          <h2 className="display text-2xl">{t("sections.feedbackTitle")}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t("sections.feedback")}
          </p>
          <ul className="mt-4 space-y-2 border-l border-gold/40 pl-5 text-muted-foreground">
            <li>
              {t("sections.feedbackPhone", {
                phone: site.accessibilityPhoneDisplay,
              })}
            </li>
            <li>{t("sections.feedbackEmail", { email: site.email })}</li>
            <li>{t("sections.feedbackAddress", { address })}</li>
          </ul>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("sections.response")}
          </p>
        </section>
      </div>
    </div>
  );
}

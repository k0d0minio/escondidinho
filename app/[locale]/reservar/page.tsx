import { Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/page-hero";
import { ReservationForm } from "@/components/reservation-form";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.reserve" });
  return { title: t("title"), description: t("description") };
}

export default async function ReservePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="pb-24 md:pb-32">
      <PageHero
        eyebrow={t("common.established")}
        title={t("reserve.title")}
        intro={t("reserve.intro")}
      />

      <div className="shell grid max-w-5xl gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <FadeIn immediate delay={0.15}>
          <ReservationForm />
        </FadeIn>

        <FadeIn immediate delay={0.3}>
          <aside className="space-y-10 border border-border/70 p-8 lg:sticky lg:top-28">
            <div>
              <h2 className="eyebrow">{t("reserve.hoursTitle")}</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-foreground/80">
                    {t("hours.lunchLabel")}
                  </dt>
                  <dd className="display mt-0.5 text-lg text-gold-bright">
                    {t("hours.lunchValue")}
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground/80">
                    {t("hours.dinnerLabel")}
                  </dt>
                  <dd className="display mt-0.5 text-lg text-gold-bright">
                    {t("hours.dinnerValue")}
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground/80">
                    {t("hours.closedLabel")}
                  </dt>
                  <dd className="mt-0.5 text-muted-foreground">
                    {t("hours.closedValue")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-border/60 pt-8">
              <h2 className="eyebrow">{t("reserve.phoneAlt")}</h2>
              <a
                href={`tel:${site.phone}`}
                className="mt-4 inline-flex items-center gap-3 text-foreground/90 transition-colors hover:text-gold-bright"
              >
                <Phone aria-hidden className="size-4 text-gold" />
                <span className="display text-2xl">{site.phoneDisplay}</span>
              </a>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {site.address.street}, {site.address.postalCode}{" "}
                {site.address.locality}
              </p>
            </div>
          </aside>
        </FadeIn>
      </div>
    </div>
  );
}

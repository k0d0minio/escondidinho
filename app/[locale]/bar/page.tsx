import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/page-hero";
import { bar } from "@/lib/data/bar";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.bar" });
  return { title: t("title"), description: t("description") };
}

export default async function BarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="pb-24 md:pb-32">
      <PageHero
        eyebrow={t("common.established")}
        title={t("bar.title")}
        intro={t("bar.intro")}
      />

      <nav
        aria-label={t("bar.title")}
        className="shell mb-16 flex flex-wrap justify-center gap-x-8 gap-y-3"
      >
        {bar.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-foreground/70 uppercase transition-colors hover:text-gold-bright"
          >
            {t(`bar.sections.${section.id}`)}
          </a>
        ))}
      </nav>

      <div className="shell max-w-3xl space-y-20">
        {bar.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <FadeIn>
              <div className="flex items-center gap-6">
                <h2 className="display text-2xl uppercase tracking-[0.08em] md:text-3xl">
                  {t(`bar.sections.${section.id}`)}
                </h2>
                <span className="rule-gold flex-1" aria-hidden />
              </div>
            </FadeIn>

            {section.groups.map((group, gi) => (
              <FadeIn key={group.title ?? gi} delay={0.08}>
                {group.title && (
                  <h3 className="mt-8 font-sans text-[0.6875rem] font-semibold tracking-[0.26em] text-gold uppercase">
                    {group.title}
                  </h3>
                )}
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6"
                    >
                      <div className="min-w-0">
                        <p className="text-[0.9375rem] leading-snug text-foreground/90">
                          {item.name}
                        </p>
                        {item.detail && (
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {item.detail}
                          </p>
                        )}
                      </div>
                      <p className="font-sans text-sm font-semibold whitespace-nowrap text-gold">
                        {item.priceHalf && (
                          <span className="mr-3 text-muted-foreground">
                            {item.priceHalf}
                          </span>
                        )}
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}

            {section.noteId && (
              <p className="mt-6 border-l border-gold/40 pl-4 text-xs leading-relaxed text-muted-foreground italic">
                {t(`bar.notes.${section.noteId}`)}
              </p>
            )}
          </section>
        ))}
      </div>

      <FadeIn className="shell mt-20 max-w-3xl border-t border-border/70 pt-8 text-center">
        <p className="text-xs text-muted-foreground">{t("bar.vatNote")}</p>
        <CtaLink href="/menu" variant="ghost" className="mt-6">
          {t("bar.menuCta")} →
        </CtaLink>
      </FadeIn>
    </div>
  );
}

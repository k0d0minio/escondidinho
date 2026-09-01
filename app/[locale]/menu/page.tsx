import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/page-hero";
import { type Dish, menu } from "@/lib/data/menu";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.menu" });
  return { title: t("title"), description: t("description") };
}

const GALLERY = [
  "/images/tagyke.jpg",
  "/images/bife-3-pimentas.jpg",
  "/images/risotto-de-camarao.jpg",
] as const;

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const dishTags = (dish: Dish) => {
    const tags: { label: string; tone: "gold" | "muted" }[] = [];
    if (dish.diet) {
      tags.push({ label: t(`menu.diet.${dish.diet}`), tone: "gold" });
    }
    if (dish.spice) {
      tags.push({ label: t(`menu.spice.${dish.spice}`), tone: "muted" });
    }
    for (const a of dish.allergens ?? []) {
      tags.push({ label: t(`menu.allergens.${a}`), tone: "muted" });
    }
    return tags;
  };

  return (
    <div className="pb-24 md:pb-32">
      <PageHero
        eyebrow={t("common.established")}
        title={t("menu.title")}
        intro={t("menu.serviceNote")}
      />

      <nav
        aria-label={t("menu.title")}
        className="shell mb-16 flex flex-wrap justify-center gap-x-10 gap-y-3"
      >
        {menu.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="font-sans text-[0.75rem] font-semibold tracking-[0.22em] text-foreground/70 uppercase transition-colors hover:text-gold-bright"
          >
            {t(`menu.sections.${section.id}.title`)}
          </a>
        ))}
      </nav>

      <div className="shell max-w-4xl space-y-24">
        {menu.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <FadeIn>
              <div className="flex items-center gap-6">
                <h2 className="display text-3xl uppercase tracking-[0.08em] md:text-4xl">
                  {t(`menu.sections.${section.id}.title`)}
                </h2>
                <span className="rule-gold flex-1" aria-hidden />
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t(`menu.sections.${section.id}.intro`)}
              </p>
            </FadeIn>

            <ul className="mt-10 space-y-9">
              {section.dishes.map((dish, i) => (
                <FadeIn key={dish.id} delay={Math.min(i * 0.05, 0.3)}>
                  <li>
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="display text-xl leading-snug md:text-2xl">
                        {dish.name}
                      </h3>
                      <span className="font-sans text-sm font-semibold whitespace-nowrap text-gold">
                        {dish.price}
                      </span>
                    </div>
                    {dish.hasDescription && (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {t(`menu.dishes.${dish.id}`)}
                      </p>
                    )}
                    {dishTags(dish).length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {dishTags(dish).map((tag) => (
                          <li
                            key={tag.label}
                            className={
                              tag.tone === "gold"
                                ? "border border-gold/50 px-2 py-0.5 font-sans text-[0.5625rem] font-semibold tracking-[0.16em] text-gold uppercase"
                                : "border border-border px-2 py-0.5 font-sans text-[0.5625rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
                            }
                          >
                            {tag.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <FadeIn className="shell mt-20 max-w-4xl border-t border-border/70 pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t("menu.allergensNote")}
        </p>
        <CtaLink href="/bar" variant="ghost" className="mt-6">
          {t("menu.barCta")} →
        </CtaLink>
      </FadeIn>

      <div className="shell mt-20 grid gap-4 sm:grid-cols-3">
        {GALLERY.map((src, i) => (
          <FadeIn key={src} delay={i * 0.1} className="relative aspect-[4/3]">
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

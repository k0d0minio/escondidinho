import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/motion/fade-in";
import { Ornament } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { memorial, team } from "@/lib/data/team";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.team" });
  return { title: t("title"), description: t("description") };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const kitchen = team.filter((m) => m.group === "kitchen");
  const front = team.filter((m) => m.group === "front");

  const groups = [
    { id: "kitchen" as const, members: kitchen },
    { id: "front" as const, members: front },
  ];

  return (
    <div className="pb-24 md:pb-32">
      <PageHero
        eyebrow={t("common.established")}
        title={t("team.title")}
        intro={
          <>
            {t("team.intro")}{" "}
            <span className="display text-base text-gold-bright italic">
              — {t("team.introSignature")}
            </span>
          </>
        }
      />

      <div className="shell max-w-5xl space-y-20">
        {groups.map((group) => (
          <section key={group.id}>
            <FadeIn>
              <div className="flex items-center gap-6">
                <h2 className="display text-2xl uppercase tracking-[0.08em] md:text-3xl">
                  {t(`team.groups.${group.id}`)}
                </h2>
                <span className="rule-gold flex-1" aria-hidden />
              </div>
            </FadeIn>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((member, i) => (
                <FadeIn key={member.id} delay={i * 0.1} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
                    />
                  </div>
                  <h3 className="display mt-5 text-2xl">{member.name}</h3>
                  <p className="mt-1 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-gold uppercase">
                    {t(`team.members.${member.id}.role`)}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Memorial — Hélder Freire */}
      <section className="mt-28 border-y border-border/60 bg-[oklch(0.175_0.01_75)] py-24">
        <div className="shell grid max-w-5xl items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <FadeIn className="space-y-4">
            <div className="relative aspect-[7/8] overflow-hidden">
              <Image
                src={memorial.image}
                alt={memorial.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[5/3] overflow-hidden">
              <Image
                src={memorial.imageTogether}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>
          <div>
            <FadeIn>
              <p className="eyebrow">{t("team.memorial.label")}</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                {memorial.name}
              </h2>
              <p className="mt-2 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-gold uppercase">
                {t("team.memorial.role")}
              </p>
              <Ornament className="mt-8 justify-start" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <blockquote className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
                <p>{t("team.memorial.body")}</p>
              </blockquote>
              <p className="display mt-8 text-2xl text-gold-bright italic">
                {t("team.memorial.signature")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

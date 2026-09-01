import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/cta-link";
import { Hero } from "@/components/home/hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Ornament } from "@/components/ornament";
import { menu } from "@/lib/data/menu";
import { schemaOpeningHours, site } from "@/lib/site";

const SIGNATURE_IDS = [
  "tagyke",
  "francesinha",
  "risottoCamarao",
  "arrozDePato",
] as const;

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const dishes = menu
    .flatMap((s) => s.dishes)
    .filter((d) => (SIGNATURE_IDS as readonly string[]).includes(d.id));
  dishes.sort(
    (a, b) =>
      (SIGNATURE_IDS as readonly string[]).indexOf(a.id) -
      (SIGNATURE_IDS as readonly string[]).indexOf(b.id),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.url,
    image: `${site.url}/og.jpg`,
    servesCuisine: ["Portuguese", "Fusion"],
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: schemaOpeningHours,
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.tripadvisor,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own constants
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Story */}
      <section className="shell grid items-center gap-14 py-24 md:py-36 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute -inset-4 border border-gold/25"
            aria-hidden
          />
          <Image
            src="/images/logo-slate.jpg"
            alt={t("home.story.title")}
            width={650}
            height={649}
            className="w-full"
          />
        </FadeIn>
        <div>
          <FadeIn>
            <p className="eyebrow">{t("home.story.eyebrow")}</p>
            <h2 className="display mt-5 max-w-lg text-4xl leading-[1.08] md:text-5xl">
              {t("home.story.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
              {t("home.story.body")}
            </p>
            <p className="display mt-8 text-2xl text-gold-bright italic">
              {t("home.story.signature")}
            </p>
            <p className="mt-1 font-sans text-[0.6875rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              {t("home.story.signatureRole")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/70 pt-6 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-foreground/70 uppercase">
              <li>{t("home.story.fact1943")}</li>
              <li>{t("home.story.factSeats")}</li>
              <li>{t("home.story.factPalace")}</li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="border-y border-border/60 bg-[oklch(0.175_0.01_75)] py-24 md:py-36">
        <div className="shell">
          <FadeIn className="flex flex-col items-center text-center">
            <p className="eyebrow">{t("home.signatures.eyebrow")}</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              {t("home.signatures.title")}
            </h2>
            <Ornament className="mt-7" />
          </FadeIn>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {dishes.map((dish, i) => (
              <FadeIn key={dish.id} delay={i * 0.1} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="display text-xl leading-snug">{dish.name}</h3>
                  <span className="font-sans text-sm font-semibold whitespace-nowrap text-gold">
                    {dish.price}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`menu.dishes.${dish.id}`)}
                </p>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-16 text-center">
            <CtaLink href="/menu" variant="outline">
              {t("home.signatures.cta")}
            </CtaLink>
          </FadeIn>
        </div>
      </section>

      {/* Wine band */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <Image
          src="/images/texture-slate.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
        />
        <FadeIn className="shell relative flex flex-col items-center text-center">
          <p className="eyebrow">{t("home.wine.eyebrow")}</p>
          <blockquote className="display mt-8 max-w-3xl text-balance text-3xl leading-[1.2] text-foreground italic md:text-5xl">
            «{t("home.wine.quote")}»
          </blockquote>
          <CtaLink href="/bar" variant="ghost" className="mt-10">
            {t("home.wine.cta")} →
          </CtaLink>
        </FadeIn>
      </section>

      {/* Visit */}
      <section className="shell pb-24 md:pb-36">
        <div className="border border-border/70 p-2">
          <div className="grid gap-12 border border-gold/20 px-6 py-14 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-16">
            <div>
              <FadeIn>
                <p className="eyebrow">{t("home.visit.eyebrow")}</p>
                <h2 className="display mt-5 max-w-md text-3xl leading-[1.15] md:text-4xl">
                  {t("home.visit.title")}
                </h2>
              </FadeIn>
              <FadeIn delay={0.15} className="mt-10 space-y-6 text-sm">
                <div className="flex gap-3">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-gold"
                  />
                  <div>
                    <p className="font-sans text-[0.625rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                      {t("home.visit.addressLabel")}
                    </p>
                    <p className="mt-1 text-foreground/90">
                      {site.address.street}, {site.address.postalCode}{" "}
                      {site.address.locality}
                    </p>
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-gold transition-colors hover:text-gold-bright"
                    >
                      {t("common.directions")} →
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-gold"
                  />
                  <div>
                    <p className="font-sans text-[0.625rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                      {t("home.visit.phoneLabel")}
                    </p>
                    <a
                      href={`tel:${site.phone}`}
                      className="mt-1 inline-block text-foreground/90 transition-colors hover:text-gold-bright"
                    >
                      {site.phoneDisplay}
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.1}>
                <h3 className="eyebrow">{t("hours.title")}</h3>
                <dl className="mt-6 space-y-5 border-l border-gold/30 pl-6 text-sm">
                  <div>
                    <dt className="text-foreground/80">
                      {t("hours.lunchLabel")}
                    </dt>
                    <dd className="mt-0.5 display text-xl text-gold-bright">
                      {t("hours.lunchValue")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground/80">
                      {t("hours.dinnerLabel")}
                    </dt>
                    <dd className="mt-0.5 display text-xl text-gold-bright">
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
                <CtaLink href="/reservar" variant="solid" className="mt-10">
                  {t("common.reserveCta")}
                </CtaLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

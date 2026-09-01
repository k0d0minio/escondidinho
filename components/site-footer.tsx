import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-[oklch(0.13_0.008_75)]">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-white.png"
              alt=""
              width={110}
              height={120}
              className="h-auto w-10 opacity-90"
            />
            <div className="leading-none">
              <p className="display text-lg tracking-[0.18em] text-foreground uppercase">
                Escondidinho
              </p>
              <p className="mt-1.5 font-sans text-[0.5625rem] font-semibold tracking-[0.32em] text-gold uppercase">
                {t("common.established")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {t("footer.tagline")}
          </p>
        </div>

        <nav aria-label={t("footer.navTitle")}>
          <h2 className="eyebrow">{t("footer.navTitle")}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {(
              [
                ["/", "home"],
                ["/menu", "menu"],
                ["/bar", "bar"],
                ["/equipa", "team"],
                ["/reservar", "reserve"],
              ] as const
            ).map(([href, key]) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-foreground/80 transition-colors hover:text-gold-bright"
                >
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{t("footer.hoursTitle")}</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="block text-foreground/80">
                {t("hours.lunchLabel")}
              </span>
              {t("hours.lunchValue")}
            </li>
            <li>
              <span className="block text-foreground/80">
                {t("hours.dinnerLabel")}
              </span>
              {t("hours.dinnerValue")}
            </li>
            <li>
              <span className="block text-foreground/80">
                {t("hours.closedLabel")}
              </span>
              {t("hours.closedValue")}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">{t("footer.contactTitle")}</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-gold"
              />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-gold-bright"
              >
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-gold-bright"
              >
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
          <h2 className="eyebrow mt-8">{t("footer.followTitle")}</h2>
          <ul className="mt-4 flex items-center gap-4">
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground transition-colors hover:text-gold-bright"
              >
                <FacebookIcon className="size-4.5" />
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-gold-bright"
              >
                <InstagramIcon className="size-4.5" />
              </a>
            </li>
            <li>
              <a
                href={site.social.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-gold-bright"
              >
                Tripadvisor
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.copyright", { year, legalName: site.legalName })}</p>
          <div className="flex gap-6">
            <Link
              href="/privacidade"
              className="transition-colors hover:text-gold-bright"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/acessibilidade"
              className="transition-colors hover:text-gold-bright"
            >
              {t("footer.accessibility")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

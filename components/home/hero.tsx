"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CtaLink } from "@/components/cta-link";
import { Ornament } from "@/components/ornament";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduceMotion ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-vol-au-vent.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.155_0.008_75/0.55)_100%)]"
      />

      <div className="shell relative flex flex-col items-center py-32 text-center">
        <motion.p {...rise(0.2)} className="eyebrow">
          {t("common.established")}
        </motion.p>
        <motion.h1
          {...rise(0.35)}
          className="display mt-6 text-[11.5vw] leading-[0.95] text-foreground uppercase sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          Escondidinho
        </motion.h1>
        <motion.div {...rise(0.5)} className="mt-8">
          <Ornament />
        </motion.div>
        <motion.p
          {...rise(0.6)}
          className="mt-8 max-w-xl text-balance font-sans text-base leading-relaxed text-foreground/85 md:text-lg"
        >
          {t("hero.tagline")}
        </motion.p>
        <motion.div
          {...rise(0.75)}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <CtaLink href="/reservar" variant="solid">
            {t("common.reserveCta")}
          </CtaLink>
          <CtaLink href="/menu" variant="outline">
            {t("common.viewMenu")}
          </CtaLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="font-sans text-[0.625rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
          {t("hero.kicker")}
        </span>
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent"
          animate={reduceMotion ? undefined : { scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

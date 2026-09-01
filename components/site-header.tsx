"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/menu", key: "menu" },
  { href: "/bar", key: "bar" },
  { href: "/equipa", key: "team" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the overlay on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label={site.name}
        >
          <span className="display text-xl tracking-[0.18em] text-foreground uppercase transition-colors group-hover:text-gold-bright md:text-2xl">
            Escondidinho
          </span>
          <span className="mt-1 font-sans text-[0.5625rem] font-semibold tracking-[0.34em] text-gold uppercase">
            {t("common.established")}
          </span>
        </Link>

        <nav
          aria-label="principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "font-sans text-[0.75rem] font-semibold tracking-[0.22em] uppercase transition-colors",
                pathname === item.href
                  ? "text-gold-bright"
                  : "text-foreground/80 hover:text-gold-bright",
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href="/reservar"
            className="border border-gold/60 px-5 py-2.5 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
          >
            {t("nav.reserve")}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
          className="relative flex size-10 items-center justify-center md:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-6 bg-foreground transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute h-px w-6 bg-foreground transition-opacity duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute h-px w-6 bg-foreground transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-1.5",
            )}
          />
        </button>
      </div>

    </header>

    {/* Sibling of <header>: its backdrop-filter would otherwise become the
        containing block for this fixed overlay and collapse it to 0 height. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-background/98 backdrop-blur-md md:hidden"
          >
            <nav
              aria-label="principal"
              className="shell flex flex-1 flex-col justify-center gap-2 py-10"
            >
              {[{ href: "/", key: "home" } as const, ...NAV].map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "display block py-3 text-4xl transition-colors",
                      pathname === item.href
                        ? "text-gold-bright"
                        : "text-foreground hover:text-gold-bright",
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-8 flex flex-col items-start gap-8"
              >
                <Link
                  href="/reservar"
                  className="border border-gold/60 px-7 py-3 font-sans text-[0.8125rem] font-semibold tracking-[0.2em] text-gold uppercase"
                >
                  {t("common.reserveCta")}
                </Link>
                <LocaleSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { Ornament } from "@/components/ornament";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
};

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <header className="shell flex flex-col items-center pt-36 pb-16 text-center md:pt-44 md:pb-20">
      <FadeIn immediate>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 text-5xl uppercase tracking-[0.06em] md:text-6xl">
          {title}
        </h1>
        <Ornament className="mt-8" />
        {intro && (
          <p className="mx-auto mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
            {intro}
          </p>
        )}
      </FadeIn>
    </header>
  );
}

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import {
  alternatives,
  inventory,
  kickoff,
  phases,
  risks,
  split,
  summary,
} from "@/lib/data/vst-roadmap";

/**
 * Hidden internal page: the roadmap for turning the "Paleta Musical" browser
 * playground into a DAW plugin. Not linked from navigation, not in the
 * sitemap, and marked noindex. English only — it is an engineering document,
 * not client copy, so it deliberately bypasses `messages/`.
 */

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Paleta Musical → VST roadmap",
  robots: { index: false, follow: false, nocache: true },
};

const FATE_STYLE: Record<(typeof inventory)[number]["fate"], string> = {
  "Stays in JS": "text-emerald-300/90 border-emerald-300/30",
  "Moves to C++": "text-sky-300/90 border-sky-300/30",
  Both: "text-gold border-gold/40",
  New: "text-rose-300/90 border-rose-300/30",
};

const PICK_STYLE: Record<(typeof alternatives)[number]["pick"], string> = {
  Recommended: "text-gold border-gold/40",
  "Spike first": "text-emerald-300/90 border-emerald-300/30",
  "Only if": "text-sky-300/90 border-sky-300/30",
  No: "text-muted-foreground border-border",
};

function Tag({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap border px-2 py-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {label}
    </span>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-2 text-3xl md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Boxes-and-arrows view of the plugin: host ↔ C++ core ↔ WebView UI. */
function Architecture() {
  const box =
    "border border-border bg-card/60 px-4 py-3 text-sm leading-relaxed";
  const label = "eyebrow mb-1 block text-[0.5625rem]";
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <div className={box}>
        <span className={label}>DAW host</span>
        Tempo, transport, MIDI out routing, audio input bus. Any synth or drum
        rack downstream.
      </div>
      <div className="hidden items-center text-gold md:flex">⟷</div>
      <div className={box}>
        <span className={label}>C++ core (JUCE 8)</span>
        LoopPlayer follows ppq and tempo, drains the note FIFO, writes MIDI out
        and a preview synth. Owns time. Around 600 lines.
      </div>
      <div className="hidden items-center text-gold md:flex">⟷</div>
      <div className={box}>
        <span className={label}>WebView UI</span>
        The existing page. Theory, builder, Infinito generator, analysis, all in
        JS. Sends note events and Patterns, receives step events.
      </div>
    </div>
  );
}

export default async function VstRoadmapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pb-24 md:pb-32">
      <PageHero
        eyebrow="Lab · internal · not indexed"
        title="Paleta Musical as a VST"
        intro="How to carry the browser playground into a DAW plugin in the simplest way, phase by phase, and which parts Claude Code can do alone."
      />

      <div className="shell max-w-4xl space-y-20">
        <Section eyebrow="Short answer" title="Wrap, don't rewrite">
          <p className="display text-2xl leading-snug text-balance md:text-3xl">
            {summary.answer}
          </p>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {summary.shape.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  className="mt-2 h-px w-4 shrink-0 bg-gold/70"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Architecture />
        </Section>

        <Section eyebrow="What exists today" title="Inventory of the concept">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            One HTML file, roughly 4,500 lines of vanilla JavaScript, Web Audio
            oscillators, timer-based sequencing, an offline FFT analysis
            pipeline and a hand-rolled MIDI writer. Each tab below lists where
            its code ends up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="eyebrow py-3 pr-4 font-semibold">Tab</th>
                  <th className="eyebrow py-3 pr-4 font-semibold">Does</th>
                  <th className="eyebrow py-3 pr-4 font-semibold">Fate</th>
                  <th className="eyebrow py-3 font-semibold">Port note</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((row) => (
                  <tr
                    key={row.tab}
                    className="border-b border-border/60 align-top"
                  >
                    <td className="display py-4 pr-4 text-lg whitespace-nowrap">
                      {row.tab}
                    </td>
                    <td className="py-4 pr-4 leading-relaxed text-muted-foreground">
                      {row.what}
                    </td>
                    <td className="py-4 pr-4">
                      <Tag label={row.fate} className={FATE_STYLE[row.fate]} />
                    </td>
                    <td className="py-4 leading-relaxed text-muted-foreground">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section eyebrow="The roadmap" title="Seven phases, each shippable">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Efforts assume Claude Code drives the code and one person tests in a
            DAW. Phases 0 to 4 deliver the brainstorming workflow; 5 and 6 are
            polish.
          </p>
          <ol className="space-y-6">
            {phases.map((phase) => (
              <li
                key={phase.id}
                className="border border-border bg-card/40 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="display text-2xl md:text-3xl">
                    <span className="mr-3 text-gold">{phase.id}</span>
                    {phase.title}
                  </h3>
                  <span className="eyebrow">{phase.effort}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed">{phase.goal}</p>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {phase.work.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-px w-3 shrink-0 bg-gold/70"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 grid gap-4 border-t border-border/60 pt-5 text-sm md:grid-cols-2">
                  <div>
                    <dt className="eyebrow">Done when</dt>
                    <dd className="mt-2 leading-relaxed">{phase.doneWhen}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">You do</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                      {phase.human}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Options considered" title="Why this route">
          <div className="divide-y divide-border/60 border-y border-border/60">
            {alternatives.map((alt) => (
              <div
                key={alt.name}
                className="grid gap-3 py-5 md:grid-cols-[10rem_1fr]"
              >
                <div>
                  <Tag label={alt.pick} className={PICK_STYLE[alt.pick]} />
                </div>
                <div>
                  <h3 className="display text-xl">{alt.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {alt.pitch}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{alt.verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Can Claude Code do it all?"
          title="The code, yes. The ears and the signatures, no."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="eyebrow py-3 pr-4 font-semibold">Area</th>
                  <th className="eyebrow py-3 pr-4 font-semibold">
                    Claude Code
                  </th>
                  <th className="eyebrow py-3 font-semibold">You</th>
                </tr>
              </thead>
              <tbody>
                {split.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-border/60 align-top"
                  >
                    <td className="py-4 pr-4 font-medium">{row.area}</td>
                    <td className="py-4 pr-4 leading-relaxed text-muted-foreground">
                      {row.claude}
                    </td>
                    <td className="py-4 leading-relaxed text-muted-foreground">
                      {row.you}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Run the C++ phases from a local Claude Code session on the Mac that
            has the DAW. The cloud session can write and compile everything but
            cannot launch a plugin host or hear the result.
          </p>
        </Section>

        <Section eyebrow="What will bite" title="Risks and the answer to each">
          <dl className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            {risks.map((item) => (
              <div key={item.risk} className="border-l border-gold/40 pl-4">
                <dt className="font-medium leading-snug">{item.risk}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.mitigation}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section eyebrow="Kick-off" title="Repository layout and first prompts">
          <pre className="overflow-x-auto border border-border bg-card/60 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
            {kickoff.layout.join("\n")}
          </pre>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Each prompt below is one Claude Code session in the new repository,
            in order. Each one ends with a green CI run before the next starts.
          </p>
          <ol className="space-y-4">
            {kickoff.prompts.map((prompt, index) => (
              <li key={prompt} className="flex gap-4">
                <span className="display shrink-0 text-2xl text-gold">
                  {index + 1}
                </span>
                <p className="border border-border/60 bg-card/40 p-4 font-mono text-xs leading-relaxed">
                  {prompt}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  );
}

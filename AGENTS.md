# AGENTS.md — Layer 0: Repository Identity & Routing

> This is the **first file any agent session reads.** It says what this repo is and where
> to go for a given task. Keep it short; detail lives in the routed files.

## What this repo is

**escondidinho** — the website for **Restaurante Escondidinho**, a fusion restaurant in
a hidden alley opposite the National Palace of Mafra (est. 2009; the name dates from
1943; legal entity Leandra Freire Unipessoal Lda). A trilingual **PT/EN/FR** Next.js 16
(App Router) site: `next-intl` routing under `app/[locale]/` (PT unprefixed at `/`, EN at
`/en`, FR at `/fr` — mirroring the old Wix site's URLs), Tailwind CSS v4 + shadcn/ui
(nova preset), `motion` for animation, Biome for lint/format, Resend for the reservation
form. One deliberate dark theme — no light mode.

**Content is the client's.** Copy, menu, prices, photos and team bios were migrated from
the old Wix site (escondidinho-mafra.com) in 2026-09. The menu and bar lists are data
files; do not invent dishes, prices or people.

## Routing — "if the task is… → go to…"

| The task | Go to |
|---|---|
| Pages, layout, routes | [`app/[locale]/`](app/) — plus `sitemap.ts`, `robots.ts`, `manifest.ts` in `app/` |
| Copy in any language | [`messages/pt.json`](messages/pt.json) · [`en.json`](messages/en.json) · [`fr.json`](messages/fr.json) — **keep the three in step** |
| Menu dishes, prices, allergens | [`lib/data/menu.ts`](lib/data/menu.ts) (structure) + `menu.dishes.*` in `messages/` (descriptions) |
| Bar & wine list | [`lib/data/bar.ts`](lib/data/bar.ts) — names/prices verbatim from the house list |
| Team members | [`lib/data/team.ts`](lib/data/team.ts) — includes the Hélder Freire memorial |
| Contact, hours, socials, legal entity | [`lib/site.ts`](lib/site.ts) — the single source; JSON-LD reads from it |
| Locale routing, negotiation | [`i18n/`](i18n/) + [`proxy.ts`](proxy.ts) (Next 16 proxy, not middleware) |
| Reservation flow | [`components/reservation-form.tsx`](components/reservation-form.tsx) → [`lib/actions/reserve.ts`](lib/actions/reserve.ts) (zod + Resend) · slots in [`lib/reservation.ts`](lib/reservation.ts) |
| Theme, tokens, ornaments | [`app/globals.css`](app/globals.css) — candlelit palette, `eyebrow`/`display`/`rule-gold`/`shell` utilities |
| Components | [`components/`](components/) — `ui/` is shadcn-generated |
| CI | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — lint, type-check, build |
| Plan or track work on this repo | [`.icm/intake/`](.icm/intake/) — epics and stubs, contract in its README |

## Standing rules

- **PT, EN and FR move together.** A string added to one `messages/` file is added to all
  three in the same change. A missing key is a visible defect, not a fallback.
- **Facts come from the restaurant.** Hours, prices, dishes and contact details changed
  only on the client's word — flag suspected staleness in a ticket, don't "fix" it.
- **Env vars, never committed secrets.** `RESEND_API_KEY`, `RESERVATIONS_TO`,
  `RESERVATIONS_FROM` — documented in [`README.md`](README.md).
- **CI is the source of truth.** Never run `build`/`lint`/`typecheck` locally — push and
  read the checks.
- **Planning is tickets.** Stubs in `.icm/intake/`, never a loose `TODO.md`. Ticket-only
  commits go straight to `main`; everything else through a PR on a `claude/` branch.
- **Gates are human checkboxes** — read them, never tick them.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

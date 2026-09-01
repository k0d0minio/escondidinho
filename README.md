# Restaurante Escondidinho — website

Trilingual (PT/EN/FR) site for [Restaurante Escondidinho](https://escondidinho-mafra.com),
Mafra. Next.js 16 App Router, Tailwind CSS v4, shadcn/ui, `motion`, `next-intl`, Resend.

Agent-facing identity and routing live in [`AGENTS.md`](AGENTS.md).

## Develop

```bash
npm install
npm run dev
```

PT is served unprefixed at `/`; EN at `/en`, FR at `/fr`.

## Environment

Create `.env.local` (never committed):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend key; without it the reservation form returns its error state. |
| `RESERVATIONS_TO` | Recipient for reservation requests. Defaults to the restaurant email in `lib/site.ts`. |
| `RESERVATIONS_FROM` | Verified Resend sender, e.g. `Reservas <reservas@escondidinho-mafra.com>`. Defaults to Resend's onboarding sender (delivers to the Resend account owner only — set before go-live). |

## Checks

CI (`.github/workflows/ci.yml`) runs Biome lint, `tsc --noEmit` and `next build` on every
push and PR. CI is the source of truth — don't run the checks locally.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working style

You are my senior partner programmer.

- Always answer in English.
- Modern, clean code; comment only what's necessary.
- Propose the simplest, most maintainable solution first.
- Generated code must be ready to copy-paste — no pseudo-code.
- Always ask for missing context before coding.
- When editing existing code, show the diff or the changed part.
- Explain technical choices as briefly and clearly as possible.
- For new tasks: give goal, constraints, 2-3 solutions, best choice, and why — then a step-by-step process. Let me implement first and review; only write code if I'm blocked.

## Project context

MailSort is a take-home test exercise: a Next.js full-stack app for sorting inbound messages into categories. See `README.md` for the original assignment brief (French) and `REPONSE.md` for the running notes on anomalies found and answers to the architecture question — both are expected deliverables, not disposable scratch files.

The app is a prototype whose API is meant to eventually be consumed by an external desktop client, not just this browser dashboard — keep that in mind for auth/versioning decisions.

## Commands

```bash
npm install
npm run dev     # start dev server at http://localhost:3000
npm run build
npm run start
```

There is no lint or test script configured.

Demo login: `admin@mailsort.test` / `mailsort2026`

## Architecture

Next.js 15 App Router, fullstack (no external backend). All server logic lives under `app/api/*/route.js` using the Next.js Route Handlers convention.

- `data/messages.json` — static seed data, imported directly by route handlers.
- `app/lib/store.js` — in-memory "database": loads `messages.json` into a module-level array on server start and exposes `getAllMessages`, `getMessageById`, `updateMessageCategory`, and the `VALID_CATEGORIES` list. State resets on every server restart/redeploy; there is no persistence layer.
- `app/lib/auth.js` — exports `JWT_SECRET` (falls back to a dev default if `JWT_SECRET` env var is unset).
- `app/api/auth/login/route.js` — checks hardcoded demo credentials, signs a 2h JWT via `jsonwebtoken`.
- `app/api/messages/route.js` — `GET`, optional `?category=` filter, sorted by `receivedAt` desc.
- `app/api/messages/[id]/category/route.js` — `PATCH`, reclassifies a message via `store.js`.
- `app/api/messages/stats/route.js` — `GET`, counts messages per category. **Note:** this reads `data/messages.json` directly rather than going through `store.js`, so it does not reflect reclassifications made via the PATCH endpoint — the two data sources can drift.
- `app/page.js` / `app/layout.js` — currently just a placeholder landing page; the dashboard UI (login, message list, category filter, reclassify action, stats) is not yet built.
- `/api/messages*` routes are not yet protected by the JWT — the login route issues tokens but nothing checks them.

Path alias `@/*` maps to the repo root (see `jsconfig.json`).

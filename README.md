# Raven Development Operations — Demo Website

Marketing/demo site for Raven Development Operations. Built with React, Vite, Tailwind, Framer Motion, and Netlify Functions. The chatbot points to the Cloud Run assistant backend that uses Cloud SQL Postgres for context (no MongoDB).

## Features
- Multi-page marketing site (Home, Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404)
- Animated hero/trusted-by sections and testimonials
- Demo quizzes for common engagement types
- On-site chatbot wired to the Cloud Run assistant backend
- Contact form with Calendly embed and Netlify Forms
- Netlify Function to generate Calendly scheduling URLs

## Tech Stack
- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Heroicons, Framer Motion
- **Assistant backend (production):** Cloud Run FastAPI service backed by Cloud SQL (Postgres) + OpenAI; rate limiting per IP
- **Assistant backend (legacy/local):** Optional `OpenAuxilium/` Node + Express with optional local model (kept for experimentation)
- **Scheduling:** Calendly API via Netlify Function `netlify/functions/create-calendly-link.js`
- **Hosting:** Netlify static site + Functions; Cloud Run for the assistant backend

## Project Structure
- `src/` — pages, components (chatbot, layout, quizzes), hooks, assets
- `public/` — static assets
- `netlify/` — Netlify Functions (Calendly helper)
- `OpenAuxilium/` — optional legacy Node assistant backend (not used in production)
- `wiki.md`, `roadmap.md`, `timeline.md` — internal docs and planning notes

## Getting Started (Frontend)
Prereqs: Node.js 18+

Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev
```
Vite serves at `http://localhost:5173` by default.

Build for production:
```bash
npm run build
```
The optimized bundle is written to `build/` (Netlify uses this).

## Assistant Backend Wiring
- Default production backend: `https://chat-assistant-backend-e4gl56kwma-uc.a.run.app`
- The chatbot (`src/components/ChatBot.jsx`) and contact enrichment share the same base URL.
- Configure via env vars:
  - `VITE_ASSISTANT_API_URL` — override the backend base URL (recommended)
  - `VITE_OPENAUXILIUM_URL` — optional fallback for the legacy Node backend

Resolution order in the client:
```
VITE_ASSISTANT_API_URL
  ▹ VITE_OPENAUXILIUM_URL
  ▹ https://chat-assistant-backend-e4gl56kwma-uc.a.run.app (default)
```

Example `.env` (or `.env.local`):
```ini
VITE_ASSISTANT_API_URL=https://chat-assistant-backend-e4gl56kwma-uc.a.run.app
# Optional local/legacy backend
VITE_OPENAUXILIUM_URL=
```

Admin endpoints on the backend are bearer-protected; the chatbot does **not** need that token.

## Calendly / Netlify Function
`netlify/functions/create-calendly-link.js` can use predefined URLs or call the Calendly API.

Env vars (set in Netlify or local Netlify dev):
- `CALENDY_TOKEN` / `CALENDLY_TOKEN` — Calendly PAT
- Optional overrides: `CALENDY_URL_ZOOM`, `CALENDY_URL_TEAMS`, `CALENDY_URL_GOOGLE`, `CALENDY_URL_PHONE`, `CALENDY_URL_DEFAULT` (and the `CALENDLY_` spellings)

If no token is provided, the function returns the configured default URL.

## Netlify Deployment
- `publish = "build"` and `functions = "netlify/functions"` (see `netlify.toml`)
- SPA routing redirects to `/index.html`
- Build command: `npm run build`
- Required env var: `VITE_ASSISTANT_API_URL` (Cloud Run URL)
- Optional: Calendly variables listed above

## Testing
Jest + Testing Library. Run:
```bash
npm test
```
The chat widget has targeted coverage in `src/__tests__/ChatBot.test.jsx`.

## Versioning, Tags, and Docs
- Frontend version: `package.json`
- Legacy OpenAuxilium version: `OpenAuxilium/package.json`
- Internal docs: `wiki.md` (hub), `roadmap.md`, `timeline.md`, `RELEASES.md`
- Suggested tags: `website-vX.Y.Z` for site releases; `openauxilium-vX.Y.Z` for the legacy backend

## Notes and Security
- Keep secrets (API tokens, DB creds, etc.) out of Git; use platform secrets.
- This repo is all-rights-reserved. See `LICENSE` for details.

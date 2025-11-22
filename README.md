# Raven Development Operations - Demo Website

Marketing/demo site for Raven Development Operations. Built with React, Vite, Tailwind, Framer Motion, and Netlify Functions. The chatbot points to the Cloud Run assistant backend (FastAPI + Postgres) behind an API Gateway. Backend source lives in `chat-assistant-backend/`.

## Features
- Multi-page marketing site (Home, Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404)
- Animated hero/trusted-by sections and testimonials
- Demo quizzes for common engagement types
- On-site chatbot wired to the Cloud Run assistant backend
- Contact form with Calendly embed and Netlify Forms
- Netlify Function to generate Calendly scheduling URLs

## Tech Stack
- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Heroicons, Framer Motion
- **Assistant backend (production):** `chat-assistant-backend/` FastAPI service on Cloud Run backed by Cloud SQL (Postgres) + OpenAI; rate limiting per IP
- **Assistant backend (legacy/local):** `OpenAuxilium/` Node + Express with optional local model (kept for experimentation)
- **Scheduling:** Calendly API via Netlify Function `netlify/functions/create-calendly-link.js`
- **Hosting:** Netlify static site + Functions; Cloud Run for the assistant backend

## Project Structure
- `src/` - pages, components (chatbot, layout, quizzes), hooks, assets
- `public/` - static assets
- `netlify/` - Netlify Functions (Calendly helper)
- `chat-assistant-backend/` - FastAPI + Postgres assistant backend deployed to Cloud Run and fronted by API Gateway
- `OpenAuxilium/` - optional legacy Node assistant backend (not used in production)
- `wiki.md`, `roadmap.md`, `timeline.md` - internal docs and planning notes

## Content Data
- Portfolio and blog entries (`src/data/portfolio.js`, `src/data/blogPosts.js`) enumerate every public repo under [https://github.com/raven-dev-ops](https://github.com/raven-dev-ops) with direct GitHub links.
- Screenshot galleries remain on the flagship projects; other cards render without images but keep tech/outcomes and links.

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
- Default production backend (no client token needed): `https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev`
- Direct Cloud Run URL (requires ID token): `https://chat-assistant-backend-276715928612.us-central1.run.app`
- The chatbot (`src/components/ChatBot.jsx`) and contact enrichment share the same base URL. Backend source is in `chat-assistant-backend/`.
- Configure via env vars:
  - `VITE_CHAT_API_BASE` - required frontend base URL (Netlify/environment)
  - `VITE_ASSISTANT_API_URL` - legacy alias still honored as a fallback
  - `VITE_OPENAUXILIUM_URL` - optional legacy Node backend fallback
- API resolution order in the client:
```
VITE_CHAT_API_BASE
  -> VITE_ASSISTANT_API_URL (legacy alias)
  -> VITE_OPENAUXILIUM_URL
  -> https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev (default)
```
- Chat endpoint: `POST ${VITE_CHAT_API_BASE}/api/chat` with body `{ "message": "<text>", "context": { ... } }`. Response returns `{ reply: string, mode: "live" | "offline" }` to drive typing cadence; the UI no longer shows a live/offline badge but still adapts behavior.
- Optional health check: `GET ${VITE_CHAT_API_BASE}/health`.
- CORS is restricted to `https://ravdevops.com` and `https://www.ravdevops.com`; host the frontend on those origins.

Example `.env` (or `.env.local`):
```ini
VITE_CHAT_API_BASE=https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev
# Optional local/legacy backend
VITE_OPENAUXILIUM_URL=
```

Admin endpoints on the backend are bearer-protected; the chatbot does **not** need that token.

## Calendly / Netlify Function
`netlify/functions/create-calendly-link.js` can use predefined URLs or call the Calendly API.

Env vars (set in Netlify or local Netlify dev):
- `CALENDY_TOKEN` / `CALENDLY_TOKEN` - Calendly PAT
- Optional overrides: `CALENDY_URL_ZOOM`, `CALENDY_URL_TEAMS`, `CALENDY_URL_GOOGLE`, `CALENDY_URL_PHONE`, `CALENDY_URL_DEFAULT` (and the `CALENDLY_` spellings)

If no token is provided, the function returns the configured default URL.

## Netlify Deployment
- `publish = "build"` and `functions = "netlify/functions"` (see `netlify.toml`)
- SPA routing redirects to `/index.html`
- Build command: `npm run build`
- Required env var: `VITE_CHAT_API_BASE` (gateway URL). `netlify.toml` sets this to `https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev`; update there or in the Netlify UI if the endpoint changes.
- Deploy on the allowed origins for CORS: `https://ravdevops.com` or `https://www.ravdevops.com`
- Optional: Calendly variables listed above

## Testing
Jest + Testing Library (frontend):
```bash
npm test -- --runInBand
```
The chat widget has targeted coverage in `src/__tests__/ChatBot.test.jsx`.

FastAPI backend tests (Python 3.12+):
```bash
cd chat-assistant-backend
py -3.12 -m pip install -r backend/requirements.txt
py -3.12 -m pytest
```

## Versioning, Tags, and Docs
- Frontend version: `package.json`
- Legacy OpenAuxilium version: `OpenAuxilium/package.json`
- Internal docs: `wiki.md` (hub), `roadmap.md`, `timeline.md`, `RELEASES.md`
- Suggested tags: `website-vX.Y.Z` for site releases; `openauxilium-vX.Y.Z` for the legacy backend

## Notes and Security
- Keep secrets (API tokens, DB creds, etc.) out of Git; use platform secrets.
- This repo is all-rights-reserved. See `LICENSE` for details.

# Raven Development Operations — Internal Wiki (Hub)

Lightweight hub for the demo website and assistant backend wiring.

## Overview
- **Repository:** Marketing/demo site plus optional legacy assistant backend.
- **Frontend:** React 18 + Vite + React Router + Tailwind + Netlify Functions.
- **Assistant backend (production):** Cloud Run FastAPI service backed by Cloud SQL (Postgres) + OpenAI; rate-limited per IP.
- **Assistant backend (legacy/local):** `OpenAuxilium/` Node + Express (kept for experimentation only).

## Key Areas
- **Architecture:** see `README.md` for stack, deployment, and assistant wiring.
- **Functions:** `netlify/functions/create-calendly-link.js` (Calendly link helper).
- **Releases:** `RELEASES.md` for tagging guidance.
- **Planning:** `roadmap.md` and `timeline.md`.

## Pages & Routes
Frontend routes live under `src/pages/` (Home, Services, Portfolio, Blog, Pricing, About, Contact, Privacy/Terms, 404). The chatbot is defined in `src/components/ChatBot.jsx` and appears on primary pages.

## Chatbot & Backend Wiring
- **Frontend config order:**
  1. `VITE_ASSISTANT_API_URL` (recommended)
  2. `VITE_OPENAUXILIUM_URL` (legacy fallback)
  3. Default: `https://chat-assistant-backend-e4gl56kwma-uc.a.run.app`
- **Backend (Cloud Run):**
  - `POST /api/chat` — chat endpoint (no admin token needed)
  - `POST /api/{collection}` — CRUD for collections (requires admin token)
  - `GET /admin/summary` and `GET /admin/ping-db` — guarded by admin token
  - `GET /health` and `/metadata/version` — health/version
- Set `VITE_ASSISTANT_API_URL` in your environment for local dev or Netlify builds.

## Running Locally (frontend only)
```bash
npm install
npm run dev   # http://localhost:5173
```
Add a `.env.local` with `VITE_ASSISTANT_API_URL` if you want to point to a different backend URL.

## Versioning & Tags
- Frontend version is in `package.json`.
- Legacy OpenAuxilium version is in `OpenAuxilium/package.json`.
- Suggested tags: `website-vX.Y.Z` (site), `openauxilium-vX.Y.Z` (legacy backend).

## Operations Notes
- Keep secrets (API tokens, DB creds, admin tokens) out of Git; use platform secrets.
- Monitoring: rely on hosting/platform logs; expand as needed.
- Legacy Python/MongoDB backend docs remain in `chat-assistant-backend/` for historical reference only. The production backend is the Cloud Run Postgres service.

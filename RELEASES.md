# Raven Development Operations — Website Releases

This file summarizes notable release baselines for the demo website. It complements Git tags and the separate backend release process.

## website-v1.0.0 (current baseline)
- Initial marketing/demo site.
- Chatbot wired to the assistant backend via `VITE_ASSISTANT_API_URL` → Cloud Run (`/api/chat`).
- Optional legacy Node `OpenAuxilium` backend kept for local experimentation.
- Internal docs refreshed: `README.md`, `wiki.md`, `roadmap.md`, `timeline.md`, `SECURITY.md`.

### Tagging example
```bash
git tag -a website-v1.0.0 -m "Website 1.0.0 - baseline Cloud Run wiring"
git push origin website-v1.0.0
```

## openauxilium-v0.1.0 (legacy baseline)
- Express server exposing `POST /chat`, `POST /sessions`, `POST /contact-link`, `GET /health`.
- Optional local LLaMA model support via `node-llama-cpp`.
- Version in `OpenAuxilium/package.json`.

### Tagging example
```bash
git tag -a openauxilium-v0.1.0 -m "OpenAuxilium 0.1.0 - legacy baseline"
git push origin openauxilium-v0.1.0
```

## Backend note
The production assistant backend is now the Cloud Run FastAPI service backed by Cloud SQL (Postgres). Legacy Python/MongoDB assets remain in `chat-assistant-backend/` for historical reference only.

# Raven Development Operations Demo – Wiki

This wiki is a lightweight owner/developer guide for the Raven Development Operations demo website and optional assistant backend.

## Overview

- Frontend: React 18, React Router, Tailwind CSS (Create React App base).
- Assistant backend: `OpenAuxilium` (Node.js + Express + `node-llama-cpp`).
- Hosting: Netlify static site + Functions for the Calendly integration.
- Licensing: **NO LICENSE** / all-rights-reserved model for original repo content (see `LICENSE`).

## Key Files & Directories

- `src/pages/Home.jsx` – Main marketing homepage, including the “Trusted by” carousel and owner task list.
- `src/pages/` – Other pages (Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404).
- `OpenAuxilium/` – Optional assistant backend.
- `netlify/functions/create-calendly-link.js` – Calendly scheduling URL generator.
- `timeline.md` – Draft project timeline and phases.
- `roadmap.md` – Draft roadmap for future improvements and ideas.

## Owner Task List (Docs)

These are the remaining documentation-focused tasks that are also surfaced on the site’s homepage:

- [ ] Expand `timeline.md` with more granular milestones and dates.
- [ ] Refine and extend `roadmap.md` with concrete next steps and priorities.

## How to Work With This Repo

- Use `npm install` then `npm start` from the repo root to run the frontend locally.
- From `OpenAuxilium/`, `npm install` then `npm run dev` to run the assistant backend.
- Keep sensitive configuration (tokens, keys, model paths) in environment variables, not committed files.

For a high-level narrative of where the project has been and where it’s going, see `timeline.md` and `roadmap.md`.


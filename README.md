# Raven Development Operations – Demo Website

This repository contains the Raven Development Operations marketing / demo website, plus an optional local assistant backend used to power the on‑site chatbot and contact flow enrichment.
It is built with React, React Router, Tailwind CSS, Framer Motion, and Netlify serverless functions for Calendly integration.

## Features

- Multi‑page marketing site (Home, Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404).
- Animated hero, testimonial and “trusted by” sections showcasing prior work and capabilities.
- Interactive demo quizzes that walk through different engagement types and scenarios.
- On‑site chatbot (“raven” assistant) that can use a local LLaMA model and a small knowledge base.
- Contact form integrated with Netlify forms and Calendly scheduling links.
- Netlify Function to generate Calendly scheduling URLs based on meeting type.

## Tech Stack

- **Frontend:** React 18, React Router, `react-scripts` (Create React App), Tailwind CSS.
- **UI / UX:** Framer Motion animations, Heroicons, custom layout and theming.
- **Assistant backend (optional):** Node.js + Express (`OpenAuxilium` subproject) with `node-llama-cpp`.
- **Scheduling:** Calendly API via a Netlify Function (`netlify/functions/create-calendly-link.js`).
- **Deployment:** Netlify static hosting + Functions, SPA routing configured via `netlify.toml`.

## Project Structure

- `src/`
  - `pages/` – Route components such as `Home.jsx`, `Services.jsx`, `Portfolio.jsx`, `Blog.jsx`, `Contact.jsx`, `Pricing.jsx`, `Legal.jsx`, etc.
  - `components/` – Reusable UI components (hero sections, pricing tables, layout, chatbot, quizzes, etc.).
  - `quiz/` – Demo quiz flows for different engagement types (testing, dashboards, training tools, etc.).
  - `hooks/` – Shared React context/state (e.g., search, theming).
  - `assets/` – Images and brand assets used across the site.
- `public/` – Static assets, `index.html`, `manifest.json`, `og-image.svg`, `robots.txt`, `sitemap.xml`.
- `netlify/` – Netlify Functions (currently `create-calendly-link.js` for Calendly integration).
- `OpenAuxilium/` – Optional assistant backend that powers the on‑site chatbot and contact enrichment.

## Getting Started (Frontend)

### Prerequisites

- Node.js 18+
- npm (bundled with most Node.js installs)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm start
```

This starts the React app at `http://localhost:3000`.
The chatbot and contact enrichment will try to reach the assistant backend at `http://localhost:5050` unless configured otherwise.

### Build for production

```bash
npm run build
```

The production build is emitted to the `build/` directory and is what Netlify serves in production.

## Assistant Backend (`OpenAuxilium`)

The optional assistant backend lives in the `OpenAuxilium/` subdirectory.
It provides:

- A chat API (`/chat`) for the on‑site chatbot.
- Session management and light user metadata storage.
- Contact enrichment endpoint (`/contact-link`) used by the contact form.
- Local model integration via `node-llama-cpp` (no external LLM API required).

### Configuration

1. Copy `.env.example` inside `OpenAuxilium/` to `.env` and adjust values:

   - `PORT` – Port for the assistant API (default `5050`).
   - `CORS_ORIGIN` – Origin that is allowed to call the API (usually `http://localhost:3000` in development).
   - `LLAMA_MODEL_PATH`, `LLAMA_CONTEXT_SIZE`, `LLAMA_MAX_TOKENS` – Local LLaMA model configuration.
   - Calendly values (if you want the assistant to reason about bookings) such as `CALENDLY_PAT`, `CALENDLY_USER_URI`, etc.

2. In the frontend, set the base URL the chatbot and contact page should use by defining `REACT_APP_OPENAUXILIUM_URL`:

   - For local development, create `.env.local` in the project root with:

     ```bash
     REACT_APP_OPENAUXILIUM_URL=http://localhost:5050
     ```

### Running the assistant server

From the repo root:

```bash
cd OpenAuxilium
npm install
npm run dev
```

This will start the assistant server (default `http://localhost:5050`).
With both the React app and the assistant running, the chatbot and contact form enrichment will be fully wired up.

## Calendly / Netlify Function

Scheduling links are generated via the Netlify Function `netlify/functions/create-calendly-link.js`.
It can either:

- Use explicitly configured URLs per meeting type (Zoom, Teams, Google, phone), or
- Call the Calendly API to discover event types and optionally mint ephemeral scheduling links.

### Environment variables

Configure these in your Netlify site (or local Netlify dev environment):

- `CALENDY_TOKEN` or `CALENDLY_TOKEN` – Calendly PAT used for API calls.
- Optional mapping overrides:
  - `CALENDY_URL_ZOOM` / `CALENDLY_URL_ZOOM`
  - `CALENDY_URL_TEAMS` / `CALENDLY_URL_TEAMS`
  - `CALENDY_URL_GOOGLE` / `CALENDLY_URL_GOOGLE`
  - `CALENDY_URL_PHONE` / `CALENDLY_URL_PHONE`
  - `CALENDY_URL_DEFAULT` / `CALENDLY_URL_DEFAULT`

If no token is configured, the function simply returns the configured default URL.

## Netlify Deployment

Netlify is configured via `netlify.toml`:

- `publish = "build"` – serves the contents of the React production build.
- `functions = "netlify/functions"` – directory for Netlify Functions.
- SPA routing is enabled by redirecting all non‑function paths to `/index.html`.

In a typical setup you would:

1. Push this repo to GitHub (or another supported provider).
2. Connect the repo in Netlify.
3. Use `npm run build` as the Build command.
4. Set the environment variables described above (Calendly, optional assistant URL, etc.).

## Testing

This project uses the default Create React App testing setup (`@testing-library/react`, `@testing-library/jest-dom`).
To run tests:

```bash
npm test
```

You can add component tests under `src/__tests__/` following the existing patterns.

## Notes

- Secrets (Calendly tokens, model paths, etc.) should be stored in environment variables and never committed.
- The site content and copy are tailored to Raven Development Operations messaging and may assume context about DevOps, CI/CD, observability, and fractional DevOps engagements.


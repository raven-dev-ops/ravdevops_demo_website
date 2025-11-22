import blogCiShipping from '../assets/blog_ci_shipping.png';
import blogHd2Website from '../assets/blog_hd2_website.png';
import blogCommerceFrontend from '../assets/blog_commerce_frontend.png';
import blogCommerceBackend from '../assets/blog_commerce_backend.png';
import blogDiscordBot from '../assets/blog_discord_bot.png';

export const blogPosts = [
  {
    title: 'Shipping the Raven DevOps demo website with CI/CD',
    slug: 'ravdevops-demo-website-ci-cd',
    date: '2025-04-10',
    image: blogCiShipping,
    tags: ['CI/CD', 'Tooling'],
    excerpt:
      'How I built the ravdevops_demo_website repo as a React/Tailwind marketing site with a simple CI/CD pipeline and deploy previews.',
    bullets: [
      'React + Tailwind marketing site wired to GitHub.',
      'CI/CD pipeline that builds and tests on every push.',
      'Structure aimed at boring, low-friction future changes.',
    ],
    content:
      'The ravdevops_demo_website repo is the home for this marketing site. It runs on React and Tailwind, with GitHub as the source of truth and a CI/CD pipeline that builds and tests on every push. The goal was to keep things boring: a single main branch, automated builds, and a deploy target that can be replaced or extended later without rewriting everything. The repo shows how I structure the app, keep configuration in one place, and wire a straightforward pipeline so future changes stay low-friction.',
  },
  {
    title: 'Launching the Helldivers 2 gaming website for a live community',
    slug: 'helldivers2-gaming-website',
    date: '2025-04-20',
    image: blogHd2Website,
    tags: ['Cloud', 'Tooling'],
    excerpt:
      'A look at the helldivers2_gaming_website repo and how I ship a lightweight, maintainable site for an active game community.',
    bullets: [
      'Lightweight clan site focused on clarity and maintainability.',
      'Simple hosting and deployment so updates stay easy.',
      'Layouts designed for an active Helldivers 2 community.',
    ],
    content:
      'The helldivers2_gaming_website repo is a focused project: give a Helldivers 2 clan a place to live on the web without over-engineering it. I leaned on simple hosting, predictable layouts, and a deployment flow that is easy to keep updated as the clan grows. The code centers on clarity and maintainability, so new content and features can be added without turning the site into a full-blown app.',
  },
  {
    title: 'Designing an e-commerce frontend for DX and performance',
    slug: 'ecommerce-frontend-architecture',
    date: '2025-05-02',
    image: blogCommerceFrontend,
    tags: ['CI/CD', 'Tooling'],
    excerpt:
      'What I focused on in the e-commerce-frontend repo: component structure, API integration, and a CI pipeline that keeps UX fast.',
    bullets: [
      'Component hierarchy designed for easy feature growth.',
      'Clear API contracts back to the e-commerce backend.',
      'CI checks aimed at keeping UX fast and predictable.',
    ],
    content:
      'In the e-commerce-frontend repo, I treat the UI as a first-class product. The focus is on a clean component hierarchy, clear API contracts to the backend, and a CI pipeline that runs linting and basic checks on every change. The frontend is structured so that adding new pages or flows does not require rewriting existing ones, and performance considerations like bundle size and loading states are part of the design, not an afterthought.',
  },
  {
    title: 'Running the e-commerce backend with containers and CI',
    slug: 'ecommerce-backend-containers-ci',
    date: '2025-05-25',
    image: blogCommerceBackend,
    tags: ['Cloud', 'CI/CD'],
    excerpt:
      'How the e-commerce-backend repo uses containers, health checks, and CI jobs to stay boring and reliable.',
    bullets: [
      'Containerized backend built for boring, repeatable ops.',
      'Health checks and env vars tuned for simple deploys.',
      'CI jobs that run tests and keep changes safe to ship.',
    ],
    content:
      'The e-commerce-backend repo exists as a practical backend for the frontend project. It is containerized, wired to run tests in CI, and built with an eye toward boring operations: simple health checks, clear environment variables, and repeatable deploy steps. The idea is to show how an API service can be built and shipped without a lot of ceremony, while still leaving room for growth into more complex infrastructure later.',
  },
  {
    title: 'Helldivers 2 Discord OCR LFG bot: operations notes',
    slug: 'helldivers2-discord-bot',
    date: '2025-11-16',
    image: blogDiscordBot,
    tags: ['SRE', 'Tooling'],
    excerpt:
      'Lessons from the helldivers2_discord_bot repo on keeping OCR, queues, and game-night automation stable.',
    bullets: [
      'Discord bot that combines OCR with clan LFG flows.',
      'Queue discipline and rate limits to keep nights stable.',
      'Logs and metrics so drifts and failures are visible early.',
    ],
    content:
      'The helldivers2_discord_bot repo combines Discord automation with OCR to help players coordinate. Reliability matters when people are trying to jump into a session together, so I focus on queue discipline, rate limiting, and observability. Logs and metrics around OCR attempts and Discord API calls make it clear when something is drifting, and the code is structured so new commands and flows can be added without breaking existing behavior. It is a small but realistic example of production-minded bot operations.',
  },
  {
    title: 'Building the Raven DevOps company site for conversions',
    slug: 'devops-company-website',
    date: '2025-03-01',
    image: null,
    tags: ['Tooling', 'UI'],
    excerpt:
      'How the devops_company_website repo uses React, Tailwind, and motion to keep the marketing story clear and fast.',
    bullets: [
      'Route-aware SEO components for every page.',
      'Modular hero, services, and CTA blocks for rapid tweaks.',
      'Motion tuned for polish without slowing first paint.',
    ],
    content:
      'In the devops_company_website repo, I focused on clarity and conversions. Each section is componentized so new offers or CTAs can be swapped in without rewriting layouts. Tailwind keeps styling consistent, Framer Motion adds micro-animations that load quickly, and the routing metadata makes sure every page has the right preview cards for sharing. The build is kept intentionally small so content edits ship quickly without breaking critical rendering paths, and all CTAs roll up to clear, UTM-friendly links.',
  },
  {
    title: 'Scaling the chat assistant backend telemetry',
    slug: 'chat-assistant-backend-telemetry',
    date: '2025-11-21',
    image: null,
    tags: ['SRE', 'Tooling'],
    excerpt:
      'Notes from the chat-assistant-backend repo on streaming responses, telemetry toggles, and safe fallbacks.',
    bullets: [
      'Trimmed streaming payloads to keep the UI snappy.',
      'Feature-flagged telemetry with anonymized intent logging.',
      'Health-checked containers and background workers for stability.',
    ],
    content:
      'The chat-assistant-backend repo powers the Raven AI assistant. I added intent-aware replies, streaming trims so the frontend stays responsive, and a telemetry toggle that keeps event logging privacy-friendly. The service is containerized with checks for workers and the API so deploys can be observed and rolled back quickly if needed. CI runs the FastAPI test suite, and release toggles let us roll out new intent maps without redeploying the whole stack.',
  },
  {
    title: 'Automating CSV workflows with a tiny toolkit',
    slug: 'csv-automation-toolkit',
    date: '2025-02-10',
    image: null,
    tags: ['Tooling'],
    excerpt:
      'The tool_csv_data repo is a small Python kit for cleaning, transforming, and scheduling CSV jobs.',
    bullets: [
      'Config-driven transforms for repeatable runs.',
      'CLI commands for normalize, dedupe, and export tasks.',
      'Logging hooks that flag schema drift early.',
    ],
    content:
      'I built the tool_csv_data repo to make CSV workflows less brittle. Every transform is config-driven, so you can version changes and rerun them confidently. The CLI covers normalization, deduping, and exports, with logging hooks that surface failed rows and schema mismatches before they land in production systems. Pipelines can be scheduled from cron or GitHub Actions, and the toolkit ships with examples for data hygiene before ingestion into warehouses.',
  },
  {
    title: 'Designing the animated assessment webapp',
    slug: 'assessment-webapp-motion',
    date: '2025-02-18',
    image: null,
    tags: ['Tooling'],
    excerpt:
      'Inside the tool_exam_webapp repo: animated question reveals, Mongo-backed scoring, and server-rendered summaries.',
    bullets: [
      'Route handlers serve assessments from Mongo with validation.',
      'Animated steppers keep users oriented through the flow.',
      'Results are rendered server-side for easy export.',
    ],
    content:
      'The tool_exam_webapp repo packages a multi-step assessment experience. Questions load from Mongo through typed route handlers, animations make each step feel intentional, and scoring logic runs server-side so results are consistent and exportable. It is designed to be embedded or branded quickly while staying stable. Results can be downloaded or forwarded via webhook so downstream systems can trigger onboarding or follow-ups automatically.',
  },
  {
    title: 'Standing up the welding institute site fast',
    slug: 'welding-institute-site',
    date: '2025-01-12',
    image: null,
    tags: ['Tooling'],
    excerpt:
      'The welding_institute_website repo shows a Next.js scaffold tuned for training programs with quick deploys.',
    bullets: [
      'App Router baseline with typed metadata.',
      'Responsive sections ready for courses and CTAs.',
      'Netlify-friendly configs for preview deploys.',
    ],
    content:
      'In the welding_institute_website repo, I set up a simple but flexible Next.js site for a training institute. It uses the App Router, typed metadata for previews, and responsive sections that are easy to repurpose for courses or schedules. Everything is wired for quick Netlify deploys so content changes can ship fast. The structure leaves room for course catalogs and instructor bios without needing to rewrite layout primitives.',
  },
  {
    title: 'Launching the welding services marketing site',
    slug: 'welding-service-site',
    date: '2025-01-20',
    image: null,
    tags: ['Tooling'],
    excerpt:
      'A lightweight Next.js build in the welding_service_website repo aimed at clear service listings and fast contact.',
    bullets: [
      'Hero and services grids that are easy to edit.',
      'Contact CTAs ready for mailto or form integrations.',
      'Mobile-first layout that keeps images in check.',
    ],
    content:
      'The welding_service_website repo focuses on speed and clarity. It ships with a simple hero, service grid, and CTA blocks that can be wired to mailto links or forms. The layout is mobile-first and keeps image aspect ratios predictable to avoid layout shifts, making it a solid base for a trades marketing site. Content editors can swap copy and contact targets without touching the build pipeline, keeping updates low-friction.',
  },
];

import discordBotSs1 from '../assets/discord_bot_ss_1.png';
import discordBotSs2 from '../assets/discord_bot_ss_2.png';
import discordBotSs3 from '../assets/discord_bot_ss_3.png';
import discordBotSs4 from '../assets/discord_bot_ss_4.png';
import artbayBackendSs1 from '../assets/artbay_backend_ss_1.png';
import artbayBackendSs2 from '../assets/artbay_backend_ss_2.png';
import artbayBackendSs3 from '../assets/artbay_backend_ss_3.png';
import artbayBackendSs4 from '../assets/artbay_backend_ss_4.png';
import artbayFrontendSs1 from '../assets/artbay_frontend_ss_1.png';
import artbayFrontendSs2 from '../assets/artbay_frontend_ss_2.png';
import artbayFrontendSs3 from '../assets/artbay_frontend_ss_3.png';
import artbayFrontendSs4 from '../assets/artbay_frontend_ss_4.png';
import helldiverSiteSs1 from '../assets/helldiver2_website_ss_1.png';
import helldiverSiteSs2 from '../assets/helldiver2_website_ss_2.png';
import helldiverSiteSs3 from '../assets/helldiver2_website_ss_3.png';
import helldiverSiteSs4 from '../assets/helldiver2_website_ss_4.png';

export const portfolioItems = [
  {
    title: 'Helldivers 2 Gaming Website',
    slug: 'helldivers-gaming-website',
    date: '2025-04-20',
    description:
      'Galactic Phantom Division site with NextAuth auth, Mongo-backed profiles, and interactive hero states.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Styled Components', 'Vercel'],
    tags: ['Cloud', 'Tooling'],
    outcomes: [
      'Containerized build and deploy pipeline with CI-ready Dockerfiles for consistent releases.',
      'Secrets management and environment configuration kept in sync across preview and production deployments.',
      'Discord webhook automation implemented with rate-aware queues to stay within API limits while remaining responsive.',
    ],
    github: 'https://github.com/raven-dev-ops/helldivers2_gaming_website',
    screenshots: [helldiverSiteSs1, helldiverSiteSs2, helldiverSiteSs3, helldiverSiteSs4],
  },
  {
    title: 'Art Bay Backend',
    slug: 'ecommerce-backend',
    date: '2025-05-25',
    description:
      'Modular Django backbone for storefronts with payments, orders, and CI-ready Docker images.',
    tech: ['Django', 'Docker', 'PostgreSQL', 'GitHub Actions'],
    tags: ['Cloud', 'CI/CD'],
    outcomes: [
      'Production-grade container images with health checks and an automated static asset pipeline.',
      'Environment templates and .env.example files that make onboarding new developers straightforward.',
      'Pre-commit hooks and CI workflows that keep migrations, tests, and linting consistently green.',
    ],
    github: 'https://github.com/raven-dev-ops/e-commerce-backend',
    screenshots: [artbayBackendSs1, artbayBackendSs2, artbayBackendSs3, artbayBackendSs4],
  },
  {
    title: 'Art Bay Frontend',
    slug: 'art-bay-frontend',
    date: '2025-05-02',
    description:
      'Headless storefront with Stripe, JWT auth, and DRF integration shipped to Netlify.',
    tech: ['Next.js', 'Stripe', 'Netlify', 'JWT', 'DRF'],
    tags: ['CI/CD', 'Tooling'],
    outcomes: [
      'Clear separation of public versus secret environment variables for safe, reproducible builds.',
      'Optimized static asset pipeline and CDN-friendly deployment tuned for fast page loads.',
      'Secure payment flow with retries and safeguards around Stripe API and webhook failures.',
    ],
    github: 'https://github.com/raven-dev-ops/e-commerce-frontend',
    screenshots: [artbayFrontendSs1, artbayFrontendSs2, artbayFrontendSs3, artbayFrontendSs4],
  },
  {
    title: 'Helldivers 2 Discord Bot',
    slug: 'helldivers-bot',
    date: '2025-11-16',
    description:
      'Python bot with OCR pipelines, scheduled leaderboards, and multi-guild configuration.',
    tech: ['Python', 'Docker', 'MongoDB', 'OCR', 'Heroku'],
    tags: ['SRE', 'Tooling'],
    outcomes: [
      'Scheduled jobs for leaderboard generation and health checks so the bot remains reliable during peak usage.',
      'Background OCR processing with controlled concurrency to keep image queues flowing without overloading services.',
      'Per-guild configuration and secrets isolation so each community stays logically separated and secure.',
    ],
    github: 'https://github.com/raven-dev-ops/helldivers2_discord_bot',
    screenshots: [
      discordBotSs1,
      discordBotSs2,
      discordBotSs3,
      discordBotSs4,
    ],
  },
  {
    title: 'Chat Assistant Backend',
    slug: 'chat-assistant-backend',
    date: '2025-11-21',
    description:
      'Python engine for Raven AI that handles intents, telemetry, and rate-aware streaming to the frontend.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    tags: ['Tooling', 'SRE'],
    outcomes: [
      'Streaming responses with trimmed payloads and safe fallbacks to keep the UI responsive.',
      'Feature-flagged telemetry pipeline with anonymized event logging for intent quality tuning.',
      'Containerized workers and API service with health checks for predictable deploys.',
    ],
    github: 'https://github.com/raven-dev-ops/chat-assistant-backend',
    screenshots: [],
  },
  {
    title: 'Raven DevOps Company Website',
    slug: 'devops-company-website',
    date: '2025-03-01',
    description:
      'React single-page marketing site with hero motion, product sections, and lead capture routes.',
    tech: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    tags: ['Tooling', 'UI'],
    outcomes: [
      'SEO and meta components wired per route with social previews.',
      'Componentized hero, services, and CTA blocks for rapid iteration without rewrites.',
      'Lightweight animations tuned for 60fps without blocking content.',
    ],
    github: 'https://github.com/raven-dev-ops/devops_company_website',
    screenshots: [],
  },
  {
    title: 'CSV Automation Toolkit',
    slug: 'tool-csv-data',
    date: '2025-02-10',
    description:
      'Python utility set for cleaning, transforming, and scheduling CSV workflows.',
    tech: ['Python', 'Pandas', 'CLI'],
    tags: ['Tooling'],
    outcomes: [
      'Reusable CLI commands for normalize, dedupe, and export jobs.',
      'Config-driven transforms so pipelines stay versioned and repeatable.',
      'Logging hooks to surface failed rows and schema drift early.',
    ],
    github: 'https://github.com/raven-dev-ops/tool_csv_data',
    screenshots: [],
  },
  {
    title: 'Assessment Web App',
    slug: 'tool-exam-webapp',
    date: '2025-02-18',
    description:
      'Multi-step questionnaire with animated reveals, Mongo-backed scoring, and server-rendered results.',
    tech: ['Next.js', 'MongoDB', 'Framer Motion', 'Tailwind'],
    tags: ['Tooling'],
    outcomes: [
      'Route handlers that serve assessments from Mongo with schema validation.',
      'Animated stepper UI that keeps users oriented while collecting answers.',
      'Result scoring and summary download endpoints ready for audits.',
    ],
    github: 'https://github.com/raven-dev-ops/tool_exam_webapp',
    screenshots: [],
  },
  {
    title: 'Welding Institute Website',
    slug: 'welding-institute',
    date: '2025-01-12',
    description:
      'Next.js marketing site scaffolded for a training institute with responsive layouts.',
    tech: ['Next.js', 'Tailwind'],
    tags: ['Tooling'],
    outcomes: [
      'App Router baseline with typed metadata and layout slots ready for content.',
      'Responsive sections and hero ready for course highlights and CTAs.',
      'Netlify-friendly configuration for quick deploy previews.',
    ],
    github: 'https://github.com/raven-dev-ops/welding_institute_website',
    screenshots: [],
  },
  {
    title: 'Welding Service Website',
    slug: 'welding-service',
    date: '2025-01-20',
    description:
      'Lightweight marketing site for a welding services business with clear service listings.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    tags: ['Tooling'],
    outcomes: [
      'Hero and services grid tuned for quick edits without touching code-heavy areas.',
      'Contact CTA blocks wired for easy form or mailto integrations.',
      'Mobile-first layout with image-safe aspect ratios to avoid CLS.',
    ],
    github: 'https://github.com/raven-dev-ops/welding_service_website',
    screenshots: [],
  },
];

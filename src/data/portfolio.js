export const portfolioItems = [
  {
    title: 'Galactic Phantom Division Website',
    slug: 'galactic-phantom-division',
    description:
      'Helldivers clan platform with authentication, Discord automation, and cloud deployment built for resilience.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Docker', 'Heroku'],
    outcomes: [
      'Containerized build pipeline with CI-ready Dockerfile',
      'Secure secret management and environment parity for preview deployments',
      'Discord webhook automation with rate-limit aware queues',
    ],
    github: 'https://github.com/ravdevops/helldivers2_clan_website',
    screenshots: ['/portfolio/galactic-phantom-1.png', '/portfolio/galactic-phantom-2.png'],
  },
  {
    title: 'Art Bay Backend (Django)',
    slug: 'ecommerce-backend',
    description:
      'Modular Django backbone for storefronts with payments, orders, and CI-ready Docker images.',
    tech: ['Django', 'Docker', 'PostgreSQL', 'GitHub Actions'],
    outcomes: [
      'Production-grade container images with health checks and static asset pipeline',
      'Environment templating with .env.example to simplify onboarding',
      'Pre-commit hooks and CI to keep migrations, tests, and linting green',
    ],
    github: 'https://github.com/ravdevops/e-commerce-backend',
    screenshots: ['/portfolio/art-bay-backend-1.png', '/portfolio/art-bay-backend-2.png'],
  },
  {
    title: 'Art Bay Frontend (Next.js Storefront)',
    slug: 'art-bay-frontend',
    description:
      'Headless storefront with Stripe, JWT auth, and DRF integration shipped to Netlify.',
    tech: ['Next.js', 'Stripe', 'Netlify', 'JWT', 'DRF'],
    outcomes: [
      'Clear separation of public vs secret env vars for safe builds',
      'Optimized static asset pipeline and CDN-friendly deployment',
      'Secure payment flow with resilience around API and webhook retries',
    ],
    github: 'https://github.com/ravdevops/e-commerce-frontend',
    screenshots: ['/portfolio/art-bay-frontend-1.png', '/portfolio/art-bay-frontend-2.png'],
  },
  {
    title: 'Helldivers 2 Discord Bot',
    slug: 'helldivers-bot',
    description:
      'Python bot with OCR pipelines, scheduled leaderboards, and multi-guild configuration.',
    tech: ['Python', 'Docker', 'MongoDB', 'OCR', 'Heroku'],
    outcomes: [
      'Scheduled jobs for leaderboard generation and uptime monitoring',
      'Background OCR processing with safe concurrency for image queues',
      'Config and secrets managed per guild with environment isolation',
    ],
    github: 'https://github.com/ravdevops/helldivers2_discord_ocr_lfg_clan_bot',
    screenshots: ['/portfolio/helldivers-bot-1.png', '/portfolio/helldivers-bot-2.png'],
  },
];

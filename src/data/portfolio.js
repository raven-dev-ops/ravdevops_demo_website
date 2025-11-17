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
    title: 'Galactic Phantom Taskforce Website',
    slug: 'galactic-phantom-taskforce',
    description:
      'Helldivers clan platform with authentication, Discord automation, and cloud deployment built for resilience.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Docker', 'Heroku'],
    outcomes: [
      'Containerized build and deploy pipeline with CI-ready Dockerfiles for consistent releases.',
      'Secrets management and environment configuration kept in sync across preview and production deployments.',
      'Discord webhook automation implemented with rate-aware queues to stay within API limits while remaining responsive.',
    ],
    github: 'https://github.com/ravdevops/helldivers2_clan_website',
    screenshots: [helldiverSiteSs1, helldiverSiteSs2, helldiverSiteSs3, helldiverSiteSs4],
  },
  {
    title: 'Art Bay Backend',
    slug: 'ecommerce-backend',
    description:
      'Modular Django backbone for storefronts with payments, orders, and CI-ready Docker images.',
    tech: ['Django', 'Docker', 'PostgreSQL', 'GitHub Actions'],
    outcomes: [
      'Production-grade container images with health checks and an automated static asset pipeline.',
      'Environment templates and .env.example files that make onboarding new developers straightforward.',
      'Pre-commit hooks and CI workflows that keep migrations, tests, and linting consistently green.',
    ],
    github: 'https://github.com/ravdevops/e-commerce-backend',
    screenshots: [artbayBackendSs1, artbayBackendSs2, artbayBackendSs3, artbayBackendSs4],
  },
  {
    title: 'Art Bay Frontend',
    slug: 'art-bay-frontend',
    description:
      'Headless storefront with Stripe, JWT auth, and DRF integration shipped to Netlify.',
    tech: ['Next.js', 'Stripe', 'Netlify', 'JWT', 'DRF'],
    outcomes: [
      'Clear separation of public versus secret environment variables for safe, reproducible builds.',
      'Optimized static asset pipeline and CDN-friendly deployment tuned for fast page loads.',
      'Secure payment flow with retries and safeguards around Stripe API and webhook failures.',
    ],
    github: 'https://github.com/ravdevops/e-commerce-frontend',
    screenshots: [artbayFrontendSs1, artbayFrontendSs2, artbayFrontendSs3, artbayFrontendSs4],
  },
  {
    title: 'Helldivers 2 Discord Bot',
    slug: 'helldivers-bot',
    description:
      'Python bot with OCR pipelines, scheduled leaderboards, and multi-guild configuration.',
    tech: ['Python', 'Docker', 'MongoDB', 'OCR', 'Heroku'],
    outcomes: [
      'Scheduled jobs for leaderboard generation and health checks so the bot remains reliable during peak usage.',
      'Background OCR processing with controlled concurrency to keep image queues flowing without overloading services.',
      'Per-guild configuration and secrets isolation so each community stays logically separated and secure.',
    ],
    github: 'https://github.com/ravdevops/helldivers2_discord_ocr_lfg_clan_bot',
    screenshots: [
      discordBotSs1,
      discordBotSs2,
      discordBotSs3,
      discordBotSs4,
    ],
  },
];

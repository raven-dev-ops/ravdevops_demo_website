export const blogPosts = [
  {
    title: 'Shipping the Raven DevOps demo website with CI/CD',
    slug: 'ravdevops-demo-website-ci-cd',
    date: '2025-04-10',
    tags: ['CI/CD', 'Tooling'],
    excerpt:
      'How I built the ravdevops_demo_website repo as a React/Tailwind marketing site with a simple CI/CD pipeline and deploy previews.',
    content:
      'The ravdevops_demo_website repo is the home for this marketing site. It runs on React and Tailwind, with GitHub as the source of truth and a CI/CD pipeline that builds and tests on every push. The goal was to keep things boring: a single main branch, automated builds, and a deploy target that can be replaced or extended later without rewriting everything. The repo shows how I structure the app, keep configuration in one place, and wire a straightforward pipeline so future changes stay low-friction.',
  },
  {
    title: 'Launching the Helldivers 2 clan website for a live community',
    slug: 'helldivers2-clan-website',
    date: '2025-04-20',
    tags: ['Cloud', 'Tooling'],
    excerpt:
      'A look at the helldivers2_clan_website repo and how I ship a lightweight, maintainable site for an active game community.',
    content:
      'The helldivers2_clan_website repo is a focused project: give a Helldivers 2 clan a place to live on the web without over-engineering it. I leaned on simple hosting, predictable layouts, and a deployment flow that is easy to keep updated as the clan grows. The code centers on clarity and maintainability, so new content and features can be added without turning the site into a full-blown app.',
  },
  {
    title: 'Designing an e-commerce frontend for DX and performance',
    slug: 'ecommerce-frontend-architecture',
    date: '2025-05-02',
    tags: ['CI/CD', 'Tooling'],
    excerpt:
      'What I focused on in the e-commerce-frontend repo: component structure, API integration, and a CI pipeline that keeps UX fast.',
    content:
      'In the e-commerce-frontend repo, I treat the UI as a first-class product. The focus is on a clean component hierarchy, clear API contracts to the backend, and a CI pipeline that runs linting and basic checks on every change. The frontend is structured so that adding new pages or flows does not require rewriting existing ones, and performance considerations like bundle size and loading states are part of the design, not an afterthought.',
  },
  {
    title: 'Running the e-commerce backend with containers and CI',
    slug: 'ecommerce-backend-containers-ci',
    date: '2025-05-25',
    tags: ['Cloud', 'CI/CD'],
    excerpt:
      'How the e-commerce-backend repo uses containers, health checks, and CI jobs to stay boring and reliable.',
    content:
      'The e-commerce-backend repo exists as a practical backend for the frontend project. It is containerized, wired to run tests in CI, and built with an eye toward boring operations: simple health checks, clear environment variables, and repeatable deploy steps. The idea is to show how an API service can be built and shipped without a lot of ceremony, while still leaving room for growth into more complex infrastructure later.',
  },
  {
    title: 'Helldivers 2 Discord OCR LFG bot: operations notes',
    slug: 'helldivers2-discord-ocr-bot',
    date: '2025-11-16',
    tags: ['SRE', 'Tooling'],
    excerpt:
      'Lessons from the helldivers2_discord_ocr_lfg_clan_bot repo on keeping OCR, queues, and game-night automation stable.',
    content:
      'The helldivers2_discord_ocr_lfg_clan_bot repo combines Discord automation with OCR to help players coordinate. Reliability matters when people are trying to jump into a session together, so I focus on queue discipline, rate limiting, and observability. Logs and metrics around OCR attempts and Discord API calls make it clear when something is drifting, and the code is structured so new commands and flows can be added without breaking existing behavior. It is a small but realistic example of production-minded bot operations.',
  },
];

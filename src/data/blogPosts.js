export const blogPosts = [
  {
    title: 'How I structure Next.js apps for smooth CI/CD',
    slug: 'nextjs-ci-cd-structure',
    date: '2024-08-12',
    tags: ['CI/CD', 'Tooling'],
    excerpt:
      'Patterns for separating environments, taming env vars, and keeping preview deploys fast when your Next.js codebase grows.',
    content: `When a Next.js repo starts scaling, the CI signal-to-noise ratio matters. I enforce a mono-repo friendly folder layout, keep env var contracts typed, and run pull-request preview builds that mirror production builds. The goal: developers feel confident merging because linting, type-checks, and e2e smoke tests run in parallel and artifacts are uploaded for QA.`,
  },
  {
    title: 'Lessons from running a Django e-commerce backend in containers',
    slug: 'django-ecommerce-containers',
    date: '2024-07-02',
    tags: ['Cloud', 'CI/CD'],
    excerpt:
      'A quick tour of Dockerfile patterns, health checks, and secrets hygiene that keep a Django stack boring and reliable.',
    content:
      'Containers are great until they are not. For Django, I bake in collectstatic, use multi-stage builds, and keep ENTRYPOINT scripts simple. Add health checks for gunicorn, align dev and prod docker-compose, and wire GitHub Actions to lint migrations before deploying. A boring pipeline is a resilient pipeline.',
  },
  {
    title: 'Building a Discord bot with OCR and keeping it reliable in production',
    slug: 'discord-bot-ocr-reliability',
    date: '2024-05-18',
    tags: ['SRE', 'Tooling'],
    excerpt:
      'How I keep OCR pipelines, scheduled leaderboards, and multi-guild configs running without waking up at 2 a.m.',
    content:
      'Reliability for bots is about queue discipline and observability. Structured logs around OCR attempts, Prometheus counters for failures, and alerts when rate limits spike give you confidence. I lean on background workers, idempotent tasks, and feature flags to keep Discord experiences stable.',
  },
];

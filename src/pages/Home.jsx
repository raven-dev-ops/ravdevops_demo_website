import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SeoHead from '../components/SeoHead';
import ravenHomeLogo from '../assets/raven_home_logo.png';
import trusted1Stirling from '../assets/trusted1_stirling.webp';
import trusted2GptStudios from '../assets/trusted2_gptstudios.png';
import trusted3ColonialKc from '../assets/trusted3_colonialkc.png';
import trusted4Twiinz from '../assets/trusted4_twiinz.webp';
import trusted5Criders from '../assets/trusted5_criders.webp';
import trusted6Rowe from '../assets/trusted6_rowe.png';

const benefits = [
  {
    title: 'Faster releases',
    text: 'CI/CD automation, reliable branching, and preview deploys that keep PRs moving without adding full-time DevOps headcount.',
  },
  {
    title: 'Fewer outages',
    text: 'Observability, SRE guardrails, and change management tuned for your team so incidents are rarer, shorter, and less expensive.',
  },
  {
    title: 'Lower infra waste',
    text: 'Cloud cost reviews, right-sized environments, and policy-backed automation that improve ROI versus hiring and ramping an in-house DevOps team.',
  },
];

const trust = [
  'Small SaaS and e-commerce teams',
  'Internal platform & DevOps groups',
  'Government and public sector pilots',
];

const trustTagClasses = [
  'border-pink-500/80 bg-pink-500/10 text-pink-200',
  'border-pink-500/80 bg-pink-500/10 text-pink-200',
  'border-pink-500/80 bg-pink-500/10 text-pink-200',
  'border-raven-border/70 bg-raven-surface/80 text-slate-200',
];

const trustedLogos = [
  {
    name: 'Twiinz Beard, Balm, & Essentials',
    src: trusted4Twiinz,
    review:
      'Set up a Squarespace storefront with products, documentation, and step-by-step onboarding, including video walkthroughs for the team.',
  },
  {
    name: 'Stirling Innovations, LLC',
    src: trusted1Stirling,
    review:
      'Integrated Google Workspace and BigQuery, delivered individual training, and refreshed the marketing site and membership pipeline.',
  },
  {
    name: "Crider's Institute of Welding Technology",
    src: trusted5Criders,
    review:
      'Cloned and migrated their site away from an expensive host, giving the institute full control and significantly lower ongoing costs.',
  },
  {
    name: 'Rowe & Oak Coffee Co.',
    src: trusted6Rowe,
    review:
      'Delivered a complete brand discovery and logo package, with assets prepared for web, print, and social media.',
  },
  {
    name: 'Galactic Phantom Taskforce',
    src: trusted2GptStudios,
    review:
      'Built a MongoDB-backed Discord bot that automated admin workflows for a gaming community of more than 90,000 concurrent players.',
  },
  {
    name: 'Colonial KC',
    src: trusted3ColonialKc,
    review:
      'Built a web-based assessment tool with 40 targeted questions, automated scoring, instructor email reports, an at-a-glance results matrix, optional self-emailing of results, and notifications whenever a new assessment is completed.',
  },
];

const platforms = ['AWS', 'Azure', 'GCP', 'Django', 'Next.js', 'MongoDB', 'Stripe'];
const tooling = ['Docker', 'Kubernetes', 'GitHub Actions'];
const languages = ['Python', 'JavaScript', 'TypeScript'];

const pillDescriptions = {
  Docker: 'Ex: Package services into portable containers for consistent local and production behavior.',
  Kubernetes: 'Ex: Orchestrate containers for scaling, rollout strategies, and self-healing workloads.',
  'GitHub Actions': 'Ex: Run CI workflows for tests, linting, and deploys on every push or PR.',
  AWS: 'Ex: Host workloads on EC2, ECS, Lambda, and managed databases with infrastructure as code.',
  Azure: 'Ex: Deploy apps to Azure Web Apps, Functions, and managed data services with pipelines.',
  GCP: 'Ex: Run services on GKE, Cloud Run, and managed storage with observability built in.',
  Django: 'Ex: Build API- and admin-heavy backends quickly with batteries-included Django.',
  'Next.js': 'Ex: Ship React frontends with SSR, routing, and API routes in a single framework.',
  MongoDB: 'Ex: Store JSON-like documents for fast iteration on product schemas.',
  Stripe: 'Ex: Handle payments, subscriptions, and invoicing with battle-tested payment rails.',
  Python: 'Ex: Write backends, scripts, and automation that are easy to read and maintain.',
  JavaScript: 'Ex: Build interactive web experiences and glue code across the stack.',
  TypeScript: 'Ex: Add type safety to JavaScript so large codebases stay manageable.',
};

function TrustedByCarousel({ index }) {
  const total = trustedLogos.length;

  if (!trustedLogos || total === 0) return null;

  const current = trustedLogos[index % total];
  const isColonial = current.name === 'Colonial KC';
  const isRowe = current.name === 'Rowe & Oak Coffee Co.';
  const isGalactic = current.name === 'Galactic Phantom Taskforce';
  const hasCircleFrame = isRowe || isGalactic;
  const logoSizeClass = isColonial ? 'h-24 sm:h-28' : 'h-32 sm:h-36';

  return (
    <div className="mt-7 mb-7 flex flex-col items-center gap-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex w-full max-w-2xl flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7"
        >
          <div
            className={`flex items-center justify-center p-2 ${
              hasCircleFrame ? 'rounded-full border border-raven-border/70' : 'rounded-md'
            } ${isColonial ? 'bg-slate-900/80' : 'bg-transparent'} dark:bg-black/40`}
          >
            <img
              src={current.src}
              alt={current.name}
              className={`${logoSizeClass} w-auto object-contain`}
            />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-lg font-semibold text-white">{current.name}</p>
            <p className="text-base text-slate-300">{current.review}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [trustedIndex, setTrustedIndex] = React.useState(0);
  const [activePill, setActivePill] = React.useState(null);
  const openPillTimeoutRef = React.useRef(null);
  const closePillTimeoutRef = React.useRef(null);
  const totalTrusted = trustedLogos.length;

  React.useEffect(() => {
    if (totalTrusted <= 1) return undefined;

    const id = setInterval(() => {
      setTrustedIndex((prev) => (prev + 1) % totalTrusted);
    }, 5000);

    return () => clearInterval(id);
  }, [totalTrusted]);

  React.useEffect(() => {
    return () => {
      if (openPillTimeoutRef.current) clearTimeout(openPillTimeoutRef.current);
      if (closePillTimeoutRef.current) clearTimeout(closePillTimeoutRef.current);
    };
  }, []);

  const handlePillEnter = (label) => {
    if (openPillTimeoutRef.current) {
      clearTimeout(openPillTimeoutRef.current);
      openPillTimeoutRef.current = null;
    }
    if (closePillTimeoutRef.current) {
      clearTimeout(closePillTimeoutRef.current);
      closePillTimeoutRef.current = null;
    }

    openPillTimeoutRef.current = setTimeout(() => {
      setActivePill(label);
      openPillTimeoutRef.current = null;
    }, 2000);
  };

  const handlePillClick = (label) => {
    if (openPillTimeoutRef.current) {
      clearTimeout(openPillTimeoutRef.current);
      openPillTimeoutRef.current = null;
    }
    if (closePillTimeoutRef.current) {
      clearTimeout(closePillTimeoutRef.current);
      closePillTimeoutRef.current = null;
    }

    setActivePill(label);

    closePillTimeoutRef.current = setTimeout(() => {
      setActivePill((current) => (current === label ? null : current));
      closePillTimeoutRef.current = null;
    }, 2000);
  };

  const handlePillLeave = (label) => {
    if (openPillTimeoutRef.current) {
      clearTimeout(openPillTimeoutRef.current);
      openPillTimeoutRef.current = null;
    }
    if (closePillTimeoutRef.current) {
      clearTimeout(closePillTimeoutRef.current);
      closePillTimeoutRef.current = null;
    }

    closePillTimeoutRef.current = setTimeout(() => {
      setActivePill((current) => (current === label ? null : current));
      closePillTimeoutRef.current = null;
    }, 2000);
  };

  const goPrevTrusted = () => setTrustedIndex((prev) => (prev - 1 + totalTrusted) % totalTrusted);
  const goNextTrusted = () => setTrustedIndex((prev) => (prev + 1) % totalTrusted);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 lg:px-6 lg:py-16">
      <SeoHead
        title="Fractional DevOps with clear timelines | Raven Development Operations"
        description="Fractional DevOps and premium CI/CD sprints with clearly scoped timelines, milestones, and outcomes across cloud and observability."
        path="/"
      />

      <section className="grid gap-10 rounded-3xl border border-raven-border/60 bg-white/90 p-8 shadow-soft-glow dark:bg-gradient-to-br dark:from-raven-card/80 dark:to-raven-surface/60 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-raven-border/70 bg-white/80 text-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan dark:bg-raven-card dark:text-slate-100">
            Raven Development Operations
          </p>
          <div className="flex items-center gap-4">
            <img
              src={ravenHomeLogo}
              alt="Raven Development Operations logo"
              className="hidden h-48 w-48 sm:block"
            />
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Fractional DevOps with clear timelines
            </h1>
          </div>
          <p className="text-lg text-slate-300">
            I help teams move from ad-hoc releases to disciplined delivery: CI/CD pipelines, cloud automation, observability,
            and SRE practices tailored to your stack.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://calendly.com/ravendevops/discovery-meeting"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow transition-transform hover:from-raven-accent/90 hover:to-raven-cyan/90 hover:scale-105"
            >
              Book a discovery call
            </a>
            <Link
              to="/portfolio"
              className="rounded-full border border-raven-border/70 bg-raven-card px-6 py-3 text-base font-semibold text-slate-100 transition-transform hover:border-raven-accent/70 hover:scale-105"
            >
              View portfolio
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-raven-border/60 bg-white/90 dark:bg-raven-card/80 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-raven-cyan/10 via-raven-accent/5 to-transparent blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-raven-border/70 bg-slate-50/90 dark:bg-raven-surface/70 p-4">
              <div className="mt-1 h-2 w-2 rounded-full bg-raven-accent" />
              <div>
                <p className="text-sm text-slate-400">Pipeline snapshot</p>
                <p className="text-lg font-semibold text-white">Main branch → zero-downtime deploy</p>
                <p className="text-sm text-slate-300">
                  Tests → Build image → Push to registry → Deploy → Health checks
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['PR previews', 'Policy as code', 'Observability', 'Cost guardrails'].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-raven-border/60 bg-slate-50/90 text-slate-800 p-4 dark:bg-raven-card/80 dark:text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-raven-border/70 bg-white/90 p-6 shadow-inner shadow-black/10 dark:bg-raven-card/60"
          >
            <div className="mb-3 flex items-center gap-2">
              <CheckCircleIcon className="h-6 w-6 text-raven-accent" />
              <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-300">{benefit.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-raven-border/70 bg-white/90 p-4 dark:bg-raven-card/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              Tooling
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {tooling.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePillClick(item)}
                  onMouseEnter={() => handlePillEnter(item)}
                  onMouseLeave={() => handlePillLeave(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition transform hover:outline hover:outline-2 hover:outline-raven-accent ${
                    activePill === item
                      ? 'scale-105 border-raven-accent bg-raven-accent/20 text-raven-accent shadow-soft-glow outline outline-2 outline-raven-accent'
                      : 'border-raven-accent bg-raven-accent/10 text-raven-accent hover:border-raven-accent/80 hover:bg-raven-accent/15'
                  }`}
                >
                  <span>{item}</span>
                  <AnimatePresence initial={false}>
                    {activePill === item && (
                      <motion.span
                        key={`tooling-${item}`}
                        className="mt-1 block text-xs text-slate-100"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                      >
                        {pillDescriptions[item] || 'Ex: Commonly used in DevOps client projects.'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-raven-border/70 bg-white/90 p-4 dark:bg-raven-card/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              Platforms
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {platforms.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePillClick(item)}
                  onMouseEnter={() => handlePillEnter(item)}
                  onMouseLeave={() => handlePillLeave(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition transform hover:outline hover:outline-2 hover:outline-violet-300 ${
                    activePill === item
                      ? 'scale-105 border-violet-500 bg-violet-500/20 text-violet-200 shadow-soft-glow outline outline-2 outline-violet-300'
                      : 'border-violet-500 bg-violet-500/10 text-violet-200 hover:border-violet-400/80 hover:bg-violet-500/15'
                  }`}
                >
                  <span>{item}</span>
                  <AnimatePresence initial={false}>
                    {activePill === item && (
                      <motion.span
                        key={`platform-${item}`}
                        className="mt-1 block text-xs text-slate-100"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                      >
                        {pillDescriptions[item] || 'Ex: Platforms we regularly deploy to.'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-raven-border/70 bg-white/90 p-4 dark:bg-raven-card/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">Languages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handlePillClick(lang)}
                  onMouseEnter={() => handlePillEnter(lang)}
                  onMouseLeave={() => handlePillLeave(lang)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition transform hover:outline hover:outline-2 hover:outline-amber-300 ${
                    activePill === lang
                      ? 'scale-105 border-raven-amber bg-raven-amber/20 text-raven-amber shadow-soft-glow outline outline-2 outline-amber-300'
                      : 'border-raven-amber bg-raven-amber/10 text-raven-amber hover:border-raven-amber/80 hover:bg-raven-amber/15'
                  }`}
                >
                  <span>{lang}</span>
                  <AnimatePresence initial={false}>
                    {activePill === lang && (
                      <motion.span
                        key={`language-${lang}`}
                        className="mt-1 block text-xs text-slate-100"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                      >
                        {pillDescriptions[lang] || 'Ex: Languages we use to ship production systems.'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-raven-border/60 bg-white/90 p-6 dark:bg-raven-card/60">
        <h2 className="text-2xl font-bold text-white">Trusted by</h2>
        <TrustedByCarousel index={trustedIndex} />
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-slate-300">
          {trust.map((item, index) => {
            const colorClass = trustTagClasses[index % trustTagClasses.length];
            return (
              <span
                key={item}
                className={`rounded-full px-4 py-2 text-sm ${colorClass}`}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrevTrusted}
            className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 transition transform hover:-translate-y-0.5 hover:scale-110 hover:border-raven-accent/80 hover:bg-raven-card/90 hover:shadow-soft-glow"
          >
            {'<'}
          </button>
          <div className="flex items-center gap-1">
            {trustedLogos.map((logo, i) => (
              <span
                key={logo.name}
                className={`h-1.5 w-1.5 rounded-full ${i === trustedIndex ? 'bg-raven-accent' : 'bg-slate-500'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNextTrusted}
            className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 transition transform hover:-translate-y-0.5 hover:scale-110 hover:border-raven-accent/80 hover:bg-raven-card/90 hover:shadow-soft-glow"
          >
            {'>'}
          </button>
        </div>
      </section>
    </div>
  );
}

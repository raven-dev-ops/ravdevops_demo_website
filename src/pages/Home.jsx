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
  'border-raven-accent/70 bg-raven-accent/10 text-raven-accent',
  'border-raven-cyan/70 bg-raven-cyan/10 text-raven-cyan',
  'border-raven-amber/70 bg-raven-amber/10 text-raven-amber',
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
    name: 'GPT Studio',
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

function TrustedByCarousel({ index }) {
  const total = trustedLogos.length;

  if (!trustedLogos || total === 0) return null;

  const current = trustedLogos[index % total];

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
          <img
            src={current.src}
            alt={current.name}
            className="h-28 w-28 rounded-md object-contain sm:h-32 sm:w-32"
          />
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
  const totalTrusted = trustedLogos.length;

  React.useEffect(() => {
    if (totalTrusted <= 1) return undefined;

    const id = setInterval(() => {
      setTrustedIndex((prev) => (prev + 1) % totalTrusted);
    }, 5000);

    return () => clearInterval(id);
  }, [totalTrusted]);

  const goPrevTrusted = () => setTrustedIndex((prev) => (prev - 1 + totalTrusted) % totalTrusted);
  const goNextTrusted = () => setTrustedIndex((prev) => (prev + 1) % totalTrusted);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 lg:px-6 lg:py-16">
      <SeoHead
        title="Fractional DevOps with clear timelines | Raven Development Operations"
        description="Fractional DevOps and premium CI/CD sprints with clearly scoped timelines, milestones, and outcomes across cloud and observability."
        path="/"
      />

      <section className="grid gap-10 rounded-3xl border border-raven-border/60 bg-gradient-to-br from-raven-card/80 to-raven-surface/60 p-8 shadow-soft-glow md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
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
              className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow hover:from-raven-accent/90 hover:to-raven-cyan/90"
            >
              Book a discovery call
            </a>
            <Link
              to="/portfolio"
              className="rounded-full border border-raven-border/70 bg-raven-card px-6 py-3 text-base font-semibold text-slate-100 hover:border-raven-accent/70"
            >
              View portfolio
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-raven-border/60 bg-raven-card/80 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-raven-cyan/10 via-raven-accent/5 to-transparent blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-raven-border/70 bg-raven-surface/70 p-4">
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
                  className="rounded-xl border border-raven-border/60 bg-raven-card/80 p-4 text-sm text-slate-200"
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
            className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6 shadow-inner shadow-black/10"
          >
            <div className="mb-3 flex items-center gap-2">
              <CheckCircleIcon className="h-6 w-6 text-raven-accent" />
              <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-300">{benefit.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-raven-border/60 bg-raven-card/60 p-6">
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
            className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
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
            className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
          >
            {'>'}
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              Platforms
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {platforms.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-raven-cyan/60 bg-raven-cyan/10 px-4 py-2 text-sm font-medium text-raven-cyan"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              Tooling
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {tooling.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-raven-accent/60 bg-raven-accent/10 px-4 py-2 text-sm font-medium text-raven-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-amber">Languages</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-raven-amber/60 bg-raven-amber/10 px-4 py-2 text-sm font-medium text-raven-amber"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">Strong bias toward typed, well-tested services.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SeoHead from '../components/SeoHead';
import ravenHomeLogo from '../assets/raven_home_logo.png';

const benefits = [
  {
    title: 'Faster releases',
    text: 'CI/CD automation, reliable branching, and preview deploys that keep PRs moving.',
  },
  {
    title: 'Fewer outages',
    text: 'Observability, SRE guardrails, and change management tuned for your team.',
  },
  {
    title: 'Lower infra waste',
    text: 'Cloud cost reviews, right-sized environments, and policy-backed automation.',
  },
];

const trust = ['Solo developers', 'Indie studios', 'Small product teams'];

const trustedLogos = [
  { name: 'Art Bay', src: '/logos/art-bay.png' },
  { name: 'Galactic Phantom Division', src: '/logos/galactic-phantom-division.png' },
  { name: 'Helldivers 2 Discord Bot', src: '/logos/helldivers-bot.png' },
];

const tech = ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Azure', 'GCP', 'Django', 'Next.js', 'MongoDB', 'Stripe'];
const languages = ['Python', 'JavaScript', 'TypeScript'];

function TrustedByCarousel() {
  const [index, setIndex] = React.useState(0);
  const total = trustedLogos.length;

  React.useEffect(() => {
    if (total <= 1) return undefined;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(id);
  }, [total]);

  if (!trustedLogos || total === 0) return null;

  const current = trustedLogos[index % total];

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  return (
    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-1 items-center justify-start gap-4">
        <div className="flex items-center justify-center rounded-2xl border border-raven-border/60 bg-raven-surface/60 px-6 py-4 shadow-soft-glow">
          <img src={current.src} alt={current.name} className="h-10 w-auto object-contain sm:h-12" />
        </div>
        <p className="text-sm text-slate-300">
          Recent work with{' '}
          <span className="font-semibold text-white">{current.name}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
        >
          {'<'}
        </button>
        <div className="flex items-center gap-1">
          {trustedLogos.map((logo, i) => (
            <span
              key={logo.name}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-raven-accent' : 'bg-slate-500'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
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
                <p className="text-lg font-semibold text-white">Main branch -> zero-downtime deploy</p>
                <p className="text-sm text-slate-300">
                  Tests -> Build image -> Push to registry -> Deploy -> Health checks
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['PR previews', 'Policy as code', 'Observability', 'Cost guardrails'].map((item) => (
                <div key={item} className="rounded-xl border border-raven-border/60 bg-raven-card/80 p-4 text-sm text-slate-200">
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
            <CheckCircleIcon className="mb-3 h-6 w-6 text-raven-accent" />
            <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{benefit.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-raven-border/60 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-bold text-white">Trusted by</h2>
        <TrustedByCarousel />
        <div className="mt-4 flex flex-wrap gap-3 text-slate-300">
          {trust.map((item) => (
            <span key={item} className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-4 py-2 text-sm">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              Platforms & tooling
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-raven-border/60 bg-raven-card/80 px-4 py-2 text-sm font-medium text-slate-200"
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
                  className="rounded-full border border-raven-border/60 bg-raven-surface/80 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Strong bias toward typed, well-tested services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

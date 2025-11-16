import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import damonPortrait from '../assets/damonheath_portrait.png';

const milestones = [
  { year: '2016', text: 'Shipped first production deployment and learned to tame on-call pages.' },
  { year: '2019', text: 'Led containerization pushes for Python and Django services with CI gating.' },
  { year: '2022', text: 'Built Discord automation systems with monitoring, rate limits, and cloud hooks.' },
  { year: '2024', text: 'Started Raven Development Operations to help teams move faster with confidence.' },
  {
    year: 'Apr 2025',
    text: 'Created the ravdevops_demo_website repo and began iterating on this marketing site, CI/CD, and deployment pipeline.',
  },
  {
    year: 'Apr 2025',
    text: 'Launched helldivers2_clan_website to support a Helldivers 2 clan community with a lightweight, maintainable web presence.',
  },
  {
    year: 'Apr-May 2025',
    text: 'Started the e-commerce-frontend and e-commerce-backend repos as a full-stack reference, pairing modern frontend patterns with an API-driven backend.',
  },
  {
    year: 'Nov 2025',
    text: 'Added helldivers2_discord_ocr_lfg_clan_bot, combining Discord automation with OCR to streamline clan LFG and operations.',
  },
];

export default function About() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="About Raven Development Operations | DevOps consultant in Kansas City, MO"
        description="DevOps-focused engineer delivering CI/CD automation, cloud infrastructure, observability, and full-stack experience."
        path="/about"
      />
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">About</p>
        <h1 className="text-4xl font-bold text-white">DevOps-focused engineer based in Kansas City, MO</h1>
        <p className="text-lg text-slate-300">
          I help CTOs, founders, and product teams modernize delivery pipelines, cloud infrastructure, and observability so they
          can ship without heroics.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 md:items-stretch">
        <div className="flex h-full justify-center md:justify-start">
          <div className="h-full overflow-hidden rounded-3xl border border-raven-border/70 bg-raven-card/80 p-2 shadow-soft-glow">
            <img
              src={damonPortrait}
              alt="Portrait of Damon Heath, Raven Development Operations"
              className="h-full w-full max-w-lg rounded-2xl object-cover md:max-w-xl"
            />
          </div>
        </div>
        <div className="h-full space-y-6">
          <div className="h-full rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <h2 className="text-2xl font-semibold text-white">What I bring</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                Veteran-owned, America-first engineering partner focused on building secure, reliable systems for U.S. teams
                operating in high-stakes environments.
              </li>
              <li>
                Cloud architectures on Heroku, Netlify, and container platforms with documented runbooks instead of fragile
                one-off scripts.
              </li>
              <li>
                Containerization with Docker and pragmatic GitHub Actions pipelines that keep builds, tests, and deploys
                predictable and repeatable.
              </li>
              <li>
                Full-stack delivery across Next.js, Django, and Discord automation, with observability, logging, and security
                designed in from day one.
              </li>
            </ul>
            <h3 className="mt-6 text-lg font-semibold text-white">How I work</h3>
            <p className="mt-3 text-sm text-slate-300">
              Every engagement starts with context: the uptime, cost, compliance, and delivery expectations that matter most to
              your organization. From there, I design small, testable changes instead of risky big-bang migrations. As a
              veteran-owned business putting America first, I provide transparent plans, instrument systems for visibility, and
              leave your team with clear documentation, dashboards, and runbooks they can rely on long after the engagement
              ends.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-raven-cyan">
              <a href="https://github.com/raven-dev-ops" target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ravdevops/" target="_blank" rel="noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Timeline</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {milestones.map((mile) => (
            <div key={mile.year} className="rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">{mile.year}</p>
              <p className="mt-2 text-sm text-slate-200">{mile.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/contact"
          className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow"
        >
          Book a discovery call
        </Link>
        <Link
          to="/portfolio"
          className="rounded-full border border-raven-border/70 bg-raven-card px-6 py-3 text-base font-semibold text-slate-100 hover:border-raven-accent/70"
        >
          View portfolio
        </Link>
      </div>
    </div>
  );
}

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

      <section className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex justify-center md:justify-start">
          <div className="overflow-hidden rounded-3xl border border-raven-border/70 bg-raven-card/80 p-2 shadow-soft-glow">
            <img
              src={damonPortrait}
              alt="Portrait of Damon Heath, Raven Development Operations"
              className="h-full w-full max-w-md rounded-2xl object-cover md:max-w-lg"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <h2 className="text-2xl font-semibold text-white">What I bring</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                Veteran-owned small business putting America first with DevOps support focused on real-world outcomes for U.S.
                teams.
              </li>
              <li>Cloud deployments across Heroku, Netlify, and container platforms.</li>
              <li>Containerization with Docker and pragmatic GitHub Actions automation.</li>
              <li>Full-stack experience across Next.js, Django, and Discord bots with observability and security baked in.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <h2 className="text-2xl font-semibold text-white">How I work</h2>
            <p className="mt-3 text-sm text-slate-300">
              Every engagement starts with context: what uptime, cost, and velocity goals matter to you and the people you serve.
              As a veteran-owned business putting America first, I build transparent plans, instrument systems for visibility, and
              leave teams with documentation they can trust long after the engagement ends.
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

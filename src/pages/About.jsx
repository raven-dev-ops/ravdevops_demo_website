import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import damonPortrait from '../assets/damonheath_portrait.png';

const milestones = [
  {
    year: '2016',
    title: 'First production deployment',
    text: 'Shipped first production deployment and learned to tame on-call pages.',
  },
  {
    year: '2019',
    title: 'Python and Django containerization',
    text: 'Led containerization pushes for Python and Django services with CI gating.',
  },
  {
    year: '2022',
    title: 'Discord automation and monitoring',
    text: 'Built Discord automation systems with monitoring, rate limits, and cloud hooks.',
    portfolioSlug: 'helldivers-bot',
  },
  {
    year: '2024',
    title: 'Raven Development Operations launched',
    text: 'Started Raven Development Operations to help teams move faster with confidence.',
  },
  {
    year: 'Apr 2025',
    title: 'Raven DevOps demo website',
    text: 'Created the ravdevops_demo_website repo and began iterating on this marketing site, CI/CD, and deployment pipeline.',
  },
  {
    year: 'Apr 2025',
    title: 'Galactic Phantom Division website',
    text: 'Launched helldivers2_clan_website to support a Helldivers 2 clan community with a lightweight, maintainable web presence.',
    portfolioSlug: 'galactic-phantom-division',
  },
  {
    year: 'Apr-May 2025',
    title: 'Art Bay e-commerce stack',
    text: 'Started the e-commerce-frontend and e-commerce-backend repos as a full-stack reference, pairing modern frontend patterns with an API-driven backend.',
    portfolioSlug: 'art-bay-frontend',
  },
  {
    year: 'Nov 2025',
    title: 'Helldivers 2 Discord OCR LFG bot',
    text: 'Added helldivers2_discord_ocr_lfg_clan_bot, combining Discord automation with OCR to streamline clan LFG and operations.',
    portfolioSlug: 'helldivers-bot',
  },
];

export default function About() {
  const [openTimelineYear, setOpenTimelineYear] = React.useState(null);

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
          <div className="h-full overflow-hidden rounded-3xl border border-raven-border/70 bg-raven-card/80 p-2 shadow-soft-glow flex items-center justify-center">
            <img
              src={damonPortrait}
              alt="Portrait of Damon Heath, Raven Development Operations"
              className="h-auto max-h-80 w-full max-w-md rounded-2xl object-cover md:max-w-lg"
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
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Timeline</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {milestones.map((mile) => {
            const isOpen = openTimelineYear === mile.year;
            return (
              <div key={mile.year} className="rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4">
                <button
                  type="button"
                  onClick={() => setOpenTimelineYear(isOpen ? null : mile.year)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">{mile.year}</p>
                    {mile.title && (
                      <p className="mt-1 text-sm font-semibold text-slate-100">{mile.title}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-slate-200">{mile.text}</p>
                    {mile.portfolioSlug && (
                      <Link
                        to={`/portfolio#${mile.portfolioSlug}`}
                        className="inline-flex text-xs font-semibold text-raven-cyan hover:text-white"
                      >
                        View related portfolio work
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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

import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import damonPortrait from '../assets/damonheath_portrait.png';
import charityPortrait from '../assets/charityolivas_portrait.png';
import service1Banner from '../assets/service1_banner.png';

const staffProfiles = [
  {
    name: 'Damon Heath',
    title: 'Lead Software Engineer',
    image: damonPortrait,
    bullets: [
      'Veteran-owned, America-first engineering partner focused on building secure, reliable systems for U.S. teams operating in high-stakes environments.',
      'Cloud architectures on Heroku, Netlify, and container platforms with documented runbooks instead of fragile one-off scripts.',
      'Containerization with Docker and pragmatic GitHub Actions pipelines that keep builds, tests, and deploys predictable and repeatable.',
      'Full-stack delivery across Next.js, Django, and Discord automation, with observability, logging, and security designed in from day one.',
    ],
  },
  {
    name: 'Charity Olivas',
    title: 'Chief Secretary',
    image: charityPortrait,
    bullets: [
      'Leads administrative operations so engineering and client work stay organized and on schedule.',
      'Coordinates communication, documentation, and meeting logistics across internal and client teams.',
      'Maintains records and processes that keep engagements running smoothly from first contact through delivery.',
    ],
  },
  {
    name: 'Raven',
    title: 'AI Assistant',
    image: service1Banner,
    bullets: [
      'Supports the team with research, documentation drafts, and structured checklists so projects stay organized.',
      'Helps explore implementation options and edge cases so proposals, roadmaps, and designs are grounded and thorough.',
      'Assists with writing and reviewing content—from technical notes to user-facing copy—to keep communication clear.',
    ],
  },
];

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
  const [activeStaffIndex, setActiveStaffIndex] = React.useState(0);

  const totalStaff = staffProfiles.length;
  const activeStaff = staffProfiles[activeStaffIndex];
  const isEven = activeStaffIndex % 2 === 0;

  const goPrevStaff = () => setActiveStaffIndex((prev) => (prev - 1 + totalStaff) % totalStaff);
  const goNextStaff = () => setActiveStaffIndex((prev) => (prev + 1) % totalStaff);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="About Raven Development Operations | DevOps consultant in Kansas City, MO"
        description="DevOps-focused team delivering CI/CD automation, cloud infrastructure, observability, and full-stack experience."
        path="/about"
      />
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">About</p>
        <h1 className="text-4xl font-bold text-white">DevOps-focused team based in Kansas City, MO</h1>
        <p className="text-lg text-slate-300">
          We partner with CTOs, founders, and product teams to modernize delivery pipelines, cloud infrastructure, and observability
          so they can ship without heroics.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div
          className={`flex h-full justify-center md:justify-center ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-raven-border/70 bg-raven-card/80 p-2 shadow-soft-glow sm:h-64 sm:w-64">
            <img
              src={activeStaff.image}
              alt={`Portrait of ${activeStaff.name}, ${activeStaff.title}`}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
        <div
          className={`flex h-full flex-col justify-center ${
            isEven ? 'md:order-2' : 'md:order-1'
          }`}
        >
          <div className="rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <h2 className="text-2xl font-semibold text-white">{activeStaff.name}</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-raven-cyan">
              {activeStaff.title}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {activeStaff.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrevStaff}
          className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
        >
          {'<'}
        </button>
        <div className="flex items-center gap-1">
          {staffProfiles.map((profile, index) => (
            <span
              key={profile.name}
              className={`h-1.5 w-1.5 rounded-full ${
                index === activeStaffIndex ? 'bg-raven-accent' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNextStaff}
          className="rounded-full border border-raven-border/70 bg-raven-card px-3 py-1 text-xs text-slate-100 hover:border-raven-accent/70"
        >
          {'>'}
        </button>
      </div>

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

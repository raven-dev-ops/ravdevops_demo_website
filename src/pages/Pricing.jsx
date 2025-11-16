import React from 'react';
import SeoHead from '../components/SeoHead';
import tier1Image from '../assets/tier1.png';
import tier2Image from '../assets/tier2.png';
import tier3Image from '../assets/tier3.png';

const tiers = [
  {
    name: 'CI/CD Kickstart',
    price: 'Starts at $7,600',
    description: 'Fixed-scope pipeline setup for one service (Next.js site or Django API).',
    bullets: ['Automated tests + lint', 'Security checks and secrets management', 'Zero-downtime deploy flow'],
    image: tier1Image,
  },
  {
    name: 'DevOps Modernization Sprint',
    price: 'Starts at $15,200',
    description: 'Assessment plus a 2-3 week implementation across pipelines, infrastructure, and observability.',
    bullets: ['Roadmap + quick wins', 'IaC + cloud hardening', 'Dashboards + alert tuning'],
    image: tier2Image,
  },
  {
    name: 'Fractional DevOps Partner',
    price: 'Starts at $2,700 / month',
    description: 'Ongoing support, incident response, and roadmap execution for growing teams.',
    bullets: ['Weekly delivery cadence', 'Incident response coverage', 'Backlog of automation improvements'],
    image: tier3Image,
  },
];

const faqs = [
  {
    q: 'Do you do one-off projects?',
    a: 'Yes - assessments, CI/CD builds, and reliability sprints are scoped to deliver quickly. A common one-off engagement is standing up CI/CD for a single Next.js or Django service, hardening secrets, and delivering a zero-downtime deploy you can own going forward.',
  },
  {
    q: "What's your typical engagement length?",
    a: 'Most sprints run 2-4 weeks; fractional partnerships are month-to-month with quarterly checkpoints. For example, a 3-week modernization sprint might cover assessment and CI/CD hardening in week 1, IaC and cloud hardening in week 2, and observability, runbooks, and handover in week 3.',
  },
  {
    q: 'What tools and stacks do you prefer?',
    a: 'I work with GitHub, GitHub Actions, Docker, Kubernetes, Terraform, and cloud platforms like Netlify, Heroku, AWS, and GCP. On the application side I regularly support TypeScript and JavaScript frontends, Python and Node.js backends, REST/JSON APIs, and frameworks like Next.js and Django.',
  },
  {
    q: 'How does payment work?',
    a: 'For fixed-scope projects, 100% of the fee is retained up front and released when you accept the agreed deliverables. For fractional DevOps partnerships, the $2,700/month retainer is billed at the start of each month, with scope and roadmap reviewed together each quarter.',
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="Pricing | Transparent DevOps engagements | Raven Development Operations"
        description="CI/CD kickstarts, modernization sprints, and fractional DevOps partnerships with clear starting prices."
        path="/pricing"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Pricing</p>
        <h1 className="text-4xl font-bold text-white">Transparent DevOps engagements</h1>
        <p className="text-lg text-slate-300">Pick the format that matches your urgency and risk profile.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex h-full flex-col items-center gap-4">
            {tier.image && (
              <img
                src={tier.image}
                alt={tier.name}
                className="h-24 w-auto object-contain"
              />
            )}
            <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">Engagement</p>
                <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
                <p className="text-sm text-slate-300">{tier.description}</p>
              </div>
              <p className="text-xl font-bold text-raven-accent">{tier.price}</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://calendly.com/ravendevops/discovery-meeting"
                className="mt-auto inline-flex justify-center rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-4 py-2 text-sm font-semibold text-black shadow-soft-glow"
              >
                Book a call
              </a>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4">
              <p className="text-sm font-semibold text-white">{faq.q}</p>
              <p className="mt-2 text-sm text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


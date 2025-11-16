import React from 'react';
import SeoHead from '../components/SeoHead';

const tiers = [
  {
    name: 'CI/CD Kickstart',
    price: 'Starts at $X,XXX',
    description: 'Fixed-scope pipeline setup for one service (Next.js site or Django API).',
    bullets: ['Automated tests + lint', 'Security checks and secrets management', 'Zero-downtime deploy flow'],
  },
  {
    name: 'DevOps Modernization Sprint',
    price: 'Starts at $X,XXX',
    description: 'Assessment + 2–3 week implementation across pipelines, infra, and observability.',
    bullets: ['Roadmap + quick wins', 'IaC + cloud hardening', 'Dashboards + alert tuning'],
  },
  {
    name: 'Fractional DevOps Partner',
    price: 'Starts at $X,XXX / month',
    description: 'Ongoing support, incident response, and roadmap execution for growing teams.',
    bullets: ['Weekly delivery cadence', 'Incident response coverage', 'Backlog of automation improvements'],
  },
];

const faqs = [
  {
    q: 'Do you do one-off projects?',
    a: 'Yes—assessments, CI/CD builds, and reliability sprints are scoped to deliver quickly.',
  },
  {
    q: "What's your typical engagement length?",
    a: 'Most sprints run 2–4 weeks; fractional partnerships are month-to-month with quarterly checkpoints.',
  },
  {
    q: 'What tools do you prefer?',
    a: 'GitHub, GitHub Actions, Docker, Terraform, and cloud platforms like Netlify, Heroku, and AWS/GCP.',
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
          <div key={tier.name} className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
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
              href="https://calendly.com/ravdevops/consult"
              className="mt-auto inline-flex justify-center rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-4 py-2 text-sm font-semibold text-black shadow-soft-glow"
            >
              Book a call
            </a>
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

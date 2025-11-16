import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import tier1Image from '../assets/tier1.png';
import tier2Image from '../assets/tier2.png';
import tier3Image from '../assets/tier3.png';

const tiers = [
  {
    name: 'CI/CD Kickstart',
    price: 'Starts at $2,400',
    description: 'Fixed-scope pipeline setup for one service (Next.js site or Django API).',
    bullets: [
      'Establish or repair a CI/CD pipeline that runs tests and linting on every change.',
      'Harden secrets and environment configuration so deployments are safe and repeatable.',
      'Implement a simple, zero-downtime deployment flow with clear rollback steps.',
    ],
    image: tier1Image,
  },
  {
    name: 'DevOps Modernization Sprint',
    price: 'Starts at $7,600',
    description: 'Assessment plus a 2-3 week implementation across pipelines, infrastructure, and observability.',
    bullets: [
      'Deliver a practical roadmap plus “quick win” improvements to pipelines and infra.',
      'Introduce or improve infrastructure-as-code and cloud hardening aligned to your policies.',
      'Stand up or refine dashboards and alerts so on-call engineers see issues early, not after the fact.',
    ],
    image: tier2Image,
  },
  {
    name: 'Fractional DevOps Partner',
    price: 'Starts at $1,350 / month',
    description: 'Ongoing support, incident response, and roadmap execution for growing teams.',
    bullets: [
      'Maintain a weekly delivery cadence for DevOps and platform improvements.',
      'Provide hands-on support during incidents and help stabilize recurring issues.',
      'Continuously work through a prioritized backlog of automation and reliability enhancements.',
    ],
    featured: true,
    image: tier3Image,
  },
];

const faqs = [
  {
    q: 'Which engagement is right for my team?',
    a: 'If you need to stand up or fix a single pipeline, the CI/CD Kickstart is usually the best fit. If you want a broader modernization across infra, observability, and delivery, the DevOps Modernization Sprint is better. For ongoing help, the Fractional DevOps Partner option keeps a veteran operator embedded with your team each month.',
  },
  {
    q: 'Can we start small before committing long term?',
    a: 'Yes. Many teams start with a focused assessment or CI/CD Kickstart, then decide whether to extend into a modernization sprint or fractional engagement once we have real results and trust in place.',
  },
  {
    q: 'Do you work with our existing tools and stack?',
    a: 'In most cases, yes. I regularly work with GitHub Actions, Docker, Kubernetes, Terraform, Heroku, Netlify, AWS, and Azure across TypeScript, JavaScript, Python, and Node.js services. During the discovery call, we will confirm fit with your stack and constraints.',
  },
  {
    q: 'What about contracts, invoicing, and payment terms?',
    a: 'Work is scoped with a short proposal or statement of work. Fixed-scope projects are typically billed 50% up front and 50% on delivery. Fractional DevOps partnerships are billed monthly with clear goals and an option to revisit scope each quarter.',
  },
];

export default function Pricing() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(null);

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
        {tiers.map((tier, index) => {
          const orderClass =
            tier.featured ? 'md:order-2' : index === 0 ? 'md:order-1' : 'md:order-3';

          return (
            <Link
              key={tier.name}
              to={`/contact?interest=${encodeURIComponent(tier.name)}`}
              className={`group block ${orderClass}`}
            >
              <div
                className={`flex h-full flex-col gap-4 rounded-2xl border p-6 transition transform group-hover:scale-105 group-hover:shadow-soft-glow ${
                  tier.featured
                    ? 'border-raven-accent/80 bg-raven-card group-hover:border-raven-accent'
                    : 'border-raven-border/70 bg-raven-card/70 group-hover:border-raven-accent/70'
                }`}
              >
                {tier.image && (
                  <div className="flex justify-center">
                    <img
                      src={tier.image}
                      alt={tier.name}
                      className="mb-4 h-32 w-auto object-contain"
                    />
                  </div>
                )}
                <div className="flex h-full flex-col gap-4">
                  <div>
                    {tier.featured && (
                      <p className="mb-2 inline-flex rounded-full bg-raven-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-raven-accent">
                        Recommended
                      </p>
                    )}
                    {!tier.featured && (
                      <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">Engagement</p>
                    )}
                    <h2 className="text-2xl font-semibold text-white group-hover:text-raven-accent">
                      {tier.name}
                    </h2>
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={faq.q} className="rounded-xl border border-raven-border/60 bg-raven-surface/50">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <span className="text-xs text-slate-400">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-raven-border/60 px-4 py-3">
                    <p className="text-sm text-slate-300">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

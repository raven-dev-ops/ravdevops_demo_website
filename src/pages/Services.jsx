import React from 'react';
import { Link } from 'react-router-dom';
import { serviceAreas } from '../data/services';
import SeoHead from '../components/SeoHead';

const steps = [
  'Discovery call',
  'Assessment',
  'Proposal',
  'Implementation',
  'Handover / ongoing support',
];

export default function Services() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="DevOps services | CI/CD, IaC, observability | Raven Development Operations"
        description="Assessments, CI/CD automation, infrastructure as code, observability, and developer tooling with measurable outcomes."
        path="/services"
      />
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Services</p>
        <h1 className="text-4xl font-bold text-white">How we ship confident software delivery</h1>
        <p className="text-lg text-slate-300">
          Clear DevOps engagements with outcomes you can measure—from assessments to automation sprints to fractional support.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {serviceAreas.map((service) => (
          <div key={service.title} className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-1 text-sm text-slate-300">{service.blurb}</p>
              </div>
              <span className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1 text-xs font-semibold text-raven-cyan">
                {service.format}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <a
                href="https://calendly.com/ravdevops/consult"
                className="inline-flex items-center rounded-full border border-raven-border/70 bg-raven-card px-4 py-2 text-sm font-semibold text-slate-100 hover:border-raven-accent/80"
              >
                Book a call
              </a>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-8">
        <h2 className="text-2xl font-bold text-white">How engagements work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {steps.map((step, idx) => (
            <div key={step} className="rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">Step {idx + 1}</p>
              <p className="mt-2 text-sm font-semibold text-white">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://calendly.com/ravdevops/consult"
            className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow"
          >
            Book a discovery call
          </a>
          <Link
            to="/pricing"
            className="rounded-full border border-raven-border/70 bg-raven-card px-6 py-3 text-base font-semibold text-slate-100 hover:border-raven-accent/70"
          >
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}

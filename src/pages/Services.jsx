import React from 'react';
import { serviceAreas } from '../data/services';
import SeoHead from '../components/SeoHead';

const steps = [
  {
    number: 1,
    title: 'Discovery call',
    description: 'A short call to understand your goals, current stack, and delivery pain points.',
    videoSrc: '/videos/step1-discovery-call.mp4',
  },
  {
    number: 2,
    title: 'Assessment',
    description: 'Deep-dive into your repos, pipelines, and cloud accounts to map risks and opportunities.',
    videoSrc: '/videos/step2-assessment.mp4',
  },
  {
    number: 3,
    title: 'Proposal',
    description: 'A clear, written plan with milestones, timelines, and success criteria you can react to.',
    videoSrc: '/videos/step3-proposal.mp4',
  },
  {
    number: 4,
    title: 'Implementation',
    description: 'Hands-on delivery: CI/CD changes, infra updates, and reliability improvements tested in stages.',
    videoSrc: '/videos/step4-implementation.mp4',
  },
  {
    number: 5,
    title: 'Handover / ongoing support',
    description: 'Documentation, runbooks, knowledge transfer, and optional ongoing fractional support.',
    videoSrc: '/videos/step5-handover.mp4',
  },
];

export default function Services() {
  const [activeStep, setActiveStep] = React.useState(steps[0].number);

  const previewStep = steps.find((step) => step.number === activeStep) || steps[0];

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
          Clear DevOps engagements with outcomes you can measure—from assessments to automation sprints to fractional
          support.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {serviceAreas.map((service) => {
          const imageStyle = service.flipImage ? { transform: 'scaleX(-1)' } : undefined;

          return (
            <div
              key={service.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-40 w-auto max-w-full object-contain"
                    style={imageStyle}
                  />
                )}
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              </div>
              <p className="text-sm text-slate-300">{service.blurb}</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-center">
                <span className="inline-flex rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1 text-xs font-semibold text-raven-cyan">
                  {service.format}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-8">
        <h2 className="text-2xl font-bold text-white">How engagements work</h2>

        <div className="video-frame mt-4">
          <div className="video-frame-inner border border-black/60">
            <video
              src={previewStep.videoSrc}
              controls
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {steps.map((step) => {
            const isActive = step.number === activeStep;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(step.number)}
                className={[
                  'flex flex-col items-center rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4 text-center transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70',
                  isActive
                    ? 'scale-105 border-raven-accent/80 bg-raven-surface/80 shadow-soft-glow'
                    : 'hover:-translate-y-0.5 hover:scale-105 hover:border-raven-accent hover:shadow-soft-glow',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">Step {step.number}</p>
                <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}


import React from 'react';
import { serviceAreas } from '../data/services';
import SeoHead from '../components/SeoHead';
import ravenHomeLogo from '../assets/raven_home_logo.png';
import siteBackgroundDark from '../assets/site_background_dark.gif';
import siteBackgroundLight from '../assets/site_background_light.png';

const steps = [
  {
    number: 1,
    title: 'Discovery call',
    description: 'A short call to understand your goals, current stack, and delivery pain points.',
    goal: 'Align on what you’re trying to ship and where delivery hurts today.',
    nextAction: 'Decide whether a deeper assessment makes sense.',
    videoSrc: '/videos/step1-discovery-call.mp4',
  },
  {
    number: 2,
    title: 'Assessment',
    description: 'Deep-dive into your repos, pipelines, and cloud accounts to map risks and opportunities.',
    goal: 'Build a clear picture of your current pipelines, infra, and risks.',
    nextAction: 'Summarize findings and proposed focus areas for a plan.',
    videoSrc: '/videos/step2-assessment.mp4',
  },
  {
    number: 3,
    title: 'Proposal',
    description: 'A clear, written plan with milestones, timelines, and success criteria you can react to.',
    goal: 'Agree on scope, milestones, and what “success” looks like.',
    nextAction: 'Lock in a start date and finalize the engagement details.',
    videoSrc: '/videos/step3-proposal.mp4',
  },
  {
    number: 4,
    title: 'Implementation',
    description: 'Hands-on delivery: CI/CD changes, infra updates, and reliability improvements tested in stages.',
    goal: 'Ship the agreed improvements safely, in small, testable increments.',
    nextAction: 'Demo changes, capture feedback, and iterate on anything that needs refinement.',
    videoSrc: '/videos/step4-implementation.mp4',
  },
  {
    number: 5,
    title: 'Handover / ongoing support',
    description: 'Documentation, runbooks, knowledge transfer, and optional ongoing fractional support.',
    goal: 'Make sure your team can own the new setup confidently.',
    nextAction: 'Confirm runbooks, answer open questions, and choose whether to continue with fractional support.',
    videoSrc: '/videos/step5-handover.mp4',
  },
];

export default function Services() {
  const [activeStep, setActiveStep] = React.useState(steps[0].number);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const previewStep = steps.find((step) => step.number === activeStep) || steps[0];
  const hasVideo = Boolean(previewStep.videoSrc);
  const isDarkMode =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark');
  const overlayBackground = isDarkMode ? siteBackgroundDark : siteBackgroundLight;

  React.useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        // eslint-disable-next-line no-param-reassign
        videoRef.current.currentTime = 0;
      } catch {
        // ignore if video element is not ready
      }
    }
  }, [activeStep]);

  const handlePlayClick = () => {
    if (!hasVideo || !videoRef.current) return;
    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // autoplay might be blocked; leave overlay visible
      });
  };

  const handlePrevStep = (event) => {
    event.stopPropagation();
    const currentIndex = steps.findIndex((step) => step.number === activeStep);
    const total = steps.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    setActiveStep(steps[prevIndex].number);
  };

  const handleNextStep = (event) => {
    event.stopPropagation();
    const currentIndex = steps.findIndex((step) => step.number === activeStep);
    const total = steps.length;
    const nextIndex = (currentIndex + 1) % total;
    setActiveStep(steps[nextIndex].number);
  };

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
          Clear DevOps engagements with outcomes you can measure.
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
          <div className="video-frame-inner relative border border-black/60 bg-black/70">
            {hasVideo && (
              <video
                ref={videoRef}
                src={previewStep.videoSrc}
                controls
                className="h-full w-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
            )}

            {(!hasVideo || !isPlaying) && (
              <button
                type="button"
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent/70"
                style={{
                  backgroundImage: `url(${overlayBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 dark:bg-black/60" />
                <div className="relative flex h-full w-full items-center justify-center px-8">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={ravenHomeLogo}
                      alt="Raven Development Operations"
                      className="h-32 w-32 object-contain opacity-75 sm:h-40 sm:w-40"
                    />
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-200 text-center transition transform hover:scale-105 hover:text-raven-accent hover:shadow-soft-glow">
                      {hasVideo ? `Click to play Step ${previewStep.number} video` : 'Preview coming soon'}
                    </p>
                  </div>
                </div>
                {hasVideo && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-transparent bg-black/60 px-4 py-3 text-base font-semibold text-white shadow-md transition transform hover:scale-110 hover:border-raven-accent/80 hover:bg-black/80 hover:shadow-soft-glow sm:flex"
                    >
                      {'<'}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-transparent bg-black/60 px-4 py-3 text-base font-semibold text-white shadow-md transition transform hover:scale-110 hover:border-raven-accent/80 hover:bg-black/80 hover:shadow-soft-glow sm:flex"
                    >
                      {'>'}
                    </button>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-raven-border/70 bg-raven-surface/80 px-4 py-3 text-sm text-slate-200">
          <p className="font-semibold text-raven-cyan">
            Step {previewStep.number}: {previewStep.title}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-slate-100">Goal:</span>{' '}
            {previewStep.goal || previewStep.description}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-slate-100">Next action:</span>{' '}
            {previewStep.nextAction || 'Move into the next step when you’re ready.'}
          </p>
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
                    ? 'scale-105 border-raven-accent bg-raven-surface/90 shadow-soft-glow ring-1 ring-raven-accent/80'
                    : 'hover:-translate-y-0.5 hover:scale-105 hover:border-raven-accent hover:shadow-soft-glow',
                ].join(' ')}
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

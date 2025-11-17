import React from 'react';
import { portfolioItems } from '../data/portfolio';
import SeoHead from '../components/SeoHead';

function PortfolioCarousel({ images, title, onArrowHoverChange }) {
  const [index, setIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  const total = images.length;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  const handleArrowEnter = () => {
    if (onArrowHoverChange) onArrowHoverChange(true);
  };

  const handleArrowLeave = () => {
    if (onArrowHoverChange) onArrowHoverChange(false);
  };

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-raven-border/70 bg-raven-card/80">
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="h-56 w-full object-cover sm:h-64"
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            onMouseEnter={handleArrowEnter}
            onMouseLeave={handleArrowLeave}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-xs text-white transition-transform hover:scale-110 hover:bg-black/70"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            onMouseEnter={handleArrowEnter}
            onMouseLeave={handleArrowLeave}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-xs text-white transition-transform hover:scale-110 hover:bg-black/70"
          >
            {'>'}
          </button>
        </>
      )}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((image, i) => (
            <span
              key={image || i}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-raven-accent' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [hoveredSlug, setHoveredSlug] = React.useState(null);
  const [arrowHoverSlug, setArrowHoverSlug] = React.useState(null);

  const handleCardClick = (github) => {
    if (!github) return;
    if (typeof window === 'undefined') return;
    const proceed = window.confirm(
      'You are about to open the project repository on GitHub in a new tab. Continue?',
    );
    if (proceed) {
      window.open(github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:px-6">
      <SeoHead
        title="Portfolio | DevOps case studies | Raven Development Operations"
        description="Examples of CI/CD pipelines, containerization, and cloud deployments delivered for product teams."
        path="/portfolio"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Portfolio</p>
        <h1 className="text-4xl font-bold text-white">Case studies from shipped systems</h1>
        <p className="text-lg text-slate-300">
          Engineering work focused on automation, infrastructure, and reliability - not just the UI.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioItems.map((item) => {
          const isActive = hoveredSlug === item.slug && arrowHoverSlug !== item.slug;

          return (
            <article
              key={item.slug}
              id={item.slug}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(item.github)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.github);
                }
              }}
              onMouseEnter={() => setHoveredSlug(item.slug)}
              onMouseLeave={() => {
                setHoveredSlug(null);
                setArrowHoverSlug(null);
              }}
              className={`flex h-full cursor-pointer flex-col gap-4 rounded-2xl border p-6 transition transform ${
                isActive
                  ? 'scale-105 border-raven-accent/80 bg-raven-card hover:shadow-soft-glow'
                  : 'border-raven-border/70 bg-raven-card/70'
              }`}
            >
              <PortfolioCarousel
                images={item.screenshots}
                title={item.title}
                onArrowHoverChange={(isHovering) =>
                  setArrowHoverSlug(isHovering ? item.slug : null)
                }
              />
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-slate-300">{item.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">DevOps outcomes</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

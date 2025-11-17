import React from 'react';
import { portfolioItems } from '../data/portfolio';
import SeoHead from '../components/SeoHead';
import { SearchContext } from '../hooks/SearchContext';

export default function Portfolio() {
  const [lightbox, setLightbox] = React.useState(null);
  const [activeTag, setActiveTag] = React.useState('All');
  const { query } = React.useContext(SearchContext);

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

  const openLightbox = (item, startIndex) => {
    if (!item || !item.screenshots || item.screenshots.length === 0) return;
    const safeIndex =
      Number.isInteger(startIndex) && startIndex >= 0 && startIndex < item.screenshots.length
        ? startIndex
        : 0;
    setLightbox({
      title: item.title,
      images: item.screenshots,
      index: safeIndex,
    });
  };

  const closeLightbox = () => setLightbox(null);

  const goLightboxPrev = () => {
    setLightbox((current) => {
      if (!current || !current.images || current.images.length === 0) return current;
      const total = current.images.length;
      return {
        ...current,
        index: (current.index - 1 + total) % total,
      };
    });
  };

  const goLightboxNext = () => {
    setLightbox((current) => {
      if (!current || !current.images || current.images.length === 0) return current;
      const total = current.images.length;
      return {
        ...current,
        index: (current.index + 1) % total,
      };
    });
  };

  const normalizedQuery = query.trim().toLowerCase();

  const allTech = React.useMemo(() => {
    const set = new Set();
    portfolioItems.forEach((item) => {
      (item.tech || []).forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, []);

  const visibleItems = React.useMemo(() => {
    return portfolioItems.filter((item) => {
      if (activeTag !== 'All' && !(item.tech || []).includes(activeTag)) {
        return false;
      }

      if (!normalizedQuery) return true;

      const fields = [
        item.title,
        item.description,
        ...(item.tech || []),
        ...(item.outcomes || []),
      ];
      return fields.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(normalizedQuery),
      );
    });
  }, [activeTag, normalizedQuery]);

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
      <div className="flex flex-wrap justify-center gap-3">
        {['All', ...allTech].map((tag) => {
          const isActive = activeTag === tag;
          const baseInactive =
            'border-raven-border/60 bg-raven-card/70 text-slate-200 hover:border-raven-accent/60';
          const activeClasses =
            'border-raven-accent bg-raven-accent/20 text-raven-accent';

          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive ? activeClasses : baseInactive
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleItems.map((item) => {
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
              className="flex h-full cursor-pointer flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6 transition transform hover:scale-105 hover:border-raven-accent/80 hover:bg-raven-card hover:shadow-soft-glow"
            >
              {item.screenshots && item.screenshots.length > 0 && (
                <div className="mb-3">
                  <div className="relative overflow-hidden rounded-2xl border border-raven-border/70 bg-raven-card/80">
                    <img
                      src={item.screenshots[0]}
                      alt={`${item.title} screenshot 1`}
                      className="h-56 w-full object-cover sm:h-64"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(item, 0);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition transform hover:scale-105 hover:bg-black/60 hover:text-raven-accent"
                    >
                      Click to view gallery
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {item.date && (
                      <span className="text-xs uppercase tracking-[0.2em] text-raven-cyan">
                        {item.date}
                      </span>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(item.tags || []).map((tag) => {
                        let tagClasses = 'rounded-full border px-2 py-1';

                        if (tag === 'CI/CD') {
                          tagClasses += ' border-emerald-400/70 bg-emerald-500/10 text-emerald-300';
                        } else if (tag === 'Cloud') {
                          tagClasses += ' border-sky-400/70 bg-sky-500/10 text-sky-300';
                        } else if (tag === 'SRE') {
                          tagClasses += ' border-amber-400/70 bg-amber-500/10 text-amber-200';
                        } else if (tag === 'Tooling') {
                          tagClasses += ' border-violet-400/70 bg-violet-500/10 text-violet-300';
                        } else {
                          tagClasses += ' border-raven-border/60 bg-raven-surface/60 text-slate-200';
                        }

                        return (
                          <span key={tag} className={tagClasses}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-slate-300">{item.description}</p>
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

      {lightbox && lightbox.images && lightbox.images.length > 0 && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white hover:bg-black/80"
            >
              ✕
            </button>
            <div className="relative overflow-hidden rounded-2xl border border-raven-border/70 bg-black/80">
              <img
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.title} screenshot ${lightbox.index + 1}`}
                className="max-h-[80vh] w-full object-contain"
              />
              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goLightboxPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  >
                    ‹ Prev
                  </button>
                  <button
                    type="button"
                    onClick={goLightboxNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  >
                    Next ›
                  </button>
                </>
              )}
            </div>
            <div className="mt-3 text-center text-xs text-slate-200">
              {lightbox.title} · {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

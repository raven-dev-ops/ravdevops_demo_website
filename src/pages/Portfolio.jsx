import React from 'react';
import { portfolioItems } from '../data/portfolio';
import SeoHead from '../components/SeoHead';

export default function Portfolio() {
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
          Engineering work focused on automation, infrastructure, and reliability—not just the UI.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {portfolioItems.map((item) => (
          <article key={item.slug} className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <span className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1 text-xs font-semibold text-raven-cyan">
                Case study
              </span>
            </div>
            <p className="text-sm text-slate-300">{item.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-200">
              {item.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1">
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
            <div className="mt-auto flex items-center justify-between gap-4">
              <a
                href={item.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-raven-cyan hover:text-white"
              >
                View code on GitHub
              </a>
              <span className="text-xs text-slate-400">Problem → Build → Outcome</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

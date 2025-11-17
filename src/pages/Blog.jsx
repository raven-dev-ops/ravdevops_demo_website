import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';
import service1Banner from '../assets/service1_banner.png';

const tags = ['All', 'CI/CD', 'Cloud', 'SRE', 'Tooling'];

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let posts = blogPosts;

    if (activeTag !== 'All') {
      posts = posts.filter((post) => post.tags.includes(activeTag));
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return posts;

    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [activeTag, query]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:px-6">
      <SeoHead
        title="Blog | CI/CD, cloud, SRE insights | Raven Development Operations"
        description="Articles on DevOps delivery, GitHub Actions pipelines, observability, and developer tooling."
        path="/blog"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Blog</p>
        <h1 className="text-4xl font-bold text-white">Shipping notes from the DevOps desk</h1>
        <p className="text-lg text-slate-300">CI/CD, cloud, SRE, and tooling practices you can apply right away.</p>
      </header>

      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, topic, or tag…"
          className="w-full max-w-md rounded-full border border-raven-border/70 bg-raven-card/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 shadow-inner shadow-black/20 focus:border-raven-accent focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => {
          let baseInactive = 'border-raven-border/60 bg-raven-card/70 text-slate-200 hover:border-raven-accent/60';
          let activeClasses = 'border-raven-accent bg-raven-accent/20 text-raven-accent';

          if (tag === 'CI/CD') {
            baseInactive = 'border-emerald-400/40 bg-emerald-500/5 text-emerald-200 hover:border-emerald-400/80';
            activeClasses = 'border-emerald-400 bg-emerald-500/20 text-emerald-200';
          } else if (tag === 'Cloud') {
            baseInactive = 'border-sky-400/40 bg-sky-500/5 text-sky-200 hover:border-sky-400/80';
            activeClasses = 'border-sky-400 bg-sky-500/20 text-sky-200';
          } else if (tag === 'SRE') {
            baseInactive = 'border-amber-400/40 bg-amber-500/5 text-amber-200 hover:border-amber-400/80';
            activeClasses = 'border-amber-400 bg-amber-500/20 text-amber-200';
          } else if (tag === 'Tooling') {
            baseInactive = 'border-violet-400/40 bg-violet-500/5 text-violet-200 hover:border-violet-400/80';
            activeClasses = 'border-violet-400 bg-violet-500/20 text-violet-200';
          }

          const isActive = activeTag === tag;

          return (
            <button
              key={tag}
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
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block"
          >
            <article
              className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6 transition transform hover:scale-105 hover:border-raven-accent/80 hover:bg-raven-card hover:shadow-soft-glow"
            >
              {post.image && (
                <div className="overflow-hidden rounded-xl border border-raven-border/60 bg-raven-card/80">
                  <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-raven-cyan">{post.date}</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {post.tags.map((tag) => {
                    let tagClasses =
                      'rounded-full border px-2 py-1';

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
              <h2 className="text-2xl font-semibold text-white group-hover:text-raven-accent">{post.title}</h2>
              <p className="text-sm text-slate-300">{post.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block">
              <img
                src={service1Banner}
                alt="Raven Development Operations"
                className="h-20 w-20 object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Join my newsletter</h3>
              <p className="mt-2 text-sm text-slate-300">
                Get updates on CI/CD, cloud automation, and DevOps maturity guides.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="email"
              placeholder="Email address (coming soon)"
              disabled
              className="w-full cursor-not-allowed rounded-full border border-raven-border/40 bg-raven-surface/40 px-4 py-3 text-sm text-slate-400 placeholder:text-slate-500 md:w-64"
            />
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-slate-600/40 px-6 py-3 text-sm font-semibold text-slate-300 shadow-inner shadow-black/30"
            >
              Get updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';

const tags = ['All', 'CI/CD', 'Cloud', 'SRE', 'Tooling'];

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = useMemo(() => {
    if (activeTag === 'All') return blogPosts;
    return blogPosts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag]);

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

      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeTag === tag
                ? 'border-raven-accent bg-raven-accent/20 text-raven-accent'
                : 'border-raven-border/60 bg-raven-card/70 text-slate-200 hover:border-raven-accent/60'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <article key={post.slug} className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-raven-cyan">{post.date}</span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
            <p className="text-sm text-slate-300">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="mt-auto text-sm font-semibold text-raven-cyan hover:text-white"
            >
              Read post →
            </Link>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Join my newsletter</h3>
            <p className="text-sm text-slate-300">Get updates on CI/CD, cloud automation, and DevOps maturity guides.</p>
          </div>
          <form className="flex flex-wrap gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-full border border-raven-border/70 bg-raven-surface/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-raven-accent focus:outline-none md:w-64"
            />
            <button className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-sm font-semibold text-black shadow-soft-glow">
              Get updates
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';
import service1Banner from '../assets/service1_banner.png';
import { SearchContext } from '../hooks/SearchContext';

export default function Blog() {
  const { query } = useContext(SearchContext);

  const filtered = useMemo(() => {
    const posts = blogPosts;
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
  }, [query]);

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

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => {
          const baseCardClass =
            'flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6 transition transform hover:scale-105 hover:border-raven-accent/80 hover:bg-raven-card hover:shadow-soft-glow';

          return (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <article className={baseCardClass}>
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
                {Array.isArray(post.bullets) && post.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-slate-300 list-disc list-inside">
                    {post.bullets.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Link>
          );
        })}
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

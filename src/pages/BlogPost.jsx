import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-lg text-slate-200">Post not found.</p>
        <Link to="/blog" className="text-raven-cyan hover:text-white">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <SeoHead
        title={`${post.title} | Raven Development Operations`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-raven-cyan">{post.date}</p>
        <h1 className="text-4xl font-bold text-white">{post.title}</h1>
        <div className="flex flex-wrap gap-2 text-xs">
          {post.tags.map((tag) => {
            let tagClasses = 'rounded-full border px-3 py-1';

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
      {post.image && (
        <div className="overflow-hidden rounded-3xl border border-raven-border/70 bg-raven-card/80">
          <img src={post.image} alt={post.title} className="h-64 w-full object-cover sm:h-80" />
        </div>
      )}
      <p className="text-lg leading-relaxed text-slate-200">{post.content}</p>
      <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-raven-cyan hover:text-white">
        Back to blog
      </Link>
    </article>
  );
}

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
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-raven-border/60 bg-raven-surface/60 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-lg leading-relaxed text-slate-200">{post.content}</p>
      <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-raven-cyan hover:text-white">
        ← Back to blog
      </Link>
    </article>
  );
}

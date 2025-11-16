import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-center">
      <SeoHead
        title="Page not found | Raven Development Operations"
        description="The page you requested could not be found on the Raven Development Operations site."
        path="/404"
      />
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="text-slate-300">The page you&apos;re looking for doesn&apos;t exist yet. Try heading home.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow"
      >
        Back to home
      </Link>
    </div>
  );
}

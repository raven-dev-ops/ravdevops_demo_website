import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-raven-border/70 bg-raven-card/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between lg:px-6">
        <div>
          <p className="text-lg font-semibold text-white">Raven Development Operations</p>
          <p className="text-sm text-slate-400">
            Based in Kansas City, MO · Working remotely with clients in US/EU time zones.
          </p>
          <p className="text-sm text-slate-400">DevOps consulting to ship faster, safer, and cheaper.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <a
            href="https://calendly.com/ravdevops/consult"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-raven-accent/30 bg-raven-accent/20 px-3 py-2 font-semibold text-raven-accent hover:bg-raven-accent/30"
          >
            Book a Call
          </a>
        </div>
      </div>
    </footer>
  );
}

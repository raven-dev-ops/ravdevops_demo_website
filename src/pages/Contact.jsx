import React from 'react';
import { useLocation } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import contactBanner from '../assets/contact_form_banner.png';

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const interest = searchParams.get('interest');

  const projectDefault = interest
    ? `I'm interested in the "${interest}" engagement and would like to discuss whether it fits my needs.`
    : '';

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="Contact | Book a DevOps discovery call | Raven Development Operations"
        description="Tell me about your delivery goals—CI/CD, cloud, observability, or automation—and book time via Calendly."
        path="/contact"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Contact</p>
        <h1 className="text-4xl font-bold text-white">Let&apos;s plan your next DevOps win</h1>
        <p className="text-lg text-slate-300">CTOs, founders, and solo devs welcome. Typical projects range from CI/CD builds to fractional DevOps support.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-raven-border/70 bg-raven-card/80">
            <img
              src={contactBanner}
              alt="Raven Development Operations contact form banner"
              className="h-32 w-auto max-w-full transform scale-75 object-contain md:h-40"
            />
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Name
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Work email
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Company
                <input
                  name="company"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Role
                <input
                  name="role"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Project summary
              <textarea
                name="project"
                rows="4"
                defaultValue={projectDefault}
                className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Timeline
                <input
                  name="timeline"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Budget range
                <input
                  name="budget"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-sm font-semibold text-black shadow-soft-glow">
              Send message
            </button>
          </form>
        </div>

        <div className="space-y-6 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Schedule with Calendly</h2>
            <p className="mt-2 text-sm text-slate-300">
              Book a DevOps discovery call at a time that works for you, via video or phone.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-raven-border/60 bg-raven-surface/60 p-4">
            <iframe
              title="Calendly discovery video call"
              src="https://calendly.com/charityolivas/discovery-call"
              className="h-[520px] w-full rounded-lg border-0"
            />
          </div>
          <p className="text-sm text-slate-400">
            Prefer email? Reach out via{' '}
            <a href="mailto:business@ravdevops.com" className="text-raven-cyan hover:text-white">
              business@ravdevops.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

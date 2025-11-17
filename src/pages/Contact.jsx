import React from 'react';
import { useLocation } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const interest = searchParams.get('interest');
  const formRef = React.useRef(null);
  const emergencyRef = React.useRef(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const API_BASE =
    process.env.REACT_APP_OPENAUXILIUM_URL || 'http://localhost:5050';

  const projectDefault = interest
    ? `I'm interested in the "${interest}" engagement and would like to discuss whether it fits my needs.`
    : '';

  const handleSubmit = (event) => {
    const form = formRef.current;
    if (form) {
      const name = form.elements.name?.value.trim();
      const company = form.elements.company?.value.trim();
      const timeline = form.elements.timeline?.value;
      const budget = form.elements.budget?.value;
      const email = form.elements.email?.value.trim();
      const phone = form.elements.phone?.value.trim();

      const missingCore = !name || !company || !timeline || !budget;
      const missingContact = !email && !phone;

      if (missingCore || missingContact) {
        event.preventDefault();
        if (missingContact) {
          // eslint-disable-next-line no-alert
          alert('Please provide at least a work email or a phone number.');
        }
        if (form.reportValidity) {
          form.reportValidity();
        }
        return;
      }

      // Fire-and-forget: link contact details to chat_user_id on the assistant server
      try {
        const name = form.elements.name?.value.trim();
        const chatUserId = (() => {
          if (typeof document === 'undefined') return null;
          const nameKey = 'chat_user_id';
          const existing = document.cookie
            .split(';')
            .map((c) => c.trim())
            .find((c) => c.startsWith(`${nameKey}=`));
          if (existing) return existing.split('=')[1];
          const id = `guest_${Math.random().toString(36).slice(2)}_${Date.now()}`;
          const expires = new Date();
          expires.setFullYear(expires.getFullYear() + 1);
          document.cookie = `${nameKey}=${id}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
          return id;
        })();

        if (chatUserId) {
          fetch(`${API_BASE}/contact-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chatUserId,
              name,
              email,
              phone,
            }),
            keepalive: true,
          }).catch(() => {
            // Ignore errors; this is best-effort enrichment for chat
          });
        }
      } catch {
        // Swallow any unexpected errors; form submission should still proceed
      }
    }

    if (emergencyRef.current && emergencyRef.current.checked) {
      event.preventDefault();
      setShowConfirm(true);
    }
  };

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
        <p className="text-lg text-slate-300">Typical projects range from CI/CD builds to fractional DevOps support.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
        <div className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6 transition transform hover:-translate-y-0.5 hover:border-raven-accent/70 hover:shadow-soft-glow">
            <iframe
              title="Calendly discovery video call"
              src="https://calendly.com/charityolivas/discovery-call?background_color=020617&text_color=f9fafb&primary_color=22C55E"
              className="h-full w-full rounded-lg border-0"
            />
          </div>
        </div>

        <div className="h-full">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex h-full flex-col space-y-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="to_email" value="sales@ravdevops.com" />
            <input type="hidden" name="cc_email_if_emergency" value="business@ravdevops.com" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Name
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Work email
                <input
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Company
                <input
                  name="company"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Role
                <input
                  name="role"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Preferred contact method
                <select
                  name="contact_method"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                  defaultValue="email"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="video-call">Video call</option>
                </select>
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Project summary
              <textarea
                name="project"
                rows="4"
                defaultValue={projectDefault}
                className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Timeline
                <select
                  name="timeline"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                  defaultValue="1-2-weeks"
                >
                  <option value="1-2-weeks">1–2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="3-months">3 months</option>
                  <option value="6-months">6 months</option>
                  <option value="1-year-plus">1 year+</option>
                </select>
              </label>
              <label className="text-sm text-slate-200">
                Budget range
                <select
                  name="budget"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white transition-colors hover:border-raven-accent/60 hover:bg-raven-surface/80 focus:border-raven-accent focus:outline-none"
                  defaultValue="1k-25k"
                >
                  <option value="1k-25k">$1k–$25k+</option>
                  <option value="25k-50k">$25k–$50k+</option>
                  <option value="50k-100k">$50k–$100k</option>
                  <option value="250k-500k">$250k–$500k</option>
                  <option value="1m-25m">$1M–$25M+</option>
                </select>
              </label>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-3 text-xs text-slate-200">
              <input
                id="emergency"
                name="emergency_72hr"
                type="checkbox"
                ref={emergencyRef}
                className="mt-1 h-4 w-4 rounded border-raven-border/70 bg-black text-raven-accent focus:ring-raven-accent"
              />
              <label htmlFor="emergency" className="cursor-pointer">
                This request is time-sensitive. I would like to explore an emergency engagement with a targeted 72-hour delivery window.
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-sm font-semibold text-black shadow-soft-glow transition transform hover:scale-105 hover:shadow-lg hover:from-emerald-400 hover:to-cyan-300"
            >
              Send message
            </button>
          </form>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-raven-border/70 bg-raven-card/95 p-6 shadow-soft-glow">
            <p className="text-sm text-slate-100">
              Would you like to be contacted ASAP even if outside of normal business hours?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  if (emergencyRef.current) {
                    emergencyRef.current.checked = false;
                  }
                }}
                className="rounded-full border border-raven-border/70 bg-raven-surface/80 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-raven-accent/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  if (formRef.current) {
                    formRef.current.submit();
                  }
                }}
                className="rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-4 py-2 text-xs font-semibold text-black shadow-soft-glow"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import SeoHead from '../components/SeoHead';

export default function Legal({ type }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const path = isPrivacy ? '/privacy' : '/terms';

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 lg:px-6">
      <SeoHead
        title={`${title} | Raven Development Operations`}
        description={
          isPrivacy
            ? 'How Raven Development Operations collects, uses, and protects information shared during DevOps engagements.'
            : 'The terms that govern DevOps consulting engagements with Raven Development Operations.'
        }
        path={path}
      />
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-sm text-slate-300">
          Raven Development Operations is a solo DevOps consultancy. This page explains how I handle information and the terms
          that apply when we work together.
        </p>
      </header>

      {isPrivacy ? <PrivacyContent /> : <TermsContent />}

      <section className="border-t border-raven-border/70 pt-4 text-xs text-slate-500">
        <p>
          This page is provided for informational purposes and is not legal advice. If you have questions about how these
          policies apply to your organization, please contact me at{' '}
          <a href="mailto:business@ravdevops.com" className="text-raven-cyan hover:text-white">
            business@ravdevops.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <>
      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Information I collect</h2>
        <p>
          I collect information that you choose to share when you contact me, book time via Calendly, or work with me on a
          project. This can include your name, email address, company, role, project details, and any assets or credentials you
          provide for the engagement.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">How that information is used</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>To respond to inquiries and schedule calls.</li>
          <li>To scope, deliver, and support DevOps consulting engagements.</li>
          <li>To manage billing, bookkeeping, and basic business analytics.</li>
        </ul>
        <p className="mt-2">
          I do not sell your data. Information is shared only as needed to deliver services (for example, with cloud providers,
          code hosting platforms, or billing tools that you or I use).
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Third-party services</h2>
        <p>
          I use third-party tools such as Calendly, GitHub, Netlify, and cloud providers. Those services have their own privacy
          policies that govern how they handle data. When possible, I configure them to collect only what is necessary for the
          engagement.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Data retention</h2>
        <p>
          Project-related information is retained for as long as necessary to support the engagement, meet contractual or legal
          obligations, and maintain reasonable records. Access to client systems is removed at the end of an engagement unless
          otherwise agreed in writing.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Security and confidentiality</h2>
        <p>
          I treat client systems and data as confidential. Access is limited to what is needed to complete agreed work, and I
          use industry-standard practices such as strong authentication and encrypted connections. Additional security and
          confidentiality terms are typically captured in a statement of work or master services agreement.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Your choices</h2>
        <p>
          If you would like to update or remove contact information you have shared with me, or restrict how it is used during
          an engagement, contact me at{' '}
          <a href="mailto:business@ravdevops.com" className="text-raven-cyan hover:text-white">
            business@ravdevops.com
          </a>
          .
        </p>
      </section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Scope of services</h2>
        <p>
          Raven Development Operations provides DevOps-focused consulting such as CI/CD automation, infrastructure as code,
          observability, and related engineering support. Specific deliverables, timelines, and fees are defined in writing for
          each engagement (for example, in a proposal, statement of work, or email agreement).
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Client responsibilities</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Provide accurate information about systems, constraints, and goals.</li>
          <li>Designate a point of contact who can make decisions and review work.</li>
          <li>Ensure that any access granted to code, cloud accounts, or data is authorized.</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Fees, invoicing, and scheduling</h2>
        <p>
          Fees, payment schedules, and cancellation terms are set out in the engagement documents. In general, fixed-scope work
          is billed partially or fully in advance, and retainers are billed at the beginning of each period. Late payments may
          delay work or result in suspension of services.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Confidentiality and intellectual property</h2>
        <p>
          I keep client information confidential and use it only to deliver agreed services. Unless otherwise specified in the
          contract, you own your existing systems and data, and you receive rights to use the work product delivered for your
          business. I may retain generic, non-confidential learnings and patterns to use in future work.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Open source and third-party tools</h2>
        <p>
          Many DevOps solutions rely on open source software and third-party platforms. I follow their licenses and
          documentation, but I do not control their availability, pricing, or terms. Your use of those tools is governed by
          their respective terms of service.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Warranties and limitations</h2>
        <p>
          Services are provided on an "as is" basis. I aim for reliable, secure systems, but I cannot guarantee zero defects,
          zero incidents, or specific business outcomes. To the extent permitted by law, any liability arising out of an
          engagement is limited to the fees paid for the relevant work.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Governing law</h2>
        <p>
          Unless otherwise agreed in a separate contract, these terms are governed by the laws of the State of Missouri, United
          States, without regard to its conflict-of-law principles.
        </p>
      </section>
    </>
  );
}


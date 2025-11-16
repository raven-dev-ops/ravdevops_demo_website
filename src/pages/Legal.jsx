import React from 'react';
import SeoHead from '../components/SeoHead';

export default function Legal({ type }) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const path = type === 'privacy' ? '/privacy' : '/terms';
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 lg:px-6">
      <SeoHead
        title={`${title} | Raven Development Operations`}
        description="Policy placeholders covering privacy, security, confidentiality, and service terms for DevOps engagements."
        path={path}
      />
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="text-sm text-slate-300">
        This placeholder will be replaced with finalized legal language. Raven Development Operations keeps client data secure,
        respects confidentiality, and scopes engagements clearly.
      </p>
      <ul className="list-disc space-y-2 pl-6 text-sm text-slate-300">
        <li>Data shared via contact forms or Calendly is used only for engagement discussions.</li>
        <li>Access to repositories or infrastructure is governed by written agreements.</li>
        <li>Security, confidentiality, and availability commitments are tailored per project.</li>
      </ul>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Government Agencies',
    body:
      'Experienced partnering with federal, state, and local teams. We align to security and compliance practices and provide disciplined documentation and delivery. Comfortable operating within procurement processes and structured reporting.',
    bullets: [
      'Familiar with FedRAMP/DoD security expectations',
      'Veteran-Owned Small Business (VOSB) alignment',
      'Clear documentation and auditable change control',
    ],
  },
  {
    title: 'Enterprise Tech Companies',
    body:
      'Scalable solutions for complex environments. We integrate with your SDLC, automate CI/CD, and enable observability so teams can ship faster with confidence.',
    bullets: [
      'Cloud migrations and platform operations',
      'Pipeline standardization and developer experience',
      'Data integrations and real-time dashboards',
    ],
  },
  {
    title: 'Defense Contractors',
    body:
      'Mission-focused support with an understanding of high-security standards and collaboration within defense programs. Veteran background resonates with defense culture and mission needs.',
    bullets: [
      'Security-first workflows and review gates',
      'Strict access control and change tracking',
      'Reliable subcontractor/partner engagement',
    ],
  },
];

const Industries = ({ id }) => (
  <section id={id} className="py-16 px-6 lg:py-24 bg-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">Industries & Clients</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Proudly serving government agencies, enterprise technology organizations, and defense contractors. Our approach blends disciplined execution with modern engineering practices.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <h3 className="text-xl font-semibold text-raven-dark mb-2">{s.title}</h3>
            <p className="text-gray-700 mb-3">{s.body}</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-500">
          Trusted by federal agencies, enterprise SaaS teams, and defense innovators that rely on secure delivery.
        </p>
      </div>
    </div>
  </section>
);

export default Industries;

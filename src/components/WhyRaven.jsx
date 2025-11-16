// components/WhyRaven.jsx

import React from 'react';
import { motion } from 'framer-motion';

const points = [
  {
    title: 'Veteran-Owned, Mission-Driven',
    text: 'Led by a U.S. military veteran, Raven Development delivers with discipline, reliability, and a service-oriented mindset. We understand the value of trust and follow-through, and bring military-tested leadership to every engagement.',
    emphasis: 'Veteran owned, 100% American-made | SDVOSB partner',
  },
  {
    title: 'Government Contracting & Apex Accelerator Support',
    text: 'Raven offers custom software development for local, state, and federal agencies seeking agile, experienced, and compliant partners. Through our Apex Accelerator support, we help government teams and prime contractors work with a certified veteran-owned small business. Our documentation and proposal process is DUNS, UEI, and CAGE-code ready.',
    emphasis: 'Streamlined procurement. Real impact.',
  },
  {
    title: 'AI Code Cleanup & Rescue - No More AI Slop!',
    text: 'Struggling with messy, unfinished, or unreliable code produced by AI tools or contractors? Our team specializes in AI code audits, refactoring, and code rescue missions, no matter how tangled the codebase. We help you understand what you have, fix what is broken, and get your digital project launch-ready. If your AI-driven coding left you with a half-finished product, call us - we are here to help you learn and grow, not judge.',
    emphasis: 'We rescue, repair, refactor, and empower.',
  },
  {
    title: 'Small Business Focused',
    text: 'We understand the pressures, constraints, and opportunities of running a small business because we are one. Get practical, cost-effective solutions without corporate bloat, built for the real world, not just the boardroom.',
    emphasis: 'Your growth is our mission.',
  },
  {
    title: 'Full-Service, End-to-End',
    text: 'From strategic consulting and design, through cloud deployment and ongoing support, our full-stack team covers your tech journey so you do not need to juggle multiple vendors or freelancers.',
    emphasis: 'Comprehensive capabilities. One partner.',
  },
  {
    title: 'Transparent & Collaborative',
    text: 'Clear communication, upfront proposals, flexible approaches, and no black-box surprises. You are in the loop every step, because we believe in partnership, not just transactions.',
    emphasis: 'Honest work. Proven results.',
  },
];

const WhyRaven = ({ id }) => (
  <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">
        Why Partner with Raven Development?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {points.map((point, index) => (
          <motion.div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-raven-blue"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <h3 className="text-xl font-semibold text-raven-dark mb-2">{point.title}</h3>
            <p className="text-gray-600 mb-3">{point.text}</p>
            <p className="text-sm font-semibold text-raven-blue">{point.emphasis}</p>
          </motion.div>
        ))}
      </div>
      {/* Optional: Veteran-owned and government contracting badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {/* <img src="/badges/veteran-owned.png" alt="Veteran Owned" className="h-14" /> */}
        {/* <img src="/badges/apex-accelerator.png" alt="Apex Accelerator Supporter" className="h-12" /> */}
        {/* <img src="/badges/sba-certified.png" alt="SBA Certified" className="h-12" /> */}
      </div>
      <div className="mt-10 text-center text-lg font-medium text-raven-dark">
        <span className="inline-block bg-green-100 rounded px-4 py-2">
          Stuck with code you cannot trust? Raven is your best friend in tech, helping you solve problems and level up, no matter
          where you started!
        </span>
      </div>
    </div>
  </section>
);

export default WhyRaven;


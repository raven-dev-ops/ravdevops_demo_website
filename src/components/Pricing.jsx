import React from 'react';
import { motion } from 'framer-motion';

const Pricing = ({ id }) => {
  // Function to handle smooth scroll to contact section
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">What to Expect: Deliverables & Pricing</h2>
        <p className="text-center text-gray-600 mb-10">
          We believe in transparency. While every project is unique, here’s a general idea of our approach.
        </p>

        <motion.div
            className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">1. Free Consultation</h3>
            <p className="text-gray-600">Every engagement starts with a no-obligation strategy call to understand your needs and see if we're a good fit. We listen first.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">2. Detailed Proposal</h3>
            <p className="text-gray-600">You'll receive a clear proposal outlining the project scope, specific deliverables, estimated timelines, and transparent pricing. No jargon, no hidden fees.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">3. Typical Project Investment</h3>
            <p className="text-gray-600">Custom software or app projects for small businesses often range from <span className="font-semibold">$5,000 - $50,000+</span> depending on complexity, typically taking <span className="font-semibold">6-16 weeks</span>. Smaller integrations, consulting, or specific tool development can start lower. We always tailor solutions to your budget and goals.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">4. Core Deliverables</h3>
            <p className="text-gray-600">Expect fully tested software/applications, user documentation or training materials, source code (as applicable), and standard post-launch support (e.g., 3 months included).</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">5. Flexible Options</h3>
            <p className="text-gray-600">We offer fixed-price packages for clearly defined scopes and flexible hourly/retainer arrangements for ongoing needs or evolving projects.</p>
          </div>
        </motion.div>

        <p className="text-center text-gray-700 mt-10 text-lg">
          Have questions about pricing or need a custom quote?{' '}
          {/* Use button for scroll */}
          <button onClick={scrollToContact} className="text-raven-blue hover:text-raven-red font-semibold ml-1 underline">
            Let's discuss your specific needs.
          </button>
        </p>
      </div>
    </section>
  );
};

export default Pricing; // Default export
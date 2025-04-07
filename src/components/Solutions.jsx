import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Ensure installed: npm install @heroicons/react

const solutionsList = [
  "Manual, repetitive tasks consuming your time? We automate them with custom apps, freeing up your team.",
  "Data scattered across spreadsheets causing confusion? We integrate and centralize it for clear insights.",
  "Onboarding new employees taking too long and inconsistent? Our training tools get new hires up to speed faster.",
  "Off-the-shelf software not quite fitting your unique workflow? We build solutions tailored precisely to how you operate.",
  "Worried about software quality or reliability? Our rigorous testing ensures your tools work flawlessly.",
];

const Solutions = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">Solutions for Your Business Challenges</h2>
        <p className="text-center text-gray-600 mb-10">
          We focus on delivering tangible results by solving the real-world problems that slow small businesses down.
        </p>

        <div className="space-y-4">
          {solutionsList.map((solution, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{solution}</p>
            </motion.div>
          ))}
        </div>

         {/* Optional Testimonial */}
         <motion.div
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow text-center italic border-l-4 border-raven-blue"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
         >
            <p className="text-gray-700 text-lg">"Raven Development transformed our operations. Their custom app cut our processing time by nearly 40% - a fantastic investment!"</p>
            <p className="mt-2 text-sm font-semibold text-gray-600">- J. Davis, Operations Manager, Local Logistics Co.</p>
         </motion.div>

      </div>
    </section>
  );
};

export default Solutions; // Default export
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { number: 1, title: "Discover & Plan", description: "We start with a free consultation to deeply understand your needs, challenges, and goals. Then, we map out a clear solution strategy tailored to your budget.", icon: "🔍" },
  { number: 2, title: "Develop & Iterate", description: "Our US-based team builds your solution using agile methods. You'll see progress regularly, provide feedback, and watch your vision come to life.", icon: "💻" },
  { number: 3, title: "Deliver & Support", description: "We rigorously test and deploy the solution, ensuring your team is trained and comfortable. We stand by our work with ongoing support.", icon: "🚀" },
];

const Process = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">Our Collaborative 3-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-raven-blue text-white text-2xl font-bold shadow-lg">
                {/* {step.icon} Or use step.number */}
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-12 italic">
            We believe in transparency and partnership every step of the way.
        </p>
      </div>
    </section>
  );
};

export default Process; // Default export
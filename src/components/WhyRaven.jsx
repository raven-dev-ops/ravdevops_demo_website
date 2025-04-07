import React from 'react';
import { motion } from 'framer-motion';

const points = [
  { title: "Veteran-Owned, Values-Driven", text: "Led by a U.S. military veteran, Raven Development operates with integrity, discipline, and a mission-first commitment to your success. We bring leadership and reliability to every project.", emphasis: "🇺🇸 100% American-Made Solutions" },
  { title: "Small Business Focused", text: "We understand the unique pressures and opportunities of small businesses because we are one. We prioritize practical, right-sized solutions that deliver real ROI, no matter your company size.", emphasis: "Your goals are our priority." },
  { title: "End-to-End Expertise", text: "From initial concept and strategy through development, rigorous testing, deployment, and training, our full-stack team covers the entire tech lifecycle. No need to juggle multiple vendors.", emphasis: "Comprehensive capabilities." },
  { title: "Transparent & Collaborative", text: "We provide clear communication, upfront estimates, and flexible approaches. You're involved throughout the process. Think of us as your dedicated tech partner.", emphasis: "No surprises, just results." },
];

const WhyRaven = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">Why Partner with Raven Development?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-raven-blue"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{point.title}</h3>
              <p className="text-gray-600 mb-3">{point.text}</p>
              <p className="text-sm font-semibold text-raven-blue">{point.emphasis}</p>
            </motion.div>
          ))}
        </div>
         {/* Optional: Add veteran-owned badge graphic here */}
         {/* <div className="text-center mt-10">
           <img src="/path/to/veteran-owned-badge.png" alt="Veteran Owned Business" className="h-16 mx-auto" />
         </div> */}
      </div>
    </section>
  );
};

export default WhyRaven; // Default export
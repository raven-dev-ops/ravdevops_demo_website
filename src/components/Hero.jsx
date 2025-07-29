// components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound';
import flagOverlayImage from '../assets/american_flag_background.png';

const Hero = ({ id, scrollToContact }) => {
  const playRavenSound = useSound('/audio/raven-caw.mp3');

  const handleCTAClick = () => {
    playRavenSound();
    scrollToContact();
  };

  return (
    <section
      id={id}
      className="relative bg-gradient-to-r from-gray-100 to-gray-200 text-center py-24 px-6 lg:py-32 overflow-hidden"
    >
      {/* Subtle flag background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${flagOverlayImage})` }}
        aria-hidden="true"
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-blue-100 text-raven-blue text-sm font-semibold px-3 py-1 rounded-full mb-4 shadow-sm"
        >
          🇺🇸 Veteran-Owned & Operated
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-raven-dark mb-4 leading-tight"
        >
          Artificial Intelligence <span className="text-raven-blue">Software</span> Solutions = A.S.S.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
        >
          Don’t get caught in the <span className="font-semibold text-raven-red">AI slop train</span>.
          Trust real developers who deliver—Raven Development builds robust, custom software, automation, and training systems for businesses and agencies that demand reliability. We rescue, refactor, and finish projects that AI or others couldn’t.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <button
            onClick={handleCTAClick}
            className="bg-raven-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-raven-blue"
          >
            Get Your Free Consultation
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className="mt-6 text-gray-500 text-sm"
        >
          Serving small business, contractors, and public agencies nationwide. When you’re ready for real results, partner with Raven Development.
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

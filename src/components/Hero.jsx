import React from 'react';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound';
// --- IMPORT THE IMAGE ---
// Make sure this path is correct relative to Hero.jsx
import flagOverlayImage from '../flag-overlay.png'; // Or '../assets/flag-overlay.png' if you moved it

const Hero = ({ id, scrollToContact }) => {
  const playRavenSound = useSound('/audio/raven-caw.mp3'); // Audio still loaded from public

  const handleCTAClick = () => {
    playRavenSound();
    scrollToContact();
  };

  return (
    <section
      id={id}
      className="relative bg-gradient-to-r from-gray-100 to-gray-200 text-center py-24 px-6 lg:py-32 overflow-hidden"
    >
      {/* --- USE INLINE STYLE FOR BACKGROUND IMAGE --- */}
      <div
        // Keep utility classes for positioning, cover, opacity etc.
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        // Apply the background image using the imported variable via inline style
        style={{ backgroundImage: `url(${flagOverlayImage})` }}
        aria-hidden="true"
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-blue-100 text-raven-blue text-sm font-semibold px-3 py-1 rounded-full mb-4"
        >
          🇺🇸 Veteran-Owned Business
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-raven-dark mb-4 leading-tight"
        >
          American-Made Tech Solutions to <span className="text-raven-blue">Eliminate</span> Business Inefficiencies.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Raven Development builds custom software, applications, and training tools that streamline your operations and drive growth for your small business. Let's make technology work *for* you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handleCTAClick}
            className="bg-raven-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Get a Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
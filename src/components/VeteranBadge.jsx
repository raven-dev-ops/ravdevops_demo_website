import React from 'react';
import { motion } from 'framer-motion';

const VeteranBadge = () => {
  // Example: Fixed badge at bottom right
  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-raven-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }} // Delay animation slightly
    >
      🇺🇸 Veteran-Owned
    </motion.div>
  );
};

export default VeteranBadge;
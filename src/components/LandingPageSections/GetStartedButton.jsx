import React from 'react';
import { motion } from 'framer-motion';

const GetStartedButton = ({ onShowAuth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="flex justify-center mb-12 relative z-20" /* Add z-20 here */
    >
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={onShowAuth}
          className="btn-primary px-8 py-4 text-lg flex items-center gap-2 hover:bg-primary/90 transition-all group mx-auto"
        >
          Get Started Free
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default GetStartedButton;

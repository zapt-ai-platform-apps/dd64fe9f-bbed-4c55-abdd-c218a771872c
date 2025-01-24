import React from 'react';
import { motion } from 'framer-motion';

const GetStartedButton = ({ onShowAuth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden my-12"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center p-8">
        <button
          onClick={() => {
            console.log('onShowAuth called!');
            onShowAuth();
          }}
          className="btn-primary px-10 py-5 text-lg bg-white text-primary hover:bg-gray-100 hover:text-primary-dark transition-colors"
        >
          Get Started Free NOW
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default GetStartedButton;

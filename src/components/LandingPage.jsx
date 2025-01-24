import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './LandingPageSections/HeroSection';
import FeaturesGrid from './LandingPageSections/FeaturesGrid';
import TestimonialsSection from './LandingPageSections/TestimonialsSection';
import FAQSection from './LandingPageSections/FAQSection';
import FinalCTA from './LandingPageSections/FinalCTA';
import { features, testimonials, faqs } from '../data/landingPageData';

const LandingPage = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/90 to-indigo-900/90 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0" />
      <div className="absolute inset-0 bg-[url('PLACEHOLDER')] bg-cover bg-center opacity-10 mix-blend-soft-light" 
           data-image-request="abstract connected dots network" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <HeroSection onShowAuth={onShowAuth} />
        
        <div className="py-24">
          <FeaturesGrid features={features} />
        </div>
        
        <div className="py-24">
          <TestimonialsSection testimonials={testimonials} />
        </div>

        <div className="py-24">
          <FAQSection faqs={faqs} />
        </div>

        <div className="py-24">
          <FinalCTA onShowAuth={onShowAuth} />
        </div>

        <footer className="border-t border-white/10 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group"
            >
              Made on ZAPT
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
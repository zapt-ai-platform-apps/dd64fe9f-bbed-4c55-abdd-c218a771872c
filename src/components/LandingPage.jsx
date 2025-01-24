import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { features, testimonials, faqs } from '../data/landingPageData';
import HeroSection from './LandingPageSections/HeroSection';
import FeaturesGrid from './LandingPageSections/FeaturesGrid';
import TestimonialsSection from './LandingPageSections/TestimonialsSection';
import FAQSection from './LandingPageSections/FAQSection';
import FinalCTA from './LandingPageSections/FinalCTA';

const LandingPage = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 opacity-95" />
      <div className="absolute inset-0 bg-[url('PLACEHOLDER')] bg-cover bg-center opacity-10 mix-blend-soft-light" 
           data-image-request="abstract connected dots network" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <HeroSection onShowAuth={onShowAuth} />
        
        <FeaturesGrid features={features} />

        <TestimonialsSection testimonials={testimonials} />

        <FAQSection faqs={faqs} />

        <FinalCTA onShowAuth={onShowAuth} />

        <footer className="border-t border-white/10 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Made on ZAPT
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
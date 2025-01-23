import React from 'react';
import { supabase } from '../supabaseClient';
import FeatureGrid from './FeatureGrid';
import StatsSection from './StatsSection';

const LandingPage = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 opacity-95" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Professional Status Management Reimagined
          </h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Streamline client communication with real-time availability updates. Professionals maintain their schedule visibility while clients stay instantly informed.
          </p>
          
          <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
            <button
              onClick={onShowAuth}
              className="btn-primary px-8 py-4 text-lg flex items-center gap-2 hover:bg-primary/90 transition-all"
            >
              Get Started Free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <FeatureGrid />

        <StatsSection />
      </div>

      <footer className="relative z-10 border-t border-white/10 mt-20 py-8">
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
  );
};

export default LandingPage;
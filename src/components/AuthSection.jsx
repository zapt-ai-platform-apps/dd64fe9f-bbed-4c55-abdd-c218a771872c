import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import AuthHeader from './AuthHeader';
import PoweredByZapt from './PoweredByZapt';
import { appearance } from './authTheme';

export default function AuthSection({ onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-surface to-background/95">
      <div className="card-glass p-8 w-full max-w-md space-y-6 backdrop-blur-lg border border-white/10 shadow-xl relative">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        
        <AuthHeader />
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Sign in with ZAPT</p>
            <Auth
              supabaseClient={supabase}
              providers={['google', 'facebook', 'apple']}
              appearance={appearance}
            />
          </div>
          
          <PoweredByZapt />
        </div>
      </div>
    </div>
  );
}
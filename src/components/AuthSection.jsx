import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

export default function AuthSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-surface to-background/95">
      <div className="card-glass p-8 w-full max-w-md space-y-6 backdrop-blur-lg border border-white/10 shadow-xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            StatusPro
          </h1>
          <p className="text-gray-300 text-lg">Professional Presence Management</p>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Sign in with ZAPT</p>
            <Auth
              supabaseClient={supabase}
              providers={['google', 'facebook', 'apple']}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#6366f1',
                      brandAccent: '#8b5cf6',
                      inputText: '#ffffff',
                      inputBackground: 'rgba(255, 255, 255, 0.05)',
                      inputBorder: 'rgba(255, 255, 255, 0.1)',
                      messageText: '#ffffff',
                    },
                    space: {
                      spaceSmall: '4px',
                      spaceMedium: '8px',
                      spaceLarge: '16px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
              }}
            />
          </div>
          
          <div className="text-center text-sm text-gray-400">
            Powered by{' '}
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              ZAPT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
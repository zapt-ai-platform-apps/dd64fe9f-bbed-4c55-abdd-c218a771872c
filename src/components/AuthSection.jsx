import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

export default function AuthSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-glass p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Status Pro
          </h1>
          <p className="text-gray-300">Sign in to manage your professional presence</p>
        </div>
        
        <div className="space-y-4">
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
                },
              },
            }}
          />
          <div className="text-center text-sm text-gray-400">
            Powered by{' '}
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              ZAPT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
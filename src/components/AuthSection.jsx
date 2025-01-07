import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

export default function AuthSection({ setUserType }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Sign in with ZAPT</h1>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        appearance={{ theme: ThemeSupa }}
      />
      <button
        onClick={() => setUserType('')}
        className="mt-4 text-blue-500 underline cursor-pointer"
      >
        Back to user type selection
      </button>
    </div>
  );
}
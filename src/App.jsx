import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import WorkerDashboard from './components/WorkerDashboard';
import ClientView from './components/ClientView';

export default function App() {
  const [session, setSession] = useState(null);
  const [isClientView, setIsClientView] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const toggleView = () => {
    setIsClientView(!isClientView);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {!session && !isClientView && (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Sign in with ZAPT</h1>
            <Auth
              supabaseClient={supabase}
              providers={['google', 'facebook', 'apple']}
              appearance={{ theme: ThemeSupa }}
            />
            <button
              onClick={toggleView}
              className="mt-4 text-blue-500 underline cursor-pointer"
            >
              Are you a client? Click here to check status
            </button>
          </div>
        )}
        {!session && isClientView && (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <ClientView />
            <button
              onClick={toggleView}
              className="mt-4 text-blue-500 underline cursor-pointer"
            >
              Back to worker sign in
            </button>
          </div>
        )}
        {session && <WorkerDashboard session={session} />}
      </div>
      <footer className="p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}
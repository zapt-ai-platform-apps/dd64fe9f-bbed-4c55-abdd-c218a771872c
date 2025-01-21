import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import WorkerDashboard from './components/WorkerDashboard';
import ClientDashboard from './components/ClientDashboard';
import AuthSection from './components/AuthSection';
import RoleSwitcher from './components/RoleSwitcher';

export default function App() {
  const [session, setSession] = useState(null);
  const [userType, setUserType] = useState('client');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const selectUserType = (type) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {!session && <AuthSection />}
        {session && (
          <>
            <RoleSwitcher userType={userType} selectUserType={selectUserType} />
            {userType === 'professional' && <WorkerDashboard session={session} />}
            {userType === 'client' && <ClientDashboard session={session} />}
          </>
        )}
      </div>
      <footer className="p-4 text-center border-t border-white/10">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}
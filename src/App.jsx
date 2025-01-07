import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import WorkerDashboard from './components/WorkerDashboard';
import ClientDashboard from './components/ClientDashboard';
import UserTypeSelection from './components/UserTypeSelection';
import AuthSection from './components/AuthSection';

export default function App() {
  const [session, setSession] = useState(null);
  const [userType, setUserType] = useState(() => localStorage.getItem('userType') || '');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setUserType('');
        localStorage.removeItem('userType');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const selectUserType = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        {!session && !userType && <UserTypeSelection selectUserType={selectUserType} />}
        {!session && userType && <AuthSection setUserType={setUserType} />}
        {session && userType === 'professional' && <WorkerDashboard session={session} />}
        {session && userType === 'client' && <ClientDashboard session={session} />}
      </div>
      <footer className="p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 cursor-pointer"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import WorkerDashboard from './components/WorkerDashboard';
import ClientDashboard from './components/ClientDashboard';
import AuthSection from './components/AuthSection';
import RoleSwitcher from './components/RoleSwitcher';
import LandingPage from './components/LandingPage';

export default function App() {
  const [session, setSession] = useState(null);
  const [userType, setUserType] = useState('client');
  const [showAuth, setShowAuth] = useState(false);

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
        {!session ? (
          showAuth ? (
            <AuthSection onBack={() => setShowAuth(false)} />
          ) : (
            <LandingPage onShowAuth={() => setShowAuth(true)} />
          )
        ) : (
          <>
            <RoleSwitcher userType={userType} selectUserType={selectUserType} />
            {userType === 'professional' && <WorkerDashboard session={session} />}
            {userType === 'client' && <ClientDashboard session={session} />}
          </>
        )}
      </div>
    </div>
  );
}
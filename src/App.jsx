import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import WorkerDashboard from './components/WorkerDashboard';
import ClientDashboard from './components/ClientDashboard';
import AuthSection from './components/AuthSection';
import LandingPage from './components/LandingPage';
import ProfessionalConfirmationModal from './components/ProfessionalConfirmationModal';

export default function App() {
  const [session, setSession] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkExistingRole(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkExistingRole(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const checkExistingRole = (session) => {
    if (session) {
      const storedType = localStorage.getItem(`userType-${session.user.id}`);
      if (storedType) {
        setUserType(storedType);
      } else {
        setShowRoleConfirmation(true);
      }
    }
  };

  const handleRoleSelection = (isProfessional) => {
    const type = isProfessional ? 'professional' : 'client';
    setUserType(type);
    setShowRoleConfirmation(false);
    if (session?.user?.id) {
      localStorage.setItem(`userType-${session.user.id}`, type);
    }
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
            {showRoleConfirmation && (
              <ProfessionalConfirmationModal
                onConfirm={() => handleRoleSelection(true)}
                onDecline={() => handleRoleSelection(false)}
              />
            )}
            {userType === 'professional' && <WorkerDashboard session={session} />}
            {userType === 'client' && <ClientDashboard session={session} />}
          </>
        )}
      </div>
    </div>
  );
}
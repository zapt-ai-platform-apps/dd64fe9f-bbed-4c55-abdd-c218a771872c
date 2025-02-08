import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import WorkerDashboard from './components/WorkerDashboard';
import ClientDashboard from './components/ClientDashboard';
import AuthSection from './components/AuthSection';
import LandingPage from './components/LandingPage';
import ProfessionalConfirmationModal from './components/ProfessionalConfirmationModal';
import ChatWidget from './components/ChatWidget';
import useAuth from './hooks/useAuth';
import useUserType from './hooks/useUserType';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const { session } = useAuth();
  const { userType, showRoleConfirmation, handleRoleSelection, handleRoleChange } = useUserType(session);

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
            {userType === 'professional' && (
              <WorkerDashboard session={session} onRoleChange={handleRoleChange} />
            )}
            {userType === 'client' && (
              <ClientDashboard session={session} onRoleChange={handleRoleChange} />
            )}
          </>
        )}
      </div>
      <ChatWidget />
    </div>
  );
}
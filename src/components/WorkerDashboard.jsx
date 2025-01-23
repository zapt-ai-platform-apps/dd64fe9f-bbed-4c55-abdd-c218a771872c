import React from 'react';
import { supabase } from '../supabaseClient';
import ProfileStatusSection from './ProfileStatusSection';
import ShareLinkSection from './ShareLinkSection';
import useWorkerDashboard from '../hooks/useWorkerDashboard';
import LoadingSpinner from './LoadingSpinner';
import WorkerHeader from './WorkerHeader';
import StatusUpdateCard from './StatusUpdateCard';

export default function WorkerDashboard({ session, onRoleChange }) {
  const {
    status,
    setStatus,
    loading,
    profile,
    setProfile,
    shareLink,
    handleUpdateStatus,
    handleUpdateProfile,
    handleCopyToClipboard,
    handleClearStatus,
  } = useWorkerDashboard(session);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-full flex flex-col">
      <WorkerHeader 
        session={session} 
        profile={profile} 
        onRoleChange={onRoleChange} 
        signOut={signOut}
      />

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <StatusUpdateCard
            status={status}
            setStatus={setStatus}
            loading={loading}
            handleUpdateStatus={handleUpdateStatus}
            handleClearStatus={handleClearStatus}
          />

          <div className="card-glass p-6 flex-grow space-y-8">
            <ProfileStatusSection
              profile={profile}
              setProfile={setProfile}
              handleUpdateProfile={handleUpdateProfile}
              loading={loading}
            />

            <ShareLinkSection shareLink={shareLink} handleCopyToClipboard={handleCopyToClipboard} />
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            Your updates are visible to clients in real-time
          </div>
        </>
      )}
    </div>
  );
}
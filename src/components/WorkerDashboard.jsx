import React from 'react';
import { supabase } from '../supabaseClient';
import ProfileStatusSection from './ProfileStatusSection';
import ShareLinkSection from './ShareLinkSection';
import useWorkerDashboard from '../hooks/useWorkerDashboard';
import LoadingSpinner from './LoadingSpinner';

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
  } = useWorkerDashboard(session);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-full flex flex-col">
      <header className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold">{profile.name || session.user.email}</h1>
          <p className="text-gray-400">Professional Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRoleChange('client')}
            className="btn-primary bg-surface hover:bg-surface/80 px-4 py-2 text-sm"
          >
            Switch to Client View
          </button>
          <button
            onClick={signOut}
            className="btn-primary bg-error hover:bg-error/90 px-4 py-2 text-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="card-glass p-6 flex-grow space-y-8">
            <ProfileStatusSection
              profile={profile}
              setProfile={setProfile}
              handleUpdateProfile={handleUpdateProfile}
              status={status}
              setStatus={setStatus}
              handleUpdateStatus={handleUpdateStatus}
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
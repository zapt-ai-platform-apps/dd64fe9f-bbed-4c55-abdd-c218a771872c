import React from 'react';
import { supabase } from '../supabaseClient';
import ProfileStatusSection from './ProfileStatusSection';
import ShareLinkSection from './ShareLinkSection';
import useWorkerDashboard from '../hooks/useWorkerDashboard';

export default function WorkerDashboard({ session }) {
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
    <div className="p-4 max-w-md mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Hello, {session.user.email}</h1>
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
      <button
        onClick={signOut}
        className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer self-start"
      >
        Sign Out
      </button>
    </div>
  );
}
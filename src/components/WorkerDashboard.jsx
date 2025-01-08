import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProfileStatusSection from './ProfileStatusSection';
import ShareLinkSection from './ShareLinkSection';

export default function WorkerDashboard({ session }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    fetchStatus();
    fetchProfile();
    setShareLink(`${window.location.origin}/?professionalId=${session.user.id}`);
  }, []);

  const fetchStatus = async () => {
    const response = await fetch(`/api/getStatus?professionalId=${session.user.id}`);
    const { data } = await response.json();
    if (data) {
      setStatus(data.status);
    }
  };

  const fetchProfile = async () => {
    const response = await fetch(`/api/getProfile?professionalId=${session.user.id}`);
    const { data } = await response.json();
    if (data) {
      setProfile({ name: data.name, bio: data.bio });
    }
  };

  const handleUpdateStatus = async () => {
    setLoading(true);
    await fetch('/api/updateStatus', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    await fetch('/api/updateProfile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
    alert('Profile updated');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard!');
  };

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
import React, { useState, useEffect } from 'react';
import { fetchStatus, updateStatus, signOutUser } from '../services/supabaseService';
import { generateShareLink, copyToClipboard } from '../utils/linkUtils';
import StatusInput from './StatusInput';
import ShareLink from './ShareLink';

export default function WorkerDashboard({ session }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    fetchStatus(session.user.id, setStatus, setLoading);
    setShareLink(generateShareLink(session.user.id));
  }, [session.user.id]);

  const handleUpdateStatus = async () => {
    setLoading(true);
    await updateStatus(session.user.id, status);
    setLoading(false);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(shareLink);
    alert('Share link copied to clipboard!');
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <div className="p-4 max-w-md mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Hello, {session.user.email}</h1>
      <div className="mb-4 flex-grow">
        <StatusInput status={status} setStatus={setStatus} />
      </div>
      <div className="mb-4">
        <ShareLink shareLink={shareLink} onCopy={handleCopyToClipboard} />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleUpdateStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
        <button
          onClick={handleSignOut}
          className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
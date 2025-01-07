import React, { useState, useEffect } from 'react';
import { fetchStatus, updateStatus, signOutUser } from '../services/supabaseService';
import { generateShareLink, copyToClipboard } from '../utils/linkUtils';

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
        <label className="block text-gray-700 mb-2">Update your status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
          placeholder="e.g., Running 10 minutes late"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Your share link:</label>
        <div className="flex items-center">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-l-md box-border"
          />
          <button
            onClick={handleCopyToClipboard}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md cursor-pointer"
          >
            Copy
          </button>
        </div>
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
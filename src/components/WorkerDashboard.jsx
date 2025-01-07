import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function WorkerDashboard({ session }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoading(true);
    console.log('Fetching status...');
    const { data, error } = await supabase
      .from('statuses')
      .select('status')
      .eq('user_id', session.user.id)
      .single();

    if (data) {
      setStatus(data.status);
    } else if (error && error.code !== 'PGRST116') {
      console.error(error);
    }
    setLoading(false);
  };

  const updateStatus = async () => {
    setLoading(true);
    console.log('Updating status...');
    const { error } = await supabase.from('statuses').upsert({
      user_id: session.user.id,
      status,
      updated_at: new Date(),
    });

    if (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
      <div className="flex space-x-2">
        <button
          onClick={updateStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
        <button
          onClick={signOut}
          className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
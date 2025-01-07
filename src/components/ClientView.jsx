import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ClientView() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    console.log('Fetching worker status...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.error(userError);
      setStatus('Worker not found.');
      setLoading(false);
      return;
    }

    const { data: statusData, error: statusError } = await supabase
      .from('statuses')
      .select('status, updated_at')
      .eq('user_id', userData.id)
      .single();

    if (statusError || !statusData) {
      console.error(statusError);
      setStatus('No status available.');
      setLoading(false);
      return;
    }

    setStatus(`${statusData.status} (Last updated: ${new Date(statusData.updated_at).toLocaleString()})`);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check Worker Status</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Worker's Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
          placeholder="Enter worker's email"
        />
      </div>
      <button
        onClick={fetchStatus}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get Status'}
      </button>
      {status && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
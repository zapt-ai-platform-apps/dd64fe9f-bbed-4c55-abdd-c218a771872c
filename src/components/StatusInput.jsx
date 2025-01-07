import React from 'react';

export default function StatusInput({ status, setStatus }) {
  return (
    <>
      <label className="block text-gray-700 mb-2">Update your status:</label>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
        placeholder="e.g., Running 10 minutes late"
      />
    </>
  );
}
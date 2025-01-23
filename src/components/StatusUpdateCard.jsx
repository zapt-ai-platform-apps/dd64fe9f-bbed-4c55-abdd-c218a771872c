import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function StatusUpdateCard({ 
  status, 
  setStatus, 
  loading, 
  handleUpdateStatus, 
  handleClearStatus 
}) {
  return (
    <div className="card-glass p-6 mb-6 bg-primary/10 border-primary/20">
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Current Availability Status</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field flex-grow bg-white/10 border-primary/30"
            placeholder="e.g., Available now • Running 15 mins late • Fully booked"
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={handleUpdateStatus}
              className="btn-primary whitespace-nowrap flex items-center justify-center h-full px-6"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Update'}
            </button>
            <button
              onClick={handleClearStatus}
              className="btn-primary bg-surface hover:bg-surface/80 whitespace-nowrap h-full px-6"
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>
        <p className="text-sm text-primary-200">This status is visible to all your clients in real-time</p>
      </div>
    </div>
  );
}
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ProfileStatusSection({
  profile,
  setProfile,
  handleUpdateProfile,
  status,
  setStatus,
  handleUpdateStatus,
  handleClearStatus,
  loading,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold">Professional Profile</h2>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="input-field"
          placeholder="Display Name"
        />
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="input-field h-32"
          placeholder="Professional bio (e.g., services, expertise)"
        />
        <button
          onClick={handleUpdateProfile}
          className="btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Update Profile'}
        </button>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <h2 className="text-xl font-display font-semibold">Current Status</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
            placeholder="e.g., Available now • Running 15 mins late • Fully booked"
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleUpdateStatus}
              className="btn-primary flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Update Status'}
            </button>
            <button
              onClick={handleClearStatus}
              className="btn-primary bg-surface hover:bg-surface/80 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Clear Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
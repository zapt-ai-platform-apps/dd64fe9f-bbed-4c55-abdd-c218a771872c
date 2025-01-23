import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ProfileStatusSection({
  profile,
  setProfile,
  handleUpdateProfile,
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
        <input
          type="tel"
          value={profile.whatsappNumber || ''}
          onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
          className="input-field"
          placeholder="WhatsApp number with country code (e.g., +1234567890)"
          pattern="^\+[1-9]\d{1,14}$"
        />
        <button
          onClick={handleUpdateProfile}
          className="btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : 'Update Profile'}
        </button>
      </div>
    </div>
  );
}
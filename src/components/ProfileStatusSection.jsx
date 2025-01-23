import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import PhoneInput from './PhoneInput';

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
        <PhoneInput
          value={profile.whatsappNumber || ''}
          onChange={(value) => setProfile({ ...profile, whatsappNumber: value })}
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
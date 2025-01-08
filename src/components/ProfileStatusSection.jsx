import React from 'react';

export default function ProfileStatusSection({
  profile,
  setProfile,
  handleUpdateProfile,
  status,
  setStatus,
  handleUpdateStatus,
  loading,
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Your Profile</h2>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 box-border"
        placeholder="Your Name"
      />
      <textarea
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
        placeholder="Your Bio"
      />
      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2"
      >
        Update Profile
      </button>
      <div className="mt-6">
        <label className="block text-gray-700 mb-2">Update your status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md box-border"
          placeholder="e.g., Running 10 minutes late"
        />
        <button
          onClick={handleUpdateStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </div>
  );
}
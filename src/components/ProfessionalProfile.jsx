import React from 'react';

export default function ProfessionalProfile({ profile, status, onAddFavorite }) {
  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
      <p className="mb-4">{profile.bio}</p>
      <p className="mb-4">Current Status: {status || 'No status available'}</p>
      {onAddFavorite && (
        <button
          onClick={onAddFavorite}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
}
import React from 'react';
import { supabase } from '../supabaseClient';
import ProfessionalProfile from './ProfessionalProfile';
import * as Sentry from '@sentry/browser';
import {
  fetchFavorites,
  addFavorite,
  fetchProfessionalProfile,
  fetchProfessionalStatus,
} from '../services/api';
import useClientDashboard from './useClientDashboard';

export default function ClientDashboard({ session }) {
  const {
    favorites,
    professionalIdToAdd,
    professionalProfile,
    professionalStatus,
    loading,
    handleAddFavorite,
    signOut,
  } = useClientDashboard(session);

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Welcome, {session.user.email}</h1>
      {professionalProfile && (
        <ProfessionalProfile
          profile={professionalProfile}
          status={professionalStatus}
          onAddFavorite={handleAddFavorite}
        />
      )}
      <div className="mb-4 flex-grow text-black">
        <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
        {loading ? (
          <p>Loading...</p>
        ) : favorites.length === 0 ? (
          <p>You have no favorites yet.</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((fav) => (
              <li key={fav.professionalId} className="border p-2 rounded-md">
                <p>Professional ID: {fav.professionalId}</p>
                <a
                  href={`/?professionalId=${fav.professionalId}`}
                  className="text-blue-500 underline cursor-pointer"
                >
                  View Profile
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={signOut}
        className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer self-start"
      >
        Sign Out
      </button>
    </div>
  );
}
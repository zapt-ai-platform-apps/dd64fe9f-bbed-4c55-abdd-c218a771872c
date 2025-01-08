import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProfessionalProfile from './ProfessionalProfile';
import { fetchFavorites, addFavorite, fetchProfessionalProfile } from '../services/api';

export default function ClientDashboard({ session }) {
  const [favorites, setFavorites] = useState([]);
  const [professionalIdToAdd, setProfessionalIdToAdd] = useState('');
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
    checkForShareLink();
  }, []);

  const checkForShareLink = () => {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId');
    if (professionalId) {
      setProfessionalIdToAdd(professionalId);
      loadProfessionalProfile(professionalId);
    }
  };

  const loadFavorites = async () => {
    setLoading(true);
    const data = await fetchFavorites(session.access_token);
    setFavorites(data);
    setLoading(false);
  };

  const loadProfessionalProfile = async (professionalId) => {
    const data = await fetchProfessionalProfile(professionalId);
    setProfessionalProfile(data);
  };

  const handleAddFavorite = async () => {
    await addFavorite(session.access_token, professionalIdToAdd);
    setProfessionalIdToAdd('');
    alert('Professional added to your favorites!');
    window.history.replaceState({}, document.title, window.location.pathname);
    loadFavorites();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="p-4 max-w-md mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.email}</h1>
      {professionalProfile && (
        <ProfessionalProfile profile={professionalProfile} onAddFavorite={handleAddFavorite} />
      )}
      <div className="mb-4 flex-grow">
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
                  href={`/professional-profile?professionalId=${fav.professionalId}`}
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
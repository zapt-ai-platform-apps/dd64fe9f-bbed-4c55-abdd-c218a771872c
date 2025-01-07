import React, { useState, useEffect } from 'react';
import { fetchFavorites, addFavorite } from '../api/favorites';
import { fetchStatus } from '../api/status';
import { supabase } from '../supabaseClient';

export default function ClientDashboard({ session }) {
  const [favorites, setFavorites] = useState([]);
  const [professionalStatus, setProfessionalStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [professionalIdToAdd, setProfessionalIdToAdd] = useState('');

  useEffect(() => {
    fetchFavorites(session.user.id, setFavorites);
    checkForShareLink();
  }, [session.user.id]);

  const checkForShareLink = () => {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId');
    if (professionalId) {
      setProfessionalIdToAdd(professionalId);
    }
  };

  const handleAddFavorite = async () => {
    if (!professionalIdToAdd) return;
    const success = await addFavorite(session.user.id, professionalIdToAdd);
    if (success) {
      setFavorites([...favorites, professionalIdToAdd]);
      setProfessionalIdToAdd('');
      alert('Professional added to your favorites!');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleFetchStatus = async (professionalId) => {
    setLoading(true);
    const status = await fetchStatus(professionalId);
    setProfessionalStatus(status);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="p-4 max-w-md mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.email}</h1>
      {professionalIdToAdd && (
        <div className="mb-4">
          <p className="text-green-700">
            You've been invited to add a professional to your favorites!
          </p>
          <button
            onClick={handleAddFavorite}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2"
          >
            Add to Favorites
          </button>
        </div>
      )}
      <div className="mb-4 flex-grow">
        <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>You have no favorites yet.</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((professionalId) => (
              <li key={professionalId} className="border p-2 rounded-md">
                <p>Professional ID: {professionalId}</p>
                <button
                  onClick={() => handleFetchStatus(professionalId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2"
                  disabled={loading}
                >
                  {loading ? 'Fetching...' : 'View Status'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {professionalStatus && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <p>{professionalStatus}</p>
          <button
            onClick={() => setProfessionalStatus(null)}
            className="mt-2 text-blue-500 underline cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
      <button
        onClick={signOut}
        className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer self-start"
      >
        Sign Out
      </button>
    </div>
  );
}
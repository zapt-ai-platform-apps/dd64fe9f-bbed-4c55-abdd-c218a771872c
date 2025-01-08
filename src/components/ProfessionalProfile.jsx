import React, { useState, useEffect } from 'react';

export default function ProfessionalProfile() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId');
    if (professionalId) {
      fetchProfile(professionalId);
      fetchStatus(professionalId);
    }
  }, []);

  const fetchProfile = async (professionalId) => {
    const response = await fetch(`/api/getProfile?professionalId=${professionalId}`);
    const data = await response.json();
    setProfile(data);
  };

  const fetchStatus = async (professionalId) => {
    setLoading(true);
    const response = await fetch(`/api/getStatus?professionalId=${professionalId}`);
    const data = await response.json();
    setStatus(data.status);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {profile ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
          <p className="mb-4">{profile.bio}</p>
          <p className="mb-4">
            Current Status: {loading ? 'Loading...' : status || 'No status available'}
          </p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
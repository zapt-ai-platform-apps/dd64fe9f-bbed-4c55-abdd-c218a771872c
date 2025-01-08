import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProfessionalProfile() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const professionalId = params.get('professionalId');
    if (professionalId) {
      fetchProfile(professionalId);
      fetchStatus(professionalId);
    }
  }, [location]);

  const fetchProfile = async (professionalId) => {
    const { data } = await fetch(`/api/getProfile?professionalId=${professionalId}`).then((res) =>
      res.json()
    );
    setProfile(data);
  };

  const fetchStatus = async (professionalId) => {
    setLoading(true);
    const { data } = await fetch(`/api/getStatus?professionalId=${professionalId}`).then((res) =>
      res.json()
    );
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
import { useState, useEffect } from 'react';
import { useDataHandlers } from './dataHandlers';
import { useUserActions } from './userActions';

export default function useClientDashboard(session) {
  const [favorites, setFavorites] = useState([]);
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [professionalStatus, setProfessionalStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { 
    loadFavorites, 
    loadProfessionalProfile, 
    loadProfessionalStatus, 
    handleAddFavorite 
  } = useDataHandlers(
    setFavorites,
    setProfessionalProfile,
    setProfessionalStatus,
    setLoading,
    session
  );

  const { signOut } = useUserActions();

  useEffect(() => {
    loadFavorites();
    checkForShareLink();
  }, []);

  const checkForShareLink = () => {
    // Check both URL params and localStorage for professionalId
    const params = new URLSearchParams(window.location.search);
    const urlProfessionalId = params.get('professionalId');
    const storedProfessionalId = localStorage.getItem('pendingProfessionalId');

    const professionalId = urlProfessionalId || storedProfessionalId;
    
    if (professionalId) {
      // Store in localStorage if coming from URL param
      if (urlProfessionalId) {
        localStorage.setItem('pendingProfessionalId', professionalId);
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      loadProfessionalProfile(professionalId);
      loadProfessionalStatus(professionalId);
      
      if (session) {
        handleAddFavorite(professionalId);
        localStorage.removeItem('pendingProfessionalId');
      }
    }
  };

  return {
    favorites,
    professionalProfile,
    professionalStatus,
    loading,
    handleAddFavorite,
    signOut,
  };
}
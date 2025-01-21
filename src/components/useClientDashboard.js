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
    
    // Handle URL changes
    const handleUrlChange = () => {
      checkForShareLink();
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const checkForShareLink = () => {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId') || localStorage.getItem('pendingProfessionalId');
    
    if (professionalId) {
      loadProfessionalProfile(professionalId);
      loadProfessionalStatus(professionalId);
      
      if (session) {
        handleAddFavorite(professionalId);
        localStorage.removeItem('pendingProfessionalId');
      }
    } else {
      setProfessionalProfile(null);
      setProfessionalStatus(null);
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
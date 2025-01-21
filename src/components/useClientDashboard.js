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
    // Check localStorage for pending professionalId
    const storedProfessionalId = localStorage.getItem('pendingProfessionalId');
    
    if (storedProfessionalId) {
      loadProfessionalProfile(storedProfessionalId);
      loadProfessionalStatus(storedProfessionalId);
      
      if (session) {
        handleAddFavorite(storedProfessionalId);
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
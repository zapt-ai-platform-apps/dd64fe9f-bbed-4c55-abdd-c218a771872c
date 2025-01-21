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
    const initialize = async () => {
      const favoritesData = await loadFavorites();
      await checkForShareLink(favoritesData);
    };
    
    initialize();
    
    const handleUrlChange = () => {
      checkForShareLink(favorites);
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const checkForShareLink = async (favoritesData) => {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId') || localStorage.getItem('pendingProfessionalId');
    
    if (professionalId) {
      await loadProfessionalProfile(professionalId);
      await loadProfessionalStatus(professionalId);
      
      if (session) {
        const isTracked = favoritesData.some(f => f.professionalId === professionalId);
        if (!isTracked) {
          try {
            await handleAddFavorite(professionalId);
          } catch (error) {
            console.error('Error adding favorite:', error);
          }
        }
        localStorage.removeItem('pendingProfessionalId');
        window.history.replaceState({}, document.title, window.location.pathname);
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
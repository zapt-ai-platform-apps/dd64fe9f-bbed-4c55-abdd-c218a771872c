import { 
  fetchFavorites, 
  addFavorite, 
  fetchProfessionalProfile, 
  fetchProfessionalStatus 
} from '../services/api';
import * as Sentry from '@sentry/browser';

export const useDataHandlers = (
  setFavorites,
  setProfessionalProfile,
  setProfessionalStatus,
  setLoading,
  session
) => {
  const loadFavorites = async () => {
    console.log('Loading favorites...');
    setLoading(true);
    try {
      const data = await fetchFavorites(session?.access_token);
      setFavorites(data);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfessionalProfile = async (professionalId) => {
    console.log(`Loading professional profile: ${professionalId}`);
    try {
      const data = await fetchProfessionalProfile(professionalId);
      setProfessionalProfile(data);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    }
  };

  const loadProfessionalStatus = async (professionalId) => {
    console.log(`Loading professional status: ${professionalId}`);
    try {
      const result = await fetchProfessionalStatus(professionalId);
      setProfessionalStatus(result);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    }
  };

  const handleAddFavorite = async (professionalId) => {
    console.log('Adding favorite...', professionalId);
    setLoading(true);
    try {
      await addFavorite(session.access_token, professionalId);
      // Only show success message if not already in favorites
      alert('Professional added to your favorites!');
      window.history.replaceState({}, document.title, window.location.pathname);
      loadFavorites();
    } catch (error) {
      console.error(error);
      if (error.message.includes('duplicate key value')) {
        alert('This professional is already in your favorites');
      } else {
        Sentry.captureException(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loadFavorites,
    loadProfessionalProfile,
    loadProfessionalStatus,
    handleAddFavorite
  };
};
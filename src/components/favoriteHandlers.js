import { 
  fetchFavorites, 
  addFavorite, 
  removeFavorite 
} from '../services/api';
import * as Sentry from '@sentry/browser';

export const handleAddFavorite = async (professionalId, setFavorites, setLoading, session) => {
  console.log('Toggling favorite...', professionalId);
  setLoading(true);
  try {
    const currentFavorites = await fetchFavorites(session.access_token);
    const isCurrentlyTracked = currentFavorites.some(f => f.professionalId === professionalId);

    if (isCurrentlyTracked) {
      await removeFavorite(session.access_token, professionalId);
      alert('Professional removed from your favorites!');
    } else {
      await addFavorite(session.access_token, professionalId);
      alert('Professional added to your favorites!');
    }
    
    const updatedFavorites = await fetchFavorites(session.access_token);
    setFavorites(updatedFavorites);
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
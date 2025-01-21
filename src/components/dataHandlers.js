import { 
  loadFavorites,
  loadProfessionalProfile,
  loadProfessionalStatus
} from './dataLoaders';
import { handleAddFavorite } from './favoriteHandlers';

export const useDataHandlers = (
  setFavorites,
  setProfessionalProfile,
  setProfessionalStatus,
  setLoading,
  session
) => {
  return {
    loadFavorites: () => loadFavorites(setFavorites, setLoading, session),
    loadProfessionalProfile: (professionalId) => loadProfessionalProfile(professionalId, setProfessionalProfile),
    loadProfessionalStatus: (professionalId) => loadProfessionalStatus(professionalId, setProfessionalStatus),
    handleAddFavorite: (professionalId) => handleAddFavorite(professionalId, setFavorites, setLoading, session)
  };
};
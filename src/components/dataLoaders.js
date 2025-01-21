import { 
  fetchFavorites, 
  fetchProfessionalProfile, 
  fetchProfessionalStatus 
} from '../services/api';
import * as Sentry from '@sentry/browser';

export const loadFavorites = async (setFavorites, setLoading, session) => {
  console.log('Loading favorites...');
  setLoading(true);
  try {
    const data = await fetchFavorites(session?.access_token);
    setFavorites(data);
    return data;
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return [];
  } finally {
    setLoading(false);
  }
};

export const loadProfessionalProfile = async (professionalId, setProfessionalProfile) => {
  console.log(`Loading professional profile: ${professionalId}`);
  try {
    const data = await fetchProfessionalProfile(professionalId);
    setProfessionalProfile(data);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
};

export const loadProfessionalStatus = async (professionalId, setProfessionalStatus) => {
  console.log(`Loading professional status: ${professionalId}`);
  try {
    const result = await fetchProfessionalStatus(professionalId);
    setProfessionalStatus(result);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
};
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import {
  fetchFavorites,
  addFavorite,
  fetchProfessionalProfile,
  fetchProfessionalStatus,
} from '../services/api';

export default function useClientDashboard(session) {
  const [favorites, setFavorites] = useState([]);
  const [professionalIdToAdd, setProfessionalIdToAdd] = useState('');
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [professionalStatus, setProfessionalStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
    checkForShareLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkForShareLink = () => {
    console.log('Checking for share link...');
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('professionalId');
    if (professionalId) {
      setProfessionalIdToAdd(professionalId);
      loadProfessionalProfile(professionalId);
      loadProfessionalStatus(professionalId);
    }
  };

  const loadFavorites = async () => {
    console.log('Loading favorites...');
    setLoading(true);
    try {
      const data = await fetchFavorites(session.access_token);
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

  const handleAddFavorite = async () => {
    console.log('Adding favorite...');
    setLoading(true);
    try {
      await addFavorite(session.access_token, professionalIdToAdd);
      setProfessionalIdToAdd('');
      alert('Professional added to your favorites!');
      window.history.replaceState({}, document.title, window.location.pathname);
      loadFavorites();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    }
  };

  return {
    favorites,
    professionalIdToAdd,
    professionalProfile,
    professionalStatus,
    loading,
    handleAddFavorite,
    signOut,
  };
}
import React from 'react';
import { supabase } from '../supabaseClient';
import ProfessionalProfile from './ProfessionalProfile';
import useClientDashboard from './useClientDashboard';
import ClientDashboardHeader from './ClientDashboardHeader';
import ClientDashboardMainContent from './ClientDashboardMainContent';

export default function ClientDashboard({ session }) {
  const {
    favorites,
    professionalProfile,
    professionalStatus,
    loading,
    handleAddFavorite,
    signOut,
  } = useClientDashboard(session);

  return (
    <div className="max-w-4xl mx-auto p-4 h-full flex flex-col">
      <ClientDashboardHeader favorites={favorites} signOut={signOut} />
      
      <ClientDashboardMainContent
        professionalProfile={professionalProfile}
        professionalStatus={professionalStatus}
        handleAddFavorite={handleAddFavorite}
        loading={loading}
        favorites={favorites}
      />

      <footer className="mt-8 text-center text-sm text-gray-400">
        Real-time updates every 30 seconds
      </footer>
    </div>
  );
}
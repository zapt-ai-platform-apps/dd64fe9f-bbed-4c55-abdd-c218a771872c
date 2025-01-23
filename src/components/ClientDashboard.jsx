import React from 'react';
import { supabase } from '../supabaseClient';
import ProfessionalProfile from './ProfessionalProfile';
import useClientDashboard from '../hooks/useClientDashboard';
import ClientDashboardHeader from './ClientDashboardHeader';
import ClientDashboardMainContent from './ClientDashboardMainContent';

export default function ClientDashboard({ session, onRoleChange }) {
  const {
    favorites,
    professionalProfile,
    professionalStatus,
    loading,
    handleAddFavorite,
    signOut,
    resetProfessionalProfile
  } = useClientDashboard(session);

  return (
    <div className="max-w-4xl mx-auto p-4 h-full flex flex-col">
      <ClientDashboardHeader 
        favorites={favorites} 
        signOut={signOut} 
        onRoleChange={onRoleChange} 
      />
      
      <ClientDashboardMainContent
        professionalProfile={professionalProfile}
        professionalStatus={professionalStatus}
        handleAddFavorite={handleAddFavorite}
        loading={loading}
        favorites={favorites}
        onBack={resetProfessionalProfile}
      />
    </div>
  );
}
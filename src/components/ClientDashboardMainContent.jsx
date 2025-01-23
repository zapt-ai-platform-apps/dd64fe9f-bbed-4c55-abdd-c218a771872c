import React from 'react';
import ProfessionalProfile from './ProfessionalProfile';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import FavoriteCard from './FavoriteCard';

export default function ClientDashboardMainContent({
  professionalProfile,
  professionalStatus,
  handleAddFavorite,
  loading,
  favorites,
  onBack
}) {
  return (
    <div className="card-glass p-6 flex-grow">
      {professionalProfile ? (
        <ProfessionalProfile
          profile={professionalProfile}
          status={professionalStatus}
          onAddFavorite={handleAddFavorite}
          onBack={onBack}
          isTracked={favorites.some(f => f.professionalId === professionalProfile.userId)}
        />
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-display font-semibold">Your Favorites</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : favorites.length === 0 ? (
            <EmptyState
              title="No favorites yet"
              description="Add professionals to track their availability"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <FavoriteCard key={fav.professionalId} fav={fav} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
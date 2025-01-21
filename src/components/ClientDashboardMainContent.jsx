import React from 'react';
import ProfessionalProfile from './ProfessionalProfile';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

export default function ClientDashboardMainContent({
  professionalProfile,
  professionalStatus,
  handleAddFavorite,
  loading,
  favorites
}) {
  return (
    <div className="card-glass p-6 flex-grow">
      {professionalProfile ? (
        <ProfessionalProfile
          profile={professionalProfile}
          status={professionalStatus}
          onAddFavorite={handleAddFavorite}
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
                <div key={fav.professionalId} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{fav.professionalId}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      Available
                    </span>
                  </div>
                  <a
                    href={`/?professionalId=${fav.professionalId}`}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    View Profile &rarr;
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
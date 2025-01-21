import React from 'react';

export default function ClientDashboardHeader({ favorites, signOut }) {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-display font-bold">Client Dashboard</h1>
        <p className="text-gray-400">Tracking {favorites.length} professionals</p>
      </div>
      <button
        onClick={signOut}
        className="btn-primary bg-error hover:bg-error/90 px-4 py-2 text-sm"
      >
        Sign Out
      </button>
    </header>
  );
}
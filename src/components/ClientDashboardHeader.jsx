import React from 'react';

export default function ClientDashboardHeader({ favorites, signOut, onRoleChange }) {
  return (
    <header className="flex justify-between items-center mb-8 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-display font-bold">Client Dashboard</h1>
        <p className="text-gray-400">Tracking {favorites.length} professionals</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onRoleChange('professional')}
          className="btn-primary bg-surface hover:bg-surface/80 px-4 py-2 text-sm"
        >
          Switch to Professional View
        </button>
        <button
          onClick={signOut}
          className="btn-primary bg-error hover:bg-error/90 px-4 py-2 text-sm"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
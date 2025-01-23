import React from 'react';

export default function WorkerHeader({ session, profile, onRoleChange, signOut }) {
  return (
    <header className="flex justify-between items-center mb-8 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-display font-bold">{profile.name || session.user.email}</h1>
        <p className="text-gray-400">Professional Dashboard</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onRoleChange('client')}
          className="btn-primary bg-surface hover:bg-surface/80 px-4 py-2 text-sm"
        >
          Switch to Client View
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
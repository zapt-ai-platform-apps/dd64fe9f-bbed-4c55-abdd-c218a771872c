import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

export default function ProfessionalProfile({ profile, status, onAddFavorite }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">{profile.name}</h1>
          <p className="text-gray-400">{profile.bio || 'No bio provided'}</p>
        </div>
        <button
          onClick={() => onAddFavorite(profile.userId)}
          className="btn-primary flex items-center gap-2 hover:bg-primary/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          Track Professional
        </button>
      </div>

      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium mb-1">Current Status</h3>
            <p className="text-gray-300">{status?.status || 'No status available'}</p>
            {status?.updatedAt && (
              <p className="text-sm text-gray-500 mt-1">
                Updated {formatDistanceToNow(new Date(status.updatedAt))} ago
              </p>
            )}
          </div>
          <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-medium mb-2">Typical Availability</h3>
          <p className="text-gray-300">Mon-Fri: 9am - 5pm</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-medium mb-2">Average Response Time</h3>
          <p className="text-gray-300">15 minutes</p>
        </div>
      </div>
    </div>
  );
}
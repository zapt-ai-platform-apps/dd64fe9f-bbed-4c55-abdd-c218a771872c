import React from 'react';
import { BackButton } from './ProfessionalProfile/BackButton';
import { TrackButton } from './ProfessionalProfile/TrackButton';
import { StatusIndicator } from './ProfessionalProfile/StatusIndicator';

export default function ProfessionalProfile({ profile, status, onAddFavorite, onBack, isTracked }) {
  return (
    <div className="space-y-6">
      <BackButton onBack={onBack} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">{profile.name}</h1>
          <p className="text-gray-400">{profile.bio || 'No bio provided'}</p>
        </div>
        <TrackButton
          isTracked={isTracked}
          onClick={() => onAddFavorite(profile.userId)}
        />
      </div>

      <StatusIndicator status={status} />

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
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function FavoriteCard({ fav }) {
  return (
    <a
      href={`/?professionalId=${fav.professionalId}`}
      className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{fav.name || 'Unnamed Professional'}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
          {fav.status ? fav.status : 'Available'}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          {fav.updatedAt && formatDistanceToNow(new Date(fav.updatedAt))} ago
        </div>
        <span className="text-primary group-hover:text-primary/80 text-sm">
          View Profile &rarr;
        </span>
      </div>
    </a>
  );
}
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export function StatusIndicator({ status }) {
  return (
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
        <div className={`h-3 w-3 rounded-full ${status?.status ? 'bg-success animate-pulse' : 'bg-gray-600'}`} />
      </div>
    </div>
  );
}
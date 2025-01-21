import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-current animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-current animate-bounce delay-100" />
      <div className="w-4 h-4 rounded-full bg-current animate-bounce delay-200" />
    </div>
  );
}
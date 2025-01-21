import React from 'react';

export function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to list
    </button>
  );
}
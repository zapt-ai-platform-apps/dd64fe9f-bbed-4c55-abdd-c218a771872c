import React from 'react';

export function TrackButton({ isTracked, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn-primary flex items-center gap-2 ${isTracked ? 'bg-error hover:bg-error/90' : 'hover:bg-primary/80'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d={isTracked ? "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" : "M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"} />
      </svg>
      {isTracked ? 'Untrack Professional' : 'Track Professional'}
    </button>
  );
}
import React from 'react';

export default function PoweredByZapt() {
  return (
    <div className="text-center text-sm text-gray-400">
      Powered by{' '}
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 transition-colors font-medium"
      >
        ZAPT
      </a>
    </div>
  );
}
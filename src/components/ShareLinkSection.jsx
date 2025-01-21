import React from 'react';

export default function ShareLinkSection({ shareLink, handleCopyToClipboard }) {
  return (
    <div className="mb-4 space-y-4">
      <h3 className="text-lg font-display font-semibold text-gray-100">Share Your Profile</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={shareLink}
          readOnly
          className="input-field flex-grow bg-white/10 text-gray-100 border border-white/20"
        />
        <button
          onClick={handleCopyToClipboard}
          className="btn-primary px-6 py-3 rounded-lg bg-primary/90 hover:bg-primary transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>
      </div>
      <p className="text-sm text-gray-400">Share this link with clients to let them track your availability</p>
    </div>
  );
}
import React from 'react';

export default function ShareLinkSection({ shareLink, handleCopyToClipboard }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Your share link:</label>
      <div className="flex items-center">
        <input
          type="text"
          value={shareLink}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-l-md box-border"
        />
        <button
          onClick={handleCopyToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md cursor-pointer"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
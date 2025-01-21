import React from 'react';

export default function RoleSwitcher({ userType, selectUserType }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-surface rounded-full p-1">
        <button
          onClick={() => selectUserType('professional')}
          className={`px-6 py-2 rounded-full transition-colors ${
            userType === 'professional'
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => selectUserType('client')}
          className={`px-6 py-2 rounded-full transition-colors ${
            userType === 'client'
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Client
        </button>
      </div>
    </div>
  );
}
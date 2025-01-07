import React from 'react';

export default function UserTypeSelection({ selectUserType }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Status Tracker</h1>
      <div className="space-y-4">
        <button
          onClick={() => selectUserType('professional')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
        >
          I am a Professional
        </button>
        <button
          onClick={() => selectUserType('client')}
          className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer w-full"
        >
          I am a Client
        </button>
      </div>
    </div>
  );
}
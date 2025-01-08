import React from 'react';

export default function RoleSwitcher({ userType, selectUserType }) {
  return (
    <div className="flex justify-end p-4">
      <select
        value={userType}
        onChange={(e) => selectUserType(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <option value="professional">Professional</option>
        <option value="client">Client</option>
      </select>
    </div>
  );
}
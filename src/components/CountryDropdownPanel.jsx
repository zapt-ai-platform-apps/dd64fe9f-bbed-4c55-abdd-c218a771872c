import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { countries } from '../constants/countries';

export default function CountryDropdownPanel({ onCountrySelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  const handleSelect = (country) => {
    onCountrySelect(country);
    onClose();
    setSearchQuery('');
  };

  return (
    <div className="absolute z-10 mt-2 w-64 bg-surface border border-white/10 rounded-lg shadow-lg">
      <div className="p-2 border-b border-white/10">
        <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg">
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search country..."
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {filteredCountries.map((country) => (
          <button
            key={country.code}
            onClick={() => handleSelect(country)}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
          >
            <span className="text-xl">{country.emoji}</span>
            <span className="text-gray-300 flex-grow">{country.name}</span>
            <span className="text-gray-400">{country.dialCode}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
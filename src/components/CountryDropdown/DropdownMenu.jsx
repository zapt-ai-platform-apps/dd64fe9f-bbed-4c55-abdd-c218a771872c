import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function DropdownMenu({ isOpen, searchQuery, setSearchQuery, filteredCountries, handleSelect }) {
  return isOpen ? (
    <div className="absolute z-10 mt-2 w-64 bg-surface border border-white/10 rounded-lg shadow-lg">
      <div className="p-2 border-b border-white/10">
        <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search country or code..."
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {filteredCountries.map((country) => (
          <button
            key={country.code + country.dialCode}
            onClick={() => handleSelect(country)}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
          >
            <span className="text-xl">{country.emoji}</span>
            <span className="text-gray-300 flex-grow">
              {country.isCustom ? country.name : `${country.name} (${country.dialCode})`}
            </span>
          </button>
        ))}
        {filteredCountries.length === 0 && (
          <div className="px-4 py-2 text-gray-400 text-sm">
            No matches found. Enter a valid country code starting with '+'
          </div>
        )}
      </div>
    </div>
  ) : null;
}
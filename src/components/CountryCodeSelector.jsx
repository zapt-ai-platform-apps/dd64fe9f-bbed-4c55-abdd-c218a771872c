import React, { useState, useEffect } from 'react';
import { countries } from '../data/countries';
import ChevronIcon from './ChevronIcon';
import CountryDropdown from './CountryDropdown';

export default function CountryCodeSelector({ selectedCountry, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  );

  useEffect(() => {
    if (!isOpen) setSearchQuery('');
  }, [isOpen]);

  return (
    <div className="relative w-36">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field h-full flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 transition-colors"
      >
        {selectedCountry ? (
          <>
            <span className="text-lg">{selectedCountry.flag}</span>
            <span>{selectedCountry.code}</span>
          </>
        ) : (
          <span className="text-gray-400">Code</span>
        )}
        <ChevronIcon />
      </button>

      {isOpen && (
        <CountryDropdown
          filteredCountries={filteredCountries}
          onChange={onChange}
          setIsOpen={setIsOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
}
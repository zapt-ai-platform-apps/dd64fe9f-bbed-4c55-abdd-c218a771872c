import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import DropdownMenu from './CountryDropdown/DropdownMenu';
import { countries } from '../constants/countries';

export default function CountryDropdown({ selectedCountry, onCountrySelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  // Add custom country option if user enters a valid phone code
  if (searchQuery.startsWith('+') && /^\+[0-9]+$/.test(searchQuery)) {
    const exists = filteredCountries.some(c => c.dialCode === searchQuery);
    if (!exists) {
      filteredCountries.push({
        code: 'CUSTOM',
        name: `Custom Code (${searchQuery})`,
        dialCode: searchQuery,
        emoji: '🌍',
        isCustom: true
      });
    }
  }

  const handleSelect = (country) => {
    onCountrySelect(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors"
      >
        <span>{selectedCountry.emoji}</span>
        <span className="text-gray-300">{selectedCountry.dialCode}</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCountries={filteredCountries}
        handleSelect={handleSelect}
      />
    </div>
  );
}
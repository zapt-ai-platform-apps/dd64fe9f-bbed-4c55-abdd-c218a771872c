import React, { useState, useEffect, useRef } from 'react';
import { countries } from '../utils/countries';
import CountryDropdown from './CountryDropdown';

export default function CountryPhoneInput({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [localNumber, setLocalNumber] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      const country = countries.find(c => value.startsWith(c.phoneCode));
      if (country) {
        setSelectedCountry(country);
        setLocalNumber(value.replace(country.phoneCode, ''));
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.phoneCode.includes(searchQuery)
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    onChange(`${country.phoneCode}${localNumber}`);
  };

  const handleLocalNumberChange = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, '');
    setLocalNumber(number);
    onChange(`${selectedCountry.phoneCode}${number}`);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-w-[120px] hover:bg-white/10 transition-colors"
        >
          <span className="text-xl">{selectedCountry.emoji}</span>
          <span className="text-gray-300">{selectedCountry.phoneCode}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 ml-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <input
          type="tel"
          value={localNumber}
          onChange={handleLocalNumberChange}
          className="input-field flex-grow"
          placeholder="Phone number"
          pattern="^\+?[0-9\s\-]+$"
        />
      </div>

      {isOpen && (
        <CountryDropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCountries={filteredCountries}
          onCountrySelect={handleCountrySelect}
        />
      )}
    </div>
  );
}
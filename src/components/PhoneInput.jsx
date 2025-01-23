import React, { useState, useEffect } from 'react';
import { countries } from '../constants/countries';
import CountryDropdown from './CountryDropdown';

export default function PhoneInput({ value, onChange }) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [localNumber, setLocalNumber] = useState('');

  useEffect(() => {
    if (value) {
      const country = countries.find(c => value.startsWith(c.dialCode)) || {
        code: 'CUSTOM',
        dialCode: value.match(/^\+\d+/)?.[0] || '',
        emoji: '🌍',
        name: 'Custom'
      };
      if (country) {
        setSelectedCountry(country);
        setLocalNumber(value.replace(country.dialCode, ''));
      }
    }
  }, [value]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onChange(`${country.dialCode}${localNumber}`);
  };

  const handleLocalNumberChange = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, '');
    setLocalNumber(number);
    onChange(`${selectedCountry.dialCode}${number}`);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">WhatsApp Number</label>
      <div className="flex gap-2">
        <CountryDropdown
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
        <input
          type="tel"
          value={localNumber}
          onChange={handleLocalNumberChange}
          className="input-field flex-grow"
          placeholder="Phone number"
          pattern="^\+[1-9]\d{1,14}$"
        />
      </div>
      {selectedCountry.code === 'CUSTOM' && (
        <p className="text-xs text-gray-400">Custom country code selected: {selectedCountry.dialCode}</p>
      )}
    </div>
  );
}
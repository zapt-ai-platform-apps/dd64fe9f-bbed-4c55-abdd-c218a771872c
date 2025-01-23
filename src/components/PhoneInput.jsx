import React, { useState, useEffect } from 'react';
import { countries } from '../constants/countries';
import CountryDropdown from './CountryDropdown';

export default function PhoneInput({ value, onChange }) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    if (value) {
      const country = countries.find(c => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        onChange(value);
      }
    }
  }, []);

  const handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/\D/g, '');
    const fullNumber = selectedCountry.dialCode + phone;
    onChange(fullNumber);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onChange(country.dialCode);
  };

  const displayValue = value?.replace(selectedCountry.dialCode, '') || '';

  return (
    <div className="relative space-y-2">
      <label className="text-sm font-medium text-gray-300">WhatsApp Number</label>
      <div className="flex gap-2">
        <CountryDropdown
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
        <input
          type="tel"
          value={displayValue}
          onChange={handlePhoneChange}
          className="input-field flex-grow"
          placeholder="Phone number"
          pattern="^\+[1-9]\d{1,14}$"
        />
      </div>
    </div>
  );
}
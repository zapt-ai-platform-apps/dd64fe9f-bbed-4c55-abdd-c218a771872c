import { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { countries } from '../data/countries';

export default function usePhoneNumber(profile, setProfile) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (profile.whatsappNumber) {
      const parsedNumber = parsePhoneNumberFromString(profile.whatsappNumber);
      if (parsedNumber) {
        const countryCode = `+${parsedNumber.countryCallingCode}`;
        const foundCountry = countries.find(c => c.code === countryCode);
        if (foundCountry) {
          setSelectedCountry(foundCountry);
          setPhoneNumber(parsedNumber.nationalNumber);
          return;
        }
      }
    }
    setSelectedCountry(null);
    setPhoneNumber(profile.whatsappNumber?.replace(/^\+\d+/, '') || '');
  }, [profile.whatsappNumber]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    updateWhatsappNumber(selectedCountry?.code || '', value);
  };

  const updateWhatsappNumber = (countryCode, number) => {
    const fullNumber = countryCode + number;
    setProfile(prev => ({
      ...prev,
      whatsappNumber: fullNumber
    }));
  };

  return {
    selectedCountry,
    phoneNumber,
    handlePhoneChange,
    updateWhatsappNumber
  };
}
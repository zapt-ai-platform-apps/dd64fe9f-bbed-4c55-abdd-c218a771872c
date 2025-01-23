import { useState, useEffect } from 'react';

export default function useUserType(session) {
  const [userType, setUserType] = useState(null);
  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);

  useEffect(() => {
    const checkExistingRole = () => {
      if (session) {
        const storedType = localStorage.getItem(`userType-${session.user.id}`);
        if (storedType) {
          setUserType(storedType);
          setShowRoleConfirmation(false);
        } else {
          setShowRoleConfirmation(true);
        }
      }
    };

    checkExistingRole();
  }, [session]);

  const handleRoleSelection = (isProfessional) => {
    const type = isProfessional ? 'professional' : 'client';
    setUserType(type);
    setShowRoleConfirmation(false);
    if (session?.user?.id) {
      localStorage.setItem(`userType-${session.user.id}`, type);
    }
  };

  const handleRoleChange = (newType) => {
    setUserType(newType);
    if (session?.user?.id) {
      localStorage.setItem(`userType-${session.user.id}`, newType);
    }
  };

  return {
    userType,
    showRoleConfirmation,
    handleRoleSelection,
    handleRoleChange
  };
}
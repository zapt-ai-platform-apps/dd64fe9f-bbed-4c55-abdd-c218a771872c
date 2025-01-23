import { useState, useEffect } from 'react';

export default function useUserType(session) {
  const [userType, setUserType] = useState(null);
  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingRole = async () => {
      if (session) {
        try {
          const response = await fetch('/api/getRole', {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.role) {
              setUserType(data.role);
              setShowRoleConfirmation(false);
              return;
            }
          }
          setShowRoleConfirmation(true);
        } catch (error) {
          console.error('Error fetching role:', error);
          setShowRoleConfirmation(true);
        } finally {
          setLoading(false);
        }
      }
    };

    checkExistingRole();
  }, [session]);

  const handleRoleSelection = async (isProfessional) => {
    const type = isProfessional ? 'professional' : 'client';
    try {
      const response = await fetch('/api/setRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ role: type }),
      });

      if (!response.ok) throw new Error('Failed to save role');
      
      setUserType(type);
      setShowRoleConfirmation(false);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleRoleChange = async (newType) => {
    try {
      const response = await fetch('/api/setRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ role: newType }),
      });

      if (!response.ok) throw new Error('Failed to update role');
      
      setUserType(newType);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return {
    userType,
    showRoleConfirmation,
    handleRoleSelection,
    handleRoleChange,
    loading
  };
}
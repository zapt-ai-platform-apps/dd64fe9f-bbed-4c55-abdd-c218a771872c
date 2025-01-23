export const fetchFavorites = async (accessToken) => {
  const response = await fetch('/api/getFavorites', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return await response.json();
};

export const addFavorite = async (accessToken, professionalId) => {
  const response = await fetch('/api/addFavorite', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professionalId }),
  });
  
  if (response.status === 409) {
    throw new Error('Professional already in favorites');
  }
  
  if (!response.ok) throw new Error('Failed to add favorite');
};

export const removeFavorite = async (accessToken, professionalId) => {
  const response = await fetch('/api/removeFavorite', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professionalId }),
  });
  
  if (!response.ok) throw new Error('Failed to remove favorite');
};

export const fetchProfessionalProfile = async (professionalId) => {
  const response = await fetch(`/api/getProfile?professionalId=${professionalId}`);
  if (!response.ok) return null;
  return await response.json();
};

export const fetchProfessionalStatus = async (professionalId) => {
  const response = await fetch(`/api/getStatus?professionalId=${professionalId}`);
  if (!response.ok) return null;
  return await response.json();
};
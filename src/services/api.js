export const fetchFavorites = async (accessToken) => {
  const response = await fetch('/api/getFavorites', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const addFavorite = async (accessToken, professionalId) => {
  await fetch('/api/addFavorite', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ professionalId }),
  });
};

export const fetchProfessionalProfile = async (professionalId) => {
  const response = await fetch(`/api/getProfile?professionalId=${professionalId}`);
  const data = await response.json();
  return data;
};
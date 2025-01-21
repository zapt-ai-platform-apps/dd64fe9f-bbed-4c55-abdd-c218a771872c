export const getStatus = async (professionalId) => {
  const response = await fetch(`/api/getStatus?professionalId=${professionalId}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data?.status || null;
};

export const getProfile = async (professionalId) => {
  const response = await fetch(`/api/getProfile?professionalId=${professionalId}`);
  if (!response.ok) return { name: '', bio: '' };
  const data = await response.json();
  return { name: data.name || '', bio: data.bio || '' };
};
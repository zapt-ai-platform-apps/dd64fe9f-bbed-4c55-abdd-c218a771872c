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

export const updateStatus = async (accessToken, status) => {
  const response = await fetch('/api/updateStatus', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update status');
};

export const updateProfile = async (accessToken, profile) => {
  const response = await fetch('/api/updateProfile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error('Failed to update profile');
};
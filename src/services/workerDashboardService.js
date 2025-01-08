export const getStatus = async (professionalId) => {
  const response = await fetch(`/api/getStatus?professionalId=${professionalId}`);
  const data = await response.json();
  if (data && !data.error) {
    return data.status;
  }
  return null;
};

export const getProfile = async (professionalId) => {
  const response = await fetch(`/api/getProfile?professionalId=${professionalId}`);
  const data = await response.json();
  if (data && !data.error) {
    return { name: data.name, bio: data.bio };
  }
  return { name: '', bio: '' };
};

export const updateStatus = async (accessToken, status) => {
  await fetch('/api/updateStatus', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
};

export const updateProfile = async (accessToken, profile) => {
  await fetch('/api/updateProfile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
};
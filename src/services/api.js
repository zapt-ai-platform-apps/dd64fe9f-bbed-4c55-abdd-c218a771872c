export const fetchProfessionalStatus = async (professionalId) => {
  const response = await fetch(`/api/getStatus?professionalId=${professionalId}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data?.status || null;
};
import { supabase } from '../supabaseClient';

export const fetchFavorites = async (clientId, setFavorites) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('professional_id')
    .eq('client_id', clientId);

  if (error) {
    console.error(error);
  } else {
    setFavorites(data.map((fav) => fav.professional_id));
  }
};

export const addFavorite = async (clientId, professionalId) => {
  const { error } = await supabase.from('favorites').insert({
    client_id: clientId,
    professional_id: professionalId,
  });

  if (error) {
    console.error(error);
    return false;
  }
  return true;
};
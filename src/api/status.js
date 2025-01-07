import { supabase } from '../supabaseClient';

export const fetchStatus = async (professionalId) => {
  const { data, error } = await supabase
    .from('statuses')
    .select('status, updated_at')
    .eq('user_id', professionalId)
    .single();

  if (error) {
    console.error(error);
    return 'Unable to fetch status.';
  } else {
    return `${data.status} (Last updated: ${new Date(data.updated_at).toLocaleString()})`;
  }
};
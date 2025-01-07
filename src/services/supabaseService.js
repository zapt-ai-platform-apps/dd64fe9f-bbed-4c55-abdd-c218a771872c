import { supabase } from '../supabaseClient';

export const fetchStatus = async (userId, setStatus, setLoading) => {
  setLoading(true);
  const { data, error } = await supabase
    .from('statuses')
    .select('status')
    .eq('user_id', userId)
    .single();

  if (data) {
    setStatus(data.status);
  } else if (error && error.code !== 'PGRST116') {
    console.error(error);
  }
  setLoading(false);
};

export const updateStatus = async (userId, status) => {
  const { error } = await supabase.from('statuses').upsert({
    user_id: userId,
    status,
    updated_at: new Date(),
  });

  if (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};
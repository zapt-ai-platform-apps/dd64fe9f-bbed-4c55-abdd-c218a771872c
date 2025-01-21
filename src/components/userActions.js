import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export const useUserActions = () => {
  const signOut = async () => {
    console.log('Signing out...');
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
    }
  };

  return { signOut };
};
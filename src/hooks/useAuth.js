import { useEffect, useState } from 'react';
import { supabase, recordLogin } from '../supabaseClient';

export default function useAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session but do NOT record login here.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe only to the SIGNED_IN event.
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' && session?.user?.email) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
          .catch(error => {
            console.error('Failed to record login:', error);
          });
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session };
}
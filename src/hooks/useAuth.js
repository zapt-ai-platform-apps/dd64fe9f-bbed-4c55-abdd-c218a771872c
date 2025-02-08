import { useEffect, useState } from 'react';
import { supabase, recordLogin } from '../supabaseClient';

export default function useAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.email) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch(error => {
          console.error('Failed to record login:', error);
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch(error => {
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
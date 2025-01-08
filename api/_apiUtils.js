import { initializeZapt } from '@zapt/zapt-js';

const APP_ID = process.env.VITE_PUBLIC_APP_ID || process.env.APP_ID;

if (!APP_ID) {
  throw new Error('Missing APP_ID environment variable');
}

const { supabase } = initializeZapt(APP_ID);

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}
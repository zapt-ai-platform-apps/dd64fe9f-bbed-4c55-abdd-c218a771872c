import { authenticateUser } from './_apiUtils';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { profiles } from '../drizzle/schema.js';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  Sentry.init({
    dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
    environment: process.env.VITE_PUBLIC_APP_ENV,
    initialScope: {
      tags: {
        type: 'backend',
        projectId: process.env.VITE_PUBLIC_APP_ID
      }
    }
  });

  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const user = await authenticateUser(req);
    const { name, bio } = req.body;

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    await db
      .insert(profiles)
      .values({
        userId: user.id,
        name,
        bio,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: { name, bio, updatedAt: new Date() },
      });

    res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
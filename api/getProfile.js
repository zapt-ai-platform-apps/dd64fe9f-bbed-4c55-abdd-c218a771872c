import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  const { professionalId } = req.query;

  if (!professionalId) {
    return res.status(400).json({ error: 'Missing professionalId parameter' });
  }

  try {
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, professionalId))
      .limit(1);

    if (result.length === 0) {
      res.status(200).json({});
      return;
    }

    res.status(200).json(result[0]);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
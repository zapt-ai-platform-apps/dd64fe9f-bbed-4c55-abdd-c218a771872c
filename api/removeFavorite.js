import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { favorites } from '../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    const { professionalId } = req.body;

    if (!professionalId) {
      return res.status(400).json({ error: 'Missing professionalId' });
    }

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    await db.delete(favorites)
      .where(and(
        eq(favorites.clientId, user.id),
        eq(favorites.professionalId, professionalId)
      ));

    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    Sentry.captureException(error);
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
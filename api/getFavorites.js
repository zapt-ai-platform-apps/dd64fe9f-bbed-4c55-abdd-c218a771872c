import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { favorites, profiles, statuses } from '../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db
      .select({
        professionalId: favorites.professionalId,
        name: profiles.name,
        status: statuses.status,
        updatedAt: statuses.updatedAt
      })
      .from(favorites)
      .innerJoin(profiles, eq(favorites.professionalId, profiles.userId))
      .leftJoin(statuses, eq(favorites.professionalId, statuses.userId))
      .where(eq(favorites.clientId, user.id));

    res.status(200).json(result);
  } catch (error) {
    Sentry.captureException(error);
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
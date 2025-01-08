import { authenticateUser } from './_apiUtils';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { favorites } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db.select()
      .from(favorites)
      .where(eq(favorites.clientId, user.id));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
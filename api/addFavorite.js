import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { favorites } from '../../drizzle/schema.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

    await db.insert(favorites).values({
      clientId: user.id,
      professionalId,
    });

    res.status(200).json({ message: 'Favorite added' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
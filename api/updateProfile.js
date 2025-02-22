import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { profiles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    const { name, bio, whatsappNumber } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    if (existingProfile.length > 0) {
      await db
        .update(profiles)
        .set({
          name,
          bio,
          whatsappNumber,
          updatedAt: new Date()
        })
        .where(eq(profiles.userId, user.id));
    } else {
      await db.insert(profiles).values({
        userId: user.id,
        name,
        bio,
        whatsappNumber,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Return updated profile
    const result = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    res.status(200).json(result[0]);
  } catch (error) {
    Sentry.captureException(error);
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
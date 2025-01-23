import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { roles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    const { role } = req.body;

    if (!['professional', 'client'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const existing = await db
      .select()
      .from(roles)
      .where(eq(roles.userId, user.id))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(roles)
        .set({ role, updatedAt: new Date() })
        .where(eq(roles.userId, user.id));
    } else {
      await db.insert(roles).values({
        userId: user.id,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    res.status(200).json({ message: 'Role updated' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
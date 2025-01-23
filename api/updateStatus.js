import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { statuses } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  
  try {
    const user = await authenticateUser(req);
    const { status } = req.body;

    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const existingStatus = await db
      .select()
      .from(statuses)
      .where(eq(statuses.userId, user.id))
      .limit(1);

    if (existingStatus.length > 0) {
      await db
        .update(statuses)
        .set({
          status,
          updatedAt: new Date()
        })
        .where(eq(statuses.userId, user.id));
    } else {
      await db.insert(statuses).values({
        userId: user.id,
        status,
        updatedAt: new Date()
      });
    }

    res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    Sentry.captureException(error);
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
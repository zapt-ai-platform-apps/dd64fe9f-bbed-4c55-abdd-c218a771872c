import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { roles } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    const result = await db
      .select({ role: roles.role })
      .from(roles)
      .where(eq(roles.userId, user.id))
      .limit(1);

    res.status(200).json(result[0] || {});
  } catch (error) {
    Sentry.captureException(error);
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
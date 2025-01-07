import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const statuses = pgTable('statuses', {
  userId: uuid('user_id').primaryKey(),
  status: text('status').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
import { pgTable, uuid, timestamp, primaryKey, text } from 'drizzle-orm/pg-core';

export const statuses = pgTable('statuses', {
  userId: uuid('user_id').primaryKey(),
  status: text('status').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const favorites = pgTable(
  'favorites',
  {
    clientId: uuid('client_id').notNull(),
    professionalId: uuid('professional_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey(table.clientId, table.professionalId),
  })
);

export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
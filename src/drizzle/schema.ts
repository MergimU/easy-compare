import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('userRole', ['ADMIN', 'BASIC']);
export const comparisonWinnerEnum = pgEnum('winner', ['LEFTCOMPARISON', 'RIGHTCOMPARISON']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  role: userRoleEnum('role').default('ADMIN').notNull(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().notNull(),
  full_name: varchar('full_name', { length: 256 }),
  avatar_url: text('avatar_url'),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
});

export const comparisons = pgTable('comparisons', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  leftTitle: varchar('leftTitle', { length: 256 }).notNull(),
  rightTitle: varchar('rightTitle', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }),
  winnerIs: comparisonWinnerEnum('winner').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
});

export const comparisonFields = pgTable('comparisonFields', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: varchar('title', { length: 256 }).notNull().unique(),
  leftComparison: varchar('leftComparison', { length: 256 }),
  rightComparison: varchar('rightComparison', { length: 256 }),
  winnerField: comparisonWinnerEnum('winner').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  comparisonId: uuid('comparisonId').references(() => comparisons.id, { onDelete: 'cascade' }),
});

/*=============================================
=            relations            =
=============================================*/

export const userRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
  comparisons: many(comparisons),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const comparisonRelations = relations(comparisons, ({ one, many }) => ({
  user: one(users, {
    fields: [comparisons.userId],
    references: [users.id],
  }),
  comparisonFields: many(comparisonFields),
}));

export const comparisonFieldRelations = relations(comparisonFields, ({ one }) => ({
  comparison: one(comparisons, {
    fields: [comparisonFields.comparisonId],
    references: [comparisons.id],
  }),
}));

/*=====  End of relations  ======*/

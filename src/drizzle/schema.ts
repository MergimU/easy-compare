import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const comparisons = pgTable("comparisons", {
  id: uuid("id").primaryKey(),
  title: varchar("title", {length: 256}).notNull(),
  description: varchar("description", {length: 256}).notNull(),
})

// user table test
export const notesTable = pgTable("notes", {
  today: varchar("today", {length: 255}).notNull(),
  tomorrow: varchar("tomorrow", {length: 255}).notNull(),
  weekend: varchar("weekend", {length: 255}).notNull(),
  year: integer('year')
})
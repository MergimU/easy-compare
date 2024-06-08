import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// user table test
export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull()
})

// user table test
export const notesTable = pgTable("notes", {
  today: varchar("today", {length: 255}).notNull(),
  tomorrow: varchar("tomorrow", {length: 255}).notNull(),
  weekend: varchar("weekend", {length: 255}).notNull(),
  year: integer('year')
})
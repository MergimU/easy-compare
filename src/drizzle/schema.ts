import { integer, pgTable, uuid, varchar, timestamp, pgEnum, primaryKey, uniqueIndex, text } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ['ADMIN', 'BASIC']);

export const UsersTable = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  role: UserRole("role").default("ADMIN").notNull(),
  email: varchar("email", {length: 256}).notNull(),
  full_name: varchar("full_name", {length: 256}),
  avatar_url: text("avatar_url"),
}, table => {
  return {
    emailIndex: uniqueIndex("emailIndex").on(table.email)
  }
})

export const Comparison = pgTable("comparison", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", {length: 256}).notNull(),
  description: varchar("description", {length: 256}),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: uuid("authorId").references(() => UsersTable.id).notNull()
})

export const ComparisonField = pgTable("comparisonField", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", {length: 256}).notNull(),
  leftComparison: varchar("leftComparison", { length: 256 }),
  rightComparison: varchar("rightComparison", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  comparisonId: uuid("comparisonId").references(() => Comparison.id).notNull()
})

export const ComparisonTable = pgTable("comparisonTable", {
  comparisonId: uuid("comparisonId").references(() => Comparison.id).notNull(),
  comparisonFieldId: uuid("comparisonFieldId").references(() => ComparisonField.id).notNull()
}, table => {
  return {
    // Composite primaryKey
    pk: primaryKey({ columns: [table.comparisonId, table.comparisonFieldId]})
  }
})

// user table test
export const notesTable = pgTable("notes", {
  today: varchar("today", {length: 255}).notNull(),
  tomorrow: varchar("tomorrow", {length: 255}).notNull(),
  weekend: varchar("weekend", {length: 255}).notNull(),
  year: integer('year')
})
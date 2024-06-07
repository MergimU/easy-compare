import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

// user table test
export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull()
})
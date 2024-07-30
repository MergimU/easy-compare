import * as schema from './schema'

export type NewUser = typeof schema.UsersTable.$inferInsert;
export type NewComparison = typeof schema.Comparison.$inferInsert;
export type Notes = typeof schema.notesTable.$inferInsert;

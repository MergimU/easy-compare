import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL;

export type NewUser = typeof schema.UsersTable.$inferInsert;

export const connection = postgres(connectionString as string, { max: 1})
export const db = drizzle(connection, { schema, logger: true});

export async function getNotes() {
  return await db.select().from(schema.notesTable) 
}

export async function createUser(user: NewUser) {
  return await db.insert(schema.UsersTable).values({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
  })
}

export const getUser = async (id: string) => {
  const user = await db.select()
    .from(schema.UsersTable)
    .where(eq(schema.UsersTable.id, id))
    .limit(1)

  return user;
}

export async function getUsers() {
  return await db.select().from(schema.UsersTable)
}
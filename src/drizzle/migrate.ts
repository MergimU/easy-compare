import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { userTable } from './schema'

const connectionString = process.env.DATABASE_URL

export const client = postgres(connectionString as string)
export const db = drizzle(client);

export async function getUsers() {
  await db.select().from(userTable);

  client.end();
}
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { notesTable } from './schema'

const connectionString = process.env.DATABASE_URL

export const client = postgres(connectionString as string)
export const db = drizzle(client);

export async function getNotes() {
  return await db.select().from(notesTable) 
}
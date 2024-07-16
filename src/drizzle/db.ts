import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL;

export const connection = postgres(connectionString as string, { max: 1})
export const db = drizzle(connection, { schema, logger: true});
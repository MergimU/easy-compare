import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './db';

// This will run migrations on the database, skipping the ones already applied
async function startMigration() {
  await migrate(db, { migrationsFolder: './src/drizzle/migrations' });
  
  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}

startMigration();
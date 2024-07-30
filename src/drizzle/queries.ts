'use server';

import { db } from './db';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { NewUser } from './dbTypes';
import { userSession } from '@app/actions/user';

export const getNotes = async () => {
  try {
    return await db.select().from(schema.notesTable);
  } catch (error) {
    console.error('Error getting data', error);
    return null;
  }
};

export const createUser = async (user: NewUser) => {
  return await db.insert(schema.UsersTable).values({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
  });
};

export const getUser = async (id: string) => {
  return await db.select()
    .from(schema.UsersTable)
    .where(eq(schema.UsersTable.id, id))
    .limit(1);
};

export const createComparison = async () => {
  console.log('creating header title');
  try {
    const user = await userSession();
    if (user) {
      return await db.insert(schema.Comparison).values({
        title: 'test',
        description: 'description test',
        authorId: user.id,
      }) 
    }
  } catch (error) {
    console.log(error as Error); 
  }
};

export const getUsers = async () => {
  return await db.select().from(schema.UsersTable);
};

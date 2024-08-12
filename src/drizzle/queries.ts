'use server';

import { db } from './db';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { NewUser, NewComparison, ComparisonField } from './dbTypes';
import { userSession } from '@app/actions/user';

/**
 * 
 * @param user User input details
 * @returns Newly created user to db
 */
export const createUser = async (user: NewUser) => {
  return await db.insert(schema.UsersTable).values({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
  });
};

/**
 * 
 * @param id Get user based on id
 * @returns User from db
 */
export const getUser = async (id: string) => {
  return await db.select()
    .from(schema.UsersTable)
    .where(eq(schema.UsersTable.id, id))
    .limit(1);
};
/**
 * 
 * @param comparison Comparison (leftTitle, rightTitle, description) 
 * @param comparisonFields Comparisons fields related to comparison
 * @returns 
 */
export const createComparison = async ({ comparison, comparisonFields }: {
  comparison: Omit<NewComparison, 'id' | 'authorId'>; // exclude id and authorId
  comparisonFields: Omit<ComparisonField, 'id' | 'comparisonId'>[];
}) => {
  try {
    const user = await userSession();
    if (user) {
      // DB: insert comparison
      const comparisonInsert = await db.insert(schema.Comparison).values({
        ...comparison,
        authorId: user.id,
      }).returning({
        id: schema.Comparison.id
      })

      // Add comparisonId to each comparisonField
      const compFieldsWithCompId = comparisonFields.map(comp => {
        return { ...comp, comparisonId: comparisonInsert[0].id }
      })

      // DB: Insert comparisonFields
      await db.insert(schema.ComparisonField).values([...compFieldsWithCompId])

      return comparisonInsert;
    }
  } catch (error) {
    console.log(error as Error);
  }
};
/**
 * 
 * @returns All db Comparisons
 */
export const getComparisons = async () => {
  try {
    return await db.select().from(schema.Comparison);
  } catch (error) {
    console.log(error as Error);
  }
}

/**
 * 
 * @param id Comparison id
 * @returns Comparison db data
 */
export const getComparison = async (id: string) => {
  try {
    const comparisonData = await db.select()
      .from(schema.Comparison)
      .where(eq(schema.Comparison.id, id))
      .limit(1);
    return comparisonData[0]
  } catch (error) {
    console.log(error as Error);
  }
}

/**
 * 
 * @returns All users
 */
export const getUsers = async () => {
  return await db.select().from(schema.UsersTable);
};

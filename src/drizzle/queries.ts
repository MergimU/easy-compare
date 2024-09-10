'use server';

import { db } from './db';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import type { User, Comparison, ComparisonField } from './dbTypes';
import { userSession } from '@app/actions/user';
import type { RowList } from 'postgres';

/**
 *
 * @param user User input details
 * @returns Newly created user to db
 */
export const createUser = async (user: User): Promise<RowList<never>[] | undefined> => {
  try {
    return await db.insert(schema.users).values({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
    });
  } catch (error) {
    console.log('createUser Error', error);
  }
};

// /**
//  *
//  * @param id Get user based on id
//  * @returns User from db
//  */
// export const getUser = async (id: string): Promise<User[] | null> => {
//   return await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
// };
/**
 *
 * @param comparison Comparison (leftTitle, rightTitle, description)
 * @param comparisonFields Comparisons fields related to comparison
 * @returns
 */
export const createComparison = async ({
  comparison,
  comparisonFields,
}: {
  comparison: Omit<Comparison, 'id' | 'authorId'>; // exclude id and authorId
  comparisonFields: Omit<ComparisonField, 'id' | 'comparisonId'>[];
}) => {
  try {
    const user = await userSession();
    if (user) {
      // DB: insert comparison
      const comparisonInsert = await db
        .insert(schema.comparisons)
        .values({
          ...comparison,
          userId: user.id,
        })
        .returning({
          id: schema.comparisons.id,
        });

      // Add comparisonId to each comparisonField
      const compFieldsWithCompId = comparisonFields.map((comp) => {
        return { ...comp, comparisonId: comparisonInsert[0].id };
      });
      // DB: Insert comparisonFields
      await db.insert(schema.comparisonFields).values([...compFieldsWithCompId]);
      return comparisonInsert;
    }
  } catch (error) {
    console.log(error as Error);
  }
};

/**
 *
 * @returns Comparisons with titles and description only, no fields
 */
export const getComparisons = async () => {
  try {
    const user = await userSession();
    if (user) {
      return await db.query.comparisons.findMany({
        where: eq(schema.comparisons.userId, user.id),
      });
    }
  } catch (error) {
    console.log(error as Error);
  }
};

/**
 *
 * @param id Comparison id
 * @returns Comparison with all fields
 */

// export const getComparison = async ({ id }: Pick<NewUser, 'id'>) => {
export const getComparison = async ({ id }: Pick<User, 'id'>) => {
  try {
    const comparisonWithFields = await db.query.comparisons.findMany({
      where: eq(schema.comparisons.id, id),
      with: {
        comparisonFields: true,
      },
    });

    return comparisonWithFields[0];
  } catch (error) {
    console.log(error as Error);
  }
};

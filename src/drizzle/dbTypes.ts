import * as schema from './schema';

export type User = typeof schema.users.$inferInsert;
export type Comparison = typeof schema.comparisons.$inferInsert;
export type ComparisonField = typeof schema.comparisonFields.$inferInsert;

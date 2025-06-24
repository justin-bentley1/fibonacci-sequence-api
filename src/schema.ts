import { createSchema } from 'graphql-yoga';
import fibonacci from './utils/fibonacci';
import { GraphQLError } from 'graphql';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      fibonacci(n: Int!): Int!
    }
  `,
  resolvers: {
    Query: {
      fibonacci: (_: unknown, { n }: { n: number }) => {
        if (n < 0) {
          throw new GraphQLError("Negative numbers are not allowed");
        }
        return fibonacci(n);
      },
    },
  },
});

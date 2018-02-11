// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import { coins } from '../queries/coins';

// QUERIES
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    coins,
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});

// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import { coins } from '../queries/coins';
import { collection } from '../queries/collection';
import { me } from '../queries/me';

import {
  registerUser,
  loginUser,
  addUserCoin,
  removeUserCoin,
} from '../mutations/user';

import {
  addWish,
  removeWish,
} from '../mutations/wishes';

// QUERIES
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    coins,
    me,
    collection,
  }),
});

// MUTATIONS
const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'These are the things we can change',
  fields: () => ({
    registerUser,
    loginUser,
    addUserCoin,
    removeUserCoin,
    addWish,
    removeWish
  }),
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

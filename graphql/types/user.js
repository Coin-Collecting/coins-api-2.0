// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

// EDGE TYPE
export const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: () => ({
    username: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.username,
    },
    email: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.email,
    },
    admin: {
      type: GraphQLBoolean,
      description: '...',
      resolve: obj => obj.admin,
    },
  }),
});
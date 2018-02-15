// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

// COIN TYPE
export const WishType = new GraphQLObjectType({
  name: 'Wish',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Wish Type',
      resolve: obj => obj.id,
    },
    userId: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.userId,
    },
    coinId: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.coinId,
    },
  }),
});

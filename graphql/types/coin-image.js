// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

// COIN TYPE
export const CoinImageType = new GraphQLObjectType({
  name: 'CoinImage',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Coin Image',
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
    imageUrl: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.imageUrl,
    },
  }),
});

// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { CoinType } from './coin';
import { Coin } from '../models';

// COIN TYPE
export const UserCoinType = new GraphQLObjectType({
  name: 'UserCoin',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Coin Type',
      resolve: obj => obj.id,
    },
    quality: {
      type: GraphQLString,
      description: 'Quality of a coin',
      resolve: obj => obj.quality,
    },
    coin: {
      type: CoinType,
      description: 'Coin ID',
      resolve: obj => Coin.findById(obj.coinId).then( res => res.dataValues),
    },
  }),
});

// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { CoinType } from './coin';
import { CoinImageType } from './coin-image.js';
import { Coin, CoinImage } from '../models';

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
    images: {
      type: new GraphQLList(CoinImageType),
      description: 'Coin Images',
      resolve: async (obj, args, context) => {
        let images = await CoinImage.findAndCountAll({
          where: {
            userId: context.user.id,
            coinId: obj.coinId,
          }
        });

        return images.rows;
      }
    },
    issueId: {
      type: GraphQLString,
      description: 'Issue of a coin',
      resolve: obj => obj.issueId,
    },
    coin: {
      type: CoinType,
      description: 'Coin ID',
      resolve: obj => Coin.findById(obj.coinId).then( res => res.dataValues),
    },
  }),
});

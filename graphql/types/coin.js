// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

import { IssueType } from '../types/issue';
import { UserCoinType } from '../types/usercoin';
import { Issue, UserCoin } from '../models';

// COIN TYPE
export const CoinType = new GraphQLObjectType({
  name: 'Coin',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Coin Type',
      resolve: obj => obj.id,
    },
    issue: {
      type: IssueType,
      description: '...',
      resolve: obj => Issue.findById(obj.issueId).then(res => res.dataValues),
    },
    mint: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.mint,
    },
    year: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.year,
    },
    mintage: {
      type: GraphQLFloat,
      description: '...',
      resolve: obj => obj.mintage,
    },
    description: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.description,
    },
    owned: {
      type: new GraphQLList(UserCoinType),
      description: '...',
      resolve: async (obj, args, {user}) => {
        let coins = await UserCoin.findAndCountAll({
          where: {
            coinId: obj.id,
            userId: user.id,
          }
        });

        console.log({coins});
        return coins.rows;
      }
    },
  })
});

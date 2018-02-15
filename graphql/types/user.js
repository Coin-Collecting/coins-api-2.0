// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import { CoinType } from './coin';
import { Coin } from "../models";

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
    totalOwned: {
      type: GraphQLInt,
      description: '...',
      resolve: obj => obj.totalOwned,
    },
    totalUniqueOwned: {
      type: GraphQLInt,
      description: '...',
      resolve: obj => obj.totalUniqueOwned,
    },
    totalMissing: {
      type: GraphQLInt,
      description: '...',
      resolve: obj => obj.totalMissing,
    },
    wishes: {
      type: new GraphQLList(CoinType),
      description: '...',
      resolve: async ({ wishes }) => {
        if (wishes.length === 0) return null;

        let coinIds = [];
        wishes.forEach(wish => coinIds.push(wish.coinId));

        let coins = await Coin.findAll({
          where: {
            id: coinIds,
          }
        });
        return coins;
      }
    },
  }),
});
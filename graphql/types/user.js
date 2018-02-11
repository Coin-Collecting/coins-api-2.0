// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import { UserCoinType } from '../types/usercoin';
import { UserCoin } from '../models';

import {
  convertNodeToCursor,
  convertCursorToNodeId,
  Page,
} from '../types/pagination';

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
    coinCollection: {
      type: Page(UserCoinType, 'CoinPage'),
      args: {
        issueId: { type: new GraphQLNonNull(GraphQLID) },
        cursor: { type: GraphQLString },
        count: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      description: '...',
      resolve: async (root, { count, cursor = 0, offset = 0, issueId }, context) => {
        if (!count) count = 20;

        if (cursor !==0) {
          cursor = convertCursorToNodeId(cursor)
        }

        let coins = await UserCoin.findAndCountAll({
          limit: count + 1,
          offset,
          where: {
            userId: context.user.id,
            ...issueId ? {issueId} : null
          }
        });

        let totalCount = await UserCoin.count({
          where: {
            userId: context.user.id,
            ...issueId ? {issueId} : null
          },
        });

        let edges = coins.rows.map(node => ({
          node,
          cursor: convertNodeToCursor(node.id),
        }));

        let hasNextPage = edges.length > count;

        if (hasNextPage) edges.pop();

        return {
          totalCount,
          edges,
          pageInfo: {
            startCursor: edges.length > 0 ? edges[0].cursor : null,
            endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
            hasNextPage,
          },
        };
      }
    },
  }),
});
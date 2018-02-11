import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

// TYPES
import { UserCoinType } from "../types/usercoin";

// Queries
import { UserCoin } from "../models";

export const collection = {
  type: new GraphQLList(UserCoinType),
  args: {
    issueId: { type: GraphQLID },
  },
  resolve: (root, { issueId }, context) => {
    if (!context || !context.user) return null;

    return UserCoin.findAll({
      where: {
        userId: context.user.id,
        ...issueId ? {issueId} : null
      }
    });
  }
};
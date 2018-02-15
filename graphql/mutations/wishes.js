// DEPENDENCIES
import { GraphQLString, GraphQLNonNull } from 'graphql';
const { UserError } = require('graphql-errors');
import { Wishes } from '../models/index';

export const addWish = {
  type: GraphQLString,
  description: 'Add a wish',
  args: {
    coinId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, { coinId}, context) => {
    if (!coinId) throw new UserError('Must provide a Coin ID');

    Wishes.create({
      coinId,
      userId: context.user.id,
    });

    return "Wish Added"
  }
}

export const removeWish = {
  type: GraphQLString,
  description: 'Remove a coin from collection',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, { id }, context) => {
    if (!id) throw new UserError('Must provide an ID');
    Wishes.destroy({
      where: {
        coinId: id,
        userId: context.user.id,
      }
    });

    return "Wish Removed"
  }
}
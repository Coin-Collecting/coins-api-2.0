// TYPES
import { UserType } from "../types/user";

// Queries
import { User, UserCoin, Coin, Wishes } from "../models";

export const me = {
  type: UserType,
  resolve: async (root, args, context) => {
    if (context.user) {
      let userData = await User.findById(context.user.id);

      let { username, email, admin } = userData.dataValues;

      let totalOwned = await UserCoin.count({
        where: {
          userId: context.user.id,
        },
      });

      let totalCoins = await Coin.count();

      let totalUniqueOwned = await UserCoin.aggregate(
        'coinId', 'count', {
        distinct: true,
        where: {
          userId: context.user.id,
        },
      });

      let totalMissing = totalCoins - totalUniqueOwned;

      let wishes = await Wishes.findAll({
        where: {
          userId: context.user.id,
        }
      });

      return {
        username,
        email,
        admin,
        totalOwned,
        totalUniqueOwned,
        totalMissing,
        wishes,
      }
    } else {
      return null;
    }
  }
};

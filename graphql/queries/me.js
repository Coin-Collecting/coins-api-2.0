// TYPES
import { UserType } from "../types/user";

// Queries
import { User, UserCoin } from "../models";

export const me = {
  type: UserType,
  resolve: async (root, args, context) => {
    if (context.user) {
      let userData = await User.findById(context.user.id);

      let { username, email, admin } = userData.dataValues;
      return {
        username,
        email,
        admin,
      }
    } else {
      return null;
    }
  }
};

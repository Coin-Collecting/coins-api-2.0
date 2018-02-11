// TYPES
import { UserType } from "../types/user";

// Queries
import { User } from "../models";

export const me = {
  type: UserType,
  resolve: async (root, args, context) => {
    if (context.user) {
      let userData = await User.findById(context.user.id);

      let { username, email, admin } = userData.dataValues;

      let collection = [{}];

      return {
        username,
        email,
        admin,
        collection,
      }
    } else {
      return null;
    }
  }
};

// DEPENDENCIES
import { GraphQLString, GraphQLNonNull } from 'graphql';
const { UserError } = require('graphql-errors');
import { UserType } from '../types/user';
import { User, UserCoin, Coin } from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const registerUser = {
  type: UserType,
  description: 'Register a User',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, args) => {
    let {
      username,
      email,
      password,
    } = args;

    if (!username) throw new UserError('Must provide a Username');
    if (!email) throw new UserError('Must provide an Email Address');
    if (!password) throw new UserError('Must provide a Password');

    password = await bcrypt.hash(password, 12);

    return User.create({
      username,
      email,
      password,
    });
  }
};

export const loginUser = {
  type: GraphQLString,
  description: 'Login a User',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, { username, password}, context) => {
    if (!username) throw new UserError('Must provide a Username');
    if (!password) throw new UserError('Must provide a Password');

    const user = await User.find({where: { username }});

    if (!user) {
      throw new UserError('No User found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UserError('Incorrect password');
    }

    return jwt.sign({
      user: _.pick(user, ['id', 'email', 'admin']),
    }, context.SECRET, {expiresIn: '1y',});
  }
};

export const addUserCoin = {
  type: GraphQLString,
  description: 'Add a coin to collection',
  args: {
    coinId: { type: new GraphQLNonNull(GraphQLString) },
    quality: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, { coinId, quality}, context) => {
    if (!coinId) throw new UserError('Must provide a Coin ID');
    if (!quality) throw new UserError('Must provide a quality');
    let issueId = await Coin.findById(coinId)
      .then(res => res.dataValues.issueId);

    UserCoin.create({
      coinId,
      quality,
      userId: context.user.id,
      issueId,
    });

    return "Coin Added"
  }
}

export const removeUserCoin = {
  type: GraphQLString,
  description: 'Remove a coin from collection',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (value, { id }, context) => {
    if (!id) throw new UserError('Must provide an ID');

    UserCoin.destroy({
      where: {
        id,
      }
    });

    return "Coin Removed"
  }
}
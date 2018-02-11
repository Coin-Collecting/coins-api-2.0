// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import { IssueType } from '../types/issue';
import { Issue } from '../models';

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
      resolve: obj => Issue.findById(obj.issueId).then( res => res.dataValues),
    },
    mint: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.mint,
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
    }
  }),
});

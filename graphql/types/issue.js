// DEPENDCENCIES
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { DenominationType } from '../types/denomination';
import { Issue, Denomination } from '../models';

// ISSUE TYPE
export const IssueType = new GraphQLObjectType({
  name: 'Issue',
  description: '...',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Unique Key for Coin Type',
      resolve: obj => obj.id,
    },
    variety: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.variety_name,
    },
    composition: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.composition,
    },
    mass: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.mass,
    },
    diameter: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.diameter,
    },
    denomination: {
      type: DenominationType,
      description: '...',
      resolve: obj => Denomination.findById(obj.denomination_id).then( res => res.dataValues),
    },
    startYear: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.from_year,
    },
    endYear: {
      type: GraphQLString,
      description: '...',
      resolve: obj => obj.to_year,
    },
  }),
});

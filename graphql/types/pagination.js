// DEPENDENCIES
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

export function Edge(itemType, itemName) {
  return new GraphQLObjectType({
    name: itemName ? itemName + "edge" : 'EdgePagination',
    description: "Generic edge to allow cursors",
    fields: () => ({
      node: { type: itemType },
      cursor: { type: GraphQLString }
    })
  });
}

export const PageInfo = new GraphQLObjectType({
  name: "PageInfo",
  description: "Information about current page",
  fields: () => ({
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean }
  })
});

export function Page(itemType, itemName) {
  return new GraphQLObjectType({
    name: itemName || "Page",
    description: "Page",
    fields: () => ({
      totalCount: { type: GraphQLInt },
      totalOwned: { type: GraphQLInt },
      edges: { type: new GraphQLList(Edge(itemType, itemName)) },
      pageInfo: { type: PageInfo }
    })
  });
}

export function bota(input) {
  return new Buffer(input.toString(), 'binary').toString("base64");
}

export function atob(input) {
  return new Buffer(input, 'base64').toString('binary');
}

export function convertCursorToNodeId(cursor) {
  return parseInt(atob(cursor));
}

export function convertNodeToCursor(id) {
  return bota(id.toString());
}
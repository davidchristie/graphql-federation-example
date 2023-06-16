import { gql, stitchingDirectives } from "graphql-config";

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

export const typeDefs = gql`
  ${stitchingDirectivesTypeDefs}

  type Review @canonical {
    id: ID!
    body: String
    author: User
    product: Product
  }

  type User @key(selectionSet: "{ id }") {
    id: ID!
    totalReviews: Int!
    reviews: [Review]
  }

  type Product @key(selectionSet: "{ upc }") {
    upc: ID!
    "Reviews written for this product"
    reviews: [Review]
  }

  scalar _UserKey

  scalar _ProductKey

  type Query {
    review(id: ID!): Review
    _users(keys: [_UserKey!]!): [User]! @merge
    _products(keys: [_ProductKey!]!): [Product]! @merge
    _sdl: String!
  }
`;

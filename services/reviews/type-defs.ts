import { gql, stitchingDirectives } from "graphql-config";

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

export const typeDefs = gql`
  ${stitchingDirectivesTypeDefs}
  type Review {
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

  input UserKey {
    id: ID!
  }

  input ProductKey {
    upc: ID!
  }

  input ProductInput {
    keys: [ProductKey!]!
  }

  type Query {
    review(id: ID!): Review
    _users(keys: [UserKey!]!): [User]! @merge
    _products(input: ProductInput): [Product]! @merge(keyArg: "input.keys")
    _sdl: String!
  }
`;

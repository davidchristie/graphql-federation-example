import { gql, stitchingDirectives } from "graphql-config";

const { stitchingDirectivesTypeDefs } = stitchingDirectives();

export const typeDefs = gql`
  ${stitchingDirectivesTypeDefs}
  "Represents a Product available for resale."
  type Product @canonical {
    "The primary key of this product."
    upc: ID!
    "The name of this product."
    name: String!
    "The price of this product in cents."
    price: Int!
    "The weight of this product in grams."
    weight: Int!
    imageUrl: String!
    isNew: Boolean!
  }

  input ProductsInput {
    limit: Int
  }

  scalar _ProductKey

  type Query {
    topProducts(first: Int = 2): [Product!]!
    product(upc: String!): Product
    products(input: ProductsInput!): [Product!]!
    _products(keys: [_ProductKey!]!): [Product]! @merge(keyField: "upc")
    _sdl: String!
  }
`;

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

  type Query {
    topProducts(first: Int = 2): [Product]!
    products(upcs: [ID!]!, order: String): [Product]!
      @merge(
        keyField: "upc"
        keyArg: "upcs"
        additionalArgs: """
        order: "price"
        """
      )
    _sdl: String!
  }
`;

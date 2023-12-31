import { gql, stitchingDirectives } from "graphql-config";

const { stitchingDirectivesTypeDefs } = stitchingDirectives();

export const typeDefs = gql`
  ${stitchingDirectivesTypeDefs}

  "Stuff sitting in warehouse inventory"
  type Product @key(selectionSet: "{ upc }") {
    upc: ID!
    "Specifies if this product is currently stocked."
    inStock: Boolean
    "Specifies the estimated shipping cost of this product, in cents."
    shippingEstimate: Int @computed(selectionSet: "{ price weight }")
  }

  scalar _ProductKey

  type Query {
    mostStockedProduct: Product
    _products(keys: [_ProductKey!]!): [Product]! @merge
    _sdl: String!
  }
`;

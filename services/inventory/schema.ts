import {
  GraphQLError,
  GraphQLSchema,
  createSchema,
  stitchingDirectives,
} from "graphql-config";

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

const inventories = [
  { upc: "1", unitsInStock: 3 },
  { upc: "2", unitsInStock: 0 },
  { upc: "3", unitsInStock: 5 },
];

const typeDefs = `
  ${stitchingDirectivesTypeDefs}
  "Stuff sitting in warehouse inventory"
  type Product @key(selectionSet: "{ upc }") {
    upc: ID!
    "Specifies if this product is currently stocked."
    inStock: Boolean
    "Specifies the estimated shipping cost of this product, in cents."
    shippingEstimate: Int @computed(selectionSet: "{ price weight }")
  }

  scalar _Key

  type Query {
    mostStockedProduct: Product
    _products(keys: [_Key!]!): [Product]! @merge
    _sdl: String!
  }
`;

export function createInventorySchema(): GraphQLSchema {
  return stitchingDirectivesValidator(
    createSchema({
      typeDefs,
      resolvers: {
        Product: {
          inStock: (product) => product.unitsInStock > 0,
          shippingEstimate(product) {
            // free for expensive items, otherwise estimate based on weight
            return product.price > 1000 ? 0 : Math.round(product.weight * 0.5);
          },
        },
        Query: {
          mostStockedProduct: () =>
            inventories.reduce(
              (acc, i) => (acc.unitsInStock >= i.unitsInStock ? acc : i),
              inventories[0]
            ),
          _products: (_root, { keys }) =>
            keys.map((key: { upc: string }) => {
              const inventory = inventories.find((i) => i.upc === key.upc);
              return inventory
                ? { ...key, ...inventory }
                : new GraphQLError("Record not found", {
                    extensions: {
                      code: "NOT_FOUND",
                    },
                  });
            }),
          _sdl: () => typeDefs,
        },
      },
    })
  );
}

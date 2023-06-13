import {
  GraphQLError,
  convertDocumentToString,
  stitchingDirectives,
} from "graphql-config";
import { typeDefs } from "./type-defs.js";
import { Resolvers } from "../generated/graphql/resolvers.js";

const { stitchingDirectivesValidator } = stitchingDirectives();

const inventories = [
  { upc: "1", unitsInStock: 3 },
  { upc: "2", unitsInStock: 0 },
  { upc: "3", unitsInStock: 5 },
];

export const resolvers: Resolvers = {
  Product: {
    inStock: (product: any) => product.unitsInStock > 0,
    shippingEstimate: (product) => {
      if (!("price" in product && typeof product.price === "number")) {
        throw new GraphQLError("Product price not available");
      }
      if (!("weight" in product && typeof product.weight === "number")) {
        throw new GraphQLError("Product weight not available");
      }
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
    _products: (_root: any, { keys }: any) =>
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
    _sdl: () => convertDocumentToString(typeDefs),
  },
};

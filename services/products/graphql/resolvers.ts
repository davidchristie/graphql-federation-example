import { convertDocumentToString } from "graphql-config";
import { typeDefs } from "./type-defs.ts";
import { Resolvers } from "../generated/graphql/resolvers.ts";

export const resolvers: Resolvers = {
  Query: {
    topProducts: async (_root, args, context) => {
      const result = await context.useCases.topProducts.handler({
        first: args.first,
      });
      return result.products;
    },
    product: async (_root, { upc }, context) => {
      const result = await context.useCases.findProduct.handler({ upc });
      return result.product;
    },
    products: async (_root, { input }, context) => {
      const result = await context.useCases.findProducts.handler({
        limit: input?.limit ?? undefined,
      });
      return result.products;
    },
    _products: async (_root, { keys }, context) => {
      const result = await Promise.all(
        keys.map(async (key) => {
          const { product } = await context.useCases.findProduct.handler({
            upc: key,
          });
          return product;
        })
      );
      return result;
    },
    _sdl: () => convertDocumentToString(typeDefs),
  },
};

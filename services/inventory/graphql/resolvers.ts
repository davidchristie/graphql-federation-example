import { GraphQLError, convertDocumentToString } from "graphql-config";
import { Product } from "../core/entities/product.ts";
import { Resolvers } from "../generated/graphql/resolvers.ts";
import { typeDefs } from "./type-defs.ts";

export const resolvers: Resolvers = {
  Product: {
    inStock: async (product, _input, context) => {
      const result = await context.useCases.inStock.handler({
        product: {
          unitsInStock: product.unitsInStock,
        },
      });
      return result.inStock;
    },
    shippingEstimate: async (product, _input, context) => {
      if (!("price" in product && typeof product.price === "number")) {
        throw new GraphQLError("Product price not available");
      }
      if (!("weight" in product && typeof product.weight === "number")) {
        throw new GraphQLError("Product weight not available");
      }
      const result = await context.useCases.shippingEstimate.handler({
        product: {
          price: product.price,
          weight: product.weight,
        },
      });
      return result.shippingEstimate;
    },
  },
  Query: {
    mostStockedProduct: async (_root, _input, context) => {
      const result = await context.useCases.mostStockedProduct.handler();
      return result.mostStockedProduct;
    },
    _products: async (_root, { keys }, context) => {
      const result = await context.useCases.products.handler({
        upcs: keys.map((key) => key.upc),
      });
      const productsByUpc = result.products.reduce<Record<string, Product>>(
        (accumulator, current) => {
          if (current !== null) {
            accumulator[current.upc] = current;
          }
          return accumulator;
        },
        {}
      );
      return keys.map((key) => ({
        ...key,
        ...productsByUpc[key.upc],
      }));
    },
    _sdl: () => convertDocumentToString(typeDefs),
  },
};

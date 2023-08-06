import { YogaServerInstance, createYoga } from "graphql-config";
import { createProductsSchema } from "./schema.ts";
import { Context } from "./context.ts";
import { Ports } from "../core/ports/index.ts";
import { createUseCases } from "../core/use-cases/index.ts";

export type ProductsApp = YogaServerInstance<Record<string, unknown>, Context>;

export function createProductsApp(options: { ports: Ports }): ProductsApp {
  const useCases = createUseCases({ ports: options.ports });
  return createYoga({
    schema: createProductsSchema(),
    context: () => {
      return {
        useCases,
      };
    },
    landingPage: false,
    graphiql: {
      title: "Products",
      defaultQuery: `
{
  topProducts {
    upc
    name
    price
    weight
    imageUrl
    isNew
  }
  product(upc: 1) {
    upc
    name
    price
    weight
    imageUrl
    isNew
  }
  products(input: { limit: 3 }) {
    upc
    name
    price
    weight
    imageUrl
    isNew
  }
}
      `.trim(),
    },
  });
}

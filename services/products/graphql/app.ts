import { YogaServerInstance, createYoga } from "graphql-config";
import { createProductsSchema } from "./schema.js";
import { Context } from "./context.js";
import { Ports } from "../core/ports/index.js";
import { createUseCases } from "../core/use-cases/index.js";

export type ProductsApp = YogaServerInstance<Context, {}>;

export function createProductsApp(options: { ports: Ports }): ProductsApp {
  const useCases = createUseCases({ ports: options.ports });
  return createYoga({
    schema: createProductsSchema(),
    context: (): Context => {
      return {
        useCases,
      };
    },
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
  products(upcs: [1, 2, 3]) {
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

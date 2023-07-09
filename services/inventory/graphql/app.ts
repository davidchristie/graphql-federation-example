import { YogaServerInstance, createYoga } from "graphql-config";
import { createInventorySchema } from "./schema.ts";
import { Context } from "./context.ts";
import { createUseCases } from "../core/use-cases/index.ts";
import { Ports } from "../core/ports/index.ts";

export type InventoryApp = YogaServerInstance<Record<string, unknown>, Context>;

export function createInventoryApp(options: { ports: Ports }): InventoryApp {
  const useCases = createUseCases({ ports: options.ports });
  return createYoga({
    schema: createInventorySchema(),
    context: () => {
      return {
        useCases,
      };
    },
    landingPage: false,
    graphiql: {
      title: "Inventory",
      defaultQuery: `
{
  mostStockedProduct {
    upc
    inStock
  }
}
      `.trim(),
    },
  });
}

import { YogaServerInstance, createYoga } from "graphql-config";
import { createInventorySchema } from "./schema.ts";

export type InventoryApp = YogaServerInstance<
  Record<string, unknown>,
  Record<string, unknown>
>;

export function createInventoryApp(): InventoryApp {
  return createYoga({
    schema: createInventorySchema(),
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

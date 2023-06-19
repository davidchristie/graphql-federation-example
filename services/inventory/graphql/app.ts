import { YogaServerInstance, createYoga } from "graphql-config";
import { createInventorySchema } from "./schema.js";

export type InventoryApp = YogaServerInstance<{}, {}>;

export function createInventoryApp(): InventoryApp {
  return createYoga({
    schema: createInventorySchema(),
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

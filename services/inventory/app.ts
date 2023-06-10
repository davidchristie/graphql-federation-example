import { YogaServerInstance, createYoga } from "graphql-config";
import { createInventorySchema } from "./schema.js";

export function createInventoryApp(): YogaServerInstance<{}, {}> {
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

import { YogaServerInstance, createYoga } from "graphql-config";
import { createProductsSchema } from "./schema.js";

export function createProductsApp(): YogaServerInstance<{}, {}> {
  return createYoga({
    schema: createProductsSchema(),
    graphiql: {
      title: "Products",
      defaultQuery: `
{
  topProducts {
    upc
    name
    price
    weight
  }
  products(upcs: [1, 2, 3]) {
    upc
    name
    price
    weight
  }
}
      `.trim(),
    },
  });
}

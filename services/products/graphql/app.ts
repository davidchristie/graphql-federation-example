import { YogaServerInstance, createYoga } from "graphql-config";
import { createProductsSchema } from "./schema.js";

export type ProductsApp = YogaServerInstance<{}, {}>;

export function createProductsApp(): ProductsApp {
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

import { YogaServerInstance } from "graphql-config";
import { beforeEach, describe, expect, it } from "vitest-config";
import { createProductsApp } from "./app.js";

describe("Products app", () => {
  let productsApp: YogaServerInstance<{}, {}>;

  beforeEach(async () => {
    productsApp = createProductsApp();
  });

  it("returns the correct response", async () => {
    const response = await productsApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
        `,
      }),
    });
    const result = await response.json();
    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "products": [
            {
              "name": "Table",
              "price": 899,
              "upc": "1",
              "weight": 100,
            },
            {
              "name": "Couch",
              "price": 1299,
              "upc": "2",
              "weight": 1000,
            },
            {
              "name": "Chair",
              "price": 54,
              "upc": "3",
              "weight": 50,
            },
          ],
          "topProducts": [
            {
              "name": "Table",
              "price": 899,
              "upc": "1",
              "weight": 100,
            },
            {
              "name": "Couch",
              "price": 1299,
              "upc": "2",
              "weight": 1000,
            },
          ],
        },
      }
    `);
  });
});

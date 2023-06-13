import { productsHost } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("Products server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [productsHost],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(`${productsHost}/graphql`, {
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
    },
    {
      timeout: 10000,
    }
  );
});

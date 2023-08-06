import { productsEndpoint } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("products server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [productsEndpoint],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(productsEndpoint, {
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
              products(input: { limit: 3 }) {
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
                "name": "Tuna",
                "price": 833,
                "upc": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
                "weight": 958,
              },
              {
                "name": "Keyboard",
                "price": 618,
                "upc": "c2ddf7cc-78ca-41ba-a928-fc816742cb73",
                "weight": 150,
              },
              {
                "name": "Tuna",
                "price": 103,
                "upc": "9396fea7-596e-4b10-9faa-a2352c595590",
                "weight": 653,
              },
            ],
            "topProducts": [
              {
                "name": "Tuna",
                "price": 833,
                "upc": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
                "weight": 958,
              },
              {
                "name": "Keyboard",
                "price": 618,
                "upc": "c2ddf7cc-78ca-41ba-a928-fc816742cb73",
                "weight": 150,
              },
            ],
          },
        }
      `);
    },
    {
      timeout: 30000,
    }
  );
});

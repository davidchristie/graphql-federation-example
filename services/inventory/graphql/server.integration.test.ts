import { inventoryEndpoint } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("inventory server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [inventoryEndpoint],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(inventoryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              mostStockedProduct {
                upc
                inStock
              }
            }
          `,
        }),
      });
      const result = await response.json();
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "mostStockedProduct": {
              "inStock": true,
              "upc": "70a45626-d436-4813-8f16-d9f5fce6c556",
            },
          },
        }
      `);
    },
    {
      timeout: 30000,
    }
  );
});

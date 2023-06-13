import { gatewayHost } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("Gateway server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [gatewayHost],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(`${gatewayHost}/graphql`, {
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
              "upc": "3",
            },
          },
        }
      `);
    },
    {
      timeout: 10000,
    }
  );
});

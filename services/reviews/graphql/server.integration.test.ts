import { reviewsHost } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("Reviews server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [reviewsHost],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(`${reviewsHost}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              review(id: 1) {
                id
                body
                author {
                  id
                }
                product {
                  upc
                }
              }
            }
          `,
        }),
      });
      const result = await response.json();
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "review": {
              "author": {
                "id": "1",
              },
              "body": "Love it!",
              "id": "1",
              "product": {
                "upc": "1",
              },
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

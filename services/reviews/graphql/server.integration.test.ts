import { reviewsEndpoint, seedReviews } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("reviews server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [reviewsEndpoint],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(reviewsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              review(id: "${seedReviews[0].id}") {
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
                "id": "35e38efc-f584-4ac5-8cc0-8d97a199553e",
              },
              "body": "Odit at at maiores molestiae quod quod esse totam.
        Dolorum dicta nam officia occaecati fugit deleniti hic optio.
        Beatae commodi molestiae modi qui impedit cum.
        Ipsum excepturi aspernatur perferendis ad natus.
        Iste dolor natus laboriosam.",
              "id": "bd9d8d69-a674-4e0f-8467-cc8796ed151a",
              "product": {
                "upc": "cfb7a738-a81c-4db3-ae7c-e0c30a7d87db",
              },
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

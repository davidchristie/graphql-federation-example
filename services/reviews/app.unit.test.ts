import { YogaServerInstance } from "graphql-config";
import { beforeEach, describe, expect, it } from "vitest-config";
import { createReviewsApp } from "./app.js";

describe("Reviews app", () => {
  let reviewsApp: YogaServerInstance<{}, {}>;

  beforeEach(async () => {
    reviewsApp = createReviewsApp();
  });

  it("returns the correct response", async () => {
    const response = await reviewsApp.fetch("/graphql", {
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
  });
});

import { beforeEach, describe, expect, it } from "vitest-config";
import { ReviewsApp } from "./app.js";
import { createMockReviewsApp } from "../mocks/app.js";

describe("reviews app", () => {
  let reviewsApp: ReviewsApp;

  beforeEach(async () => {
    reviewsApp = createMockReviewsApp();
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

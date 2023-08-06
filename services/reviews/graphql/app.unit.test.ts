import { beforeEach, describe, expect, it } from "vitest-config";
import { ReviewsApp } from "./app.ts";
import { createMockReviewsApp } from "../mocks/app.ts";
import { seedReviews } from "dev-config";

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
              "id": "5cc08d97-a199-4553-8e2c-c22c74544f31",
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
  });
});

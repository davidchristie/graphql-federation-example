import { beforeEach, describe, expect, it } from "vitest-config";
import { PublicGatewayApp, createPublicGatewayApp } from "./app.ts";
import { createMockPublicGatewaySchema } from "../../mocks/schema.ts";

describe("public gateway app", () => {
  let publicGatewayApp: PublicGatewayApp;

  beforeEach(async () => {
    publicGatewayApp = createPublicGatewayApp(createMockPublicGatewaySchema());
  });

  it("returns product information", async () => {
    const response = await publicGatewayApp.fetch("/public/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            products(input: { limit: 3 }) {
              name
              price
              weight
              imageUrl
              isNew
              inStock
              shippingEstimate
              totalReviews
              averageRating
              reviews {
                id
                body
                rating
                author {
                  name
                  username
                  totalReviews
                }
                product {
                  name
                  price
                }
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
          "products": [
            {
              "averageRating": 1.5,
              "imageUrl": "https://loremflickr.com/640/480/product?lock=182111149490176",
              "inStock": true,
              "isNew": false,
              "name": "Tuna",
              "price": 833,
              "reviews": [
                {
                  "author": {
                    "name": "Vergie Runolfsson Jr.",
                    "totalReviews": 1,
                    "username": "Vergie_Runolfsson",
                  },
                  "body": "Necessitatibus rem atque suscipit velit hic quae tempore iste quaerat.",
                  "id": "5a072c23-deea-48fe-a4bc-45c8d4813115",
                  "product": {
                    "name": "Tuna",
                    "price": 833,
                  },
                  "rating": 1,
                },
                {
                  "author": {
                    "name": "Margarette Blick II",
                    "totalReviews": 2,
                    "username": "Margarette28",
                  },
                  "body": "Facilis nostrum similique assumenda laborum. Repellat veniam dignissimos distinctio id. Provident laboriosam dolorem pariatur.",
                  "id": "0fd0135b-a438-404f-8695-58b5791a49ef",
                  "product": {
                    "name": "Tuna",
                    "price": 833,
                  },
                  "rating": 2,
                },
              ],
              "shippingEstimate": 479,
              "totalReviews": 2,
              "weight": 958,
            },
            {
              "averageRating": 1,
              "imageUrl": "https://loremflickr.com/640/480/product?lock=169243454734336",
              "inStock": true,
              "isNew": false,
              "name": "Keyboard",
              "price": 618,
              "reviews": [
                {
                  "author": {
                    "name": "Miguel Koss",
                    "totalReviews": 3,
                    "username": "Miguel.Koss",
                  },
                  "body": "Neque mollitia velit ut est.
      Rerum blanditiis sapiente.
      Perspiciatis natus reprehenderit dolorem sunt fuga nulla cumque aperiam ad.
      Quas quis fuga eveniet consequuntur illum delectus rerum voluptate.
      Maiores harum ratione.",
                  "id": "1a52046b-64e9-49fb-90e6-7e094fdfed55",
                  "product": {
                    "name": "Keyboard",
                    "price": 618,
                  },
                  "rating": 1,
                },
              ],
              "shippingEstimate": 75,
              "totalReviews": 1,
              "weight": 150,
            },
            {
              "averageRating": 1,
              "imageUrl": "https://loremflickr.com/640/480/product?lock=8902480041607168",
              "inStock": true,
              "isNew": false,
              "name": "Tuna",
              "price": 103,
              "reviews": [
                {
                  "author": {
                    "name": "Brannon Labadie DDS",
                    "totalReviews": 2,
                    "username": "Brannon_Labadie",
                  },
                  "body": "Totam eos delectus illum consequuntur praesentium fugiat beatae perferendis quaerat.
      Harum iusto debitis.",
                  "id": "23b7b6d9-948d-46ed-aed4-77680fc7a17a",
                  "product": {
                    "name": "Tuna",
                    "price": 103,
                  },
                  "rating": 1,
                },
              ],
              "shippingEstimate": 327,
              "totalReviews": 1,
              "weight": 653,
            },
          ],
        },
      }
    `);
  });

  it("does not include private fields", async () => {
    const response = await publicGatewayApp.fetch("/public/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            _sdl
          }
        `,
      }),
    });
    const result = await response.json();
    expect(result).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "locations": [
              {
                "column": 13,
                "line": 3,
              },
            ],
            "message": "Cannot query field \\"_sdl\\" on type \\"Query\\".",
          },
        ],
      }
    `);
  });
});

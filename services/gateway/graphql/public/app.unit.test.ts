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
              "averageRating": 3.5,
              "imageUrl": "https://www.ikea.com/us/en/images/products/tarsele-extendable-table-oak-veneer-black__0944977_pe797515_s5.jpg",
              "inStock": true,
              "isNew": false,
              "name": "Table",
              "price": 899,
              "reviews": [
                {
                  "author": {
                    "name": "Ada Lovelace",
                    "totalReviews": 2,
                    "username": "@ada",
                  },
                  "body": "Love it!",
                  "id": "1",
                  "product": {
                    "name": "Table",
                    "price": 899,
                  },
                  "rating": 5,
                },
                {
                  "author": {
                    "name": "Alan Turing",
                    "totalReviews": 2,
                    "username": "@complete",
                  },
                  "body": "Prefer something else.",
                  "id": "4",
                  "product": {
                    "name": "Table",
                    "price": 899,
                  },
                  "rating": 2,
                },
              ],
              "shippingEstimate": 50,
              "totalReviews": 2,
              "weight": 100,
            },
            {
              "averageRating": 4,
              "imageUrl": "https://www.ikea.com/us/en/images/products/kivik-corner-sectional-5-seat-w-chaise-tresund-anthracite__1124079_pe874996_s5.jpg",
              "inStock": false,
              "isNew": true,
              "name": "Couch",
              "price": 1299,
              "reviews": [
                {
                  "author": {
                    "name": "Ada Lovelace",
                    "totalReviews": 2,
                    "username": "@ada",
                  },
                  "body": "Too expensive.",
                  "id": "2",
                  "product": {
                    "name": "Couch",
                    "price": 1299,
                  },
                  "rating": 4,
                },
              ],
              "shippingEstimate": 0,
              "totalReviews": 1,
              "weight": 1000,
            },
            {
              "averageRating": 3,
              "imageUrl": "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg",
              "inStock": true,
              "isNew": false,
              "name": "Chair",
              "price": 54,
              "reviews": [
                {
                  "author": {
                    "name": "Alan Turing",
                    "totalReviews": 2,
                    "username": "@complete",
                  },
                  "body": "Could be better.",
                  "id": "3",
                  "product": {
                    "name": "Chair",
                    "price": 54,
                  },
                  "rating": 3,
                },
              ],
              "shippingEstimate": 25,
              "totalReviews": 1,
              "weight": 50,
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

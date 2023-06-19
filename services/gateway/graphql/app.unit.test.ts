import { createAccountsSchema } from "accounts";
import { stitchSchemas, stitchingDirectives } from "graphql-config";
import { createInventorySchema } from "inventory";
import { createProductsSchema } from "products";
import { createReviewsSchema } from "reviews";
import { beforeEach, describe, expect, it } from "vitest-config";
import { GatewayApp, createGatewayApp } from "./app.js";

describe("Gateway app", () => {
  let gatewayApp: GatewayApp;

  beforeEach(async () => {
    const { stitchingDirectivesTransformer } = stitchingDirectives();
    gatewayApp = createGatewayApp(
      stitchSchemas({
        subschemaConfigTransforms: [stitchingDirectivesTransformer],
        subschemas: [
          {
            schema: createAccountsSchema(),
          },
          {
            schema: createInventorySchema(),
          },
          {
            schema: createProductsSchema(),
          },
          {
            schema: createReviewsSchema(),
          },
        ],
      })
    );
  });

  it("returns product information", async () => {
    const response = await gatewayApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            products(upcs: [1, 2]) {
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
          ],
        },
      }
    `);
  });
});

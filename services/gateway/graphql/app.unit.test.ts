import { createAccountsSchema } from "accounts";
import {
  YogaServerInstance,
  stitchSchemas,
  stitchingDirectives,
} from "graphql-config";
import { createInventorySchema } from "inventory";
import { createProductsSchema } from "products";
import { createReviewsSchema } from "reviews";
import { beforeEach, describe, expect, it } from "vitest-config";
import { createGatewayApp } from "./app.js";

describe("Gateway app", () => {
  let gatewayApp: YogaServerInstance<{}, {}>;

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

  it("returns the correct response", async () => {
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
              inStock
              shippingEstimate
              reviews {
                id
                body
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
              "inStock": true,
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
                },
              ],
              "shippingEstimate": 50,
              "weight": 100,
            },
            {
              "inStock": false,
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
                },
              ],
              "shippingEstimate": 0,
              "weight": 1000,
            },
          ],
        },
      }
    `);
  });
});

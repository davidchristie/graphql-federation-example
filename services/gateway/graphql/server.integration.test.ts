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
    },
    {
      timeout: 30000,
    }
  );
});

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
                imageUrl
                isNew
                inStock
                shippingEstimate
                totalReviews
                averageRating
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
    },
    {
      timeout: 30000,
    }
  );
});

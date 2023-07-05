import { beforeEach, describe, expect, it } from "vitest-config";
import { PrivateGatewayApp, createPrivateGatewayApp } from "./app.js";
import { createMockPrivateGatewaySchema } from "../../mocks/schema.js";

describe("private gateway app", () => {
  let privateGatewayApp: PrivateGatewayApp;

  beforeEach(async () => {
    privateGatewayApp = createPrivateGatewayApp(
      createMockPrivateGatewaySchema()
    );
  });

  it("returns product information", async () => {
    const response = await privateGatewayApp.fetch("/private/graphql", {
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

  it("includes private fields", async () => {
    const response = await privateGatewayApp.fetch("/private/graphql", {
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
        "data": {
          "_sdl": "
        directive @key(selectionSet: String!) on OBJECT
      directive @computed(selectionSet: String!) on FIELD_DEFINITION
      directive @merge(argsExpr: String, keyArg: String, keyField: String, key: [String!], additionalArgs: String) on FIELD_DEFINITION
      directive @canonical on OBJECT | INTERFACE | INPUT_OBJECT | UNION | ENUM | SCALAR | FIELD_DEFINITION | INPUT_FIELD_DEFINITION

        type Review @canonical {
          id: ID!
          body: String
          author: User
          product: Product
          rating: Float!
        }

        type User @key(selectionSet: \\"{ id }\\") {
          id: ID!
          totalReviews: Int!
          reviews: [Review]
        }

        type Product @key(selectionSet: \\"{ upc }\\") {
          upc: ID!
          \\"Reviews written for this product\\"
          totalReviews: Int!
          reviews: [Review]
          averageRating: Float
        }

        scalar _UserKey

        scalar _ProductKey

        type Query {
          review(id: ID!): Review
          _users(keys: [_UserKey!]!): [User]! @merge
          _products(keys: [_ProductKey!]!): [Product]! @merge
          _sdl: String!
        }
      ",
        },
      }
    `);
  });
});

import { publicGatewayEndpoint } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { beforeAll, describe, expect, it } from "vitest-config";

describe("gateway server", () => {
  beforeAll(async () => {
    await waitForResources({
      resources: [publicGatewayEndpoint],
      headers: {
        accept: "text/html",
      },
    });
  }, 30000);

  it("returns product information", async () => {
    const response = await fetch(publicGatewayEndpoint, {
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

  it("can sign in", async () => {
    const signInResponse = await fetch(publicGatewayEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation SignIn($input: SignInInput!) {
            signIn(input: $input) {
              token
              query {
                signedInUser {
                  id
                  name
                  username
                }
              }
            }
          }
        `,
        variables: {
          input: {
            email: "ada@email.com",
            password: "password123",
          },
        },
      }),
    });
    const signInResult = await signInResponse.json();
    expect(signInResult).toMatchObject({
      data: {
        signIn: {
          query: {
            signedInUser: {
              id: "1",
              name: "Ada Lovelace",
              username: "@ada",
            },
          },
          token: expect.any(String),
        },
      },
    });
    const signedInUserResponse = await fetch(publicGatewayEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authorization: `Bearer ${(signInResult as any).data.signIn.token}`,
      },
      body: JSON.stringify({
        query: `
          query SignedInUser {
            signedInUser {
              id
              name
              username
            }
          }
        `,
      }),
    });
    expect(await signedInUserResponse.json()).toMatchInlineSnapshot(`
      {
        "data": {
          "signedInUser": {
            "id": "1",
            "name": "Ada Lovelace",
            "username": "@ada",
          },
        },
      }
    `);
  });
});

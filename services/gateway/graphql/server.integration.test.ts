import { publicGatewayEndpoint, seedUsers } from "dev-config";
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
            email: seedUsers[0].email,
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
              id: seedUsers[0].id,
              name: seedUsers[0].name,
              username: seedUsers[0].username,
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
            "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
            "name": "User",
            "username": "user",
          },
        },
      }
    `);
  });
});

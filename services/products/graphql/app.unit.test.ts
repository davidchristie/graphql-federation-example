import { beforeEach, describe, expect, it } from "vitest-config";
import { createMockProductsApp } from "../mocks/app.ts";
import { ProductsApp } from "./app.ts";
import { seedProducts } from "dev-config";

describe("products app", () => {
  let productsApp: ProductsApp;

  beforeEach(async () => {
    productsApp = createMockProductsApp();
  });

  it("returns the correct response", async () => {
    const response = await productsApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            topProducts {
              upc
              name
              price
              weight
              imageUrl
              isNew
            }
            product(upc: "${seedProducts[0].upc}") {
              upc
              name
              price
              weight
              imageUrl
              isNew
            }
            products(input: { limit: 3 }) {
              upc
              name
              price
              weight
              imageUrl
              isNew
            }
          }
        `,
      }),
    });
    const result = await response.json();
    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "product": {
            "imageUrl": "https://loremflickr.com/640/480/product?lock=182111149490176",
            "isNew": false,
            "name": "Tuna",
            "price": 833,
            "upc": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
            "weight": 958,
          },
          "products": [
            {
              "imageUrl": "https://loremflickr.com/640/480/product?lock=182111149490176",
              "isNew": false,
              "name": "Tuna",
              "price": 833,
              "upc": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "weight": 958,
            },
            {
              "imageUrl": "https://loremflickr.com/640/480/product?lock=169243454734336",
              "isNew": false,
              "name": "Keyboard",
              "price": 618,
              "upc": "c2ddf7cc-78ca-41ba-a928-fc816742cb73",
              "weight": 150,
            },
            {
              "imageUrl": "https://loremflickr.com/640/480/product?lock=8902480041607168",
              "isNew": false,
              "name": "Tuna",
              "price": 103,
              "upc": "9396fea7-596e-4b10-9faa-a2352c595590",
              "weight": 653,
            },
          ],
          "topProducts": [
            {
              "imageUrl": "https://loremflickr.com/640/480/product?lock=182111149490176",
              "isNew": false,
              "name": "Tuna",
              "price": 833,
              "upc": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
              "weight": 958,
            },
            {
              "imageUrl": "https://loremflickr.com/640/480/product?lock=169243454734336",
              "isNew": false,
              "name": "Keyboard",
              "price": 618,
              "upc": "c2ddf7cc-78ca-41ba-a928-fc816742cb73",
              "weight": 150,
            },
          ],
        },
      }
    `);
  });
});

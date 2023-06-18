import { YogaServerInstance } from "graphql-config";
import { beforeEach, describe, expect, it } from "vitest-config";
import { createProductsApp } from "./app.js";

describe("Products app", () => {
  let productsApp: YogaServerInstance<{}, {}>;

  beforeEach(async () => {
    productsApp = createProductsApp();
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
            products(upcs: [1, 2, 3]) {
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
          "products": [
            {
              "imageUrl": "https://www.ikea.com/us/en/images/products/tarsele-extendable-table-oak-veneer-black__0944977_pe797515_s5.jpg",
              "isNew": false,
              "name": "Table",
              "price": 899,
              "upc": "1",
              "weight": 100,
            },
            {
              "imageUrl": "https://www.ikea.com/us/en/images/products/kivik-corner-sectional-5-seat-w-chaise-tresund-anthracite__1124079_pe874996_s5.jpg",
              "isNew": true,
              "name": "Couch",
              "price": 1299,
              "upc": "2",
              "weight": 1000,
            },
            {
              "imageUrl": "https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1179060_pe895831_s5.jpg",
              "isNew": false,
              "name": "Chair",
              "price": 54,
              "upc": "3",
              "weight": 50,
            },
          ],
          "topProducts": [
            {
              "imageUrl": "https://www.ikea.com/us/en/images/products/tarsele-extendable-table-oak-veneer-black__0944977_pe797515_s5.jpg",
              "isNew": false,
              "name": "Table",
              "price": 899,
              "upc": "1",
              "weight": 100,
            },
            {
              "imageUrl": "https://www.ikea.com/us/en/images/products/kivik-corner-sectional-5-seat-w-chaise-tresund-anthracite__1124079_pe874996_s5.jpg",
              "isNew": true,
              "name": "Couch",
              "price": 1299,
              "upc": "2",
              "weight": 1000,
            },
          ],
        },
      }
    `);
  });
});

import { beforeEach, describe, expect, it } from "vitest-config";
import { InventoryApp, createInventoryApp } from "./app.ts";

describe("inventory app", () => {
  let inventoryApp: InventoryApp;

  beforeEach(async () => {
    inventoryApp = createInventoryApp();
  });

  it("returns the correct response", async () => {
    const response = await inventoryApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            mostStockedProduct {
              upc
              inStock
            }
          }
        `,
      }),
    });
    const result = await response.json();
    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "mostStockedProduct": {
            "inStock": true,
            "upc": "3",
          },
        },
      }
    `);
  });
});

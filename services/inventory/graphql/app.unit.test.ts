import { beforeEach, describe, expect, it } from "vitest-config";
import { InventoryApp } from "./app.ts";
import { createMockInventoryApp } from "../main.ts";

describe("inventory app", () => {
  let inventoryApp: InventoryApp;

  beforeEach(async () => {
    inventoryApp = createMockInventoryApp();
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
            "upc": "70a45626-d436-4813-8f16-d9f5fce6c556",
          },
        },
      }
    `);
  });
});

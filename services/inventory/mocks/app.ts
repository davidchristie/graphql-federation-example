import { seedInventory } from "dev-config";
import { InMemoryProductRepository } from "../adapters/in-memory-product-repository.ts";
import { InventoryApp, createInventoryApp } from "../graphql/app.ts";

export function createMockInventoryApp(): InventoryApp {
  return createInventoryApp({
    ports: {
      productRepository: new InMemoryProductRepository(seedInventory),
    },
  });
}

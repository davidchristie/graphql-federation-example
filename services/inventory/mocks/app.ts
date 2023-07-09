import { InMemoryProductRepository } from "../adapters/in-memory-product-repository.ts";
import { InventoryApp, createInventoryApp } from "../graphql/app.ts";
import { mockProducts } from "./products.ts";

export function createMockInventoryApp(): InventoryApp {
  return createInventoryApp({
    ports: {
      productRepository: new InMemoryProductRepository(mockProducts),
    },
  });
}

import { seedProducts } from "dev-config";
import { InMemoryProductRepository } from "../adapters/in-memory-product-repository.ts";
import { ProductsApp, createProductsApp } from "../graphql/app.ts";

export function createMockProductsApp(): ProductsApp {
  return createProductsApp({
    ports: {
      productRepository: new InMemoryProductRepository(seedProducts),
    },
  });
}

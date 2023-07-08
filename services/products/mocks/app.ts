import { InMemoryProductRepository } from "../adapters/in-memory-product-repository.ts";
import { ProductsApp, createProductsApp } from "../graphql/app.ts";
import { mockProducts } from "./products.ts";

export function createMockProductsApp(): ProductsApp {
  return createProductsApp({
    ports: {
      productRepository: new InMemoryProductRepository(mockProducts),
    },
  });
}

import { InMemoryProductRepository } from "../adapters/in-memory-product-repository.js";
import { ProductsApp, createProductsApp } from "../graphql/app.js";
import { mockProducts } from "./products.js";

export function createMockProductsApp(): ProductsApp {
  return createProductsApp({
    ports: {
      productRepository: new InMemoryProductRepository(mockProducts),
    },
  });
}

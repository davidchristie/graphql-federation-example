import { ProductRepository } from "./product-repository.ts";

export interface Ports {
  productRepository: ProductRepository;
}

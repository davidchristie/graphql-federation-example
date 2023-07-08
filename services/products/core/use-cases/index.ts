import { Ports } from "../ports/index.ts";
import { FindProduct } from "./find-product.ts";
import { FindProducts } from "./find-products.ts";
import { TopProducts } from "./top-products.ts";

export interface UseCases {
  findProduct: FindProduct;
  findProducts: FindProducts;
  topProducts: TopProducts;
}

export function createUseCases(options: { ports: Ports }): UseCases {
  return {
    findProduct: new FindProduct({
      productRepository: options.ports.productRepository,
    }),
    findProducts: new FindProducts({
      productRepository: options.ports.productRepository,
    }),
    topProducts: new TopProducts({
      productRepository: options.ports.productRepository,
    }),
  };
}

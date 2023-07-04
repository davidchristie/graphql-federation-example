import { Ports } from "../ports/index.js";
import { FindProduct } from "./find-product.js";
import { FindProducts } from "./find-products.js";
import { TopProducts } from "./top-products.js";

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

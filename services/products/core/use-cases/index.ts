import { Ports } from "../ports/index.ts";
import { FindProduct } from "./find-product.ts";
import { FindProductsByUpcs } from "./find-products-by-upcs.ts";
import { FindProducts } from "./find-products.ts";
import { TopProducts } from "./top-products.ts";

export interface UseCases {
  findProduct: FindProduct;
  findProducts: FindProducts;
  findProductsByUpcs: FindProductsByUpcs;
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
    findProductsByUpcs: new FindProductsByUpcs({
      productRepository: options.ports.productRepository,
    }),
    topProducts: new TopProducts({
      productRepository: options.ports.productRepository,
    }),
  };
}
